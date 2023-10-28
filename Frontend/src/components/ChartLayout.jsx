import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
const getRandomColor = () => {
	const letters = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};

const ChartLayout = ({ Happy,Sad,Neutral }) => {

const data = [
	{ name: "Happy", data: Happy, fill: getRandomColor() },
	{ name: "Sad", data: Sad, fill: getRandomColor() },
	{ name: "Neutral", data: Neutral, fill: getRandomColor() },
];

	return (
		<div>
			<BarChart width={800} height={400} data={data}>
				<CartesianGrid strokeDasharray="9 9" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend content={() => null} />
				<Legend />
				<Bar dataKey="data" fill="#8884d8" />
			</BarChart>
		</div>
	);
};

export default ChartLayout;
