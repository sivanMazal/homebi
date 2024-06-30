import * as actionType from '../features/actionType';
import axios from "axios";
import swal from 'sweetalert';

export const getUsers = () => {
    return dispatch => {
        dispatch({
            type: actionType.SET_LOADING,
            payload: true
        });
        axios.get("http://localhost:57828/api/user/Get")
            .then(response => {

                dispatch({
                    type: actionType.SAVE_ALL_USERS,
                    payload: response.data
                });
                dispatch({
                    type: actionType.SET_LOADING,
                    payload: false
                });
            })
            .catch(err => console.log(err))
    }
}

export const login = (user) => {
    return axios.post("http://localhost:57828/Api/user/post2/", user)
}

export const addUser = (user) => {
    return dispatch => {
        axios.post("http://localhost:57828/Api/user/Post", user)
            .then(x => {
                if (x.data == null)
                    alert("שם זה כבר קיים אצלנו");
                else {
                    dispatch(currentUser(x.data));
                    swal({ icon: "success", title:"נרשמת בהצלחה!",text: x.data.Name + " ברוכ.ה הבא.ה!"});
                }
            })
            .catch(err => console.log(err))
    }
}

export const updateUser = (user) => {
    return dispatch => {
        axios.put("http://localhost:57828/Api/user/Put", user)
            .then(x => {
                dispatch(currentUser(x.data));
            })
            .catch(err => console.log(err))
    }
}

export const changePassword = (user) => {
    return dispatch => {
        axios.put("http://localhost:57828/Api/user/ChangePassword", user)
            .then(x => dispatch(currentUser(x.data)))
            .catch(err => console.log(err))
    }
}

export const currentUser = (user) => {
    return {
        type: actionType.CURRENT_USER,
        payload: user
    }
}

export const getManagersUsers = () => {
    return axios.get("http://localhost:57828/Api/user/GetManagersUsers")
}

export const getUserById = (userId) => {
    return axios.get("http://localhost:57828/Api/user/GetUserById?userId=" + userId);
}

export const deleteUser = (user) => {
    return axios.delete("http://localhost:57828/Api/user/Delete", user);
}

export const getUserByEmail = (email) => {
    return axios.get("http://localhost:57828/Api/user/getUserByEmail?email=" + email);
}

export const changeUsersStatus = (users) => {
    return axios.put("http://localhost:57828/Api/user/ChangeUsersStatus", users);
}