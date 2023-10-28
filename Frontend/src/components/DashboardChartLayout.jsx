import React, { useState } from "react";
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, Legend } from "recharts";

export default function DashboardChartLayout({ data }) {
  console.log(data)
  
  return (
		<div className="-mt-10 mr-2">
			<AreaChart
				width={1000}
				height={500}
				data={data}
				margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Area
					type="monotone"
					dataKey="anger"
					stroke="red"
					fill="red"
					fillOpacity={0.2}
				/>
				<Area
					type="monotone"
					dataKey="happiness"
					stroke="green"
					fill="green"
					fillOpacity={0.2}
				/>
				<Area
					type="monotone"
					dataKey="love"
					stroke="blue"
					fill="blue"
					fillOpacity={0.2}
				/>
				<Area
					type="monotone"
					dataKey="neutral"
					stroke="violet"
					fill="violet"
					fillOpacity={0.2}
				/>
				<Area
					type="monotone"
					dataKey="saddness"
					stroke="black"
					fill="black"
					fillOpacity={0.2}
				/>
			</AreaChart>
		</div>
	);
}
