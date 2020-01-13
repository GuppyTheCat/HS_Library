export function getInfo() {
  const axios = require("axios");

  axios({
      "method": "GET",
      "url": "https://omgvamp-hearthstone-v1.p.rapidapi.com/info",
      "headers": {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com",
        "x-rapidapi-key": "52905635d6msha8cd1b376abf0bep14efa2jsn4fdc3518bd3a"
      },
      "params": {
        "locale": this.state.locale
      }
    })
    .then((response) => {
      const hsApiInfo = response.data;
      console.log(hsApiInfo);
      this.setState({
        hsApiInfo: hsApiInfo
      });
    })
    .catch((error) => {
      console.log(error)
    })
}

export function getCards() {
  const axios = require("axios");

  axios({
      "method": "GET",
      "url": "https://omgvamp-hearthstone-v1.p.rapidapi.com/cards",
      "headers": {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com",
        "x-rapidapi-key": "52905635d6msha8cd1b376abf0bep14efa2jsn4fdc3518bd3a"
      },
      "params": {
        "locale": this.state.locale
      }
    })
    .then((response) => {
      const hsApiCards = response.data;

      //Remove not related sets
      ["Battlegrounds", "Credits", "Hero Skins", "Missions", "Debug", "Promo", "Wild Event", "System", "Taverns of Time", "Tavern Brawl"].forEach(e => delete hsApiCards[e]);
      for (let setArray of Object.values(hsApiCards)) {
        console.log(setArray);
      }

      console.log(hsApiCards);
      console.log(this.state.locale);
      this.setState({
        hsApiCards: hsApiCards
      });
    })
    .catch((error) => {
      console.log(error)
    })
}

function filterByPlayerClass(array, playerClass){
  let filteredArray = array.filter(item=>item.playerClass === playerClass);
  console.log(filteredArray)
}