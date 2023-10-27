import { useState, useEffect, useContext } from "react";
import Avatar from "../components/Avatar";
import dashboard from "../assets/dashboard.svg";
import book from "../assets/book.svg"
// import person from "../assets/person.svg";
import logout from "../assets/logout.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { UserContext } from "../context/UserContext.jsx";
import { signout } from "../utils/auth";
import { v4 as uuidv4 } from "uuid";

const DashboardNav = () => {
	const [showMenu, setShowMenu] = useState(false);
	const [activeTab, setActiveTab] = useState("home");
	const [windowWidth, setWindowWidth] = useState(true);
	const { loggedIn, handleLogin } = useContext(UserContext);

	const handleSignout = () => {
		signout();
		handleLogin(false);
	};

	const navigate = useNavigate();
	const username = JSON.parse(localStorage.getItem("username"));

	const chatClick = () => {
		let chatId = JSON.parse(localStorage.getItem("chatId"));
		if (chatId) {
			navigate(`/dashboard/journal/${chatId}`);
		} else {
			chatId = uuidv4();
			localStorage.setItem("chatId", JSON.stringify(chatId));
			navigate(`/dashboard/journal/${chatId}`);
		}
	};

	useEffect(() => {
		if (!loggedIn) {
			navigate("/login");
		}
	}, [navigate, loggedIn]);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth > 700);
		};

		handleResize(); // Initial check on component mount

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const toggleMenu = () => {
		setShowMenu(!showMenu);
	};

	const handleTab = (tab) => {
		setActiveTab(tab);
	};

	return (
		<>
			{showMenu ? (
				<div className="fixed z-30 inset-0 bg-black bg-opacity-90 flex justify-start">
					<div className={`w-1/2 bg-white h-screen p-10 `}>
						<div
							className="float-right mt-1 -mr-4 cursor-pointer"
							onClick={toggleMenu}
						>
							<RxCross2 size={40} />
						</div>
						<div className="-ml-14 mt-20">
							<Avatar name={username} />
							<div className=" mt-5 flex flex-col gap-6  ">
								<div
									className={`flex ml-12 pl-8 border-black cursor-pointer ${
										activeTab == "home" ? " border-l-4  border-l-black-500" : ""
									} `}
									onClick={() => handleTab("home")}
								>
									<NavLink to="/dashboard">
										<div className="flex items-center">
											<img src={dashboard} />
											<p
												className={`uppercase pl-2 ${
													activeTab == "home" ? "text-black-800" : ""
												} `}
											>
												Home
											</p>
										</div>
									</NavLink>
								</div>

								<div
									className={`flex ml-12 pl-8 border-black cursor-pointer ${
										activeTab == "chat" ? " border-l-4  border-l-black-500" : ""
									} `}
									onClick={() => handleTab("chat")}
								>
									<button onClick={chatClick}>
										<div className="flex items-center">
											<img src={book} className="w-5 h-10" />
											<p className="uppercase pl-2 ">Journal</p>
										</div>
									</button>
								</div>
								<button
									onClick={handleSignout}
									className="flex ml-20 fixed bottom-10 cursor-pointer "
								>
									<img src={logout} />
									<p className="uppercase pl-2 text-gray-400 hover:text-black">
										Logout
									</p>
								</button>
							</div>
						</div>
					</div>
				</div>
			) : windowWidth ? (
				<div className={`w-1/4 border-r-2 bg-white h-screen p-10 `}>
					<div className="-ml-14 -mt-10">
						<Avatar name={username} />
						<div className=" mt-5 flex flex-col gap-6  ">
							<div
								className={`flex ml-12 pl-8 border-black cursor-pointer ${
									activeTab == "home" ? " border-l-4  border-l-black-500" : ""
								} `}
								onClick={() => handleTab("home")}
							>
								<NavLink to="/dashboard">
									<div className="flex items-center">
										<img src={dashboard} />
										<p
											className={`uppercase pl-2 ${
												activeTab == "home" ? "text-black-800" : ""
											} `}
										>
											Home
										</p>
									</div>
								</NavLink>
							</div>

							<div
								className={`flex ml-12 pl-8 border-black cursor-pointer ${
									activeTab == "chat" ? " border-l-4  border-l-black-500" : ""
								} `}
								onClick={() => handleTab("chat")}
							>
								<button onClick={chatClick} className="mr-8">
									<div className="flex items-center">
										<img src={book} className="w-5 h-10" />
										<p className="uppercase pl-2 ">Journal</p>
									</div>
								</button>
							</div>

							<button
								onClick={handleSignout}
								className="flex ml-20 fixed bottom-10 cursor-pointer "
							>
								<img src={logout} />
								<p className="uppercase pl-2 text-gray-400 hover:text-black">
									Logout
								</p>
							</button>
						</div>
					</div>
				</div>
			) : (
				<div className="mt-5 ml-5 cursor-pointer z-40" onClick={toggleMenu}>
					<RxHamburgerMenu size={40} />
				</div>
			)}
		</>
	);
};

export default DashboardNav;
