import React, { useEffect } from "react";
import "./HomeContent.css";

import lottie from "lottie-web";
import DogLottieAnim from "../../../src/Images/Homepage/10607-dog-avatar.json";
import DogLickLottieAnim from "../../../src/Images/Homepage/75980-licking-dog.json";
import DogWineLottieAnim from "../../../src/Images/Homepage/20586-illustration-walking-people-with-dog-thinking-wine.json";
import CoverPhotoImg from "../../Images/Homepage/Cover.png";
import PawsImg from "../../Images/Homepage/Dog-paw2.png";

function HomeContent(props) {
    useEffect(() => {
        lottie.loadAnimation({
            container: document.querySelector("#dogLottie"),
            animationData: DogLottieAnim,
        });
        lottie.loadAnimation({
            container: document.querySelector("#dogLickLottie"),
            animationData: DogLickLottieAnim,
        });
        lottie.loadAnimation({
            container: document.querySelector("#dogWineLottie"),
            animationData: DogWineLottieAnim,
        });
    }, []);

    return (
        <div className="home-content-container">
            <h1>Homepage</h1>

            <div className="home-content-grid-container ">
                <div className="Column1">
                    <div
                        id="dogLickLottie"
                        style={{ width: 250, height: 250 }}
                    ></div>
                </div>
                <div className="Column2">
                    <div
                        id="dogLottie"
                        style={{ width: 250, height: 250 }}
                    ></div>
                </div>
                <div className="Column3">
                    <div
                        id="dogWineLottie"
                        style={{ width: 250, height: 250 }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
export default HomeContent;
