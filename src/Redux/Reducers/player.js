const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  img: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'TOKEN_REQUEST':
    return {
      ...state,
      token: action.token,
    };
  case 'GET_IMAGE':
    return {
      ...state,
      img: action.image,
    };
  case 'GET_NAME':
    return {
      ...state,
      name: action.name,
    };
  default:
    return state;
  }
};

export default player;
