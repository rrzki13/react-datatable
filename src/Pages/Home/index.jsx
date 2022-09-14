import React, { useState } from "react";
import Navbar from "../../Layouts/Navbar";
import { users } from "../../Services/Data/user";
import { DataTableLte } from "../../Utils/Datatable-lte";

const Home = () => {
  const [id, setId] = useState("0");

  const tableHeader = [
    {
      title: "No",
      key: "_id",
    },
    {
      title: "Name",
      key: "name",
      searchable: true
    },
    {
      title: "Number",
      key: "number",
      searchable: true
    },
    {
      title: "Username",
      key: "username",
      searchable: true
    },
    {
      title: "Created Date",
      key: "created_date",
      searchable: true
    },
    {
      title: "Action",
      render: (row, index) => {
        return (
          <>
            <button className="btn btn-warning" onClick={() => setId("updated id : " + row._id)}>
              update
            </button>
            <button className="btn btn-danger mx-3" onClick={() => setId("deleted id : " + row._id)}>delete</button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <div className="row">
          <div className="col-12">
            <h3>React Datatable with {id}</h3>
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
              necessitatibus esse dolores optio qui omnis vel minus numquam
              sequi. Quibusdam blanditiis eligendi maxime modi dolor aspernatur
              veritatis eius animi reiciendis!
            </span>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <DataTableLte header={tableHeader} body={users} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
