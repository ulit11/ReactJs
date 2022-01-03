import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import BTable from "react-bootstrap/Table";

import { useTable } from "react-table";

import makeData from "../src/_mocks_/data.json";

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  // Render the UI for your table
  return (
    <BTable striped bordered hover size="sm" {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </BTable>
  );
}

function App() {
  const columns = React.useMemo(
    () => [
      {
        Header: "Jkt - Kdy",
        accessor: "jkt",
      },
      {
        Header: "Tgr - Dadp",
        accessor: "tgr",
      },
      {
        Header: "Bekasi - Glxy",
        accessor: "bks",
      },
      {
        Header: "Category",
        accessor: "ctgr",
      },
      {
        Header: "Product",
        accessor: "prdct",
      },
      {
        Header: "Total stock",
        accessor: "total_stck",
      },
      {
        Header: "Percent",
        accessor: "percnt",
      },
      {
        Header: "Total order",
        accessor: "total_order",
      },
    ],
    []
  );

  const data = [];
  makeData.proformaItem.forEach((item) => {
    const product_stock = JSON.parse(item.product_stock);
    let Jakarta = product_stock.find((i) => i["1"]);
    let Tangerang = product_stock.find((i) => i["3"]);
    let Bekasi = product_stock.find((i) => i["5"]);
    let Jkt = Jakarta ? Jakarta["1"] : 0;
    let Tgr = Tangerang ? Tangerang["3"] : 0;
    let Bks = Bekasi ? Bekasi["5"] : 0;
    let Total_Stock = Jkt + Tgr + Bks;
    const Items = JSON.parse(item.items);
    let Percent = (Items[0].qty / Total_Stock) * 100;

    data.push({
      jkt: Jkt,
      tgr: Tgr,
      bks: Bks,
      ctgr: item.categoryDescription,
      prdct: item.productDescription,
      total_stck: Total_Stock,
      percnt: Percent.toFixed(2) + "%",
      total_order: Items[0].qty,
    });
  });

  return (
    <div>
      <Table columns={columns} data={data} />
    </div>
  );
}

export default App;
