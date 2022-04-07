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
  const { assertions } = this.props;
  return (
    <div>
      <Header />
      <h1 data-testid="feedback-text">
        { assertions <= 2 ? 'Could be better...' : 'Well Done!'}
      </h1>
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
});

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps, null)(FeedBack);
