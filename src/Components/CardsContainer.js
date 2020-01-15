import React, { Component } from "react";

export default class CardsContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render() {
      return (
        <React.Fragment>
            {JSON.stringify(this.props.cardsData["Basic"][100])}
        </React.Fragment>
      );
    }
}
