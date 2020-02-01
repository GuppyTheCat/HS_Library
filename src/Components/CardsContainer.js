import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBPagination, MDBPageItem, MDBPageNav } from "mdbreact";
import "./CardsContainer.css";

export default class CardsContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activePage: 0,
            pagedData: []
        }
    }

    splitCardArray = (array, size = 12) => {
        let splittedArray = [];
        for (let i = 0; i < Math.ceil(array.length / size); i++) {
            splittedArray[i] = array.slice((i * size), (i * size) + size);
        }
        this.setState({ pagedData: splittedArray })
    }

    goToNextPage = () => {
        this.setState(prevState => ({ activePage: prevState.activePage + 1 }))
    }
    goToPreviousPage = () => {
        this.setState(prevState => ({ activePage: prevState.activePage - 1 }))
    }

    goToPage = (event) => {
        this.setState({ activePage: event.currentTarget.getAttribute('pagenumber') })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.filteredCards.length !== this.props.filteredCards.length) {
            this.setState({ activePage: 0 }, () => {
                this.splitCardArray(this.props.filteredCards);
            })
        }
    }

    render() {
        const { locale } = this.props;
        const { pagedData, activePage } = this.state;

        return (
            <React.Fragment>
                <MDBContainer fluid>
                    <MDBRow>
                        {pagedData[activePage] &&
                            pagedData[activePage].map(card =>
                                <Card key={card.cardId} cardData={card} locale={locale} />
                            )
                        }
                        <MDBCol size="12">
                            {pagedData[activePage] &&
                                <Pagination
                                    pages={pagedData}
                                    activePage={activePage}
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
    constructor(props) {
        super(props)

        this.state = {
            cardData: this.props.cardData
        }
    }

    componentWillUnmount() {
        this.setState({ cardData: {} })
    }

    render() {
        const { locale } = this.props;
        const { cardData } = this.state;

        return (
            <React.Fragment>
                <MDBCol
                    sm="6"
                    lg="4"
                    xl="3">
                    <img
                        src={`https://art.hearthstonejson.com/v1/render/latest/${locale}/256x/${cardData.cardId}.png`}
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
        const { pages, activePage, goToPage, goToNextPage, goToPreviousPage } = this.props;

        return (
            <React.Fragment>
                <MDBPagination className="my-5 mx-auto">
                    <MDBPageItem disabled={activePage === 0}>
                        <MDBPageNav aria-label="Previous" onClick={goToPreviousPage}>
                            <span aria-hidden="true">Previous</span>
                        </MDBPageNav>
                    </MDBPageItem>
                    {
                        pages.map((_, pageNumber) => (
                            <MDBPageItem key={pageNumber} active={pageNumber === activePage}>
                                <MDBPageNav pagenumber={pageNumber} onClick={goToPage}>
                                    {pageNumber + 1}
                                    {
                                        pageNumber === activePage &&
                                        <span className="sr-only">(current)</span>
                                    }
                                </MDBPageNav>
                            </MDBPageItem>
                        ))
                    }
                    <MDBPageItem disabled={activePage === pages.length - 1}>
                        <MDBPageNav aria-label="Next" onClick={goToNextPage}>
                            <span aria-hidden="true">Next</span>
                        </MDBPageNav>
                    </MDBPageItem>
                </MDBPagination>
            </React.Fragment>
        )
    }
}