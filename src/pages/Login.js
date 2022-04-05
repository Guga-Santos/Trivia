import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import fetchToken from '../Redux/Actions';
import logo from '../trivia.png';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      disabled: true,
    };
  }

  handleDisable = () => {
    const { name, email } = this.state;
    this.setState({
      disabled: !(name.length && email.length),
    });
  }

  handleChange = ({ target: { id, value } }) => {
    this.setState({
      [id]: value,
    }, this.handleDisable);
  }

  handleClick = async () => {
    const { getToken } = this.props;

    await getToken();
  }

  render() {
    const { name, email, disabled } = this.state;
    return (
      <div className="App">
        <div className="login-container">
          <header className="App-header">
            <img src={ logo } className="App-logo" alt="logo" />
          </header>
          <label htmlFor="input-name">
            Name:
            <input
              type="text"
              id="name"
              data-testid="input-player-name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="input-email">
            Email:
            <input
              type="email"
              id="email"
              data-testid="input-gravatar-email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ disabled }
            onClick={ this.handleClick }
          >
            Play
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchToken()),
});

Login.propTypes = {
  getToken: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
