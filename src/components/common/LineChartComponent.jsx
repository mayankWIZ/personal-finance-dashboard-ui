import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const LineChartComponent = (props) => {
  const [data, setData] = useState(props.data);

  useEffect(() => {
    if (!props.data) {
      setData([]);
    } else {
      setData(props.data);
    }
  }, [props.data]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date"
            tickMargin={10}
          />
          <YAxis
            type="number"
            
            allowDecimals={true}
            // label="Amount"
            padding={{ left: 5, bottom: 10, right: 5, top: 10 }}
            tickMargin={10}
            minTickGap={5}
          />
          <Tooltip />
          <Legend />
            <Line
              type="bump"
              dataKey="expenses"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              name="Expenses"
            />
        </LineChart>
      </ResponsiveContainer>
    );
}
