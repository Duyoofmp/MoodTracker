import { useState, useEffect } from "react";
import axios from "../api/axios";
import ChartLayout from "./ChartLayout";

const Journal = () => {
	const [postContent, setPostContent] = useState("");
	const [isListening, setIsListening] = useState(false);
	const [isChartVisible, setIsChartVisible] = useState(false);
	const [positive, setPositive] = useState(0);
	const [negative, setNegative] = useState(0);
	const [neutral, setNeutral] = useState(0);

	const isChromeBrowser = /Chrome/.test(navigator.userAgent); // Check if the browser is Chrome

	const handleListen = () => {
		if (isChromeBrowser && isListening) {
			startSpeechRecognition();
			console.log("mic on");
		} else {
			stopSpeechRecognition();
			console.log("mic off");
		}
	};

	const startSpeechRecognition = () => {
		const SpeechRecognition =
			window.SpeechRecognition || window.webkitSpeechRecognition;
		const mic = new SpeechRecognition();
		mic.continuous = true;
		mic.interimResults = true;
		mic.lang = "en-US";

		mic.onresult = (event) => {
			const transcript = Array.from(event.results)
				.map((result) => result[0])
				.map((result) => result.transcript)
				.join("");
			console.log(transcript);
			setPostContent(transcript);
		};

		mic.onerror = (event) => {
			console.log(event.error);
		};

		mic.start();
	};

	const stopSpeechRecognition = () => {
		// Stop the speech recognition or do nothing if it's not available
	};

	const handleContentChange = (e) => {
		setPostContent(e.target.value);
	};

	const handleClick = async (e) => {
		e.preventDefault();
		if (isListening) {
			stopSpeechRecognition();
		}

		const userId = localStorage.getItem("userId");

		try {
			const { data } = await axios.post("/journal", {
				feedback: postContent,
				userId: userId,
			});
			setIsChartVisible(true);
			setPositive(data.journalEntry.entries.emotions.positive);
			setNegative(data.journalEntry.entries.emotions.negative);
			setNeutral(data.journalEntry.entries.emotions.neutral);
		} catch (error) {
			console.error("Error:", error);
		}
		await setPostContent("");
	};

	useEffect(() => {
		handleListen();
		return () => {
			stopSpeechRecognition();
		};
	}, [isListening]);

	return (
		<>
			<div className="flex justify-center mt-10 mx-auto bg-black h-[500px] rounded-md">
				<form className="mt-5 flex flex-col px-5">
					<label className="text-white my-3">Write about your day:</label>
					<textarea
						name="postContent"
						rows={10}
						cols={40}
						value={postContent}
						onChange={handleContentChange}
						className="p-5"
					/>
					<button
						onClick={handleClick}
						className="bg-green-400 text-black px-5 py-2 mt-3"
					>
						Submit
					</button>

					{isChromeBrowser && (
						<button
							type="button"
							onClick={() => setIsListening((prevState) => !prevState)}
							className={` h-10 mt-2 ${
								isListening ? "bg-red-500" : "bg-blue-300"
							} ${isListening ? "hover:bg-red-500" : "hover:bg-blue-500"}  `}
						>
							Record (only works on Chrome)
						</button>
					)}
				</form>
			</div>
			<div className=" -ml-10 mt-5 sm:ml-10">
				{isChartVisible ? (
					<ChartLayout
						positive={positive}
						negative={negative}
						neutral={neutral}
					/>
				) : (
					<h1></h1>
				)}
			</div>
		</>
	);
};

export default Journal;
