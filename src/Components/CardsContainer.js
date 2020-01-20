import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import "./CardsContainer.css";

export default class CardsContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activePage: 0,
            filteredCards: {},
            pagedData: []
        }
        this.splitCardArray = this.splitCardArray.bind(this);
    }

    splitCardArray(array, size = 12) {
        let splittedArray = [];
        for (let i = 0; i < Math.ceil(array.length / size); i++) {
            splittedArray[i] = array.slice((i * size), (i * size) + size);
        }
        this.setState({ pagedData: splittedArray })
    }

    render() {
        if (this.state.filteredCards.length !== this.props.filteredCards.length) {
            this.setState({ filteredCards: this.props.filteredCards }, () => {
                this.splitCardArray(this.state.filteredCards);
            })
        }
        return (
            <React.Fragment>
                <MDBContainer fluid>
                    <MDBRow>
                        {this.state.pagedData[this.state.activePage] !== undefined ?
                            this.state.pagedData[this.state.activePage].map(card => (
                                <Card key={card.id} cardData={card} locale={this.props.locale} />
                            )) : ""
                        }
                    </MDBRow>
                </MDBContainer>
            </React.Fragment>
        );
    }
}

class Card extends Component {

    render() {
        const cardData = this.props.cardData;
        return (
            <React.Fragment>
                <MDBCol
                    sm="6"
                    lg="4"
                    xl="3"
                    key={cardData.cardId}>
                    <img
                        src={`https://art.hearthstonejson.com/v1/render/latest/${this.props.locale}/256x/${cardData.cardId}.png`}
                        className="img-fluid"
                        alt=""
                    />
                </MDBCol>
            </React.Fragment>
        );
    }
}