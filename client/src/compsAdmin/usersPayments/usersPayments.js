import React, { useEffect, useState } from 'react'
import UserPaymentSingle from './userPaymentSingle';
import SelectInput from './selectInput';
import { useSelector } from 'react-redux';
import { API_URL, doApiTokenGet } from '../../store/services/service';
import SelectTextFields from './selectTextField';
import SearchButton from '../allApartments/searchButton';
import "../../css/addAndEditBuilding.css";

const currencies = [
    {
        Id: 'APRT',
        Name: 'מספר דירות - מהנמוך לגבוה'
    },
    {
        Id: 'REVERSE-APART',
        Name: 'מספר דירות - מהגבוה לנמוך',
    },
    {
        Id: 'NAMES',
        Name: 'שמות הדיירים - מהתחלה לסוף',
    },
    {
        Id: 'REVERSE-NAME',
        Name: 'שמות הדיירים - מהסוף להתחלה',
    },
];
const months = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];
const UsersPayments = () => {
    const [years, setYears] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [usersPayments, setUserPayments] = useState(null);
    const [users, setUsers] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const building = useSelector(state => state.buildingSlice.building);

    useEffect(() => {
        const startYear = new Date(building.dateCreated).getFullYear();
        const currentYear = new Date().getFullYear();
        const yearsArr = Array.from({ length: currentYear - startYear + 1 }, (_, index) => startYear + index);
        setYears(yearsArr);
        const users_ar = [...building.users].sort((a, b) => a.numApartment - b.numApartment);
        setUsers(users_ar);
    }, [])

    useEffect(() => {
        doApi();
    }, [month, year])

    const doApi = async () => {
        try {
            const url = API_URL + "/usersPayments/" + month + "/" + year + "/" + building._id;
            const { data } = await doApiTokenGet(url);
            setUserPayments(data);
        }
        catch (err) {
            console.log(err.response?.data?.msg);
        }
    }

    const handleChange = ({ target }) => {
        let users_ar = [...users];
        const collator = new Intl.Collator('he-IL', { sensitivity: 'base' });

        switch (target.value) {
            case 'APRT': users_ar.sort((a, b) => a.numApartment - b.numApartment); break;
            case 'REVERSE-APART': users_ar.sort((a, b) => b.numApartment - a.numApartment); break;
            case 'NAMES': users_ar.sort((a, b) => collator.compare(a.fullName.firstName, b.fullName.firstName)); break;
            case 'REVERSE-NAME': users_ar.sort((a, b) => collator.compare(b.fullName.firstName, a.fullName.firstName)); break;
        }
        setUsers(users_ar)
    }

    return (
        <div className='container-fluid'>
            <div className='p-4 container mx-auto'>
                <div className='row gx-0 col-9 shadow filter-area'>
                    <div className="col-3 mt-2">
                        <SelectTextFields handleChange={handleChange} currencies={currencies} text={"סינון"} />
                    </div>
                    <SelectInput arr={months} name={"חודש"} value={month} setValue={setMonth} />
                    <SelectInput arr={years} name={"שנה"} value={year} setValue={setYear} />
                    <div className="col-3 mt-3">
                        <SearchButton search={({ target }) => setSearchValue(target.value)} />
                    </div>
                    {/* </div> */}
                    {/* <div className="row"> */}

                </div>
                <div className='row gx-0 justify-content-between p-0 m-0'>
                    {users.length > 0 && usersPayments && users.map(item => {
                        if (item?.fullName?.firstName.includes(searchValue)
                            || item?.fullName?.lastName.includes(searchValue))
                            return <div key={item._id} className='col-md-3 my-3 px-4'>
                                <UserPaymentSingle item={item} payments={usersPayments} year={year} month={month} />
                            </div>
                    })}
                </div>
            </div>
        </div>)
}

export default UsersPayments