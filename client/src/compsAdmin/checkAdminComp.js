import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { API_URL, doApiGet, doApiMethodToken } from '../store/services/service';

// קומפנינטה שכל תפקידה לבדוק אם המשתמש הוא אדמין
// תתווסף בכל קומפנינטה שהמשתמש חייב להיות
// אדמין כדי לבצע פעולות בה
export default function CheckAdminComp() {
  
  let nav = useNavigate();

  useEffect(() => {
    doApi();
  },[])

  const doApi = async() => {
    try{
      let url = API_URL+"/users/checkToken"
      let resp = await doApiMethodToken(url,"GET");
      if(resp.data.role != "admin"){
        alert("מטערים אינך רשאי לגשת לדף זה, נסה להתחבר");
        nav("/admin")
      }
    }
    catch(err){
      alert("There problem ,try log in again");
      nav("/admin")
    }


  }
  
  return (
    <React.Fragment></React.Fragment>
  )
}
