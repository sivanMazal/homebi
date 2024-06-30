import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';
import { API_URL, doApiMethod, doApiMethodToken } from "../../store/services/service";
import axios from 'axios';
import "../../css/addImages.css";
import { useSelector } from 'react-redux';
import SingleImage from './singleImage';

const AddImages = ({ onSubmit }) => {
  const [arr, setArr] = useState(new Array(10).fill(""));
  const building = useSelector(state => state.buildingSlice.building)
  useEffect(() => {
    if (building) {
      const arr2 = [...building.images];
      const updatedArr = [...arr2, ...arr.slice(arr2.length)];
      setArr(updatedArr);
    }
  }, [building]);

  const uploadImage = (img, ind) => {
    // let body = new FormData();
    // body.set('key', 'b95fd7db2d0d4e62d4dcfcc8aff71f5b');
    // body.append('image', img);

    // return axios({
    //   method: 'post',
    //   url: 'https://api.imgbb.com/1/upload',
    //   data: body
    // })
    const formData = new FormData();
    formData.append("file", img);
    formData.append("upload_preset", "React-cloudinary");
    axios.post("https://api.cloudinary.com/v1_1/ds4cwitoo/upload", formData)
      .then((response) => {
        const url = response.data.url;
        // // מחיקת תמונה
        // if (arr[ind] !== '') {
        //   deleteImage(arr[ind]._id)
        // }
        const copy = [...arr];
        copy[ind] = url;
        setArr([...copy]);
        // setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const deleteImage = async (_id) => {
    try {
      const url = `${API_URL}/images/${_id}`;
      let { data } = await doApiMethod(url, "DELETE");
      console.log(data);
    } catch (err) {
      console.log(err)
    }
  }

  // const addImage = async (_image, _index) => {
  //   try {
  //     console.log(_image)
  //     const url = API_URL + "/images";
  //     const { data } = await doApiMethodToken(url, "POST", _image);
  //     console.log(data);
  //     const copy = [...arr];
  //     copy[_index] = data;
  //     setArr([...copy]);

  //   }
  //   catch (err) {
  //     console.log("קרתה שגיאה זמנית באתר")
  //   }
  // }

  const handleChange = async (e, ind) => {
    const image = e.target.files[0];
    await uploadImage(image, ind);
    // console.log(url.data.data.display_url);
    // if (!url.data.data.display_url) {
    //   return;
    // }

    // // מחיקת תמונה
    // if (arr[ind] !== '') {
    //   deleteImage(arr[ind]._id)
    // }

    // const img = {
    //   buildId: building?._id,
    //   image: url//url.data.data.display_url
    // }

    // הוספת תמונה
    // addImage(img, ind)

    // const copy = [...arr];
    // copy[ind] = url;
    // setArr([...copy]);

  }

const submit = async () => {
  const vec = [...arr.filter(x => x != "")]; 
  console.log(vec, building)
  if(building) {
    try {
      console.log(vec)
      const url = API_URL + '/buildings/changeImages'+building._id;
      const { data } = await doApiMethodToken(url, "PUT", vec);
      console.log(data);
    }
    catch (err) {
      console.log(err.response.data);
    }
  }
  onSubmit(vec)
}

  return <div className='container'>
    <div>
      <p>ניתן להעלות עד 10 תמונות ע"י לחיצה על כפתור הפלוס. אחרי הבחירה, בחרו תמונה ברורה כדי שתופיע בצורה הטובה ביותר. </p>
      <p> <b> אין לכם מה לדאוג, בגלריה התמונה תופיע בגודלה המקורי.</b> </p>
    </div>
    <div className='div-border'> תמונה ראשית
      <div className='div-container'>
        <SingleImage item={arr[0]} index={0} handleChange={handleChange} />
      </div>
    </div>  <hr className='my-4' />

    <h2> תמונות נוספות </h2>
    <div className="row gx-0 justify-content-between">
      {arr ? arr.map((item, index) => {
        if (index != 0)
          return <div className='div-images col-3 center' key={index}>
            <SingleImage item={item} index={index} handleChange={handleChange} />
          </div>
      }) : null}
    </div>
    <div className="text-start" style={{ position: "relative", top: "80px" }}>
      <Button variant="contained"
        size="medium"
        style={{ background: "#94db9f" }}
        onClick={submit}>
        להמשיך לשלב הבא
      </Button>
    </div>
  </div>
}
export default AddImages;