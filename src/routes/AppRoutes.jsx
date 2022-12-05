import { Routes, Route } from "react-router-dom"
import RentListPage from "../pages/RentListPage/RentListPage"


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<p>Home</p>} />
            <Route path="/usuarios/crear" element={<p>Registro</p>} />
            <Route path="/usuarios/iniciar-sesion" element={<p>Iniciar sesión</p>} />
            <Route path="/usuarios/cerrar-sesion" element={<p>Cerrar Sesión</p>} />
            <Route path="/usuarios/crear" element={<p>Registro</p>} />
            <Route path="/usuarios/perfil" element={<p> Mi perfil</p>} />
            <Route path="/usuarios/perfil/editar" element={<p> Editar perfil</p>} />
            <Route path="/usuarios/eliminar" element={<p> Eliminar</p>} />
            <Route path="/alquiler/lista" element={<RentListPage />} />
            <Route path="/crear" element={<p>Crear alquiler</p>} />
            <Route path="/detalles/:rent_id" element={<p>Detalles de anuncio</p>} />
            <Route path="/comentario/crear" element={<p> Crear comentario</p>} />
            <Route path="/*" element={<h1>404</h1>} />
        </Routes>
    )
}

export default AppRoutes