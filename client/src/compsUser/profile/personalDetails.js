import { shallowEqual, useDispatch, useSelector } from "react-redux";
// import { updateUser } from "../../store/actions/UserActions";
// import Alerts from '../alert/Alerts';
// import AlertMessage from '../alert/AlertMessage';
import * as React from "react";
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useEffect } from "react";
import { currentUser } from "../../store/features/userSlice";
import AlertMessage from "../../generalComps/alerts/alertMessage";
import Alerts from "../../generalComps/alerts/alerts";
import { API_URL, doApiMethodToken } from "../../store/services/service";
import FormInput from "../../generalComps/formInput";
const arr = [
    { lableName: "שם", name: "firstName", type: "text" },
    { lableName: "שם משפחה", name: "lastName", type: "text" },
    { lableName: 'דוא"ל', name: "email", type: "mail" },
    { lableName: "פלאפון", name: "phone", type: "string" },

]
const schema = yup.object({
    firstName: yup.string().min(2, 'השם אינו תקין'),
    lastName: yup.string().min(2, 'השם אינו תקין'),
    email: yup.string().email("כתובת מייל אינה תקינה"),
    phone: yup.string().min(9, 'מספר הפלאפון אינו תקין').max(10, 'מספר הפלאפון אינו תקין'),

});
const PersonalDetails = () => {
    const dispatch = useDispatch();
    const [flag, setFlag] = React.useState(false);
    const [u, setU] = React.useState(null);
    const user = useSelector(state => state.userSlice.user);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { user }
    });
    React.useEffect(() => {
        if (user) {
            let u2 = {...user};
            u2.firstName =   user.fullName.firstName;
            u2.lastName = user.fullName.lastName;
            setU({...u2});
        }
    }, [user])

    useEffect(()=>{
        if(u) {
        arr.forEach(x => setValue(x.name, u[x.name]))
        }
    },[u])

    const onSubmit = async (object) => {
        try {
            console.log(object)
            object.numApartment = user.numApartment;
            object.price = user.price;
            object.fullName = {firstName:object.firstName, lastName: object.lastName };
            delete object.firstName;
            delete object.lastName;
            delete object.user;
            console.log(object)
            const url = API_URL + '/users/' + user._id;  

            const { data } = await doApiMethodToken(url, "PUT", object);
            console.log(data)
            object._id=user._id;
            object.role=user.role;
            dispatch(currentUser({ user: {...object} }));
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="location py-4">
            {arr.map(item => <div key={item.name}>
                <FormInput
                    lableName={item.lableName}
                    name={item.name}
                    type={item.type}
                    errors={errors}
                    register={register}
                    user={u}
                    flag={false} 
                    />
            </div>
            )}
            <Button variant="contained" size="medium" type="submit" style={{ backgroundColor: "#94db9f" }}>
                שמירת שינויים
            </Button>
            <br /> <br />
            {flag && <AlertMessage variant={'success'} setFlag={setFlag} children={<Alerts message={"פרטיך עודכנו בהצלחה!"} />} />}

        </form>)
}
export default PersonalDetails;

