import { shallowEqual, useSelector } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import ButtomNavigation from "./buttomNavigation";
import { useEffect } from "react";

const Regions = () => {

    const [flag, setFlag] = useState(true);
    const { user} = useSelector(state => {
        return {
            user: state.userSlice.user,
        }
    }, shallowEqual);

    useEffect(()=>{},[user])
console.log(user)

    return (<div className="bottom container p-4">
        <h3><EditIcon onClick={() => { setFlag(!flag) }} /> {user?.fullName?.firstName} {user?.fullName?.lastName}   </h3> 
        <p>
            פלאפון: {user.phone} |
            דוא"ל : {user.email}
        </p> <br />
        {flag && <ButtomNavigation />}
    </div>
    )
}
export default Regions;

