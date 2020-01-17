import React, { Component } from "react";
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";

export default class LocaleSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.locale
    }
    this.selectLocale = this.selectLocale.bind(this);
  }

  selectLocale(event) {
    this.setState({
      value: event.target.value
    });
    this.props.setLocale(event);
  }
  render() {
    return (
      <MDBDropdown>
        <MDBDropdownToggle caret color="primary">
          {this.state.value === "ruRU" ? "Русский" : "English"}
        </MDBDropdownToggle>
        <MDBDropdownMenu basic >
          <MDBDropdownItem value="enUS" onClick={this.selectLocale}>English</MDBDropdownItem>
          <MDBDropdownItem value="ruRU" onClick={this.selectLocale}>Русский</MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown>
    );
  }
}