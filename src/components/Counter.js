import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCounter, getTimer } from '../Redux/Actions';

class Counter extends Component {
  constructor() {
    super();

    this.state = {
      counter: 30,
    };
  }

  componentDidMount() {
    this.handleCounter();
  }

  handleCounter = () => {
    const SEG = 1000;
    const { count, timer } = this.props;
    setInterval(() => {
      this.setState((prev) => ({
        counter: prev.counter - 1,
      }), () => {
        const { counter } = this.state;
        if (counter === 0) {
          count(true);
        }
      });
      const { counter } = this.state;
      timer(counter);
    }, SEG);
  }

  render() {
    const { counter } = this.state;
    return (
      <h1>{counter >= 1 ? counter : 0}</h1>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  count: (bool) => dispatch(getCounter(bool)),
  timer: (num) => dispatch(getTimer(num)),
});

Counter.propTypes = {
  count: PropTypes.func.isRequired,
  timer: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Counter);
