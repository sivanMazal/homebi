import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Poppers from '../../generalComps/popper/popper';
import AlertMessage from '../../generalComps/alerts/alertMessage';
import Alerts from '../../generalComps/alerts/alerts';
import { API_URL, doApiMethodToken } from '../../store/services/service';
import buildingSlice, { updateBalance } from '../../store/features/buildingSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function UserPaymentSingle({ item, payments, year, month }) {
    const dispatch = useDispatch();
    const [checked, setChecked] = React.useState(item.isPay);
    const [flag, setFlag] = React.useState(false);
    const [payment, setPayment] = React.useState();
    const building = useSelector(state => state.buildingSlice.building);

    React.useEffect(() => {
        console.log(payments)
        const obj = payments.find(x => item._id == x.userId._id);
        setPayment(obj);
        setChecked(obj ? obj.isPay : false);
    }, [payments])

    const changePayment = async () => {
        if (payment) {
            try {
                setFlag(true);
                const url = API_URL + "/usersPayments/changePay" + payment._id;
                const { data } = await doApiMethodToken(url, "PATCH");
                const price = !checked ? (payment.price * -1) : payment.price;
                dispatch(updateBalance({ balance: price }));
            }
            catch (err) {
                console.log(err.response?.data?.msg);
            }
        } else {
            try {
                const url = API_URL + "/usersPayments/" + item._id;
                const { data } = await doApiMethodToken(url, "POST", { buildId: building._id, price: item.price, isPay: true, dateCreated: new Date(year, month, 1) });
                setFlag(true);
                dispatch(updateBalance({ balance: item.price }));
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <Card sx={{ maxWidth: 200, minHeight: 180 }}>
            <CardContent className='p-0'>
                <Typography gutterBottom variant="h5" component="div" className='mb-0 p-2 text-white text-center' style={{ backgroundColor: "#245160" }}>
                    דירה  {item.numApartment}
                </Typography>
                <div className='p-2 pb-0'>
                    {/* <Typography gutterBottom variant="h5" component="div">
                        {item.fullName.firstName} {item.fullName.lastName}
                    </Typography> */}
                    {item?.fullName?.firstName.length > 0 ? <Typography variant="body2" color="text.secondary">
                        שם דייר: {item.fullName.firstName} {item.fullName.lastName}
                    </Typography> : <Typography variant="body2" color="text.secondary">
                        הדייר אינו נרשם עדיין
                    </Typography>}
                    <Typography variant="body2" color="text.secondary" className="mt-2">
                        מחיר:  {item.price}
                    </Typography>
                </div>
            </CardContent>
            <CardActions style={{ display: "flex", justifyContent: "flex-end", padding: "0", paddingBottom: "10px", paddingLeft: "30px", paddingTop:"30px" }}>
                {!flag ? <Poppers
                    type={2}
                    func={changePayment}
                    text="שנות את התשלום"
                    checked={checked}
                    content={"שולם"}
                    setChecked={setChecked} /> :
                    <div className='pe-4'>
                    <AlertMessage
                        setFlag={setFlag}
                        variant={'success'}
                        children={<Alerts message={"התשלום שונה בהצלחה!"} />} /> </div>}
            </CardActions>
        </Card>
    );
}