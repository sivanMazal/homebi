import React, { useRef } from 'react'
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import SearchButton from './searchButton';
import { Button } from '@mui/material';

export default function Map({ type, lat, lng, setLat, setLng }) {
    const searchProvider = new OpenStreetMapProvider();
    const inputRef = useRef();
    const [pos_ar, setPosAr] = useState([lat ? lat : 32.1630729, lng ? lng : 34.8081001]);

    const onSearchClick = () => {
        doSearchAddress();
    }

    const doSearchAddress = async () => {
        let input_val = inputRef.current.value;
        // console.log(address)
        // let input_val = address;
        let results = await searchProvider.search({ query: input_val });
        console.log(results);
        setLat(results[0].y);
        setLng(results[0].x);
        setPosAr([results[0].y, results[0].x])
    }

    return (
        <div>
            {type == 1 && <div className='col-md-4 d-flex mb-2'>
                <input onKeyDown={(e) => {
                    if (e.key == "Enter") {
                        doSearchAddress()
                    }
                }} ref={inputRef} type="search" className='form-control mapInp'
                />
                <Button onClick={onSearchClick} className='mapInp' variant='contained' style={{backgroundColor: "#ebedf0" }}>
                    <SearchIcon />
                </Button>
                {/* <button type="button"> </button> */}
            </div>}
            <MapContainer center={pos_ar} zoom={18} scrollWheelZoom={true}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <SearchMarker pos_ar={pos_ar} />
            </MapContainer>
        </div>
    )
}

const SearchMarker = (props) => {
    const map = useMap();
    map.flyTo(props.pos_ar)
    return <Marker position={props.pos_ar}>
        <Popup>המקום המבוקש</Popup>
    </Marker>
}
