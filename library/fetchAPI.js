const fetch = require("node-fetch");
function fetchAPI(...params) {
  console.log("im Executing");
  return fetch(...params);
}
module.exports = {
  fetch: fetchAPI,
};
