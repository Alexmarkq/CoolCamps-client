import { Routes, Route } from "react-router-dom"
import RentDetailsPage from "../pages/RentDetailsPage/RentDetailsPage"
import RentListPage from "../pages/RentListPage/RentListPage"
import HomePage from "../pages/HomePage/HomePage"
import NewRentPage from "../pages/NewRentPage/NewRentPage"



const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/lista" element={<RentListPage />} />
            <Route path="/detalles/:rent_id" element={<RentDetailsPage />} />
            <Route path="/crear" element={<NewRentPage />} />
            <Route path="/iniciar-sesion" element={<p>Iniciar sesión</p>} />
            <Route path="/cerrar-sesion" element={<p>Cerrar Sesión</p>} />
            <Route path="/registro" element={<p>Registro</p>} />
            <Route path="/perfil" element={<p> Mi perfil</p>} />
            <Route path="/perfil/editar" element={<p> Editar perfil</p>} />
            <Route path="/crear" element={<p>Crear alquiler</p>} />
            <Route path="/comentario/crear" element={<p> Crear comentario</p>} />
            <Route path="/*" element={<h1>404</h1>} />
        </Routes>
    )
}

export default AppRoutes