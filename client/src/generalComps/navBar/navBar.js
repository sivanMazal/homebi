import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import '../../css/navBar.css'
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import TypeUser from "../../compsUser/register/typeUser";
import { logoutUser } from "../../store/features/userSlice";
import { logoutBuilding } from "../../store/features/buildingSlice";
import { TOKEN_NAME } from "../../store/services/service";
import ResponsiveAppBar from "./avatar";




const NavBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [flag, setFlag] = useState(false);
    const [message, setMessage] = useState("");
    const [arr, setArr] = useState([]);
    const [now, setNow] = useState(new Date());
    let { user, balance, building } = useSelector(state => {
        return {
            user: state.userSlice.user,
            balance: state.buildingSlice.balance,
            building: state.buildingSlice.building,
        }
    }, shallowEqual);

    const disconnected = async () => {
        localStorage.removeItem(TOKEN_NAME);
        dispatch(logoutUser());
        dispatch(logoutBuilding());
        navigate("/");

    }

    useEffect(() => {
        setArr([
            { to: "/buildingHomePage", name: "הבניין שלי", role: ["admin", "user"] },
            { to: "/admin/allComplaints", name: "פניות", role: ["admin"] },
            { to: "/admin/allExpenses", name: "הוצאות", role: ["admin"] },
            { to: "/admin/usersPayments", name: "תשלומי דיירים", role: ["admin"] },
            { to: "/admin/allApartments", name: "פריסת דירות", role: ["admin"] },
            { to: "/user/allComplaints", name: "פניות", role: ["user"] },
            // { to: "/user/profile", name: "פרופיל", role: ["user", "admin"] },
            { to: "/user/allExpenses", name: "הוצאות", role: ["user"] },
            // { to: "/admin/addAndEditBuilding/" + building?._id, name: "עריכת בניין", role: ["admin"] },
        ])
        if (now.getHours() >= 6 && now.getHours() < 12) {
            setMessage("בוקר טוב 🙌");
        } else if (now.getHours() >= 12 && now.getHours() < 16) {
            setMessage("צהריים טובים 🙌");
        } else if (now.getHours() >= 16 && now.getHours() < 18) {
            setMessage("אחר הצהריים טובים 🙌");
        } else {
            setMessage("לילה טוב 🙌");
        }
    }, [building])

    if (!user) {
        user = { role: "guest" };
    }

    useEffect(() => { }, [user, balance])

    return (<header className="container-fluid p-0 m-0 gx-0 center">
        <div className="container py-3">
            <div className="row justify-content-between align-items-center">
                <div className="col-3 logo" type="button">
                    <img src="/images/logo.png" height="70" width="90" onClick={() => navigate("/")} />
                </div>
                {user.role == "guest" ? <div className='col-3 buttons'>
                    <Button variant='contained' style={{ backgroundColor: "#94db9f" }} className="ms-md-3" onClick={() => setFlag(true)}> הרשמה </Button>
                    <Button variant='contained' style={{ backgroundColor: "#94db9f" }} onClick={() => navigate("/user/login")}> כניסה לבניין קיים </Button>
                </div> :<>
                    <nav className={user.role=="user"?"col-4 navBar":"col-6 navBar"}>
                        {arr.map(x => {
                            return x.role.map((item, ind) => {
                                if (item == user.role) return <>  <div key={ind} className="h-100 nav2">
                                    <Link key={x.name} to={x.to} className="navBar-link">
                                        {x.name}
                                    </Link>   </div>     </>
                            })
                        })}
                        
                        {/* 
                        {user != null && user.fullName != null && (
                            <div className="mt-4 mx-3">
                                <Button variant='contained' style={{ backgroundColor: "#94db9f" }} className="ms-md-3" onClick={disconnected}>
                                    <span className="ms-2">  התנתק\י </span> <LogoutIcon />
                                </Button>
                            </div>
                        )} */}
                        {/* {user != null && user.fullName != null && (
                            <div className="hello">
                                {user.fullName.firstName}, {message}
                            </div>
                        )} */}
                        <div>
                            <ResponsiveAppBar />
                        </div>
                    </nav>
                    </>}
                {flag && <TypeUser setFlag={setFlag} />}


            </div>
        </div>
    </header>)
}
export default NavBar;
