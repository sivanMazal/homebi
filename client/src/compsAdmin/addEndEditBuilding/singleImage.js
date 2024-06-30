import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, { useEffect, useState } from 'react';

const SingleImage = ({ item, index, handleChange }) => {
    const [loading, setLoading] = useState(false);


    // useEffect(() => {
    //     if (loading && item != "") {
    //         setLoading(false);
    //     }
    // }, [loading])

    const change = async (e, index) => {
        setLoading(true);
        const x = await handleChange(e, index);
    }
    return (
        <div>
            <IconButton aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" onChange={(e) => { change(e, index) }} />
                <AddIcon />
            </IconButton>
            {item != '' ? <img src={item} className="add-img" /> 
                : <p> העלאת תמונות </p>}
            {/* {item != '' && !loading ? <img src={item} className="add-img" /> : loading ? <p> טוען... </p>
                : <p> העלאת תמונות </p>} */}
        </div>
    )
}

export default SingleImage