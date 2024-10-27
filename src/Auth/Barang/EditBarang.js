import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function EditBarang() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [kategori, setKategori] = useState("");
  const [gambar, setGambar] = useState(null);
  const [harga, setHarga] = useState("");
  const [stok, setStok] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [validationError, setValidationError] = useState({});

  const fetchBarang = useCallback(async () => {
    try {
      const { data } = await axios.get(`http://127.0.0.1:8000/api/barang/show/${id}`);
      const { name, kode, merek, stok } = data.barang;
      setName(name);
      setKategori(kategori);
      setGambar(gambar);
      setHarga(harga);
      setStok(stok);
      setKeterangan(keterangan);
    } catch (error) {
      Swal.fire({
        text: error.response?.data.message || "An error occurred while fetching data",
        icon: "error",
      });
    }
  }, [id]);

  useEffect(() => {
    fetchBarang();
  }, [fetchBarang]);

  const updateBarang = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("kategori", kategori);
    if (gambar) {
      formData.append("gambar", gambar);
    }
    formData.append("harga", harga);
    formData.append("stok", stok);
    formData.append("keterangan", keterangan);

    try {
      const { data } = await axios.patch(`http://127.0.0.1:8000/api/barang/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Swal.fire({
        icon: "success",
        text: data.message,
      });
      navigate("/barang");
    } catch (error) {
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
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Edit Barang</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="#">Home</Link>
                  </li>
                  <li className="breadcrumb-item active">Edit Barang</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section className="content" style={{ padding: "0 100px" }}>
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
                              <li key={key}>{value[0]}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  <Form id="quickForm" onSubmit={updateBarang}>
                    <div className="card-body">
                      <Form.Group className="form-group">
                        <Form.Label className="left-align-label">Nama</Form.Label>
                        <Form.Control type="text" placeholder="Nama Menu" value={name} onChange={(e) => setName(e.target.value)} />
                      </Form.Group>
                      <Form.Group className="form-group">
                        <Form.Label>Kategori</Form.Label>
                        <Form.Control type="text" placeholder="Kategori Menu" value={kategori} onChange={(e) => setKategori(e.target.value)} />
                      </Form.Group>

                      <Form.Group className="form-group">
                        <Form.Label>Gambar</Form.Label>
                        <Form.Control type="file" onChange={(e) => setGambar(e.target.files[0])} />
                      </Form.Group>
                      <Form.Group className="form-group">
                        <Form.Label>Harga</Form.Label>
                        <Form.Control type="number" placeholder="Harga Menu" value={harga} onChange={(e) => setHarga(e.target.value)} />
                      </Form.Group>
                      <Form.Group className="form-group">
                        <Form.Label>Stok</Form.Label>
                        <Form.Control type="number" placeholder="Stok Menu" value={stok} onChange={(e) => setStok(e.target.value)} />
                      </Form.Group>
                      <Form.Group className="form-group">
                        <Form.Label>Keterangan</Form.Label>
                        <Form.Control type="text" placeholder="Keterangan Menu" value={keterangan} onChange={(e) => setKeterangan(e.target.value)} />
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
                        to={"/barang"}
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

export default EditBarang;
