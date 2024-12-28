import React, { useEffect, useState } from "react";
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
} from "recharts";

const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  }
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

export const BarChartComponent = (props) => {
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
      <BarChart
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
          domain={["dataMin-500", "dataMax"]}
          allowDecimals={true}
          // label="Amount"
          padding={{ left: 5, bottom: 10, right: 5, top: 10 }}
          tickMargin={10}
          minTickGap={5}
        />
        <Tooltip />
        <Legend />
        <ReferenceLine y={0} />
        <Bar
          dataKey="savings"
          fill="#8884d8"
          shape={<TriangleBar />}
          label={{ position: "right" }}
          barSize={15}
          minPointSize={15}
          name={"Savings"}
        >
          {data.map((entry, index) => {
            return (
              <Cell
                key={`cell-${index}`}
                fill={entry.savings > 0 ? "#82ca9d" : "#f50057"}
              />
            );
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;
