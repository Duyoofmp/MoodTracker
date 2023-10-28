import { useEffect,useState } from "react";
import NewJournal from "./NewJournal";
import axios from "../api/axios";
import DashboardChartLayout from "./DashboardChartLayout";


const DashboardLayout = () => {

	const [array,setArray] = useState(null)


	const fetchData = async () => {
		const userId = localStorage.getItem("userId");
		try {
			const {data} = await axios.get("/getDailyEmotion", {
				params: { userId: userId ,Day:"yes"},
			});

			 setArray(data.DataArray);

			
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []); 

	return (
		<div className="flex flex-col ">
			<div className="flex justify-between overflow-x-hidden  w-full mt-10 pl-10">
				<div className="flex flex-col gap-4  md:mt-5 sm:gap-14">
					<h2 className="text-3xl">Mood Analyser</h2>
					<p className="text-gray-400">Analysis</p>
				</div>
			<NewJournal/>
			</div>
			<div className=" -ml-10 mt-5 sm:ml-10">
				<DashboardChartLayout data={array}/>
			</div>
		</div>
	);
};

export default DashboardLayout;
