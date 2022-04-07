import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
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
  const { assertions, score } = this.props;
  return (
    <div>
      <Header />
      <h1 data-testid="feedback-text">
        { assertions <= 2 ? 'Could be better...' : 'Well Done!'}
      </h1>
      <div>
        <h2 data-testid="feedback-total-question">{assertions}</h2>
        <h2 data-testid="feedback-total-score">{score}</h2>
      </div>
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
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
});

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps, null)(FeedBack);
