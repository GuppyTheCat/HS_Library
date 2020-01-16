import * as FiltersList from "./json/FiltersList";
import * as FiltersLocales from "./json/FiltersLocales";

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
      this.setState({
        hsApiCards: response.data
      });
      console.log("Cards loaded");
    })
    .catch((error) => {
      console.log(error)
    })

}

export function filterCards() {

  const cardsData = this.state.hsApiCards;
  this.checkFilterIsSet = checkFilterIsSet.bind(this);
  this.filterByOption = filterByOption.bind(this);

  //Remove not related sets
  ["Battlegrounds", "Credits", "Hero Skins", "Missions", "Debug", "Promo", "Wild Event", "System", "Taverns of Time", "Tavern Brawl"].forEach(e => delete cardsData[e]);

  let resultArray = [];
  for (let setArray of Object.values(cardsData)) {
    resultArray.push(setArray);
  }
  resultArray = resultArray.flat();

  for (let filter of Object.values(FiltersList)) {
    this.filterByOption(filter.title)
  }

  console.log(resultArray);

  function checkFilterIsSet(filter) {
    return this.state[filter] !== "" && this.state[filter] !== undefined
  }

  function filterByOption(option) {
    if (this.checkFilterIsSet(option)) {
      switch (option) {
        case "mechanics":
          let tempArray = [];
          for (let i = 0; i < resultArray.length; i++) {
            let cardMechanics = resultArray[i]["mechanics"];
            if (resultArray[i]["mechanics"]) {
              for (let property of Object.values(cardMechanics)) {
                if (property.name === FiltersLocales.mechanics[this.state.locale][this.state.mechanics]) {
                  tempArray.push(resultArray[i])
                }
              }
            }
          }
          resultArray = tempArray;
          break;
        case "cost":
          break;
        default:
          resultArray = resultArray.filter(item => item[option] === this.state[option])
      }
    }
  }
}