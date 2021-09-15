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

export default function Chart(props) {
    // obtain tje object graph data
    const data = props.graphData;

    // determine Total Income if data exists or not
    let totalIncome = null;
    if (data.length === 0) {
        totalIncome = 0;
    } else {
        for (var i = 0; i < data.length; i++) {
            totalIncome = totalIncome + parseFloat(data[i].booked_income);
        }
    }

    return (
        <div className="chart-container">
            <center>
                <h3>Your Total income:${totalIncome}</h3>
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
                        domain={[0, 300]}
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
