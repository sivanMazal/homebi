import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import AddMessage from './addMessage';
import '../../css/message.css';


const SingleMessage = ({ note, deleteMessage, editMessage }) => {
  const user = useSelector(state => state.userSlice.user);
  return (
    <div className="note center mb-4">
      <div className="pin-top" />
      <div className="pin-bottom" />
      <div className="note-content">
        {note.description}
        {user && user.role == "admin" && <div style={{ textAlign: "left" }}>
          <AddMessage addMessage={editMessage} type={"edit"} value={note}/>
          <DeleteIcon onClick={deleteMessage} style={{cursor:"pointer"}}/>
        </div>}
      </div>

    </div>
  );
};

export default SingleMessage;
