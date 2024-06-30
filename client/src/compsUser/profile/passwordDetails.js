import React, { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Button } from '@mui/material';
import swal from 'sweetalert';
import ForgetPassword from '../../generalComps/login/forgetPassword';
import { API_URL, doApiMethodToken } from '../../store/services/service';
import { currentUser } from '../../store/features/userSlice';
import AlertMessage from '../../generalComps/alerts/alertMessage';
import Alerts from '../../generalComps/alerts/alerts';
import Password from '../../generalComps/password';

export default function PasswordDetails() {
    const [open, setOpen] = useState(false);
    const [flag, setFlag] = useState(false);
    const { user} = useSelector(state => {
        return {
            user: state.userSlice.user,
        }
    }, shallowEqual);  
      const dispatch = useDispatch();
    const schema = yup.object({
        password: yup.string().required("שדה זה חובה").oneOf([user.password], "סיסמא  שגויה").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, "הסיסמא חייבת להכיל 6 ספרות. לפחות מספר אחד.וךפחות אות אחת באנגלית."),
        newPassword: yup.string().required("שדה זה חובה").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, "הסיסמא חייבת להכיל 6 ספרות. לפחות מספר אחד.וךפחות אות אחת באנגלית."),
    }).required();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (object) => {
        if (object.password == object.newPassword) {
            swal("הסיסמאות זהות, לא נתבצע כל שינוי.");
            return;
        }
        try {
            delete object.newPassword;
            console.log(object);

            const url = API_URL + '/users/' + user._id;
            const { data } = await doApiMethodToken(url, "PATCH", object);
            let o ={...user};
            o.password = object.password
            dispatch(currentUser({ user: o }));
            setFlag(true);

        } catch (err) {
            console.log(err);
        }
    };
    
    
    return <form onSubmit={handleSubmit(onSubmit)} className="location py-5">
        <p className='m-0 p-0'>סיסמא ישנה</p>
        <Password
            errors={errors}
            register={register}
            name="password" />
        <br />

        <p className='m-0 p-0'>סיסמא חדשה</p>
        <Password
            errors={errors}
            register={register}
            name="newPassword"/>
        <br />

        <p className="move" onClick={() => { setOpen(true) }}>שכחתי סיסמא</p>
        {open ? <ForgetPassword email={user.email} setOpen={setOpen} /> : null}
        <Button variant='contained' type="submit" style={{ backgroundColor: "#94db9f" }}>שמירת שינויים</Button>
        {flag && <AlertMessage variant={'success'} setFlag={setFlag} children={<Alerts message={"פרטיך עודכנו בהצלחה!"} />} />}

    </form>
}

