import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./ListingsDetailContent.css"

import useApi from '../hooks/useApi';
import bookingsApi from '../api/bookings';
import WalkerInfoCard from '../Components/UI/Card/WalkerInfoCard';
import JobInfoCard from '../Components/UI/Card/JobInfoCard';
import DogInfoCard from '../Components/UI/Card/DogInfoCard';
import AuthContext from '../context/authContext';



function ListingsDetailContent(props) {
    const { bookingId } = useParams();
    const { user } = useContext(AuthContext);
    const { data, request: getBooking } = useApi(bookingsApi.getBookingDetails);

    const loadData = async () => {
        try {
            await getBooking(bookingId, user.type);

        } catch (error) {
            console.log("error = ", error)
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <div className="listings-deatail-container">
                <div className="listing-detail-top-container">
                    {user.type === "W" ? <div className="listing-detail-doginfo-container">
                        {data.dogInfo ? <DogInfoCard dog={data.dogInfo} /> : <h1>dog info empty</h1>}
                    </div> :

                        <div className="listing-detail-walkerinfo-container">
                            {data.walkerInfo ? <WalkerInfoCard walker={data.walkerInfo} /> : <h1>Job Unassigned</h1>}
                        </div>
                    }
                </div>
                <div className="listing-detail-bottom-container">

                    <div className="listing-detail-jobinfo-container">

                        {data.jobInfo ? <JobInfoCard job={data.jobInfo} type={user.type} /> : <h1>booking empty</h1>}
                    </div>
                </div>
            </div >

        </>
    );
}

export default ListingsDetailContent;