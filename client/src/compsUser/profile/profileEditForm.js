
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as React from "react";
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { API_URL, doApiMethod, doApiMethodToken } from "../store/services/service";
import FormInput from "../generalComps/formInput";
import AlertMessage from "../generalComps/alerts/alertMessage";
import Alerts from "../generalComps/alerts/alerts";
import swal from "sweetalert";
const arr = [
    { lableName: "שם מלא", name: "fullName", type: "text" },
    { lableName: 'דוא"ל', name: "email", type: "mail" },
    { lableName: 'סיסמא', name: "password", type: "password" },
    { lableName: "פלאפון", name: "phone", type: "string" },

]
const schema = yup.object({
    fullName: yup.string().min(2, 'השם אינו תקין'),
    email: yup.string().email("כתובת מייל אינה תקינה"),
    phone: yup.string().min(9, 'מספר הפלאפון אינו תקין').max(10, 'מספר הפלאפון אינו תקין'),
    password: yup.string()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, "הסיסמא חייבת להכיל 6 ספרות. לפחות מספר אחד.ולפחות אות אחת באנגלית."),
});

const ProfileEditForm = () => {
    const { user} = useSelector(state => {
        return {
            user: state.userSlice.user,
        }
    }, shallowEqual);

    const dispatch = useDispatch();
    const [flag, setFlag] = React.useState(false);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { user }
    });
    React.useEffect(() => {
        if (user) {
            arr.forEach(x => setValue(x.name, user[x.name]))
        }
    }, [user])
    const onSubmit = async (object) => {
     
        try {
            object.numApartment=user.numApartment;
            object.price=user.price;

            console.log(object)
            delete object.firstName;
            delete object.lastName;
            delete object.user;
            const url = API_URL + '/users/' + user._id;
            const { data } = await doApiMethodToken(url, "PUT", object);
            const arr = [...user, data];
            dispatch(currentUser({ arr: arr }));
        } catch (err) {
            console.log(err);
            if(err.response.data.err.code==11000)
            {
                swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'מייל זה קיים במערכת',
                  })
            }
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="location">
            {arr.map(item => <div key={item.name}>
                <FormInput
                    lableName={item.lableName}
                    name={item.name}
                    type={item.type}
                    errors={errors}
                    register={register}
                    user={user}
                    flag={false} />
            </div>
            )}
            <Button variant="contained" size="medium" type="submit" style={{ backgroundColor: "orange" }}>
                שמירת שינויים
            </Button>
            <br /> <br />
            {flag && <AlertMessage variant={'success'} setFlag={setFlag} children={<Alerts message={"פרטיך עודכנו בהצלחה!"} />} />}

        </form>)
}
export default ProfileEditForm;

