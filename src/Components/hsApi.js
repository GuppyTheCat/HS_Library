export function getInfo() {
  const axios = require("axios");

  axios({
    "method": "GET",
    "url": "https://omgvamp-hearthstone-v1.p.rapidapi.com/info",
    "headers": {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com",
      "x-rapidapi-key": "52905635d6msha8cd1b376abf0bep14efa2jsn4fdc3518bd3a"
    }
  })
    .then((response) => {
      const hsApiData = response.data;
      console.log(hsApiData);
      this.setState({ hsApiData: hsApiData });
    })
    .catch((error) => {
      console.log(error)
    })
}