import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import "./CardsContainer.css";

export default class CardsContainer extends Component {


    render() {
        return (
            <React.Fragment>
                <MDBContainer fluid>
                    <MDBRow>
                        {this.props.cardsData ?
                            this.props.cardsData.map(card => (
                                <MDBCol sm="4" key={card.cardId}>
                                    <img
                                        src={card.img.replace("http", "https")}
                                        className="img-fluid"
                                        alt=""
                                    />
                                </MDBCol>
                            )).filter((item, key)=>key<=12) : ""
                        }
                    </MDBRow>
                </MDBContainer>
            </React.Fragment>
        );
    }
}