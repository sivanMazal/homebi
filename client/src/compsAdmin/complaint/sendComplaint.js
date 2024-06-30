import { Button, IconButton, TextField } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { shallowEqual, useSelector } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert';
import "../../css/complaint.css";
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL, doApiMethodToken } from '../../store/services/service';

const SendComplaint = ({ handleClose, addComplaint, id }) => {
    const navigate = useNavigate();
    const { complaints, building } = useSelector(state => {
        return {
            complaints: state.buildingSlice.complaints,
            building: state.buildingSlice.building
        }
    }, shallowEqual);

    const complaint = { ...complaints.find(x => x._id == id) };
    console.log(complaint)
    const [imageError, setImageError] = useState(false);
    const [videoError, setVideoError] = useState(false);
    const [image, setImage] = useState(Object.keys(complaint).length != 0 ? complaint.image : "");
    const [video, setVideo] = useState(Object.keys(complaint).length != 0 && complaint.video ? complaint.video : "");
    const [loadingImage, setLoadingImage] = useState(false);
    const [loadingVideo, setLoadingVideo] = useState(false);


    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    });

    function getExtension(filename) {
        var parts = filename.split('.');
        return parts[parts.length - 1];
    }

    function isImage(filename) {
        var ext = getExtension(filename);
        switch (ext.toLowerCase()) {
            case 'jpg':
            case 'gif':
            case 'bmp':
            case 'png':
            case 'jpeg':
                return true;
        }
        return false;
    }

    function isVideo(filename) {
        var ext = getExtension(filename);
        switch (ext.toLowerCase()) {
            case 'm4v':
            case 'avi':
            case 'mpg':
            case 'mp4':
                return true;
        }
        return false;
    }

    const validFile = (files, type) => {
        const file = files[0].name;
        console.log(files, file)
        if (type == "image") {
            setImageError(!isImage(file));
            if (isImage(file)) {
                setLoadingImage(true);
                handleUpload(files[0], type);
            }
        }
        if (type == "video") {
            setVideoError(!isVideo(file));
            if (isVideo(file)) {
                setLoadingVideo(true);
                handleUpload(files[0], type);
            }
        }
    }

    const handleUpload = (uploadFile, type) => {
        const formData = new FormData();
        formData.append("file", uploadFile);
        formData.append("upload_preset", "React-cloudinary");
        axios.post("https://api.cloudinary.com/v1_1/ds4cwitoo/upload", formData)
            .then((response) => {
                console.log(response.data.url);
                const url = response.data.url;
                if (type == "image") {
                    setImage(url);
                    setLoadingImage(false);
                } else {
                    setVideo(url);
                    setLoadingVideo(false);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const updateComplaint = async (obj, id) => {
        try {
            const url = API_URL + "/complaints/" + id;
            const { data } = await doApiMethodToken(url, "PUT", obj);
            console.log(data);
            swal({
                icon: "success",
                title: "סיימנו!",
                text: "התלונה עודכנה בהצלחה.",
                button: "סגור",
            }).then(() => navigate("/user/allComplaints"))
            // asyncFn();
        }
        catch (err) {
            console.log("קרתה שגיאה זמנית באתר")
        }
    }


    const submit = (data) => {
        const obj = {
            video,
            image,
            buildId: building._id,
            description: data.description
        };
        if (id) {
            updateComplaint(obj, id);
        } else {
            addComplaint(obj);
        }
    }

    const onSubmit = (data) => {
        if (imageError && videoError) {
            swal({
                title: "שים ❤️",
                text: "לא הועלה וידאו או תמונה, לשלוח תלונה?",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        submit(data);
                    } else {
                        return;
                    }
                });
        } else {
            submit(data);
        }
    }

    return (
        <div className='container text-center'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3 className="mb-3"> הגשת תלונה </h3>
                <div className='center'>
                    <div style={{width:"60%"}}>
                        <TextField
                            id="outlined-multiline-static"
                            variant='outlined'
                            multiline  
                            minRows={5}
                            inputProps={{ maxLength: 1000 }}
                            {...register("description", { required: true, minLength: 10 })}
                            style={{ width: "100%" }}
                            label="תיאור"
                            defaultValue={Object.keys(complaint).length != 0 ? complaint.description : ""}
                        />

                        {errors.description?.type == "required" && <p className="text-danger">שדה זה חובה</p>}
                        {errors.description?.type == "minLength" && <p className="text-danger"> קצר מידי </p>}
                        <div className='row gx-0 justify-content-between'>
                            <div className='col-sm-5 div-images'>
                                {image?.length > 1 && <span className='close' onClick={() => { setImage("") }}>
                                    <CloseIcon /></span>}
                                <IconButton aria-label="upload picture" component="label">
                                    <input hidden type="file" {...register("image")}
                                        onChange={(event) => { validFile(event.target.files, "image"); }}
                                    />
                                    <FileUploadIcon />

                                </IconButton>
                                {image != '' ? <img src={image} className="add-img2" />
                                    : loadingImage ? <p>טוען...</p>
                                        : <p> העלאת תמונה </p>}

                                {imageError && <p className="text-danger"> יש להכניס קובץ תמונה בלבד </p>}
                            </div>

                            <div className='col-sm-5 div-images'>
                                {video?.length > 1 && <span className='close' onClick={() => { setVideo("") }}>
                                    <CloseIcon /></span>}
                                <IconButton aria-label="upload picture" component="label">
                                    <input hidden type="file" {...register("video")}
                                        onChange={(event) => { validFile(event.target.files, "video"); }}
                                    />
                                    <FileUploadIcon />
                                </IconButton>

                                {video != '' ? <video className='add-img2' controls> <source src={video}></source></video>
                                    : loadingVideo ? <p>טוען...</p>
                                        : <p> העלאת וידאו </p>}

                                {videoError && <p className="text-danger"> יש להכניס וידאו בלבד </p>}
                            </div>
                        </div>
                    </div>
                </div>
                <Button style={{ backgroundColor: "#94db9f" }} type="submit" variant='contained'> הגשה </Button>
            </form >
        </div >
    )
}

export default SendComplaint