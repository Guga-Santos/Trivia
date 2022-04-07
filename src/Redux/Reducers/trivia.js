const INITIAL_STATE = {
  data: [],
  counter: false,
  timer: 30,
};

const trivia = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'GET_TRIVIA':
    return {
      ...state,
      data: action.data,
    };
  case 'GET_COUNTER':
    return {
      ...state,
      counter: action.bool,
    };
  case 'GET_TIMER':
    return {
      ...state,
      timer: action.num,
    };
  default:
    return state;
  }
};

export default trivia;
