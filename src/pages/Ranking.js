import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { zero } from '../Redux/Actions';

class Ranking extends Component {
  constructor(props) {
    super(props);

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
      const { history, zeroScore } = this.props;
      zeroScore();

      history.push('/');
    }

    render() {
      const { data } = this.state;
      const ranking = data.sort((a, b) => b.score - a.score);
      return (
        <div className="ranking-container">
          <h1
            data-testid="ranking-title"
          >
            Ranking
          </h1>
          {/* https://www.javascripttutorial.net/array/javascript-sort-an-array-of-objects/ */}
          {ranking
            .map((obj, index) => (
              <div className="ranking-player" key={ index }>
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
  zeroScore: PropTypes.func.isRequired,
});

const mapDispatchToProps = (dispatch) => ({
  zeroScore: () => dispatch(zero(0)),
});

export default connect(null, mapDispatchToProps)(Ranking);
