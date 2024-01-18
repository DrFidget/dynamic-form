import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";

const TableComponent = ({ Data, HandleDeleteRow, HandleUpdateRow }) => {
  const handleDelete = (rowNumber) => {
    HandleDeleteRow(rowNumber);
    // console.log(rowNumber);
  };
  const handleUpdate = (rowNumber) => {
    HandleUpdateRow(rowNumber);
  };
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <td scope="col" className="col-2">
            #
          </td>
          <td scope="col" className="col-6">
            Form Data
          </td>
          <td scope="col" className="col-4">
            operations
          </td>
        </tr>
      </thead>
      <tbody>
        {Data.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
              (
              {item.map((element, key) => (
                <span key={key}> {element.dataValues.value} ,</span>
              ))}
              )
            </td>
            <td className="px-2">
              <div
                className="btn btn-danger"
                onClick={handleDelete.bind(null, index)}
              >
                Delete
              </div>
              <div
                className="mx-2 btn btn-success"
                onClick={handleUpdate.bind(null, index)}
              >
                Update
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableComponent;
