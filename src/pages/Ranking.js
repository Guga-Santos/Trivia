import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Ranking extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
    };
  }

componentDidMount = () => {
  const get = JSON.parse(localStorage.getItem('ranking'));
  const item = !get ? [] : get;

  this.setState({
    data: item,
  });
}

    handlePlayAgain = () => {
      const { history } = this.props;
      history.push('/');
    }

    render() {
      const { data } = this.state;
      const ranking = data.sort((a, b) => b.score - a.score);
      return (
        <div>
          <h1
            data-testid="ranking-title"
          >
            Ranking
          </h1>
          {/* https://www.javascripttutorial.net/array/javascript-sort-an-array-of-objects/ */}
          {ranking
            .map((obj, index) => (
              <div key={ index }>
                <img src={ obj.picture } alt={ obj.name } />
                <h3
                  data-testid={ `player-name-${index}` }
                >
                  {obj.name}

                </h3>
                <h3
                  data-testid={ `player-score-${index}` }
                >
                  {obj.score}

                </h3>
              </div>
            ))}
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
