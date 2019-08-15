import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const TableWrapper = styled.div`
  table {
    thead {
      color: #fff;
      background-color: #313131;
    }
    tbody {
      font-weight: 400;
      font-size: 1.4rem;
    }
    th,
    td {
      padding: 15px;
      text-align: left;
      max-width: 20rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

const Table = props => {
  return (
    <TableWrapper {...props}>
      <table>
        <thead>
          <tr>
            <th>IFSC</th>
            <th>Bank_ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Branch</th>
            <th>City</th>
            <th>District</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          {props.banks.map(bank => {
            return (
              <tr key={bank.ifsc}>
                <th>{bank.ifsc}</th>
                <th>{bank.bank_id}</th>
                <th>{bank.bank_name}</th>
                <th>{bank.address}</th>
                <th>{bank.branch}</th>
                <th>{bank.city}</th>
                <th>{bank.district}</th>
                <th>{bank.state}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </TableWrapper>
  );
};

export default Table;
