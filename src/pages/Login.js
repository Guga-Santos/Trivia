import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import Settings from '../components/Settings';
import { fetchToken, getGravatar, getName } from '../Redux/Actions';
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

  handleChange = ({ target: { id, value } }) => {
    const { name, email } = this.state;
    this.setState({
      [id]: value,
    }, this.handleDisable);
  }

  handleClick = async () => {
    const { email, name } = this.state;
    const { getToken, setImage, setName, history } = this.props;
    history.push('/trivia');
    await getToken();
    setName(name);
    const hash = md5(email).toString();
    setImage(hash);
  }

  handleConfig = () => {
    this.setState({
      config: true,
    });
  }

  render() {
    const { name, email, disabled } = this.state;
    return (
      <div className="App">
        {/* <Header /> */}
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
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.handleConfig }
          >
            Configurações
          </button>
          { config && <Settings /> }
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchToken()),
  setImage: (value) => dispatch(getGravatar(value)),
  setName: (name) => dispatch(getName(name)),
});

Login.propTypes = {
  getToken: PropTypes.func.isRequired,
  setImage: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
