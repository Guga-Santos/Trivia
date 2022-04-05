import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { name, img } = this.props;
    return (
      <div>
        <img
          src={ img }
          alt="Avatar"
          data-testid="header-profile-picture"
        />
        <h3 data-testid="header-player-name">{name}</h3>
        <h3 data-testid="header-score"> 0 </h3>
        <h1> Olá!!</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  img: state.player.img,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
