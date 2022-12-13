import { Routes, Route } from "react-router-dom"
import RentDetailsPage from "../pages/RentDetailsPage/RentDetailsPage"
import RentListPage from "../pages/RentListPage/RentListPage"
import HomePage from "../pages/HomePage/HomePage"
import NewRentPage from "../pages/NewRentPage/NewRentPage"
import SignupPage from "../pages/SignupPage/SignupPage"
import LoginPage from "../pages/LoginPage/LoginPage"
import ProfilePage from "../pages/ProfilePage/ProfilePage"
import PrivateRoute from "./PrivateRoute"
import NewReviewPage from "../pages/NewRentPage/NewRentPage"



const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/lista" element={<RentListPage />} />
            <Route path="/crear" element={<NewRentPage />} />
            <Route path="/detalles/:rent_id" element={<RentDetailsPage />} />
            <Route path="/iniciar-sesion" element={<LoginPage />} />
            <Route path="/cerrar-sesion" element={<p>Cerrar Sesión</p>} />
            <Route path="/registro" element={<SignupPage />} />

            <Route element={<PrivateRoute />}>
                <Route path="/perfil" element={<ProfilePage />} />
                <Route path="/comentario/crear/:rent_id" element={<NewReviewPage />} />
                <Route path="/comentario/detalles/:rent_id" element={<RentDetailsPage />} />
            </Route>

            <Route path="/*" element={<h1>404</h1>} />
        </Routes>
    )
}

export default AppRoutes