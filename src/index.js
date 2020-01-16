import React, { Component } from "react";
import ReactDOM from "react-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./index.css";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { getInfo, getCards, filterCards} from "./Components/HsApi";
import LocaleSelector from "./Components/LocaleSelector";
import Filters from "./Components/Filters";
import CardsContainer from "./Components/CardsContainer";

class App extends Component {
  constructor(props) {
    super(props);
    this.getInfo = getInfo.bind(this);
    this.getCards = getCards.bind(this);
    this.filterCards = filterCards.bind(this);
    this.changeLocale = this.changeLocale.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.state = {
      locale: "enUS",
      hsApiInfo: {},
      hsApiCards: {}
    };
    this.getInfo();
    this.getCards();
  }

  changeLocale(event) {
    this.setState({
      locale: event.target.value
    },
      () => {
        this.getInfo();
        this.getCards();
        this.filterCards();
      });
  }

  handleOptionChange(event) {
    this.setState({ [event.target.title]: event.target.value }, () => this.filterCards())
  }

  render() {
    return (
      <React.Fragment>
        <MDBContainer fluid>
          <MDBRow>
            <MDBCol sm="4" lg="3">
              <Filters locale={this.state.locale} handleOptionChange={this.handleOptionChange} />
              <LocaleSelector locale={this.state.locale} changeLocale={this.changeLocale} />
            </MDBCol>
            <MDBCol sm="8" lg="9">
              {this.state.hsApiCards["Basic"] !== undefined &&
                <CardsContainer
                  cardsData={this.state.hsApiCards}
                />
              }
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));