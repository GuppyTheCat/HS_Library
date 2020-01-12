import React, { Component } from "react";
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";

export default class LocaleSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.locale
    }
    this.select = this.select.bind(this);
  }

  select(event) {
    this.setState({
      value: event.target.value
    });
  }
  render() {
    return (
      <MDBDropdown>
        <MDBDropdownToggle caret color="primary">
          {this.state.value === "ruRU" ? "Русский" : "English"}
        </MDBDropdownToggle>
        <MDBDropdownMenu basic >
          <MDBDropdownItem value="enUS" onClick={this.select}>English</MDBDropdownItem>
          <MDBDropdownItem value="ruRU" onClick={this.select}>Русский</MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown>
    );
  }
}