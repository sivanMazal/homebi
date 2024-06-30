import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { API_URL, doApiMethodToken } from '../../store/services/service';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button } from '@mui/material';
import BasicModal from './modal';
import UpdateUser from './updateUser';
import AlertMessage from '../../generalComps/alerts/alertMessage';
import Alerts from '../../generalComps/alerts/alerts';

export default function ApartmentSingle({ deleteUser, user }) {
    // const [user, setUser] = useState(null);
    const [email, setEmail] = useState(null);
    const [loading, setLoading] = useState(null);
    const [flag, setFlag] = useState(false);
    const building = useSelector(state => state.buildingSlice.building);

    useEffect(() => {
        // const tenant = { ...building.users.find(x => x.numApartment == index && x.active == true) };
        // setUser(tenant);
        // // let arr = [...users];
        // // arr[index] = { ...tenant };
        // // console.log(arr)
        // // setUsers(arr);
        // console.log(tenant)
        // console.log(Object.keys(tenant).length !== 0)
        // if (Object.keys(tenant).length !== 0) {
        //     console.log(tenant)
        //     setUsers(prevArray => {
        //         const newArray = [...prevArray];
        //         newArray[index] = { ...tenant };
        //         return newArray;
        //     });
        // }
    }, [building]);

    const sendEmail = async (sendAgain) => {
        setLoading(true);
        if (sendAgain) {
            setFlag(true);
        }
        try {
            const link = "http://localhost:3000/addUser";
            let mail = !email? user.email : email;
            console.log(mail)
            const obj = {
                to: mail,
                subject: `ברוך הבא למערכת הדיגיטלית לניהול בניין ${building.street} ${building?.num} ${building.city} `,
                text: `<h2> נרשמת בהצלחה לוועד הבית בבנינך. </h2>
                <p> ברוכים הבאים לאתר HOUSEMENT - אתר שיאפשר לך לצפות בכל מה שמתרחש בבנינך תוך מעקב מסודר, שקיפות ארגונית ויכולת לתקשר עם הוועד שמנהל את בנינך </p>
                <p> כדי להשלים את רישומך  <a href=${link}> לחץ כאן </a></p>
                <p>  קוד הבניין שלך הוא: ${building._id} </p>
                <p>מאחלים לך שימוש מוצלח ומהנה:)  </p>`
            }
            const url = API_URL + "/mailMessages"
            const { data } = await doApiMethodToken(url, "POST", obj);
            console.log(data);
        }
        catch (err) {
            console.log(err);
        }
    }

    // const deleteUser = async () => {
    //     setFlag(true);
    //     try {
    //         const url = API_URL + "/users/changeActive/" + user._id + "/" + building._id;
    //         const { data } = await doApiMethodToken(url, "PATCH");
    //         console.log(data);
    //         setUser(null);
    //     }
    //     catch (err) {
    //         console.log(err);
    //     }
    // }

    return (
        <Card sx={{ maxWidth: 230, height: 235 }} className='text-end'>
            <CardContent className='p-0'>
                {/* <div className="h-100 overflow-hiden"> */}
                <Typography gutterBottom variant="h5" component="div" className='mb-0 p-2 text-white text-center' style={{ backgroundColor: "#245160" }}>
                    דירה {user.numApartment}
                </Typography>
                <div className='p-3 pb-0'>
                    {user?.fullName?.firstName.length > 0 && user?.active ? <React.Fragment>
                        <Typography gutterBottom variant="body2" color="text.secondary">
                            שם: {user?.fullName.firstName} {user?.fullName.lastName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            אימייל:  {user?.email}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className='mt-1'>
                            פלאפון:  {user?.phone}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className='mt-1'>
                            תשלום חודשי:  {user?.price}
                        </Typography>
                        {!(building.paymentType) ? <Typography variant="body2" color="text.secondary" className='mt-1'>
                            שטח דירה:  {user?.area} מ"ר
                        </Typography>: <Typography variant="body2" color="text.secondary" className='mt-4'></Typography>}
                    </React.Fragment> :
                        <Typography gutterBottom variant="h5" component="div" className="mt-4">
                            {user?.email && !(user?.active) ? " הדייר צריך להרשם " : "אין נתונים"}
                        </Typography>}
                </div>
            </CardContent>
            <CardActions style={{ display: "flex", justifyContent: "flex-end", padding: "0", paddingLeft: "20px" }}>
                {/* <div className='d-flex align-items-center'> */}
                {user?.fullName?.firstName != "" && user?.fullName?.firstName != undefined ?
                    <React.Fragment>
                        {!flag ? <Button onClick={()=>{setFlag(true); deleteUser(user);}}
                            variant="contained"
                            style={{ backgroundColor: "#94db9f" }}> הסר פרטים</Button> :
                            <AlertMessage
                                setFlag={setFlag}
                                variant={'success'}
                                children={<Alerts message={"המשתמש לא פעיל"} />} />}
                    </React.Fragment>
                    : user?.email ? <React.Fragment>
                        {!flag ? <Button
                            variant="contained"
                            style={{ backgroundColor: "#94db9f", marginTop: "50px" }}
                            onClick={() => sendEmail(true)}> שלח שוב מייל </Button> :
                            <AlertMessage
                                setFlag={setFlag}
                                variant={'success'}
                                children={<Alerts message={"האימייל נשלח בהצלחה!"} />} />}
                    </React.Fragment>
                        :
                        <BasicModal
                            loading={loading}
                            setLoading={setLoading}
                            index={user.numApartment}
                            sendEmail={sendEmail}
                            email={email}
                            setEmail={setEmail} />}
                {/* </div> */}

                {/* </div> */}
                {/* </div> */}
            </CardActions>
        </Card >
    );
}