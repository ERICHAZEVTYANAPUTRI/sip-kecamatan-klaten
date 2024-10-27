import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../../Element/Header";
import Sidebar from "../../Element/Sidebar";

function EditDesa() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [desa, setDesa] = useState([]); // Updated state name
  const [validationError, setValidationError] = useState({});

  useEffect(() => {
    fetchDataDesa();
    fetchDesa(); // Updated function name
  }, []);

  const fetchDataDesa = async () => {
    try {
      const { data } = await axios.get(`http://127.0.0.1:8000/api/desa/show/${id}`); // Updated endpoint
      const { name } = data.desa; // Updated data reference
      setName(name);
    } catch ({ response: { data } }) {
      Swal.fire({
        text: data.message,
        icon: "error",
      });
    }
  };

  const fetchDesa = async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:8000/api/desa"); // Updated endpoint
      setDesa(data);
    } catch ({ response: { data } }) {
      Swal.fire({
        text: data.message,
        icon: "error",
      });
    }
  };

  const updateDesa = async (e) => {
    e.preventDefault();

    const formData = {
      name,
    };

    try {
      const { data } = await axios.patch(`http://127.0.0.1:8000/api/desa/update/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      Swal.fire({
        icon: "success",
        text: data.message,
      });
      navigate("/desa"); // Updated navigation path
    } catch ({ response }) {
      if (response.status === 422) {
        setValidationError(response.data.errors);
      } else {
        Swal.fire({
          text: response.data.message,
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="wrapper">
      <Sidebar />
      <Header />
      <div className="content-wrapper" style={{ paddingLeft: "230px", paddingRight: "50px" }}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">{/* <h1>Edit Desa</h1> Updated title */}</div>
              <div className="col-sm-5">
                <ol className="breadcrumb float-sm-right">
                  {/* <li className="breadcrumb-item">
                    <Link to="#">Home</Link>
                  </li> */}
                  {/* <li className="breadcrumb-item active">Edit Desa</li>  */}
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section className="content" style={{ padding: "0 35px" }}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card card-primary">
                  <div className="card-header" style={{ backgroundColor: "#1100BB" }}>
                    <h3 className="card-title" style={{ color: "#ffffff", fontSize: "23px", fontWeight: "bold" }}>
                      Edit Data Yang Sesuai
                    </h3>
                  </div>
                  {Object.keys(validationError).length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {Object.entries(validationError).map(([key, value]) => (
                              <li key={key}>{value}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  <Form id="quickForm" onSubmit={updateDesa}>
                    {" "}
                    {/* Updated form submission */}
                    <div className="card-body">
                      <Form.Group className="form-group">
                        <Form.Label>Nama Desa</Form.Label> {/* Updated label */}
                        <Form.Control type="text" placeholder="Nama Desa" value={name} onChange={(event) => setName(event.target.value)} />
                      </Form.Group>
                    </div>
                    <div className="card-footer" style={{ display: "flex", justifyContent: "flex-end" }}>
                      <Button
                        className="btn btn-primary"
                        type="submit"
                        style={{
                          backgroundColor: "#008000",
                          borderColor: "#008000",
                          width: "100px",
                          height: "40px",
                          fontSize: "16px",
                          padding: "0",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          textAlign: "center",
                          gap: "4px",
                        }}
                      >
                        <i className="fas fa-paper-plane"></i>
                        <span>Simpan</span>
                      </Button>
                      <Link
                        className="btn btn-danger"
                        to={"/desa"} // Updated navigation path
                        style={{
                          backgroundColor: "#FF1E00",
                          borderColor: "#FF1E00",
                          width: "100px",
                          height: "40px",
                          fontSize: "16px",
                          padding: "0",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          textAlign: "center",
                          gap: "4px",
                        }}
                      >
                        <i className="fas fa-window-close"></i>
                        <span>Batal</span>
                      </Link>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default EditDesa; // Updated export statement
