const INITIAL_STATE = {
  category: 'any',
  difficulty: 'any',
  type: 'any',
  active: false,
};

const settings = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'USE_CONFIG':
    return {
      ...state,
      category: action.category,
      difficulty: action.difficulty,
      type: action.typed,
    };
  case 'ACTIVE':
    return {
      ...state,
      active: action.bool,
    };
  default:
    return state;
  }
};

export default settings;
