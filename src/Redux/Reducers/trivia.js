const INITIAL_STATE = {
  data: [],
  counter: false,
  timer: 30,
  config: false,
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
  case 'OPEN_CONFIG':
    return {
      ...state,
      config: action.bool,
    };
  default:
    return state;
  }
};

export default trivia;
