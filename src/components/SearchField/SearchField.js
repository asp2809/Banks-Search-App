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
  input::-webkit-search-decoration,
  input::-webkit-search-cancel-button {
    display: none;
  }

  input[type="search"] {
    background: url("https://static.tumblr.com/ftv85bp/MIXmud4tx/search-icon.png")
      no-repeat 10px 50%;
    border: solid 1px #ccc;
    padding: 9px 10px 9px 32px;
    width: 10rem;

    -webkit-border-radius: 10em;
    -moz-border-radius: 10em;
    border-radius: 10em;

    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    transition: all 0.5s;
  }
  input[type="search"]:focus {
    width: 20rem;
    background-color: #fff;
    border-color: #66cc75;

    -webkit-box-shadow: 0 0 5px rgba(109, 207, 246, 0.5);
    -moz-box-shadow: 0 0 5px rgba(109, 207, 246, 0.5);
    box-shadow: 0 0 5px rgba(109, 207, 246, 0.5);
  }

  input:-moz-placeholder {
    color: #999;
  }
  input::-webkit-input-placeholder {
    color: #999;
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

export default SearchField;
