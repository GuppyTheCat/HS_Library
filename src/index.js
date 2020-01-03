import React, { Component } from "react";
import ReactDOM from "react-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import "./index.css";

class App extends Component {

  loadInfo() {
    var request = require("request");

    var options = {
      method: 'GET',
      url: 'https://omgvamp-hearthstone-v1.p.rapidapi.com/info',
      headers: {
        'x-rapidapi-host': 'omgvamp-hearthstone-v1.p.rapidapi.com',
        'x-rapidapi-key': '52905635d6msha8cd1b376abf0bep14efa2jsn4fdc3518bd3a'
      }
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log(JSON.parse(body));
    });
  }
  render() {
    return (
      <React.Fragment>
        <MDBContainer fluid>
          <MDBRow>
            <MDBCol sm="4" lg="3">
              <Filters />
            </MDBCol>
            <MDBCol sm="8" lg="9">
                {this.loadInfo()}
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </React.Fragment>
    );
  }
}

class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterList:
        [
          {
            id: 1,
            title: "Set",
            list: [
              "Basic", "Classic", "Naxxramas", "Goblins vs Gnomes", "Blacrock Mountain", "The Grand Tournament",
              "The League of Explorers", "Whispers of the Old Gods", "One Night in Karazhan", "Mean Streets of Gadgetzan",
              "Journey to Un'Goro", "Knights of the Frozen Throne", "Kobolds & Catacombs", "The Witchwood", "The Boomsday Project",
              "Rastakhan's Rumble", "Rise of Shadows", "Saviors of Uldum", "Descent of Dragons"
            ]
          },
          {
            id: 2,
            title: "Cost",
            list: [
              "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"
            ]
          },
          {
            id: 3,
            title: "Rarity",
            list: [
              "Free", "Common", "Rare", "Epic", "Legendary"
            ]
          },
          {
            id: 4,
            title: "Type",
            list: [
              "Minion", "Spell", "Weapon", "Hero"
            ]
          },
          {
            id: 5,
            title: "Mechanics",
            list: [
              "Battlecry", "Charge", "Choose One", "Combo", "Deathrattle", "Divine Shield", "Overload", "Poisonous",
              "Secret", "Silence", "Taunt", "Windfury", "Freeze", "Inspire", "Discover", "C'Thun", "Jade Golem", "Adapt", "Quest",
              "Lifesteal", "Echo", "Rush", "Magnetic", "Overkill", "Twinspell", "Reborn", "Sidequest"
            ]
          },
          {
            id: 6,
            title: "Minion Type",
            list: [
              "Beast", "Demon", "Dragon", "Elemental", "Mech", "Murloc", "Pirate", "Totem"
            ]
          }
        ]
    }
  }

  render() {
    const { filterList } = this.state;
    return (
      <React.Fragment>
        {filterList.map(filter => (
          <React.Fragment>
            <h4>{filter.title}</h4>
            <Filter
              key={filter.id}
              list={filter.list}
            />
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  }
}

class Filter extends Component {
  render() {
    return (
      <React.Fragment>
        <select className="browser-default custom-select">
          {
            this.props.list.map(option => (
              <option>{option}</option>
            ))
          }
        </select>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));