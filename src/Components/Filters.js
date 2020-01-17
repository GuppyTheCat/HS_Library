import React, { Component } from "react";
import * as FiltersLocales from "./json/FiltersLocales";
import * as FiltersList from "./json/FiltersList";

export default class Filters extends Component {

    render() {
        return (
            <React.Fragment>
                {FiltersList.map(filter => (
                    <Filter
                        key={filter.id}
                        title={filter.title}
                        list={filter.list}
                        locale={this.props.locale}
                        handleOptionChange={this.props.handleOptionChange}
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
                <h4>{FiltersLocales["title"][this.props.locale][this.props.title]}</h4>
                <select className="browser-default custom-select">
                    <option
                        key={0}
                        title={this.props.title}
                        value=""
                        onClick={this.props.handleOptionChange}>
                        {FiltersLocales["optionTitle"][this.props.locale][this.props.title]}
                    </option>
                    {
                        this.props.list.map((option, key) => (
                            <option
                                key={key + 1}
                                title={this.props.title}
                                value={option}
                                onClick={this.props.handleOptionChange}>
                                {FiltersLocales[this.props.title][this.props.locale][option]}
                            </option>
                        ))
                    }
                </select>
            </React.Fragment>
        );
    }
}