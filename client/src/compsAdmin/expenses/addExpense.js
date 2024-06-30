import * as React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from "@mui/material";
import * as yup from "yup";
import FormInput from "../../generalComps/formInput";
import { useSelector } from "react-redux";

const schema = yup.object({
    name: yup.string().min(2).required("שדה זה חובה"),
    price: yup.number().positive("מספר לא תקין").typeError("שדה זה חובה").required("שדה זה חובה"),
    isPay: yup.bool().required("שדה זה חובה"),
    isConst: yup.bool().required("שדה זה חובה"),
}).required();

const arr = [
    { lableName: "שם ההוצאה", name: "name", type: "text", flag: false },
    { lableName: "מחיר ההוצאה", name: "price", type: "number", flag: false },
    { lableName: "האם שולם", name: "isPay", type: "checkbox", flag: false },
    { lableName: "הוצאה חובה", name: "isConst", type: "checkbox", flag: false },

]


const AddExpense = ({ onSubmit }) => {
    const expense = useSelector(state => state.expense);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { expense }
    });
    useEffect(() => {
        if (expense) {
            arr.forEach(x => setValue(x.name, expense[x.name]))
        }
    }, [expense]);

    return <div style={{paddingRight:"70px"}}>
        <form onSubmit={handleSubmit(onSubmit)}>

            {arr.map(item => <FormInput
                lableName={item.lableName}
                name={item.name}
                type={item.type}
                errors={errors}
                register={register}
                expense={expense}
                flag={false} />
            )}

            <div className="row gx-0 col-8">
                <Button variant='contained' style={{ backgroundColor: "#94db9f", fontSize: "15px" }}
                    type="submit" className="">
                    הוסף </Button></div>
        </form>
    </div>
}
export default AddExpense;
