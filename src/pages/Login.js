import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      disabled: true,
    };
  }

  handleChange = ({ target: { id, value } }) => {
    const { name, email } = this.state;
    this.setState({
      [id]: value,
    }, () => this.setState({
      disabled: !(name && email),
    }));
  }

  render() {
    const { name, email, disabled } = this.state;
    return (
      <div className="login-container">
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
        >
          Play
        </button>
      </div>
    );
  }
}

export default Login;
