import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Ranking extends Component {
    handlePlayAgain = () => {
      const { history } = this.props;
      history.push('/');
    }

    render() {
      return (
        <div>
          <h1
            data-testid="ranking-title"
          >
            Ranking
          </h1>
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ this.handlePlayAgain }
          >
            Jogue Novamente!
          </button>
        </div>
      );
    }
}

Ranking.propTypes = ({
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
});

export default Ranking;
