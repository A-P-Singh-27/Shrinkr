import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

export default function LocationStats({ stats }) {
    const cityCount = stats.reduce((acc, item) => {
        if (acc[item.city]) {
            acc[item.city] += 1;
        } else {
            acc[item.city] = 1;
        }
        return acc;
    },{})
    // console.log(cityCount);
    
    const cities = Object.entries(cityCount).map(([city,count])=>({
        city,
        count,
    }));

    return (
        <ResponsiveContainer width={"100%"} height={300}>
            <LineChart data={cities?.slice(0,5)} margin={{ top: 20 }} accessibilityLayer>
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="city" className="md:text-[10px] lg:text-sm"/>
                <YAxis />
                <Tooltip labelStyle={{ color: 'green' }} />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                ></Line>
            </LineChart>
        </ResponsiveContainer>
    );
}
