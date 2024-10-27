import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFillPlusCircleFill, BsFillTrash3Fill, BsPencilSquare, BsSearch } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "../../Css/Tabel.css";
import Header from "../../Element/Header";
import Sidebar from "../../Element/Sidebar";

function TblDesa() {
  const [datadesa, setDataDesa] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchDataDesa();
  }, []);

  useEffect(() => {
    handleSearch(searchTerm);
  }, [datadesa, searchTerm]);

  const fetchDataDesa = async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:8000/api/desa");
      setDataDesa(data);
      setFilteredData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setDataDesa([]);
      setFilteredData([]);
    }
  };

  const handleSearch = (term) => {
    const filtered = datadesa.filter((item) => item.name.toLowerCase().includes(term.toLowerCase()));
    setFilteredData(filtered);
    setCurrentPage(0); // Reset to first page on search
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const deleteDesa = async (id) => {
    const isConfirm = await Swal.fire({
      title: "Apakah kamu serius?",
      text: "Kamu tidak akan bisa memulihkan data ini lagi!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, HAPUS!",
      cancelButtonText: "Batal",
    }).then((result) => result.isConfirmed);

    if (!isConfirm) return;

    try {
      const { data } = await axios.delete(`http://127.0.0.1:8000/api/desa/destroy/${id}`);
      Swal.fire({ icon: "success", text: data.message });
      fetchDataDesa(); // Refresh data
    } catch (error) {
      Swal.fire({ text: error.response?.data.message || "An error occurred", icon: "error" });
    }
  };

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const displayedItems = filteredData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <div className="wrapper">
      <Sidebar />
      <Header />
      <div className="content-wrapper" style={{ paddingLeft: "230px", paddingRight: "50px" }}>
        <section className="content-header mb-4">
          <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="m-0" style={{ fontWeight: "bold", fontSize: "32px" }}>
                DAFTAR DESA
              </h1>
              <Link to="/desa/tambah" className="btn btn-success" style={{ color: "white", display: "flex", alignItems: "center" }}>
                <BsFillPlusCircleFill style={{ color: "white", fontSize: "20px", marginRight: "7px" }} />
                Tambah Desa
              </Link>
            </div>
          </div>
        </section>
        <section className="content" style={{ padding: "20px", marginLeft: "30px", marginRight: "-35px" }}>
          <div className="card">
            <div className="card-header border-transparent d-flex justify-content-end align-items-center">
              <div className="search-container d-flex align-items-center">
                <input type="text" className="form-control search-input" placeholder="Cari..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ flex: 1, marginRight: "10px", marginTop: "10px" }} />
                <button
                  className="btn btn-primary search-button"
                  onClick={() => handleSearch(searchTerm)} // Use the current search term
                  style={{
                    backgroundColor: "#1E1BA3",
                    borderColor: "#1E1BA3",
                    color: "#FFFFFF",
                    padding: "10px 10px",
                    marginBottom: "2px",
                  }}
                >
                  <BsSearch size={20} />
                </button>
              </div>
            </div>
            <div className="card-body p-30">
              <div className="table-responsive">
                <table className="table table-striped table-bordered m-0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>NAMA</th>
                      <th>AKSI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedItems.length > 0 ? (
                      displayedItems.map((row, index) => (
                        <tr key={row.id}>
                          <td style={{ textAlign: "center" }}>{index + 1 + currentPage * itemsPerPage}</td>
                          <td style={{ textAlign: "center" }}>{row.name || "-"}</td>
                          <td style={{ textAlign: "center" }}>
                            <Link to={`/desa/edit/${row.id}`} className="btn btn-warning btn-xs">
                              <BsPencilSquare size={19} className="icon-pencil" />
                            </Link>{" "}
                            &nbsp;
                            <button className="btn btn-danger btn-xs" onClick={() => deleteDesa(row.id)}>
                              <BsFillTrash3Fill size={19} className="icon-trash" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center">
                          Belum ada data
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div className="pagination-container mt-4" style={{ display: "flex", justifyContent: "center" }}>
                  <ReactPaginate
                    previousLabel={"<<<"}
                    nextLabel={">>>"}
                    pageCount={pageCount}
                    onPageChange={handlePageChange}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TblDesa;
