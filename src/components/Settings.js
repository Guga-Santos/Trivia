import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { active, getConfigs, openConfig } from '../Redux/Actions';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: 'any',
      difficulty: 'any',
      type: 'any',
    };
  }

handleChange = ({ target: { id, value } }) => {
  this.setState({
    [id]: value,
  });
}

handleClick = () => {
  const { category, difficulty, type } = this.state;
  const { closeConfigs, setConfig , setActive } = this.props;
  setConfig(category, difficulty, type);
  setActive(true);
  closeConfigs(false);
}

// https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple
// Fetch necessário na API

render() {
  const { category, difficulty, type } = this.state;
  return (
    <div className="settings-big-container">
      <div className="settings-container">
        <h1 data-testid="settings-title">Configurações</h1>
        <label htmlFor="category">
          Categoria:
          <select
            onChange={ this.handleChange }
            name=""
            id="category"
            value={ category }
          >
            <option value="any">Any Category</option>
            <option value="9">General Knowledge</option>
            <option value="10">Entertainment: Books</option>
            <option value="11">Entertainment: Film</option>
            <option value="12">Entertainment: Music</option>
            <option value="13">Entertainment: Musicals and Theatres</option>
            <option value="14">Entertainment: Television</option>
            <option value="15">Entertainment: Video Games</option>
            <option value="16">Entertainment: Board Games</option>
            <option value="17">Science and Nature</option>
            <option value="18">Science: Computers</option>
            <option value="19">Science: Mathematics</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
            <option value="28">Vehicles</option>
            <option value="29">Entertainment: Comics</option>
            <option value="30">Science: Gadgets</option>
            <option value="31">Entertainment: Japanese Anime and Manga</option>
            <option value="32">Entertainment: Cartoon and Animations</option>
          </select>
        </label>
        <label htmlFor="difficulty">
          Dificuldade:
          <select
            onChange={ this.handleChange }
            id="difficulty"
            value={ difficulty }
          >
            <option value="any">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
        <label htmlFor="type">
          Tipo:
          <select
            onChange={ this.handleChange }
            id="type"
            value={ type }
          >
            <option value="any">Any</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True / False</option>
          </select>
        </label>
        <button onClick={ this.handleClick } type="submit">Jogar</button>
      </div>
    </div>
  );
}
}

const mapDispatchToProps = (dispatch) => ({
  closeConfigs: (bool) => dispatch(openConfig(bool)),
  setConfig: (cat, dif, typ) => dispatch(getConfigs(cat, dif, typ)),
  setActive: (bool) => dispatch(active(bool)),
});

Settings.propTypes = {
  closeConfigs: PropTypes.func.isRequired,
  setConfig: PropTypes.func.isRequired,
  setActive: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Settings);
