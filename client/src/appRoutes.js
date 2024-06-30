import { BrowserRouter, Route, Routes } from "react-router-dom"
import Page404 from "./generalComps/page404";
import Login from "./generalComps/login/login";
import NavBar from "./generalComps/navBar/navBar";
import SendComplaint from "./compsAdmin/complaint/sendComplaint";
import AllComplaints from "./compsAdmin/complaint/allComplaints";
import SingleComlaint from "./compsAdmin/complaint/singleComlaint";
import { adminRoutes } from './compsAdmin/adminRoutes';
import AddUser from "./compsUser/addUser/addUser";
import HomePage from "./generalComps/homePage/homePage";
import TypeUser from "./compsUser/register/typeUser";
import HomePageBuilding from "./compsUser/homePageBuilding/homePageBuilding";
import Register from "./compsUser/register/register";
import Regions from "./compsUser/profile/region";
import AllExpenses from "./compsAdmin/expenses/allExpenses";
import UpdateComplaint from "./compsAdmin/complaint/updateComplaint";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/admin/*" element={<NavBar />} />
                <Route path="/user/*" element={<NavBar />} />
                <Route path="/*" element={<NavBar />} />
                <Route path="/" element={<HomePage />} />
            </Routes>
            <Routes>
                {/* <Route path="/*" element={<Page404 />} /> */}
                <Route path="/login" element={<Login />} />
                <Route path="/addUser" element={<AddUser />} />
                <Route path="/register" element={<TypeUser />} />
                <Route path="/buildingHomePage" element={<HomePageBuilding />} />

                {/* ADMIN ROUTES */}
                {adminRoutes()}

                {/* USER ROUTES */}
                <Route path="/user/register" element={<Register />} />
                <Route path="/user/login" element={<Login />} />
                <Route path="/user/allComplaints" element={<AllComplaints />} />
                <Route path="/user/allExpenses" element={<AllExpenses />} />
                <Route path="/user/singleComplaint/:id/:userId" element={<SingleComlaint />} />
                <Route path="/user/sendComplaint" element={<SendComplaint />} />
                <Route path="/user/sendComplaint/:id" element={<SendComplaint />} />
                <Route path="/user/updateComplaint/:id" element={<UpdateComplaint />} />
                <Route path="/user/homePage" element={<HomePageBuilding />} />
                <Route path="/user/profile" element={<Regions />} />
            </Routes>
           
        </BrowserRouter>
    )
}

export default AppRoutes;


