import { useEffect,useState } from "react";
import NewJournal from "./NewJournal";
import axios from "../api/axios";
import DashboardChartLayout from "./DashboardChartLayout";


const DashboardLayout = () => {

	const [array, setArray] = useState(null)
	const [weekArray, setWeekArray] = useState(null)
	const [isWeeklyChecked,setIsWeeklyChecked] = useState(false)


	const fetchDailyData = async () => {
		const userId = localStorage.getItem("userId");
		try {
			const {data} = await axios.get("/getDailyEmotion", {
				params: { userId: userId},
			});

			setArray(data.DataArray);

			
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

		const fetchWeeklyData = async () => {
			const userId = localStorage.getItem("userId");
			try {
				const { data } = await axios.get("/getWeeklyEmotion", {
					params: { userId: userId},
				});

				setWeekArray(data.DataArray);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

	const handleWeeklyChange = (event) => {
		setIsWeeklyChecked(!isWeeklyChecked);
	};

	console.log("daily" + array);
	console.log("daily" + weekArray);

	console.log(isWeeklyChecked)
	
	useEffect(() => {
		fetchDailyData();
		fetchWeeklyData();
	}, []); 

	return (
		<div className="flex flex-col ">
			<div className="flex justify-between overflow-x-hidden  w-full mt-10 pl-10">
				<div className="flex flex-col gap-4  md:mt-5 sm:gap-14">
					<h2 className="text-3xl">Mood Analyser</h2>
					<p className="text-gray-400">Analysis</p>
				</div>
				<NewJournal />
			</div>
			<div className="mx-auto flex  mt-10">
				<div className="mr-4">
					<input
						type="checkbox"
						id="daily"
						checked={!isWeeklyChecked}
						onChange={handleWeeklyChange}
					/>
					<label className="px-1" htmlFor="daily">
						Daily
					</label>
				</div>
				<div>
					<input
						type="checkbox"
						id="weekly"
						checked={isWeeklyChecked}
						onChange={handleWeeklyChange}
					/>
					<label className="px-1" htmlFor="weekly">
						Weekly
					</label>
				</div>
			</div>
			<div className=" -ml-10 mt-5 sm:ml-10">
				{isWeeklyChecked ? (
					<DashboardChartLayout data={weekArray} />
				) : (
					<DashboardChartLayout data={array} />
				)}
			</div>
		</div>
	);
};

export default DashboardLayout;
