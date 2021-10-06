import React from 'react';
import "./WalkerInfoCard.css"

import BeautyStars from 'beauty-stars';

function WalkerInfoCard({ walker }) {
    return (
        <div className="avatar-container mx-auto">
            <div className="left-side">
                <div className="suburb">
                    <h4>Suburb</h4>
                    <p>{walker.suburb}</p>
                </div>
            </div>
            <div className="avatar text-center center-side">
                <img src="https://i.pravatar.cc/200" className=" rounded-circle img-responsive bg-white p-3 image" alt="woman avatar" />
                <h1>{walker.firstname}</h1>
            </div>
            <div className="right-side">
                <div className="rating">
                    <h1>{walker.rating}</h1>
                    <BeautyStars
                        value={walker.rating}
                        size={".75rem"}
                        inactiveColor="white"
                    />


                </div>
            </div>

        </div>
    );
}

export default WalkerInfoCard;