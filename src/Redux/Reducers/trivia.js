const INITIAL_STATE = {
  data: [],
};

const trivia = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'GET_TRIVIA':
    return {
      ...state,
      data: action.data,
    };
  default:
    return state;
  }
};

export default trivia;
