import React, { useEffect, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Poppers from '../../generalComps/popper/popper';
import AlertMessage from '../../generalComps/alerts/alertMessage';
import Alerts from '../../generalComps/alerts/alerts';
import { API_URL, doApiMethodToken } from '../../store/services/service';
import swal from 'sweetalert';
import { Button } from '@mui/material';
import UpdateComplaint from './updateComplaint';

const SingleComlaint = () => {
    const { id, userId } = useParams();
    const navigate = useNavigate();
    const [complaint, setComplaint] = useState(null);
    const [checked, setChecked] = useState();
    const [flag, setFlag] = useState(false);
    const location = useLocation();

    // const { someAction } = location.state;
    const { complaints, user } = useSelector(state => {
        return {
            complaints: state.buildingSlice.complaints,
            user: state.userSlice.user
        }
    }, shallowEqual);

    useEffect(() => {
        const obj = { ...complaints.find(x => x._id == id) };
        console.log(obj, id, complaints)
        setComplaint(obj);
        setChecked(obj.isHandled)
    }, [id, complaints]);

    useEffect(() => {
        if (flag) {
            const interval = setInterval(() => {
                setFlag(false);
            }, 5000);
        }
    }, [flag]);

    const changeComplaint = () => {
        try {
            const url = API_URL + "/complaints/changeHandled/" + complaint._id;
            const data = doApiMethodToken(url, "PUT");
            // dispatch(changeAttractionStatus(id));
            console.log(data)
            setFlag(true);
        }
        catch (err) {
            console.log("קרתה שגיאה זמנית באתר")
        }
    }

    const deleteComplaint = () => {
        try {
            const url = API_URL + "/complaints/" + complaint._id;
            const data = doApiMethodToken(url, "DELETE");
            console.log(data);
            swal({
                icon: "success",
                title: "בוצע!",
                text: "הפניה נמחקה  בהצלחה.",
                button: "סגור",
            }).then(() => navigate("/admin/allComplaints"))
        }
        catch (err) {
            console.log("קרתה שגיאה זמנית באתר")
        }
    }
    return (
        complaint && <div className='container p-4'>
            <div className='w-75 complaints'>
                <h2 className='text-center'> פרטי הפניה </h2>
                <div className='float-start'>
                    <Poppers
                        func={deleteComplaint}
                        type={1}
                        text="מחוק את הפניה " />
                    <UpdateComplaint id={complaint._id} />
                </div>
                <h6 className='mb-2'><strong>מועד הגשת הפניה: </strong> </h6>
                <p>{new Date(complaint.date_created).toLocaleDateString()} </p>
                <h6><strong> מגיש הפניה:</strong></h6>
                <p>{complaint.userId.fullName.firstName} {complaint.userId.fullName.lastName} </p>

                <div>
                    <h6> <strong>מצב הפניה:</strong></h6>
                    <p>
                        {!flag && user.role == "admin" ?
                            <Poppers
                                type={2}
                                func={changeComplaint}
                                text="שנות את מצב הפניה"
                                checked={checked}
                                setChecked={setChecked} /> : user.role == "admin" ?
                                <div className='w-25'>
                                    <AlertMessage
                                        variant={'success'}
                                        children={<Alerts message={"הפניה עודכנה בהצלחה!"} />} />
                                </div> : null}
                        <span className='ps-2'>  {checked ? "טופל" : "לא טופל"}</span>
                    </p>
                </div>
                <h6><strong> תיאור הפניה: </strong></h6>
                <p>{complaint.description}</p>
                <div className='row gx-0 justify-content-lg-between'>
                    
                    {complaint.video &&<div className='col-lg-5'>
                        <h6> <strong>וידאו: </strong></h6>
                         <video controls className='w-100' height="315"> <source src={complaint.video}></source>
                        </video>
                    </div>}

                    {complaint.image && <div className='col-lg-5'>
                        <h6> <strong> תמונה: </strong></h6>
                        <img src={complaint.image} alt="complaint" className='w-100' height={"315"} />
                    </div>}
                </div>
            </div>
        </div >
    )
}

export default SingleComlaint