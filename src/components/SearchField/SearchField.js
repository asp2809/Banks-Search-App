import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  input {
    outline: none;
  }
  input[type="search"] {
    -webkit-appearance: textfield;
    -webkit-box-sizing: content-box;
    font-family: inherit;
    font-size: 100%;
  }

  input[type="search"] {
    background: url("https://static.tumblr.com/ftv85bp/MIXmud4tx/search-icon.png")
      no-repeat 9.5px 50%;
    border: solid 1px #ccc;
    background-color: #eee;
    padding: 9px 10px 9px 32px;
    border-radius: 50%;
    transition: all 0.5s;
    width: 1.6rem;
    height: 1.6rem;
    padding-left: 10px;
    color: transparent;
    cursor: pointer;
  }
  input[type="search"]:hover {
    background-color: #fff;
  }
  input[type="search"]:focus {
    border-color: #66cc75;
    border-radius: 10em;
    box-shadow: 0 0 5px rgba(109, 207, 246, 0.5);
    width: 130px;
    padding-left: 40px;
    color: #000;
    background-color: #fff;
    cursor: auto;
  }
  input[type="search"]::placeholder {
    display: flex;
    align-items: flex-start;
    text-transform: uppercase;
    font-size: 1.2rem;
    letter-spacing: 3px;
  }
`;

const SearchField = props => {
  return (
    <Wrapper {...props}>
      <input
        type="search"
        onChange={e => props.changeHandler(e.target.value)}
        placeholder="Search"
      />
    </Wrapper>
  );
};

SearchField.propTypes = {
  changeHandler: PropTypes.func.isRequired,
  searchQuery: PropTypes.string
};

export default SearchField;
