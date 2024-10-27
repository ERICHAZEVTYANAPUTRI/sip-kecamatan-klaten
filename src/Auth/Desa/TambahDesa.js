import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../../Element/Header";
import Sidebar from "../../Element/Sidebar";

function TambahDesa() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [desa, setDesa] = useState([]); // Updated state name
  const [validationError, setValidationError] = useState({});

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/desa") // Updated API endpoint
      .then((response) => {
        setDesa(response.data);
      })
      .catch((error) => {
        console.error("Error fetching desa:", error);
      });
  }, []);

  const tambahDesa = async (e) => {
    e.preventDefault();

    const formData = {
      name,
    };

    try {
      const { data } = await axios.post("http://127.0.0.1:8000/api/desa/store", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      Swal.fire({
        icon: "success",
        text: data.message,
      });
      navigate("/desa"); // Updated navigation path
    } catch (error) {
      console.error("Error occurred:", error);

      if (error.response) {
        if (error.response.status === 422) {
          setValidationError(error.response.data.errors);
        } else {
          Swal.fire({
            text: error.response.data.message || "An error occurred",
            icon: "error",
          });
        }
      } else {
        Swal.fire({
          text: "An unknown error occurred",
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
              <div className="col-sm-6">{/* <h1>Tambah Desa</h1> Updated title */}</div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  {/* <li className="breadcrumb-item">
                    <Link to="#">Home</Link>
                  </li> */}
                  {/* <li className="breadcrumb-item active">Tambah Desa</li> Updated breadcrumb */}
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section className="content" style={{ padding: "0 60px" }}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card card-primary">
                  <div className="card-header" style={{ backgroundColor: "#1100BB" }}>
                    <h3 className="card-title" style={{ color: "#ffffff", fontSize: "23px", fontWeight: "bold" }}>
                      Masukkan Data Yang Sesuai
                    </h3>
                  </div>
                  {Object.keys(validationError).length > 0 && (
                    <div className="alert alert-danger">
                      <ul className="mb-0">
                        {Object.entries(validationError).map(([key, value]) => (
                          <li key={key}>{value.join(", ")}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <Form onSubmit={tambahDesa}>
                    <div className="card-body">
                      <Form.Group className="form-group">
                        <Form.Label>Nama Desa</Form.Label> {/* Updated label */}
                        <Form.Control type="text" placeholder="Nama Desa" value={name} onChange={(event) => setName(event.target.value)} required />
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
                          marginRight: "10px",
                        }}
                      >
                        <i className="fas fa-paper-plane"></i>
                        <span>Simpan</span>
                      </Button>
                      <Link
                        className="btn btn-danger"
                        to="/desa" // Updated navigation path
                        style={{
                          backgroundColor: "#FF1E00",
                          borderColor: "#FF1E00",
                          width: "100px",
                          height: "40px",
                          fontSize: "16px",
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

export default TambahDesa; // Updated export statement
