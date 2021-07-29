import React from 'react';
import "./DogInfoCard.css"
function DogInfoCard({ dog }) {

    return (
        <div data-aos="flip-left" className="avatar-container mx-auto">
            <div className="left-side">
                <div className="breed">
                    <h4>Breed</h4>
                    <p>{dog.dog_breed}</p>
                </div>
                <div className="leashed">
                    <h4>Leashed</h4>
                    <p>{dog.dog_always_leashed ? "Yes" : "No"}</p>
                </div>
            </div>
            <div className="avatar text-center center-side">
                <img src="https://placedog.net/300?random" className=" rounded-circle img-responsive bg-white p-3 image" alt="woman avatar" />
                <h1>{dog.dog_firstname}</h1>
            </div>
            <div className="right-side">
                <div className="size">
                    <h4>Size</h4>
                    <p>{dog.dog_size}</p>
                </div>
            </div>

        </div>

    );
}



export default DogInfoCard;