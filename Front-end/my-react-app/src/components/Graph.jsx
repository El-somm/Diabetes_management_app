
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Graph = ({ logs }) => {
    const data = logs.map((log) => ({
        timestamp: new Date(log.timestamp).toLocaleString(),
        bloodSugar: log.bloodSugar,
        insulin: log.insulin || 0, // Default to 0 if insulin is undefined
        carbs: log.carbs || 0, // Default to 0 if carbs is undefined
    }));

    return (
        <LineChart width={600} height={400} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="bloodSugar" stroke="#8884d8" name="Blood Sugar" />
            <Line type="monotone" dataKey="insulin" stroke="#82ca9d" name="Insulin" />
            <Line type="monotone" dataKey="carbs" stroke="#ffc658" name="Carbs" />
        </LineChart>
    );
};

export default Graph;