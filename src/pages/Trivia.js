import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

const NUMBER3 = 3;
const POINT5 = 0.5;

class Trivia extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      random: [0, 1, 2, NUMBER3],
    };
  }

  componentDidMount() {
    this.setState((prev) => ({
      random: prev.random.sort(() => POINT5 - Math.random()),
    }));
    //  https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  }

  render() {
    const { data } = this.props;
    const { results } = data;
    const { index, random } = this.state;
    return (
      <div>
        <Header />
        <div className="question-container">
          { data.length < 1
            ? null
            : (
              <>
                <h4
                  data-testid="question-category"
                >
                  {results[index].category}
                </h4>
                <h4
                  data-testid="question-text"
                >
                  {results[index].question}
                </h4>
                {/* <button
                type="button"
                data-testid="correct-answer"
                >
                  {data.results[index].correct_answer}
                </button> */}

              </>
            )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.trivia.data,
});

export default connect(mapStateToProps, null)(Trivia);
