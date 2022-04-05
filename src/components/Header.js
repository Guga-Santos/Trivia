import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class HeaderGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = '';
  }

  render() {
    const { name, email, score } = this.props;
    const hash = md5(email).toString();
    if (score) {
      return (
        <header>
          <img
            src={ `https://www.gravatar.com/avatar/${hash}` }
            alt="Avatar"
            data-testid="header-profile-picture"
          />
          <div data-testid="header-player-name">{name}</div>
          <div data-testid="header-score">{score.score}</div>
          <div>{`Acertadas: ${score.assertions}`}</div>
        </header>
      );
    }
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="Avatar"
          data-testid="header-profile-picture"
        />
        <div data-testid="header-player-name">{name}</div>
        <div data-testid="header-score">{0}</div>
        <div>{`Acertadas: ${0}`}</div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.login.player.user,
  email: state.login.player.email,
  score: state.game.results.player,
});

HeaderGame.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(HeaderGame);
