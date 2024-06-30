import React from 'react';
import Carousel2 from './carousel';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NavBar from '../../generalComps/navBar/avatar';
import '../../css/homePageBuilding.css';
import NoteWithPin from '../messages/allMessages';
import Statistic from '../../generalComps/statistics/statistic';
import Map from '../../generalComps/map/map';
import userEvent from '@testing-library/user-event';
import { API_URL, doApiTokenGet } from '../../store/services/service';
import { currentUser } from '../../store/features/userSlice';
import { currentBalance, currentBuilding } from '../../store/features/buildingSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const HomePageBuilding = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const building = useSelector(state => state.buildingSlice.building);
  console.log(building);

  useEffect(() => {
    setLoading(true);
    doApi();
  }, []);

  const doApi = async () => {
    try {
      const url = API_URL + '/users/myInfo';
      const { data } = await doApiTokenGet(url);
      dispatch(currentUser({ user: data.user }))
      dispatch(currentBuilding({ building: data.user.buildId }))
      dispatch(currentBalance({ balance: data.balance }));
      // navigate("/buildingHomePage")
      setLoading(false);

    }
    catch (err) {
      console.log(err.response?.data?.msg);
    }
  }
  return (<div className="homePage">
  <div className='container'>
    {!loading ? <div className="row gx-0 parent-container">
      <aside className="messages col-md-3 px-4 ps-5 pb-4">
        <NoteWithPin />
      </aside>

      <main className='col-md-9 px-5'>

        <section>
          <h1 className='mb-5 pt-5'> {building.street} {building.num} {building.city} </h1>
          {/* <p>This is the main content of my page.</p> */}
          <Carousel2 />
        </section>

        <Statistic />

        <section className='my-5'>
          <h4 className=" mb-4 fw-bold"> אנחנו כאן </h4>
          <Map type={2} lat={building.lat} lng={building.lng} />
        </section>

      </main>
    </div> : <div className='center'><img src="/images/loading.gif" width="400" /></div>}
  </div>
  </div>
  );
};

export default HomePageBuilding;
