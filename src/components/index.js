import React, { Component } from "react";
import styled from "styled-components";
import { setup } from "axios-cache-adapter";
import { toast } from "react-toastify";

import SelectField from "./SelectField/SelectField";
import SearchField from "./SearchField/SearchField";
import Table from "./Table/Table";

const Wrapper = styled.div`
  color: #000;
  font-family: ${props => props.fontFamily};
  margin: 0 5rem;
  .wrapper {
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      .heading {
        font-size: 1.2rem;
        /* padding: 1rem 0; */
        letter-spacing: 3px;
        font-weight: 200;
        text-transform: uppercase;
      }
    }
    margin: 3rem auto;
  }
  .tables {
    .nav {
      display: flex;
      flex-direction: row;
      .banks,
      .favorites {
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        flex: 1;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 3px;
        font-size: 1.2rem;
        color: #333;
        font-weight: 200;
        padding: 1.5rem;
        cursor: pointer;
      }

      .banks {
        background-color: ${props =>
          props.active === "banks" ? "#00a5a5" : "#fff"};
        color: ${props => (props.active === "banks" ? "#fff" : "#000")};
      }

      .favorites {
        background-color: ${props =>
          props.active === "favorites" ? "#00a5a5" : "#fff"};
        color: ${props => (props.active === "favorites" ? "#fff" : "#000")};
      }

      .banks:hover,
      .favorites:hover {
        transition: all 0.4s;
        background-color: #00a5a5;
        color: #fff;
      }
    }
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
    favBanks: [],
    activeTab: "banks"
  };

  componentDidMount = () => {
    api
      .get("/banks?city=MUMBAI")
      .then(res =>
        this.setState({
          banks: res.data,
          filteredBanks: res.data,
          loading: false,
          favBanks: JSON.parse(localStorage.getItem("favBanks") || "[]")
        })
      )
      .catch(err =>
        toast.error("Something's Not Right!", {
          position: toast.POSITION.TOP_RIGHT
        })
      );
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

  favBanksHandler = ifsc => {
    let fav = JSON.parse(localStorage.getItem("favBanks") || "[]");

    if (fav.filter(el => ifsc === el.ifsc).length > 0) {
      fav = fav.filter(el => ifsc !== el.ifsc);
    } else {
      const bank = this.state.banks.filter(el => el.ifsc === ifsc);
      fav = [...fav, bank[0]];
    }
    fav.forEach(bank => delete bank.favorite);
    localStorage.setItem("favBanks", JSON.stringify(fav));
    this.setState({ favBanks: fav });
  };

  switchTabHandler = tab => {
    this.setState({
      activeTab: tab
    });
  };

  render() {
    const tableToShow =
      this.state.activeTab === "banks" ? (
        <Table
          favBanks={this.state.favBanks}
          banks={this.state.filteredBanks}
          loading={this.state.loading}
          favBanksHandler={this.favBanksHandler}
        />
      ) : (
        <Table
          favBanks={this.state.favBanks}
          banks={this.state.favBanks}
          loading={false}
          favBanksHandler={this.favBanksHandler}
        />
      );
    return (
      <Wrapper active={this.state.activeTab}>
        <div className="wrapper">
          <div className="header">
            <div className="heading">Banks Search App</div>
            <SearchField changeHandler={this.searchChangeHandler} />
          </div>
          <SelectField
            changeHandler={this.selectChangeHandler}
            searchQuery={this.state.selectQuery}
          />
        </div>
        <div className="tables">
          <div className="nav">
            <div
              className="banks"
              onClick={() => this.switchTabHandler("banks")}
              active={this.state.activeTab === "banks"}
            >
              Banks
            </div>
            <div
              className="favorites"
              onClick={() => this.switchTabHandler("favorites")}
              active={this.state.activeTab === "favorites"}
            >
              Favorites
            </div>
          </div>
          {tableToShow}
        </div>
      </Wrapper>
    );
  }
}

Landing.propTypes = {};

Landing.defaultProps = {};

export default Landing;
