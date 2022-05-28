import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Counter from './Counter';

class Header extends Component {
  render() {
    const { name, img, score, counter } = this.props;
    return (
      <div className="body-head-container">
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
            { score }

          </h3>
        </div>
        <div className="counter-container">
          {!counter ? <Counter /> : null }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

  name: state.player.name,
  img: state.player.img,
  score: state.player.score,
  counter: state.trivia.counter,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  counter: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, null)(Header);
