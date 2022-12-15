import { Routes, Route } from "react-router-dom"
import RentDetailsPage from "../pages/RentDetailsPage/RentDetailsPage"
import RentListPage from "../pages/RentListPage/RentListPage"
import HomePage from "../pages/HomePage/HomePage"
import ProfilePage from "../pages/ProfilePage/ProfilePage"
import PrivateRoute from "./PrivateRoute"
import SignupForm from "../components/SignupForm/SignupForm"
import NotFoundPage from "../pages/HomePage/NotFoundPage/NotFoundPage"



const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/lista" element={<RentListPage />} />
            <Route path="/detalles/:rent_id" element={<RentDetailsPage />} />
            <Route path="/registro" element={<SignupForm />} />


            <Route element={<PrivateRoute />}>
                <Route path="/perfil" element={<ProfilePage />} />
            </Route>

            <Route path="/*" element={<NotFoundPage />} />
        </Routes>
    )
}

export default AppRoutes