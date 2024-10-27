import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { BsFillPlusCircleFill, BsFillTrash3Fill, BsPencilSquare, BsSearch } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "../../Css/Tabel.css";
import Header from "../../Element/Header";
import Sidebar from "../../Element/Sidebar";

function TblBarang() {
  const [databarang, setDatabarang] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchDatabarang();
  }, []);

  const fetchDatabarang = async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:8000/api/barang");
      setDatabarang(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to fetch data.",
      });
    }
  };

  const handleSearch = useCallback(() => {
    const term = searchTerm.toLowerCase();
    const filtered = databarang.filter(
      (item) => item.id.toString().includes(term) || item.name.toLowerCase().includes(term) || item.kode.toLowerCase().includes(term) || item.merek.toLowerCase().includes(term) || item.stok.toString().includes(term)
    );
    setFilteredData(filtered);
    setCurrentPage(0); // Reset to first page on search
  }, [databarang, searchTerm]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]); // Only include handleSearch as a dependency

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const deletebarang = async (id) => {
    const isConfirm = await Swal.fire({
      title: "Apakah kamu serius?",
      text: "Kamu tidak akan bisa memulihkan data ini lagi!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, HAPUS!",
    }).then((result) => result.isConfirmed);

    if (!isConfirm) {
      return;
    }

    try {
      const { data } = await axios.delete(`http://127.0.0.1:8000/api/barang/destroy/${id}`);
      Swal.fire({
        icon: "success",
        text: data.message,
      });
      fetchDatabarang();
    } catch (error) {
      Swal.fire({
        text: error.response?.data.message || "An error occurred",
        icon: "error",
      });
    }
  };

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const displayedItems = filteredData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <div className="wrapper">
      <Sidebar />
      <Header />
      <div className="content-wrapper" style={{ paddingLeft: "200px", paddingRight: "30px" }}>
        <section className="content-header mb-4">
          <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="m-0" style={{ fontWeight: "bold", fontSize: "32px" }}>
                Data Barang
              </h1>
              <Link
                to="/barang/tambah"
                className="btn btn-success"
                style={{
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <BsFillPlusCircleFill style={{ color: "white", fontSize: "20px", marginRight: "7px" }} />
                Tambah
              </Link>
            </div>
          </div>
        </section>
        <section className="content" style={{ padding: "25px", marginLeft: "30px", marginRight: "-35px" }}>
          <div className="card">
            <div className="card-header border-transparent d-flex justify-content-end align-items-center">
              <div className="search-container d-flex align-items-center">
                <input type="text" className="form-control search-input" placeholder="Cari..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ flex: 1, marginRight: "10px" }} />
                <button
                  className="btn btn-primary search-button"
                  onClick={handleSearch}
                  style={{
                    backgroundColor: "#1E1BA3",
                    borderColor: "#1E1BA3",
                    color: "#FFFFFF",
                    padding: "10px 10px",
                  }}
                >
                  <BsSearch size={20} />
                </button>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-striped table-bordered m-0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>NAMA</th>
                      <th>KATEGORI</th>
                      <th>GAMBAR</th>
                      <th>HARGA</th>
                      <th>STOK</th>
                      <th>KETERANGAN</th>
                      <th>AKSI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedItems.length > 0 ? (
                      displayedItems.map((row, key) => (
                        <tr key={key}>
                          <td style={{ textAlign: "center" }}>{row.id}</td>
                          <td style={{ textAlign: "center" }}>{row.name}</td>
                          <td style={{ textAlign: "center" }}>{row.kategori?.name || "-"}</td>
                          <td style={{ textAlign: "center" }}>
                            {row.gambar ? (
                              <img
                                src={`http://127.0.0.1:8000/storage/${row.gambar}`}
                                alt={row.name}
                                className="table-img"
                                style={{ width: "50px", height: "50px", objectFit: "cover" }} // Adjust size and fit
                              />
                            ) : (
                              "No image"
                            )}
                          </td>
                          <td style={{ textAlign: "center" }}>{row.harga}</td>
                          <td style={{ textAlign: "center" }}>{row.stok}</td>
                          <td style={{ textAlign: "center" }}>{row.keterangan}</td>
                          <td style={{ textAlign: "center" }}>
                            <Link to={`/barang/edit/${row.id}`} className="btn btn-warning btn-xs">
                              <BsPencilSquare size={25} className="icon-pencil" />
                            </Link>{" "}
                            &nbsp;
                            <button className="btn btn-danger btn-xs" onClick={() => deletebarang(row.id)}>
                              <BsFillTrash3Fill size={24} className="icon-trash" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">
                          Belum ada data
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div className="pagination-container mt-4">
                  <ReactPaginate previousLabel={"<<<"} nextLabel={">>>"} pageCount={pageCount} onPageChange={handlePageChange} containerClassName={"pagination"} activeClassName={"active"} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TblBarang;
