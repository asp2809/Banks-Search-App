import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div``;

const SelectField = props => {
  return (
    <Wrapper {...props}>
      <select onChange={e => props.changeHandler(e.target.value)}>
        <option value="Mumbai">Mumbai</option>
        <option value="Delhi">Delhi</option>
        <option value="Kolkata">Kolkata</option>
        <option value="Hyderabad">Hyderabad</option>
        <option value="Chennai">Chennai</option>
        <option value="Bengaluru">Bengaluru</option>
      </select>
    </Wrapper>
  );
};

export default SelectField;
