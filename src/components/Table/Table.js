import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import ReactTable from "react-table";
import "react-table/react-table.css";

const TableWrapper = styled.div`
  .rt-thead {
    background-color: #3a3a3a;
    color: #fff;
  }
  .rt-tr {
    padding: 1rem;
  }
`;

const Table = props => {
  return (
    <TableWrapper {...props}>
      <ReactTable
        data={props.banks}
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
          }
        ]}
        defaultPageSize={10}
        className="-striped -highlight"
        showPaginationBottom
        loading={props.loading}
      />
    </TableWrapper>
  );
};

Table.propTypes = {
  loading: PropTypes.bool.isRequired,
  banks: PropTypes.array.isRequired
};

Table.defaultProps = {};

export default Table;
