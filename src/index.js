import React, { Component } from "react";
import ReactDOM from "react-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import "./index.css";
import { getInfo, getCards } from "./Components/HsApi";
import LocaleSelector from "./Components/LocaleSelector";
import * as FiltersLocales from "./Components/FiltersLocales";
import * as FiltersList from "./Components/FiltersList";

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
    this.state = {FiltersList: FiltersList}
  }

  render() {
    const { FiltersList } = this.state;
    return (
      <React.Fragment>
        {FiltersList.map(filter => (
          <Filter
            key={filter.id}
            value={filter.value}
            list={filter.list}
            locale={this.props.locale}
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
        <h4>{FiltersLocales["title"][this.props.locale][this.props.value]}</h4>
        <select className="browser-default custom-select">
          <option value="empty" key={0}>
            {FiltersLocales["optionTitle"][this.props.locale][this.props.value]}
          </option>
          {
            this.props.list.map((option, key) => (
              <option value={option} key={key + 1}>{FiltersLocales[this.props.value][this.props.locale][option]}</option>
            ))
          }
        </select>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));