import React, { Component } from "react";
import styled from "styled-components";
import { setup } from "axios-cache-adapter";

import SelectField from "./SelectField/SelectField";
import SearchField from "./SearchField/SearchField";
import Table from "./Table/Table";

const Wrapper = styled.div`
  color: #000;
  font-family: ${props => props.fontFamily};
  margin: 0 5rem;
  .wrapper {
    display: flex;
    justify-content: space-between;
    margin: 3rem auto;
  }
`;

const api = setup({
  baseURL: "https://vast-shore-74260.herokuapp.com",
  cache: {
    maxAge: 15 * 60 * 1000,
    exclude: {
      query: false
    }
  }
});

class Landing extends Component {
  state = {
    banks: [],
    filteredBanks: [],
    selectQuery: "MUMBAI",
    loading: true,
    favBanks: []
  };

  componentDidMount = () => {
    api
      .get("/banks?city=MUMBAI")
      .then(res =>
        this.setState({
          banks: res.data,
          filteredBanks: res.data,
          loading: false,
          favBanks: []
        })
      )
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
    this.setState({ selectQuery: option.toUpperCase(), loading: true });
    api
      .get(`/banks?city=${option.toUpperCase()}`)
      .then(res =>
        this.setState({
          banks: res.data,
          filteredBanks: res.data,
          loading: false
        })
      )
      .catch(err => console.log(err));
  };

  favBanksHandler = bank => {
    let fav = localStorage.getItem("favBanks")
      ? localStorage.getItem("favBanks").split(",")
      : [];

    console.log(fav);
    if (fav.length !== 0) {
      fav.forEach((el, index, arr) => (arr[index] = JSON.parse(el)));
    }
    if (fav.filter(el => bank.ifsc === el.ifsc).length > 0) {
      fav = fav.filter(el => bank.ifsc !== el.ifsc);
    } else {
      fav = [...fav, bank];
    }
    if (fav.length !== 0) {
      fav.forEach((el, index, arr) => (arr[index] = JSON.stringify(el)));
    }
    // localStorage.setItem("favBanks", fav.toString());
    this.setState({ favBanks: fav });
  };

  render() {
    return (
      <Wrapper>
        <div className="wrapper">
          <SelectField
            changeHandler={this.selectChangeHandler}
            searchQuery={this.state.selectQuery}
          />
          <SearchField changeHandler={this.searchChangeHandler} />
        </div>
        <Table
          favBanks={this.state.favBanks}
          banks={this.state.filteredBanks}
          loading={this.state.loading}
          favBanksHandler={this.favBanksHandler}
        />
      </Wrapper>
    );
  }
}

Landing.propTypes = {};

Landing.defaultProps = {};

export default Landing;
