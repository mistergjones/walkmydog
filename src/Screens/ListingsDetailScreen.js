import React from 'react';
import "./ListingsDetailScreen.css";
import ListingsDetailContent from './ListingsDetailContent';
import MasterScreen from './Master/MasterScreen';

function ListingsDetailScreen(props) {

    return (
        <div className="new-listing-screen-container">
            <MasterScreen
                ScreenComponent={ListingsDetailContent}
                heading={"Listing Detail"}
            />
        </div>
    );
}

export default ListingsDetailScreen;