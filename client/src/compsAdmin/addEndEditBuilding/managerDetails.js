import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Button } from "@mui/material";
import { useEffect } from "react";
import FormInput from "../../generalComps/formInput";
import Password from "../../generalComps/password";
import { AreaFragment } from "igniteui-react-charts";

const schema = yup.object({
    firstName: yup.string().required("שדה זה חובה").min(2, 'שם אינו תקין').max(50, 'שם ארוך מידי'),
    lastName: yup.string().required("שדה זה חובה").min(2, 'שם אינו תקין').max(50, 'שם ארוך מידי'),
    phone: yup.string().required("שדה זה חובה").min(9, 'מספר הפלאפון אינו תקין').max(10, 'מספר הפלאפון אינו תקין'),
    email: yup.string().email("כתובת מייל אינה תקינה").required("שדה זה חובה"),
    numApartment: yup.string().matches((/^[1-9]\d*$/), 'מספר לא תקין').required("שדה זה חובה"),
    password: yup.string().required("שדה זה חובה")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, "הסיסמא חייבת להכיל 6 ספרות. לפחות מספר אחד.ולפחות אות אחת באנגלית."),
}).required();

const ManagerDetails = ({ onSubmit, type, paymentFees, paymentType }) => {
    const dispatch = useDispatch();
    const [u, setU] = React.useState(null);
    const [arr, setArr] = React.useState([]);
    const user = useSelector(state => state.userSlice.user);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { user }
    });
    useEffect(() => {
        if (user) {
            arr.forEach(x => setValue(x.name, user[x.name]))
        }
    }, [user]);

    React.useEffect(() => {
        const a = [{ lableName: "שם פרטי", name: "firstName", type: "text" },
        { lableName: "שם משפחה", name: "lastName", type: "text" },
        { lableName: "מספר טלפון", name: "phone", type: "text" },
        { lableName: "מספר דירה", name: "numApartment", type: "text" },
        { lableName: "סיסמא", name: "password", type: "text" },
        { lableName: "דואר אלקטרוני", name: "email", type: "mail" }];
        if (!paymentType) {
            const ar = [...a, { lableName: "שטח דירה", name: "area", type: "number" }];
            setArr(ar);
        }
        if (user) {
            let u2 = {...user};
            u2.firstName =   user.fullName.firstName;
            u2.lastName = user.fullName.lastName;
            setU({...u2});
        }
    }, [user])

    const onSubmit2 = (data) => {
        console.log(data);
        if (type == "edit") {
            data._id = user._id;
            data.password = user.password;
            data.status = user.status;
            // data.Active = user.Active;
            // dispatch(updateUser(data));
        }
        console.log(paymentFees, paymentType)
        data.fullName = { firstName: data.firstName, lastName: data.lastName };
        if(paymentType) {
            console.log(paymentFees)
            data.price = paymentFees;
        } else {
            data.price = paymentFees* data.area;
        }
        delete data.firstName;
        delete data.lastName;
        delete data.user;
        console.log(data)
        onSubmit(data);
    }

    return <form onSubmit={handleSubmit(onSubmit2)} className="container">
        <br /> <p>רגע לפני שמייצרים את הבניין, הכנס את פרטיך:</p> <br />
        <div className="row gx-0">
            <div className="col-md-6">
                {arr.map(item => <React.Fragment key={item.name}> {item.name != "password" ? <FormInput
                    lableName={item.lableName}
                    name={item.name}
                    type={item.type}
                    errors={errors}
                    register={register}
                    user={u}
                    flag={false} /> :
                    <div>
                        <Password
                            errors={errors}
                            register={register}
                            name={"password"}
                            flag={true}
                            labelName={"סיסמא"} />
                    </div>}
                </React.Fragment>
                )}
            </div>
            <div className="col-md-5 overflow-hidden" style={{ height: "70vh" }}>
                <img src="/images/building.jpg" className="w-100 h-100 rounded" />
            </div>
        </div>

        <div className="text-start" style={{ position: "relative", top: "80px" }}>
            <Button variant="contained"
                style={{ background: "#94db9f" }}
                size="medium" type="submit">
                להמשיך לשלב הבא </Button>
        </div>
    </form>
}
export default ManagerDetails;