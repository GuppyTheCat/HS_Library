import React, { Component } from "react";
import ReactDOM from "react-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import "./index.css";
import { getInfo, getCards } from "./Components/HsApi";
import LocaleSelector from "./Components/LocaleSelector";
import * as FiltersData from "./Components/FiltersLocales";
import * as FilterList from "./Components/FiltersList";

class App extends Component {
  constructor(props) {
    super(props);
    this.getInfo = getInfo.bind(this);
    this.getCards = getCards.bind(this);
    this.changeLocale = this.changeLocale.bind(this);
    this.state = {
      locale: "enUS",
      cardSet: "Basic",
      playerClass: "Paladin",
      hsApiInfo: {},
      hsApiCards: {}
    };
    this.getInfo();
    this.getCards();
  }

  changeLocale(event) {
    this.setState({
      locale: event.target.value
    });
    this.getInfo();
    this.getCards();
  }

  render() {
    return (
      <React.Fragment>
        <MDBContainer fluid>
          <MDBRow>
            <MDBCol sm="4" lg="3">
              <Filters locale={this.state.locale} />
              <LocaleSelector locale={this.state.locale} changeLocale={this.changeLocale} />
            </MDBCol>
            <MDBCol sm="8" lg="9">
              {this.state.hsApiInfo.patch}
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
    this.state = {filterList: FilterList}
  }

  render() {
    const { filterList } = this.state;
    return (
      <React.Fragment>
        {filterList.map(filter => (
          <Filter
            key={filter.id}
            title={filter.title}
            value={filter.value}
            list={filter.list}
            locale={this.props.locale === "enUS" ? 0 : 1}
          />
        ))}
      </React.Fragment>
    );
  }
}

class Filter extends Component {

  render() {
    return (
      <React.Fragment>
        <h4>{this.props.title}</h4>
        <select className="browser-default custom-select">
          <option value="empty" key={0}>
            Select {this.props.title}
          </option>
          {
            this.props.list.map((option, key) => (
              <option value={option} key={key + 1}>{FiltersData[this.props.value][option][this.props.locale]}</option>
            ))
          }
        </select>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));