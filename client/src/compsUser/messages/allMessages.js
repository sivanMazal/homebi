import React, { useState } from 'react';
import '../../css/message.css'; // Import the CSS file for styling
import { shallowEqual, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { API_URL, doApiMethodToken, doApiTokenGet } from '../../store/services/service';
import SingleMessage from './singleMessage';
import AddMessage from './addMessage';

const NoteWithPin = () => {
    const [messages, setMessages] = useState([]);
    const { building, user } = useSelector(state => {
        return {
            building: state.buildingSlice.building,
            user: state.userSlice.user
        }
    }, shallowEqual);

    useEffect(() => {
        doApi();
    }, [])

    useEffect(() => {
    }, [user])

    const doApi = async () => {
        try {
            const url = API_URL + "/messages/" + building._id;
            const { data } = await doApiTokenGet(url);
            console.log(data)
            setMessages(data);
        }
        catch (err) {
            console.log(err.response?.data?.msg);
        }
    }

    const addMessage = async (message) => {
        try {
            const obj = {
                buildId: building._id,
                description: message
            }
            console.log(obj)
            const url = API_URL + "/messages"
            const { data } = await doApiMethodToken(url, "POST", obj);
            console.log(data);
            doApi();
        }
        catch (err) {
            console.log(err);
        }
    }

    const editMessage = async (message, note) => {
        try {
            note.description = message;
            const url = API_URL + "/messages/" + note._id
            const { data } = await doApiMethodToken(url, "PUT", {description:message, buildId:note.buildId});
            doApi();
        }
        catch (err) {
            console.log(err);
        }
    }

    const deleteMessage = async (message) => {
        try {
            const url = API_URL + "/messages/" + message._id;
            const { data } = await doApiMethodToken(url, "DELETE");
            console.log(data);
            doApi();
        }
        catch (err) {
            console.log(err);
        }
    }

    return (<div className="sticky-element pt-4">
        <div className="row gx-0 justify-content-between">
            <h2 className='col-4'>הודעות</h2>
            {user && user.role == "admin" && <div className='col-2'>
                <AddMessage addMessage={addMessage} />
            </div>}
        </div>
        <div className="note-container">
            {messages.length > 0 ? messages.map(item =>
                <SingleMessage note={item} key={item._id} 
                deleteMessage={() => deleteMessage(item)} editMessage={editMessage} />
            ) :
                <h4>אין הודעות</h4>}
        </div>
    </div>);
};

export default NoteWithPin;
