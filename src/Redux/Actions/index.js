export const TOKEN_REQUEST = 'TOKEN_REQUEST';
export const GET_EMAIL = 'GET_EMAIL';
export const GET_IMAGE = 'GET_IMAGE';
export const GET_NAME = 'GET_NAME';
export const GET_TRIVIA = 'GET_TRIVIA';
export const GET_SCORE = 'GET_SCORE';
export const GET_ASSERTIONS = 'GET_ASSERTIONS';
export const GET_COUNTER = 'GET_COUNTER';
export const GET_TIMER = 'GET_TIMER';
export const ZERO = 'ZERO';

export const tokenRequest = (token) => ({ type: TOKEN_REQUEST, token });
export const getEmail = (email) => ({ type: GET_EMAIL, email });
export const getImage = (image) => ({ type: GET_IMAGE, image });
export const getName = (name) => ({ type: GET_NAME, name });
export const getTrivia = (data) => ({ type: GET_TRIVIA, data });
export const getScore = (score) => ({ type: GET_SCORE, score });
export const getAssertions = (points) => ({ type: GET_ASSERTIONS, points });
export const getCounter = (bool) => ({ type: GET_COUNTER, bool });
export const getTimer = (num) => ({ type: GET_TIMER, num });
export const zero = () => ({ type: ZERO });

export function fetchToken() {
  return async (dispatch) => {
    try {
      const fetchAPI = await fetch('https://opentdb.com/api_token.php?command=request');
      const data = await fetchAPI.json();
      dispatch(tokenRequest(data.token));
    } catch (erro) {
      return Error(erro);
    }
  };
}

export function fetchTrivia(token) {
  return async (dispatch) => {
    try {
      const fetchAPI = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
      const data = await fetchAPI.json();
      dispatch(getTrivia(data));
    } catch (erro) {
      return Error(erro);
    }
  };
}

export function getGravatar(hash) {
  const imageURL = `https://www.gravatar.com/avatar/${hash}`;
  return (dispatch) => {
    dispatch(getImage(imageURL));
  };
}
