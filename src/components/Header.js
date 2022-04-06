import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { name, img } = this.props;
    return (
      <div className="header-container">
        <div className="player-infos">
          <img
            src={ img }
            alt="Avatar"
            data-testid="header-profile-picture"
          />
          <h3
            data-testid="header-player-name"
            className="header-name"
          >
            {name}

          </h3>
        </div>
        <h3
          data-testid="header-score"
          className="header-score"
        >
          {' '}
          Pontuação: 0
          {' '}

        </h3>
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
