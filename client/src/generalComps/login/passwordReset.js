import Button from '@mui/material/Button';
import React, { useState } from "react";
import { HiEyeOff, HiEye } from "react-icons/hi";
import { useDispatch } from "react-redux";

const PasswordReset = ({ email, setOpen }) => {
    const dispatch = useDispatch();
    const [newPassword, setnewPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [eye, setEye] = useState(false);
    const [flag, setFlag] = useState(false);
    const [errorState, setErrorState] = useState("");
    const strongRejex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/);

    const handleNewPassword = (event) => {
        setnewPassword(event.target.value);
        if (strongRejex.test(event.target.value)) {
            setErrorState("");
        } else {
            setErrorState("סיסמא חייבת להכיל 6 תווים וכן לפחות אות אחת באנגלית ומספר");
        }
    }

    const handleconfirmPassword = (event) => {
        setconfirmPassword(event.target.value);
        if (newPassword != event.target.value) {
            setErrorState("הסיסמא לא מתאימה");
            setFlag(false);
        }
        else {
            setErrorState("");
        }
    }

    const resetPassword = () => {
        if (errorState.length > 0 || newPassword == '' || confirmPassword == '') {
            setFlag(true);
        } else {
            if (newPassword == confirmPassword) {
                // dispatch(changePassword({ Password: newPassword, Email: email }));
                setOpen(false)
            }
        }
    }
    return <div>
        <h4 className="text-center">אתחול סיסמא: </h4>
        <form>
            <label className="d-block">סיסמא חדשה</label> 
            <input
                type="text"
                value={newPassword}
                onChange={handleNewPassword}></input> <br /> <br />

            <label type="text" > אשר סיסמא </label> <br />
            <input
                type={eye ? "text" : "password"}
                value={confirmPassword}
                onChange={handleconfirmPassword}>
            </input>

            <div onClick={() => { setEye(!eye) }} >
                {eye ? <HiEyeOff color="grey" /> : <HiEye color="grey" />}
            </div>
            <span style={{ color: "red" }}>{errorState}</span>  <br /> <br />

            {flag && <span style={{ color: "red" }}>יש למלא את כל השדות</span>}
            <Button variant="contained" color="primary" onClick={resetPassword}> המשך </Button>
        </form>
    </div>
}
export default PasswordReset;