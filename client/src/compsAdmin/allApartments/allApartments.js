import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { API_URL, doApiMethodToken, doApiTokenGet } from '../../store/services/service';
import SelectTextFields from '../usersPayments/selectTextField';
import ApartmentSingle from './apartmentSingle';
import SearchButton from './searchButton';
import { IndeterminateCheckBox } from '@mui/icons-material';
import { currentBuilding } from '../../store/features/buildingSlice';

const currencies = [
    {
        Id: 'TENANTS',
        Name: 'דיירים רשומים'
    },
    {
        Id: 'NO_DATA',
        Name: 'דירות ללא נתונים',
    },
    {
        Id: 'REGISTERED',
        Name: 'דיירים שטרם נרשמו',
    },
    {
        Id: 'ALL',
        Name: 'הצג הכל',
    },
];
const AllApartments = () => {
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const [arr, setArr] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const building = useSelector(state => state.buildingSlice.building);

    useEffect(() => {
        let ar = new Array(building.numApartments).fill("")

        setUsers(ar);
        let usersBuildings = [...building.users];
        usersBuildings = usersBuildings.sort((a, b) => a.numApartment - b.numApartment);

        for (let i = 0; i < building.numApartments; i++) {
            ar[i] = { numApartment: i + 1, fullName:{firstName:'', lastName:''} };
        }
        usersBuildings.forEach(x => {
            ar[x.numApartment - 1] = { ...x };
        });
        setUsers(ar)
        setArr(ar)
    }, [building]);
    console.log(users)
    const deleteUser = async (user, index) => {
        try {
            const url = API_URL + "/users/changeActive/" + user._id + "/" + building._id;
            const { data } = await doApiMethodToken(url, "PATCH");
            console.log(data);
            let updatedArray = [...building.users]; 
            console.log(index)
            updatedArray = updatedArray.filter(x => x.numApartment!=index+1);
            console.log(updatedArray);
            const updatedObject = { ...building, users: [...updatedArray] };
            console.log(updatedObject)
            dispatch(currentBuilding({ building: updatedObject }));
            updatedArray[index] =  { numApartment: index + 1, fullName:{firstName:'', lastName:''} };
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleChange = ({ target }) => {
        let users_ar = [...users];
        const collator = new Intl.Collator('he-IL', { sensitivity: 'base' });

        switch (target.value) {
            case 'TENANTS': users_ar = users_ar.filter(x => x?.fullName?.firstName.length > 0); break;
            case 'NO_DATA': users_ar = users_ar.filter(x => x.email == x.active); break;
            case 'REGISTERED': users_ar = users_ar.filter(x => x?.fullName?.firstName.length == 0); break;
            case 'ALL': users_ar = [...users]; break;
        }
        console.log('users_ar', users_ar)
        setArr([...users_ar])
    }
    console.log('arr', arr)
    return (
        <div className='p-5'>
            <div className='row gx-0 justify-content-between px-3'>
                <div className='col-4'>
                <SelectTextFields handleChange={handleChange} currencies={currencies} text={"סינון"} />
               </div>
                <div className='col-3 mt-3' style={{paddingRight:"58px"}}>
                <SearchButton search={({ target }) => setSearchValue(target.value)}  />
            </div>
            </div>
            <div className='row gx-0 justify-content-between mt-2'>
                {arr.length > 0 ? arr.map((item, index) => {
                    if (item?.fullName?.firstName.includes(searchValue)
                        || item?.fullName?.lastName.includes(searchValue))
                        return <div key={index} className='col-md-3 px-4 my-3'>
                            <ApartmentSingle user={item} deleteUser={() => deleteUser(item,index)} />
                        </div>
                }) : <p>אין נתונים.</p>}
            </div>
        </div>)
}

export default AllApartments;