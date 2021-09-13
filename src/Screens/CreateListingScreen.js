import React from 'react';
import CreateListingContent from './CreateListingContent';
import MasterScreen from './Master/MasterScreen';

function CreateListingScreen(props) {
    return (
        <div className="new-listing-screen-container">
            <MasterScreen
                ScreenComponent={CreateListingContent}
                heading={"Create Listing"}
            />
        </div>
    );
}

export default CreateListingScreen;