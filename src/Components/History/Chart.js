import "./Chart.css";
import React, { PureComponent } from "react";
// import {
//     LineChart,
//     Line,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     Legend,
// } from "recharts";

import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const data = [
    // {
    //     name: "30HV",
    //     completed: 35,
    //     assigned: 75,
    //     // amt: 500,
    // },
    // {
    //     name: "30WO",
    //     completed: 135,
    //     assigned: 25,
    //     // amt: 500,
    // },
    // {
    //     name: "60HV",
    //     completed: 95,
    //     assigned: 50,
    //     // amt: 500,
    // },
    // {
    //     name: "60WO",
    //     completed: 115,
    //     assigned: 75,
    //     // amt: 500,
    // },
];

export default function Chart(props) {
    const data = props.graphData;

    return (
        <div className="chart-container">
            <center>
                <h3>Your income:</h3>
            </center>
            <ResponsiveContainer width={"100%"} height={800}>
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="service_type" />
                    <YAxis
                        dataKey="booked_income"
                        unit="A$"
                        type="number"
                        domain={[0, 500]}
                    />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="booked_income" fill="#8884d8" />
                    {/* <Bar dataKey="booking_status" fill="#82ca9d" /> */}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
