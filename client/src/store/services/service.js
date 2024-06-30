import axios from 'axios'
export const API_URL = "http://localhost:3001"//'https://housement.onrender.com'
export const TOKEN_NAME = "homebi";
export const regEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const regPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*.<>])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
export const regPhone = /^[0-9]+$/;

export const jobs = [
    "manager",
    "shiftManager",
    "chef",
    "waiter",
    "bartender",
    // מה עם צקר?
]
export const ItemTypes = {
    CARD: 'card'
  }
export const doApiGet = async (_url) => {
    try {
        let resp = await axios.get(_url, {
            headers: {
                'Content-Type': 'application/json',
                // "x-api-key":localStorage[TOKEN_NAME]
            }
        })
        return resp;
    } catch (err) {
        throw err;
    }
}
export const doApiTokenGet = async (_url) => {
    try {
        let resp = await axios.get(_url, {
            headers: {
                // 'Content-Type': 'application/json',
                "x-api-key": localStorage.getItem(TOKEN_NAME)
            }
        })
        return resp;
    } catch (err) {
        throw err;
    }
}

export const doApiMethodSignUpLogin = async (_url, _method, _body = {}) => {
    try {
        let resp = await axios({
            method: _method,
            url: _url,
            data: JSON.stringify(_body),
            headers: {
                'Content-Type': 'application/json',
                // "x-api-key":localStorage[TOKEN_NAME]
            }
        })
        return resp;
    } catch (err) {
        throw err;
    }
}
export const doApiMethod = async (_url, _method, _body = {}) => {
    try {
        let resp = await axios({
            method: _method,
            url: _url,
            data: JSON.stringify(_body),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return resp;
    } catch (err) {
        throw err;
    }
}
export const doApiMethodFillDetales = async (_url, _method, _body = {}) => {
    try {
        let resp = await axios({
            method: _method,
            url: _url,
            data: _body,
            headers: {
                'Content-Type': 'application/json',
                // "x-api-key":localStorage[TOKEN_NAME]
            }
        })
        return resp;
    } catch (err) {
        throw err;
    }
}

export const doApiMethodToken = async (_url, _method, _body = {}) => {
    try {
        let resp = await axios({
            method: _method,
            url: _url,
            data: _body ? JSON.stringify(_body) : {},
            headers: {
                'Content-Type': 'application/json',
                "x-api-key": localStorage[TOKEN_NAME]
            }
        })
        return resp;
    } catch (err) {
        throw err;
    }
}

export const doApiMethodRefresh = async (_url) => {
    try {
        let resp = await axios({
            method: "GET",
            url: _url,
            headers: {
                // 'Content-Type': 'application/json',
                "x-api-key": localStorage[TOKEN_NAME]
            }
        })
        return resp;
    } catch (err) {
        throw err;
    }
}

export const doApiMethodTokenNotStringify = async (_url, _method, _body = {}) => {
    try {
        let resp = await axios({
            method: _method,
            url: _url,
            data: _body ? _body : {},
            headers: {
                // 'Content-Type': 'application/json',
                "x-api-key": localStorage[TOKEN_NAME]
            }
        })
        return resp;
    } catch (err) {
        throw err;
    }
}


export const doApiMethodTokenPatch = async (_url, _method, _body = {}) => {
    try {
        let resp = await axios({
            method: _method,
            url: _url,
            data: _body,
            headers: {
                // 'Content-Type': 'application/json',
                "x-api-key": localStorage[TOKEN_NAME]
            }
        })
        return resp;
    } catch (err) {
        throw err;
    }
}