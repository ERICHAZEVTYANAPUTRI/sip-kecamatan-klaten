import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";

import EditBarang from "./Auth/Barang/EditBarang";
import TambahBarang from "./Auth/Barang/TambahBarang";
import TblBarang from "./Auth/Barang/TblBarang";
import EditDesa from "./Auth/Desa/EditDesa";
import TambahDesa from "./Auth/Desa/TambahDesa";
import TblDesa from "./Auth/Desa/TblDesa";
import EditKategori from "./Auth/Kategori/EditKategori";
import TambahKategori from "./Auth/Kategori/TambahKategori";
import TblKategori from "./Auth/Kategori/TblKategori";
import DataPengajuan from "./Auth/Pengajuan/DataPengajuan";
import FormPengajuan from "./Auth/Pengajuan/FormPengajuan";
import TblPengajuan from "./Auth/Pengajuan/TblPengajuan";
import EditProfil from "./Auth/Profil/EditProfil";
import Profile from "./Auth/Profil/Profil";
import TambahProfil from "./Auth/Profil/TambahProfil";
import EditRole from "./Auth/Role/EditRole.";
import TambahRole from "./Auth/Role/TambahRole";
import TblRole from "./Auth/Role/TblRole";
import EditRwrt from "./Auth/RT/RW/EDIT";
import Tblrwrt from "./Auth/RT/RW/TABEL";
import Tambahrwrt from "./Auth/RT/RW/TAMBAH";
import EditUser from "./Auth/User/EditUser";
import TambahUser from "./Auth/User/TambahUser";
import TblUser from "./Auth/User/TblUser";
import EditWarga from "./Auth/Warga/EditWarga";
import TambahWarga from "./Auth/Warga/TambahWarga";
import TblWarga from "./Auth/Warga/TblWarga";
import About from "./Componets/About";
import ContactPage from "./Componets/Contact";
import Home from "./Componets/Home";
import Testimonial from "./Componets/Testimonial";
import Work from "./Componets/Work";
import Header from "./Element/Header";
import Sidebar from "./Element/Sidebar";
import Login from "./Sreems/Login";
import Register from "./Sreems/Register";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path="/testimonials" element={<Testimonial />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/header" element={<Header />} />
          {/* Barang routes */}
          <Route path="/barang" element={<TblBarang />} />
          <Route path="/barang/tambah" element={<TambahBarang />} />
          <Route path="/barang/edit/:id" element={<EditBarang />} />
          {/* KATGORI routes */}
          <Route path="/kategori" element={<TblKategori />} />
          <Route path="/kategori/tambah" element={<TambahKategori />} />
          <Route path="/kategori/edit/:id" element={<EditKategori />} />

          {/* WARGA routes */}
          <Route path="/warga" element={<TblWarga />} />
          <Route path="/warga/tambah" element={<TambahWarga />} />
          <Route path="/warga/edit/:id" element={<EditWarga />} />

          {/* DESA routes */}
          <Route path="/desa" element={<TblDesa />} />
          <Route path="/desa/tambah" element={<TambahDesa />} />
          <Route path="/desa/edit/:id" element={<EditDesa />} />

          {/* RW/RT routes */}
          <Route path="/rwrt" element={<Tblrwrt />} />
          <Route path="/rwrt/tambah" element={<Tambahrwrt />} />
          <Route path="/rwrt/edit/:id" element={<EditRwrt />} />

          {/* Role routes */}
          <Route path="/role" element={<TblRole />} />
          <Route path="/role/tambah" element={<TambahRole />} />
          <Route path="/role/edit/:id" element={<EditRole />} />

          {/* Pengajuan routes */}
          <Route path="/pengajuan" element={<TblPengajuan />} />
          <Route path="/pengajuan/tambah" element={<FormPengajuan />} />
          <Route path="/pengajuan/selesai" element={<DataPengajuan />} />
          {/* Profil routes */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/tambah" element={<TambahProfil />} />
          <Route path="/profile/edit/:id" element={<EditProfil />} />
          {/* Redirect to login by default */}
          <Route path="*" element={<Navigate to="/login" />} />

          {/* USER routes */}
          <Route path="/user" element={<TblUser />} />
          <Route path="/user/tambah" element={<TambahUser />} />
          <Route path="/user/edit/:id" element={<EditUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
