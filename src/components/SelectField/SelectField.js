import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Dropdown, { MenuItem } from "../Dropdown";

const Wrapper = styled.div`
  form {
    margin: 1rem;
    input {
      padding: 0.7rem 1rem;
      border: 1px solid #ccc;
      border-radius: 0.5rem;
      outline: none;
    }
  }
  input[type="submit"] {
    display: none;
  }
`;

const CustomDropdown = styled(Dropdown)`
  width: 100%;
  padding: 2px 0;
`;
CustomDropdown.propTypes = Dropdown.propTypes;
CustomDropdown.defaultProps = Dropdown.defaultProps;

const CustomDropdownMenu = styled(Dropdown.Menu)`
  width: 100%;
  padding: 0px;
`;
CustomDropdownMenu.propTypes = Dropdown.Menu.propTypes;
CustomDropdownMenu.defaultProps = Dropdown.Menu.defaultProps;

const Cities = ["Mumbai", "Delhi", "Chennai", "Hyderabad", "Pune", "Bangalore"];

const SelectField = props => {
  const [searchQuery, setSearchQuery] = React.useState("");
  return (
    <Wrapper {...props}>
      <CustomDropdown onSelect={eventKey => {}}>
        <Dropdown.Toggle btnStyle="flat">{props.searchQuery}</Dropdown.Toggle>
        <Dropdown.MenuWrapper>
          <div className="input-icon-group dropdown-menu-filter">
            <form
              onSubmit={e => {
                e.preventDefault();
                props.changeHandler(searchQuery);
              }}
            >
              <input
                className="form-control"
                type="text"
                placeholder="Search"
                onChange={e => setSearchQuery(e.target.value)}
              />
              <input type="submit" />
            </form>
          </div>
          <CustomDropdownMenu>
            {Cities.map(city => (
              <MenuItem
                key={city}
                eventKey={city}
                onSelect={() => props.changeHandler(city)}
              >
                {city}
              </MenuItem>
            ))}
          </CustomDropdownMenu>
        </Dropdown.MenuWrapper>
      </CustomDropdown>
    </Wrapper>
  );
};

SelectField.propTypes = {
  changeHandler: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired
};

SelectField.defaultProps = {};

export default SelectField;
