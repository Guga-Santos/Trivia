import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Loading from '../components/Loading';

const MAX = 4;

class Trivia extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      results: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchTrivia();
  }

  shuffleButtons = (answers) => {
    const quests = [...answers.incorrect_answers, answers.correct_answer];
    const POINT5 = 0.5;
    const shuffle = quests.sort(() => Math.random() - POINT5);

    //  https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

    console.log(shuffle);

    return (
      shuffle.map((answer, index) => (
        <button
          key={ answer }
          type="button"
          data-testid={
            answer === answers.correct_answer ? 'correct-answer' : `wrong-answer-${index}`
          }
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
      index: prev.index < MAX ? prev.index + 1 : MAX,
    }));
  }

  render() {
    const { results, loading, index } = this.state;
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
                  <h4
                    data-testid="question-text"
                  >
                    {results[index].question}
                  </h4>
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
          <button
            type="button"
            onClick={ this.handleClick }
            className="next-btn"
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.trivia.data,
  token: state.token,
});

Trivia.propTypes = {
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Trivia);
