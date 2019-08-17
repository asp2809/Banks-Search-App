import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import ReactTable from "react-table";
import "react-table/react-table.css";
import { IoIosStarOutline } from "react-icons/io";
import { IoIosStar } from "react-icons/io";

const TableWrapper = styled.div`
  .rt-thead {
    background-color: #3a3a3a;
    color: #fff;
  }
  .rt-tr {
    padding: 1rem;
  }
  .tip {
    text-align: center;
  }
  .favorite {
    text-align: center;
  }
`;
const Table = props => {
  const processData = () => {
    let bankDetails = [...props.banks];
    bankDetails.forEach(bank => {
      if (props.favBanks.filter(el => el.ifsc === bank.ifsc).length > 0) {
        bank["favorite"] = (
          <div
            className="favorite"
            onClick={() => props.favBanksHandler(bank.ifsc)}
          >
            <IoIosStar />
          </div>
        );
      } else {
        bank["favorite"] = (
          <div
            className="favorite"
            onClick={() => props.favBanksHandler(bank.ifsc)}
          >
            <IoIosStarOutline />
          </div>
        );
      }
    });
    return bankDetails;
  };
  return (
    <TableWrapper {...props}>
      <ReactTable
        data={processData()}
        columns={[
          {
            Header: "IFSC",
            accessor: "ifsc"
          },
          {
            Header: "Bank_ID",
            accessor: "bank_id"
          },
          {
            Header: "Name",
            accessor: "bank_name"
          },
          {
            Header: "Address",
            accessor: "address"
          },
          {
            Header: "Branch",
            accessor: "branch"
          },
          {
            Header: "City",
            accessor: "city"
          },
          {
            Header: "District",
            accessor: "district"
          },
          {
            Header: "State",
            accessor: "state"
          },
          {
            Header: "Favorite",
            accessor: "favorite"
          }
        ]}
        defaultPageSize={10}
        className="-striped -highlight"
        showPaginationBottom
        loading={props.loading}
      />
      <div className="tip">
        <em>Click on a row to add it to favBanks</em>
      </div>
    </TableWrapper>
  );
};

Table.propTypes = {
  loading: PropTypes.bool.isRequired,
  banks: PropTypes.array.isRequired
};

Table.defaultProps = {};

export default Table;
