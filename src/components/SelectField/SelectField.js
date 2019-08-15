import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Dropdown, { MenuItem } from "../Dropdown";

const Wrapper = styled.div`
  input[type="submit"] {
    display: none;
  }
`;

const CustomDropdown = styled(Dropdown)`
  padding: 2px 0;
`;
CustomDropdown.propTypes = Dropdown.propTypes;
CustomDropdown.defaultProps = Dropdown.defaultProps;

const CustomDropdownToggle = styled(Dropdown.Toggle)``;
CustomDropdownToggle.propTypes = Dropdown.Toggle.propTypes;
CustomDropdownToggle.defaultProps = Dropdown.Toggle.defaultProps;

const CustomDropdownMenuWrapper = styled(Dropdown.MenuWrapper)``;
CustomDropdownMenuWrapper.propTypes = Dropdown.Menu.propTypes;
CustomDropdownMenuWrapper.defaultProps = Dropdown.Menu.defaultProps;

const CustomDropdownMenu = styled(Dropdown.Menu)``;
CustomDropdownMenu.propTypes = Dropdown.Menu.propTypes;
CustomDropdownMenu.defaultProps = Dropdown.Menu.defaultProps;

const CustomMenuItem = styled(MenuItem)``;
CustomMenuItem.propTypes = MenuItem.propTypes;
CustomMenuItem.defaultProps = MenuItem.defaultProps;

const SelectField = props => {
  const [searchQuery, setSearchQuery] = React.useState("");
  return (
    <Wrapper {...props}>
      <CustomDropdown onSelect={eventKey => {}}>
        <CustomDropdownToggle btnStyle="flat">
          {props.searchQuery}
        </CustomDropdownToggle>
        <CustomDropdownMenuWrapper>
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
            <CustomMenuItem
              eventKey={"Mumbai"}
              onSelect={() => props.changeHandler("Mumbai")}
            >
              Mumbai
            </CustomMenuItem>
            <CustomMenuItem
              eventKey={"Delhi"}
              onSelect={() => props.changeHandler("Delhi")}
            >
              Delhi
            </CustomMenuItem>
            <CustomMenuItem
              eventKey={"Chennai"}
              onSelect={() => props.changeHandler("Chennai")}
            >
              Chennai
            </CustomMenuItem>
            <CustomMenuItem
              eventKey={"Kolkata"}
              onSelect={() => props.changeHandler("Kolkata")}
            >
              Kolkata
            </CustomMenuItem>
            <CustomMenuItem
              eventKey={"Hyderabad"}
              onSelect={() => props.changeHandler("Hyderabad")}
            >
              Hyderabad
            </CustomMenuItem>
            <CustomMenuItem
              eventKey={"Bangaluru"}
              onSelect={() => props.changeHandler("Bengaluru")}
            >
              Bangaluru
            </CustomMenuItem>
            <CustomMenuItem
              eventKey={"Pune"}
              onSelect={() => props.changeHandler("Pune")}
            >
              Pune
            </CustomMenuItem>
          </CustomDropdownMenu>
        </CustomDropdownMenuWrapper>
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
