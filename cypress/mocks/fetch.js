const { tokenResponse } = require("./token");
const { questionsResponse } = require("./questions");


const fetch = (url) => {
  const urls = {
    "https://opentdb.com/api_token.php?command=request": tokenResponse,
    [`https://opentdb.com/api.php?amount=5&token=${tokenResponse.token}`]: questionsResponse,
  };

  return Promise.resolve({
    status: Object.keys(urls).includes(url) ? 200 : 404,
    ok: Object.keys(urls).includes(url),
    json: () => {
      return Object.keys(urls).includes(url)
        ? Promise.resolve(urls[url])
        : Promise.reject(new Error("Not Found"));
    },
  });
}

module.exports = { fetch };
