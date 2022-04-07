import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Counter from '../components/Counter';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getAssertions, getCounter, getScore, getTimer } from '../Redux/Actions';

class Trivia extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      results: [],
      loading: false,
      border: false,
      disabled: true,
    };
  }

  componentDidMount() {
    this.fetchTrivia();
    const { count } = this.props;
    count(false);
  }

  handleBorder = () => {
    this.setState({
      border: true,
      disabled: false,
    });
  }

  handleCorrect = () => {
    const { results, index } = this.state;
    const { totalScore, setAssertions, timer } = this.props;

    const difficult = results[index].difficulty;

    const ten = 10;
    const three = 3;

    switch (difficult) {
    case 'easy':
      totalScore(ten + (timer * 1));
      break;
    case 'medium':
      totalScore(ten + (timer * 2));
      break;
    case 'hard':
      totalScore(ten + (timer * three));
      break;
    default:
      return 0;
    }

    this.setState({
      border: true,
      disabled: false,
    });

    setAssertions(1);
  }

  shuffleButtons = (answers) => {
    const { border } = this.state;
    const { counter } = this.props;
    const quests = [...answers.incorrect_answers, answers.correct_answer];
    const POINT5 = 0.5;
    const shuffle = quests.sort(() => Math.random() - POINT5);

    //  https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

    return (
      shuffle.map((answer, index) => (
        <button
          className={ border && (answer === answers.correct_answer
            ? 'correct-answer' : 'wrong-answer') }
          onClick={ (answer === answers.correct_answer
            ? this.handleCorrect : this.handleBorder) }
          id={ answer }
          key={ answer }
          type="button"
          data-testid={
            answer === answers.correct_answer ? 'correct-answer' : `wrong-answer-${index}`
          }
          disabled={ counter }
        >
          { answer }
        </button>
      ))

    );
  }

  fetchTrivia = async () => {
    const { token } = this.props;

    this.setState({
      loading: true,
    });

    const fetchAPI = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await fetchAPI.json();

    this.setState({
      results: data.results,
    }, this.setState({
      loading: false,
    }));
  }

  handleClick = () => {
    this.setState((prev) => ({
      index: prev.index + 1,
      border: false,
      disabled: true,
    }));

    const { count } = this.props;
    count(false);
  }

  render() {
    const { results, loading, index, disabled } = this.state;
    const { counter } = this.props;
    const FIVE = 5;
    if (index === FIVE) {
      return <Redirect push to="/feedback" />;
    }
    return (
      <div>
        <Header />
        <div className="question-container">
          { loading
            ? <Loading />
            : (
              results.length > 0
              && (
                <>
                  <h2
                    data-testid="question-text"
                    id={ results[index].difficulty }
                  >
                    {results[index].question}
                  </h2>
                  <h4
                    data-testid="question-category"
                  >
                    {results[index].category}
                  </h4>
                  <div data-testid="answer-options" className="answer-btns">
                    {
                      this.shuffleButtons(results[index])
                    }
                  </div>

                </>
              )
            )}
          { disabled && !counter
            ? null
            : (
              <button
                type="button"
                onClick={ this.handleClick }
                className="next-btn"
                data-testid="btn-next"
                disabled={ disabled && !counter }
              >
                Next
              </button>
            )}
          <Link to="/feedback">
            {' '}
            <h1>Aqui</h1>
            {' '}
          </Link>
        </div>
        {!counter ? <Counter /> : null }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.trivia.data,
  token: state.token,
  counter: state.trivia.counter,
  timer: state.trivia.timer,
});

const mapDispatchToProps = (dispatch) => ({
  totalScore: (score) => dispatch(getScore(score)),
  setAssertions: (points) => dispatch(getAssertions(points)),
  count: (bool) => dispatch(getCounter(bool)),
  timerS: (num) => dispatch(getTimer(num)),

});

Trivia.propTypes = {
  token: PropTypes.string.isRequired,
  totalScore: PropTypes.func.isRequired,
  setAssertions: PropTypes.func.isRequired,
  count: PropTypes.func.isRequired,
  counter: PropTypes.bool.isRequired,
  timer: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
