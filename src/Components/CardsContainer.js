import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBPagination, MDBPageItem, MDBPageNav } from "mdbreact";
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
        this.goToNextPage = this.goToNextPage.bind(this);
        this.goToPreviousPage = this.goToPreviousPage.bind(this);
        this.goToPage = this.goToPage.bind(this);
    }

    splitCardArray(array, size = 12) {
        let splittedArray = [];
        for (let i = 0; i < Math.ceil(array.length / size); i++) {
            splittedArray[i] = array.slice((i * size), (i * size) + size);
        }
        this.setState({ pagedData: splittedArray })
    }

    goToNextPage() {
        this.setState(prevState => ({ activePage: prevState.activePage + 1 }))
    }
    goToPreviousPage() {
        this.setState(prevState => ({ activePage: prevState.activePage - 1 }))
    }

    goToPage(event) {
        console.log(event.target, event.target.pagenumber, event.target.className);
        /*this.setState({ activePage: event.target.pagenumber })*/
        this.setState({ activePage: +(event.target.text).replace(/\D/g, "") - 1 })
    }

    render() {
        if (this.state.filteredCards.length !== this.props.filteredCards.length) {
            this.setState({ filteredCards: this.props.filteredCards, activePage: 0 }, () => {
                this.splitCardArray(this.state.filteredCards);
            })
        }
        return (
            <React.Fragment>
                <MDBContainer fluid>
                    <MDBRow>
                        {this.state.pagedData[this.state.activePage] !== undefined &&
                            this.state.pagedData[this.state.activePage].map(card =>
                                <Card key={card.id} cardData={card} locale={this.props.locale} />
                            )
                        }
                        <MDBCol size="12">
                            {this.state.pagedData[this.state.activePage] !== undefined &&
                                <Pagination
                                    pages={this.state.pagedData}
                                    activePage={this.state.activePage}
                                    goToNextPage={this.goToNextPage}
                                    goToPreviousPage={this.goToPreviousPage}
                                    goToPage={this.goToPage}
                                />
                            }
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </React.Fragment>
        );
    }
}

class Card extends Component {

    render() {
        return (
            <React.Fragment>
                <MDBCol
                    sm="6"
                    lg="4"
                    xl="3">
                    <img
                        src={`https://art.hearthstonejson.com/v1/render/latest/${this.props.locale}/256x/${this.props.cardData.cardId}.png`}
                        className="img-fluid"
                        alt=""
                    />
                </MDBCol>
            </React.Fragment>
        );
    }
}

class Pagination extends Component {

    render() {
        return (
            <React.Fragment>
                <MDBPagination className="my-5 mx-auto">
                    <MDBPageItem disabled={this.props.activePage === 0}>
                        <MDBPageNav aria-label="Previous" onClick={this.props.goToPreviousPage}>
                            <span aria-hidden="true">Previous</span>
                        </MDBPageNav>
                    </MDBPageItem>
                    {
                        this.props.pages.map((_, pageNumber) => (
                            <MDBPageItem key={pageNumber} active={pageNumber === this.props.activePage}>
                                <MDBPageNav onClick={this.props.goToPage} pagenumber={pageNumber}>
                                    {pageNumber + 1}
                                    {
                                        pageNumber === this.props.activePage &&
                                        <span className="sr-only">(current)</span>
                                    }
                                </MDBPageNav>
                            </MDBPageItem>
                        ))
                    }
                    <MDBPageItem disabled={this.props.activePage === this.props.pages.length - 1}>
                        <MDBPageNav aria-label="Next" onClick={this.props.goToNextPage}>
                            <span aria-hidden="true">Next</span>
                        </MDBPageNav>
                    </MDBPageItem>
                </MDBPagination>
            </React.Fragment>
        )
    }
}