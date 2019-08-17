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
      border-radius: 2rem;
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

const CustomDropdownToggle = styled(Dropdown.Toggle)`
  width: 100%;
`;
CustomDropdownToggle.propTypes = Dropdown.Toggle.propTypes;
CustomDropdownToggle.defaultProps = Dropdown.Toggle.defaultProps;

const CustomDropdownMenu = styled(Dropdown.Menu)`
  width: 100%;
  padding: 0px;
`;
CustomDropdownMenu.propTypes = Dropdown.Menu.propTypes;
CustomDropdownMenu.defaultProps = Dropdown.Menu.defaultProps;

const SelectField = props => {
  const [searchQuery, setSearchQuery] = React.useState("");
  return (
    <Wrapper {...props}>
      <CustomDropdown onSelect={eventKey => {}}>
        <CustomDropdownToggle btnStyle="flat">
          {props.searchQuery}
        </CustomDropdownToggle>
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
            <MenuItem
              eventKey={"Mumbai"}
              onSelect={() => props.changeHandler("Mumbai")}
            >
              Mumbai
            </MenuItem>
            <MenuItem
              eventKey={"Delhi"}
              onSelect={() => props.changeHandler("Delhi")}
            >
              Delhi
            </MenuItem>
            <MenuItem
              eventKey={"Chennai"}
              onSelect={() => props.changeHandler("Chennai")}
            >
              Chennai
            </MenuItem>
            <MenuItem
              eventKey={"Kolkata"}
              onSelect={() => props.changeHandler("Kolkata")}
            >
              Kolkata
            </MenuItem>
            <MenuItem
              eventKey={"Hyderabad"}
              onSelect={() => props.changeHandler("Hyderabad")}
            >
              Hyderabad
            </MenuItem>
            <MenuItem
              eventKey={"Bangaluru"}
              onSelect={() => props.changeHandler("Bengaluru")}
            >
              Bangaluru
            </MenuItem>
            <MenuItem
              eventKey={"Pune"}
              onSelect={() => props.changeHandler("Pune")}
            >
              Pune
            </MenuItem>
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
