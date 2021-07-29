import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./ListingsDetailContent.css"

import useApi from '../hooks/useApi';
import bookingsApi from '../api/bookings';
import usersApi from '../api/users';
import dogsApi from '../api/dogs';
import WalkerInfoCard from '../Components/UI/Card/WalkerInfoCard';
import JobInfoCard from '../Components/UI/Card/JobInfoCard';
import DogInfoCard from '../Components/UI/Card/DogInfoCard';

const isWalker = true;
function ListingsDetailContent(props) {
    const { bookingId } = useParams();
    // const { data: bookingsDeatils, request: getBookingDetails } = useApi(bookingsApi.getBookingDetails);
    const { data: jobInfo, request: getBooking } = useApi(bookingsApi.getBooking);
    const { data: walkerInfo, request: getUser } = useApi(usersApi.getUser);
    const { data: dogInfo, request: getDog } = useApi(dogsApi.getDog);


    const loadData = async () => {

        const { data: booking } = await getBooking(bookingId);
        // await getUser(booking.user_id)
        // await getDog(booking.dog_id);
        // await getBookingDetails(bookingId, "W");

    }
    useEffect(() => {
        loadData();
        return () => {
            console.log("What is this");
        };
    }, []);

    return (
        <div className="listings-deatail-container">
            {/* {bookingsDeatils ? <h1>{bookingsDeatils.start_time}</h1> : <h1>Didn't work</h1>} */}
            <div className="listing-detail-top-container">
                {isWalker ? <div className="listing-detail-doginfo-container">
                    {jobInfo.dogInfo ? <DogInfoCard dog={jobInfo.dogInfo} /> : <h1>dog info empty</h1>}
                </div> :

                    <div className="listing-detail-walkerinfo-container">
                        {jobInfo.walkerInfo ? <WalkerInfoCard walker={jobInfo.walkerInfo} /> : <h1>user empty</h1>}
                    </div>
                }
            </div>
            <div className="listing-detail-bottom-container">

                <div className="listing-detail-jobinfo-container">

                    {jobInfo ? <JobInfoCard job={jobInfo} isWalker={isWalker} /> : <h1>booking empty</h1>}
                </div>
            </div>
        </div >
    );
}

export default ListingsDetailContent;