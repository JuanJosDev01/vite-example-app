import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Lista } from "./pages/lista";
import { Ficha } from "./pages/ficha";
import { Login } from "./pages/admin/auth/login";
import AdminLayout from "./components/admin/AdminLayout";
import HongosAdmin from "./pages/admin/hongos";
import UsuariosAdmin from "./pages/admin/usuarios";
import CrearHongo from "./pages/admin/crear-hongo";
import EditarHongo from "./pages/admin/editar-hongo";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<HongosAdmin />} />
          <Route path="hongos" element={<HongosAdmin />} />
          <Route path="hongos/crear" element={<CrearHongo />} />
          <Route path="hongos/editar/:id" element={<EditarHongo />} />
          <Route path="usuarios" element={<UsuariosAdmin />} />
        </Route>
        <Route path="/ficha/:id" element={<Ficha />} />
        <Route path="/" index element={<Lista />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;