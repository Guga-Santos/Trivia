export const TOKEN_REQUEST = 'TOKEN_REQUEST';
export const GET_EMAIL = 'GET_EMAIL';

export const tokenRequest = (token) => ({ type: TOKEN_REQUEST, token });
export const getEmail = (email) => ({ type: GET_EMAIL, email });

function fetchToken() {
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

export default fetchToken;
