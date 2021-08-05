import React from 'react';
import MasterScreen from './Master/MasterScreen';
import NotFoundContent from './NotFoundContent';

function NotFoundScreen(props) {
    return (
        <div className="">
            <MasterScreen
                ScreenComponent={NotFoundContent}
                heading={"Not Found"}
            />
        </div>
    );

}

export default NotFoundScreen;