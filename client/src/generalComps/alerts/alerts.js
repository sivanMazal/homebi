import Alert from '@mui/material/Alert';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Alerts = ({message}) => {
    return <Alert iconMapping={{ success: <CheckCircleOutlineIcon fontSize="inherit" /> }} >
        {message}
      </Alert>
      
}
export default Alerts;