import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine,
    ResponsiveContainer,
    Cell,
  } from 'recharts';

export const BarChartComponent = (props) =>{
    const {data} = props;
    console.log({data})
  return (
    <ResponsiveContainer width="100%" height="100%">
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
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="savings" fill="#8884d8" >
          {data.map((entry, index) => {
            console.log({entry})
          return(
          <Cell key={`cell-${index}`} fill={entry.savings>0 ? "#82ca9d" : "#f50057"}  />
        )})}
            </Bar>
        </BarChart>
      </ResponsiveContainer>
  )
}

export default BarChart