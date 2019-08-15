import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { setup } from "axios-cache-adapter";

import SelectField from "./SelectField/SelectField";
import SearchField from "./SearchField/SearchField";
import Table from "./Table/Table";

const Wrapper = styled.div`
  color: #000;
  font-family: ${props => props.fontFamily};
  div {
    display: flex;
    justify-content: space-evenly;
    margin: 3rem auto;
  }
`;

const api = setup({
  baseURL: "https://vast-shore-74260.herokuapp.com",
  cache: {
    maxAge: 15 * 60 * 1000
  }
});

class Landing extends Component {
  state = {
    banks: [],
    filteredBanks: []
  };

  componentDidMount = () => {
    api
      .get("/banks?city=MUMBAI")
      .then(res => this.setState({ banks: res.data, filteredBanks: res.data }))
      .catch(err => console.log(err));
  };

  queryCheckHandler = (query, bank) => {
    if (
      bank.ifsc.toLowerCase().startsWith(query) ||
      String(bank.bank_id).startsWith(query) ||
      bank.branch.toLowerCase().startsWith(query) ||
      bank.address.toLowerCase().startsWith(query) ||
      bank.city.toLowerCase().startsWith(query) ||
      bank.district.toLowerCase().startsWith(query) ||
      bank.state.toLowerCase().startsWith(query) ||
      bank.bank_name.toLowerCase().startsWith(query)
    ) {
      return true;
    }
    return false;
  };

  searchChangeHandler = query => {
    const lowerCaseQuery = query.toLowerCase();
    const filteredBanks = this.state.banks.filter(bank =>
      this.queryCheckHandler(lowerCaseQuery, bank)
    );
    this.setState({ filteredBanks: filteredBanks });
  };

  selectChangeHandler = option => {
    api
      .get(`/banks?city=${option.toUpperCase()}`)
      .then(res => this.setState({ banks: res.data, filteredBanks: res.data }))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Wrapper>
        <div>
          <SelectField changeHandler={this.selectChangeHandler} />
          <SearchField changeHandler={this.searchChangeHandler} />
        </div>
        <Table banks={this.state.filteredBanks} />
      </Wrapper>
    );
  }
}

Landing.propTypes = {};

Landing.defaultProps = {};

export default Landing;
