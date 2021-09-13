import React, { useEffect, useState, useContext } from "react";
import "./WalkerHistoryContent.css";
import Chart from "../Components/History/Chart";
import WalkerJobScroll from "../Components/Jobs/WalkerJobScroll";
import useApi from "../hooks/useApi";
import walkersApi from "../api/walker";
import AuthContext from "../context/authContext";

function WalkerHistoryContent(props) {
    // use the AuthContext to obtain user.id (i.e. Credential_id) for DB queries below
    const { user, setUser } = useContext(AuthContext);

    const [walkerCompletedJobs, setWalkerCompletedJobs] = useState(null);
    const [walkerHistoricalIncome, setWalkerHistoricalIncome] = useState(null);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    // lets just get the data from the database. Destructuring and storing data straight away
    const {
        // data: walkerHistoricalCompletions,
        request: getWalkerHistoricalCompletions,
    } = useApi(walkersApi.getWalkerHistoricalCompletions);

    const loadData = async () => {
        //await getWalkerHistoricalCompletions(16);
        // setLoaded(true);
    };

    const transformIncomeDataForGraph = () => {
        // console.log("Walker Data is: ", walkerCompletedJobs);
        // console.log("Income Data is: ", walkerHistoricalIncome);
    };

    useEffect(() => {
        //loadData();

        // this approach is way to only render this once and set the loaded status
        // get the Walker Data and and split into its different datasets
        const getWalkerInformation = async () => {
            const tempWalkerDataObject = await getWalkerHistoricalCompletions(
                user.id
            );
            console.log("ESDA", tempWalkerDataObject);
            setWalkerCompletedJobs(tempWalkerDataObject.data.walkerInfo);
            setWalkerHistoricalIncome(
                tempWalkerDataObject.data.walkerIncomeInfo
            );
            // the components will not show unless this flag is set to true
            setIsDataLoaded(true);
        };
        getWalkerInformation();
        if (isDataLoaded === true) {
            transformIncomeDataForGraph();
        }
    }, [isDataLoaded]);

    return (
        <>
            <div className="walker-history-container">
                <div className="walker-history-container-col1">
                    <h1>Completed Historical Walks</h1>
                    <h3>NEED TO CATER FOR 0 RECORDS</h3>
                    {/* {loaded && <WalkerJobScroll data={walkerHistoricalCompletions} />} */}
                    {isDataLoaded && (
                        <WalkerJobScroll data={walkerCompletedJobs} />
                    )}
                    <button>Calendar</button>
                </div>
                <div className="walker-history-container-col2">
                    <h1>Completed Walk Income</h1>
                    <h3>NEED TO CATER FOR 0 RECORDS</h3>
                    {isDataLoaded && (
                        <Chart graphData={walkerHistoricalIncome} />
                    )}
                    {/* <label htmlFor="chartPeriod">
                        Choose income frequency:
                    </label>

                    <select name="chartPeriod" id="chartPeriod">
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Yearly">Yearly</option>
                    </select> */}
                </div>
            </div>
            <div className="back-button">
                <button>Back</button>
            </div>
        </>
    );
}

export default WalkerHistoryContent;
