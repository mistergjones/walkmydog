import React from 'react';
import "./DogInfoCard.css"
function DogInfoCard({ dog }) {

    return (
        <div data-aos="flip-left" className="avatar-container mx-auto">
            <div className="left-side">
                <div className="breed">
                    <h4>Breed</h4>
                    <p>{dog.dogBreed}</p>
                </div>
                <div className="leashed">
                    <h4>Leashed</h4>
                    <p>{dog.dogAlwaysLeashed ? "Yes" : "No"}</p>
                </div>
            </div>
            <div className="avatar text-center center-side">
                <img src="https://placedog.net/300?random" className=" rounded-circle img-responsive bg-white p-3 image" alt="woman avatar" />
                <h1>{dog.dogFirstname}</h1>
            </div>
            <div className="right-side">
                <div className="size">
                    <h4>Size</h4>
                    <p>{dog.dogSize}</p>
                </div>
            </div>

        </div>

    );
}



export default DogInfoCard;