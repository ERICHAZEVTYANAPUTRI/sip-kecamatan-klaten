import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function TambahBarang() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [kategori, setKategori] = useState([]);
  const [kategoriId, setKategoriId] = useState("");
  const [gambar, setGambar] = useState(null);
  const [harga, setHarga] = useState("");
  const [stok, setStok] = useState("");
  const [keterangan, setKeterangan] = useState("");

  const [validationError, setValidationError] = useState({});

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/kategori")
      .then((response) => {
        setKategori(response.data);
      })
      .catch((error) => {
        console.error("Error fetching role:", error);
      });
  }, []);
  const tambahBarang = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("kategori_id", kategoriId);
    if (gambar) {
      formData.append("gambar", gambar);
    }
    formData.append("harga", harga);
    formData.append("stok", stok);
    formData.append("keterangan", keterangan);

    try {
      const { data } = await axios.post("http://127.0.0.1:8000/api/barang/store", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Swal.fire({
        icon: "success",
        text: "Berhasil Menambahkan Data Menu",
      });
      navigate("/barang");
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
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Tambah Barang</h1> {/* Added content here */}
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="#">Home</Link>
                  </li>
                  <li className="breadcrumb-item active">Tambah Barang</li>
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
                  <div className="card-header" style={{ backgroundColor: "#1100BB", display: "flex", alignItems: "left", justifyContent: "left" }}>
                    <h3 className="card-title" style={{ color: "#ffffff", fontSize: "23px", fontWeight: "bold" }}>
                      Masukkan Data Yang Sesuai
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
                  <Form id="quickForm" onSubmit={tambahBarang}>
                    <div className="card-body">
                      <Form.Group className="form-group">
                        <Form.Label className="left-align-label">Nama</Form.Label>
                        <Form.Control type="text" placeholder="Nama Menu" value={name} onChange={(e) => setName(e.target.value)} />
                      </Form.Group>
                      <Form.Group className="form-group flex-1">
                        <Form.Label>Kategori</Form.Label>
                        <select
                          className="form-control"
                          value={kategoriId} // Assuming you have a state variable for kategori
                          onChange={(event) => {
                            setKategoriId(event.target.value); // Assuming a function to set kategori
                          }}
                        >
                          <option value="" hidden>
                            --Pilih Kategori--
                          </option>
                          {kategori.map((kategori) => (
                            <option key={kategori.id} value={kategori.id}>
                              {kategori.name}
                            </option>
                          ))}
                        </select>
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
                      </Button>{" "}
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

export default TambahBarang;
