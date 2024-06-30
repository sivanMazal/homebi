import * as React from "react";
import { useState, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField } from "@mui/material";
import * as yup from "yup";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormInput from "../../generalComps/formInput";
import BorderLinearProgress from "./borderLinearProgress";
import Map from "../../generalComps/map/map";

const schema = yup.object({
    city: yup.string().min(2, "יש להכניס לפחות שני תווים").required("שדה זה חובה"),
    street: yup.string().required("שדה זה חובה"),
    num: yup.string().required("שדה זה חובה").matches(/^(0|[1-9]\d*)(\.\d+)?$/, "יש להכניס ספרות בלבד"),
    numEntry: yup.string().min(0, "מספר לא מתאים").max(2, "מספר לא מתאים").matches(/^(0|[1-9]\d*)(\.\d+)?$/, "יש להכניס ספרות בלבד").required("שדה זה חובה"),
    numApartments: yup.number().positive("מספר לא תקין").typeError("שדה זה חובה").required("שדה זה חובה"),
    paymentType: yup.bool().required("שדה זה חובה"),
    paymentFees: yup.number().positive('מספר לא תקין').typeError("שדה זה חובה").required("שדה זה חובה"),
    description: yup.string().max(150, 'מספר תווים מקסימלי הוא 150'),
    zipCode: yup.string(),
}).required();

const arr = [
    { lableName: "עיר", name: "city", type: "text", flag: false },
    { lableName: "רחוב", name: "street", type: "text", flag: false },
    { lableName: "מספר בית", name: "num", type: "text", flag: false },
    { lableName: "מספר כניסה", name: "numEntry", type: "text", flag: false },
    { lableName: "מספר דירות בבניין", name: "numApartments", type: "number", flag: false },
    { lableName: "מיקוד", name: "zipCode", type: "text", flag: true },
    { lableName: "דמי וועד הבית (חודשי)", name: "paymentFees", type: "number", flag: false },
]

const BuildAddress = ({ type, building, onSubmit }) => {
    const [count, setCount] = useState(0);
    const [color, setColor] = useState("grey");
    const [lat, setLat] = useState(type == "edit" ? building.lat : null);
    const [lng, setLng] = useState(type == "edit" ? building.lng : null);
    const [text, setText] = useState(" ממליצים לך בחום להוסיף תיאור נרחב ");
    useEffect(() => {
        if (building) {
            handleChange({ target: { value: building.description } });
        }
        // if (type == "new") {
        //     building = null;
        // }
    }, []);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { building }
    });


    useEffect(() => {
        if (building) {
            arr.forEach(x => setValue(x.name, building[x.name]))
        }
    }, [building]);

    useEffect(() => {
        if (lat && lng) {
            getZipCode();
        }
    }, [lat, lng])

    const handleChange = ({ target }) => {
        const cnt = target.value.length;
        setCount(cnt);
        switch (true) {
            case cnt >= 1 && cnt < 30:
                setColor("red");
                setText("מרגיש לנו שהתיאור שכתבת קצר מידי")
                break;
            case cnt >= 30 && cnt < 50:
                setColor("orange");
                setText("יופי, התיאור הולך לכיוון הנכון");
                break;
            case cnt >= 50 && cnt < 100:
                setColor("yellow");
                setText("עוד ממש קצת וזה שם");
                break;
            case cnt >= 100 && cnt < 120:
                setColor("light-green");
                setText("אוטוטו");
                break;
            case cnt >= 150:
                setColor("green");
                setText("בול!");
                break;
            default:
                setColor("grey");
                setText(" ממליצים לך בחום להוסיף תיאור נרחב ")
                break;
        }
    }

    const getZipCode = async () => {
        const latitude = lat;
        const longitude = lng;
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.address && data.address.postcode) {
                const zipCode = data.address.postcode;
                setValue('zipCode', zipCode);
            } else {
                console.error('Zip code not found for the given coordinates.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const onSubmit2 = (data) => {
        data.lng = parseFloat(lng);
        data.lat = parseFloat(lat);
        console.log(data)
        delete data.building;
        onSubmit(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit2)}>
            <div className="detailsbuilding m-4 row gx-0">
                {arr.map(item => <div key={item.name} className="container-details2 col-md-6">
                    <label className="col-md-5 d-flex align-item-center">{item.lableName}</label>
                    <FormInput
                        // lableName={item.lableName != "מיקוד" || !(lat & lng) ? item.lableName : ""}
                        name={item.name}
                        type={item.type}
                        errors={errors}
                        register={register}
                        flag={item.flag} />
                </div>
                )}


                <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">סוג תשלום:</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        defaultChecked={building ? building.typePayment : ""}
                    >
                        <FormControlLabel value={true} control={<Radio />} label="אחיד" {...register("paymentType")} />
                        <FormControlLabel value={false} control={<Radio />} label="פר מטר מרובע" {...register("paymentType")} />
                    </RadioGroup>
                    <p className='text-danger'>{errors.paymentType?.message}</p>
                </FormControl>
            </div>

            <div>
                <h4>פרטים נוספים (עד 150 תווים) {count}/150</h4>
                <span>{text}</span>
                <BorderLinearProgress
                    color1={color}
                    variant="determinate" value={count / 1.5} />
                <br />
                <TextField
                    id="outlined-multiline-static"
                    variant='outlined'
                    multiline
                    minRows={7}
                    inputProps={{ maxLength: 500 }}
                    {...register("description")}
                    style={{ width: "32rem" }}
                    label="תיאור"
                    onChange={handleChange}
                    defaultValue={building ? building.description : "זה המקום להוסיף תיאור כללי על הבניין"}
                />
            </div>
            <div className="mt-5">
                <h4> כתובת הבניין </h4>
                <Map type={1} lat={lat} lng={lng} setLat={setLat} setLng={setLng} />
                <br /> <br />
                <div className="text-start" style={{ position: "relative", top: "80px" }}>
                    <Button
                        variant="contained"
                        size="medium"
                        style={{ background: "#94db9f" }}
                        type="submit">
                        להמשיך לשלב הבא </Button>
                </div>
            </div>
        </form>)
}
export default BuildAddress;