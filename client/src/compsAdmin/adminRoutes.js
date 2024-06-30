import React from 'react';
import {Route} from "react-router-dom"
import Login from '../generalComps/login/login';
import AllComplaints from './complaint/allComplaints';
import SingleComlaint from './complaint/singleComlaint';
import UsersPayments from './usersPayments/usersPayments';
import AddAndEditBuilding from './addEndEditBuilding/addAndEditBuilding';
import AllApartments from './allApartments/allApartments';
import HomePageBuilding from '../compsUser/homePageBuilding/homePageBuilding';
import AllExpenses from "./expenses/allExpenses";

export const adminRoutes = () => {
  return (
    <React.Fragment>
      <Route path="/admin" element={<Login />} />
      <Route path="/admin/usersPayments" element={<UsersPayments />} />
      <Route path="/admin/allComplaints" element={<AllComplaints />} />
      <Route path="/admin/singleComplaint/:id" element={<SingleComlaint />} />
      <Route path="/admin/addAndEditBuilding/:id" element={<AddAndEditBuilding type="edit"/>} />
      <Route path="/admin/addAndEditBuilding" element={<AddAndEditBuilding type="new"/>} />
      <Route path="/admin/homePage" element={<HomePageBuilding />} />
      <Route path="/admin/allApartments" element={<AllApartments/>} />
      <Route path="/admin/allExpenses" element={<AllExpenses />} />
    </React.Fragment>
  )
}