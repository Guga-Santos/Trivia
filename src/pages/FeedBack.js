import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';

class FeedBack extends Component {
handleClick = () => {
  const { history } = this.props;
  history.push('/ranking');
}

handlePlayAgain = () => {
  const { history } = this.props;
  history.push('/');
}

render() {
  return (
    <div>
      <Header />
      <h1 data-testid="feedback-text">Cheguei!</h1>
      <button
        type="button"
        data-testid="btn-ranking"
        onClick={ this.handleClick }
      >
        Click Aqui!
      </button>
      <button
        type="button"
        data-testid="btn-play-again"
        onClick={ this.handlePlayAgain }
      >
        Jogue Novamente!
      </button>
    </div>

  );
}
}

FeedBack.propTypes = ({
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
});

export default FeedBack;
