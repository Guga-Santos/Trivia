import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
// import Header from '../components/Header';
import Settings from '../components/Settings';
import { fetchToken, fetchTrivia, getGravatar, getName } from '../Redux/Actions';
import logo from '../trivia.png';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      disabled: true,
      config: false,
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
    const { email, name } = this.state;
    const { getToken, setImage, setName, history } = this.props;
    await getToken();
    setName(name);
    const hash = md5(email).toString();
    setImage(hash);
    history.push('/trivia');
  }

  handleConfig = () => {
    this.setState({
      config: true,
    });
  }

  render() {
    const { name, email, disabled, config } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
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
          <div className="login-btns">
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
          </div>
        </div>
        { config && <Settings /> }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchToken()),
  setImage: (value) => dispatch(getGravatar(value)),
  setName: (name) => dispatch(getName(name)),
  getTrivia: (token) => dispatch(fetchTrivia(token)),
});

Login.propTypes = {
  getToken: PropTypes.func.isRequired,
  setImage: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token,
  // data: state.trivia.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
