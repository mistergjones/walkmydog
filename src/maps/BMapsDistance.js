import React, { useState, useEffect } from 'react';
import * as geokit from 'geokit';


function BMapsDistance(props) {
    const [result, setResult] = useState("");
    const [loc1, setLoc1] = useState({
        lat: -37.807548,
        lng: 144.982977

    });
    const [loc2, setLoc2] = useState([
        {
            lat: -37.770462,
            lng: 144.865282

        }, {
            lat: -37.770462,
            lng: 144.926379

        },
        {
            lat: -37.770462,
            lng: 144.865282

        }, {
            lat: -37.770462,
            lng: 144.926379

        }]);
    const [distance, setDistance] = useState([]);

    useEffect(() => {
        const distances = loc2.filter(loc => geokit.distance(loc1, loc) < 10);
        let arr = [];
        distances.map((loc) => {
            arr.push(geokit.distance(loc1, loc));
        })
        setDistance(arr)
    }, [])

    return (
        <div>

            {distance.map((d, index) => (
                <h1 key={index}>Distance = {d}</h1>
            ))}

        </div>



    );
}

export default BMapsDistance;