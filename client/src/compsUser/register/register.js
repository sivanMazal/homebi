import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import * as React from "react";
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import FormInput from "../../generalComps/formInput";
import "../../css/register.css";
import { API_URL, doApiGet } from "../../store/services/service";
import Password from "../../generalComps/password";

const schema = yup.object({
    firstName: yup.string().required("שדה זה חובה").min(2, 'השם אינו תקין'),
    lastName: yup.string().required("שדה זה חובה").min(2, 'השם אינו תקין'),
    email: yup.string().email("כתובת מייל אינה תקינה").required("שדה זה חובה"),
    phone: yup.string().required("שדה זה חובה").min(9, 'מספר הפלאפון אינו תקין')
        .max(10, 'מספר הפלאפון אינו תקין'),
    password: yup.string().required("שדה זה חובה")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, "הסיסמא חייבת להכיל 6 ספרות. לפחות מספר אחד.ולפחות אות אחת באנגלית."),
}).required();

const Register = ({ user, buildId, onSubmit, building, setBuilding }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [arr, setArr] = React.useState([]);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    React.useEffect(() => {
        getBuildingByUserId();
        setArr([
            { lableName: "שם פרטי", name: "firstName", type: "text", disabled: false },
            { lableName: "שם משפחה", name: "lastName", type: "text", disabled: false },
            { lableName: "פלאפון", name: "phone", type: "text", disabled: false },
            { lableName: 'דוא"ל', name: "email", type: "mail", disabled: false },
            { lableName: "סיסמא", name: "password", type: "text", disabled: false },
        ]);
    }, [user])

    React.useEffect(() => {
        console.log(building)
        if (building && !(building?.paymentType)) {
            console.log(building.paymentType)
            const ar = [...arr, { lableName: "שטח דירה", name: "area", type: "number" }];
            setArr(ar);
        }
    }, [building])

    const getBuildingByUserId = async () => {
        try {
            const url = API_URL + "/buildings/single/" + buildId;
            const { data } = await doApiGet(url);
            console.log(data);
            setBuilding(data);
        }
        catch (err) {
            console.log(err.response?.data?.msg);
        }

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row gx-0 justify-space-between">
            {arr.length > 0 && arr.map(item => <div key={item.name} className="col-md-5 mb-4">
                {item.name != "password" ? <FormInput
                    lableName={item.lableName}
                    name={item.name}
                    type={item.type}
                    errors={errors}
                    register={register}
                    user={user}
                /> :
                    <Password
                        errors={errors}
                        flag={true}
                        register={register}
                        name={"password"}
                        labelName={"סיסמא"} />
                }
            </div>
            )}
            </div>
            <div className="text-start" style={{position:"relative", top:"110px"}}>
            <Button
                style={{ backgroundColor: "#94db9f" }}
                type="submit"
                variant="contained"
                className="text-start">
                הבא </Button>
                </div>
        </form>)
}
export default Register;