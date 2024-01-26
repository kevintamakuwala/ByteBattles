import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import axios from "axios";
import { classnames } from "../utils/general";
import { languageOptions } from "../constants/languageOptions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { defineTheme } from "../lib/defineTheme";
import useKeyPress from "../hooks/useKeyPress";
import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";
import ThemeDropdown from "./ThemeDropdown";
import LanguagesDropdown from "./LanguagesDropdown";
import ProblemDescription from "./ProblemDescription";
import { FaPlay } from "react-icons/fa";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";



const cppDefault = `
#include<bits/stdc++.h>
using namespace std;

signed main() {
  cout << "Welcome to Byte Battles...";
}
`;

const CodeWindow = () => {
	const [code, setCode] = useState(cppDefault);
	const [customInput, setCustomInput] = useState("");
	const [outputDetails, setOutputDetails] = useState();
	const [processing, setProcessing] = useState(null);
	const [theme, setTheme] = useState("cobalt");
	const [language, setLanguage] = useState(languageOptions[0]);

	const enterPress = useKeyPress("Enter");
	const ctrlPress = useKeyPress("Control");

	const onSelectChange = (sl) => {
		console.log("selected Option...", sl);
		setLanguage(sl);
	};

	useEffect(() => {
		if (enterPress && ctrlPress) {
			console.log("enterPress", enterPress);
			console.log("ctrlPress", ctrlPress);
			handleCompile();
		}
	}, [ctrlPress, enterPress]);
	const onChange = (action, data) => {
		switch (action) {
			case "code": {
				setCode(data);
				break;
			}
			default: {
				console.warn("case not handled!", action, data);
			}
		}
	};
	const handleCompile = () => {
		setProcessing(true);
		const formData = {
			language_id: language.id,
			source_code: btoa(code),
			stdin: btoa(customInput),
		};
		const options = {
			method: "POST",
			url: "https://judge0-ce.p.rapidapi.com/submissions",
			params: { base64_encoded: "true", fields: "*" },
			headers: {
				"content-type": "application/json",
				"Authorization": true,
				"X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
				"X-RapidAPI-Key": "a947ffeda4msh650089f42152dfdp1a205cjsnebeda844ebe8",
			},
			data: formData,
		};

		axios
			.request(options)
			.then(function (response) {
				console.log("res.data", response.data);
				const token = response.data.token;
				checkStatus(token);
			})
			.catch((err) => {
				let error = err.response ? err.response.data : err;
				let status = err.response.status;
				console.log("status", status);
				if (status === 429) {
					console.log("too many requests", status);

					showErrorToast(`Quota of 100 requests exceeded for the Day!`, 10000);
				}
				setProcessing(false);
				console.log("catch block...", error);
			});

			setExpanded(false);
	};

	const checkStatus = async (token) => {
		const options = {
			method: "GET",
			url: "https://judge0-ce.p.rapidapi.com/submissions/" + token,
			params: { base64_encoded: "true", fields: "*" },
			headers: {
				"X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
				"X-RapidAPI-Key": "a947ffeda4msh650089f42152dfdp1a205cjsnebeda844ebe8",
			},
		};
		try {
			let response = await axios.request(options);
			let statusId = response.data.status?.id;

			if (statusId === 1 || statusId === 2) {
				setTimeout(() => {
					checkStatus(token);
				}, 2000);
				return;
			} else {
				setProcessing(false);
				setOutputDetails(response.data);
				showSuccessToast(`Compiled Successfully!`);
				console.log("response.data", response.data);
				return;
			}
		} catch (err) {
			console.log("err", err);
			setProcessing(false);
			showErrorToast();
		}
	};

	function handleThemeChange(th) {
		const theme = th;
		console.log("theme...", theme);

		if (["light", "vs-dark"].includes(theme.value)) {
			setTheme(theme);
		} else {
			defineTheme(theme.value).then((_) => setTheme(theme));
		}
	}
	useEffect(() => {
		defineTheme("oceanic-next").then((_) =>
			setTheme({ value: "oceanic-next", label: "Oceanic Next" })
		);
	}, []);

	const showSuccessToast = (msg) => {
		toast.success(msg || `Compiled Successfully!`, {
			position: "top-right",
			autoClose: 1000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	};
	const showErrorToast = (msg, timer) => {
		toast.error(msg || `Something went wrong! Please try again.`, {
			position: "top-right",
			autoClose: timer ? timer : 1000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	};

	// const [codeEditorHeight, setCodeEditorHeight] = useState('35vh'); // Initial height

	// const toggleCodeEditorHeight = () => {
	// 	setCodeEditorHeight(prevHeight => (prevHeight === '35vh' ? '56vh' : '35vh'));
	// };

	const [expanded, setExpanded] = useState(true);

	const toggleCodeEditorHeight = () => {
		setExpanded(!expanded);
	};

	return (
		<div className="h-[100%] bg-slate-950 text-white">
			<ToastContainer
				position="top-right"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>

			<div className="flex flex-col mt-[80px] md:h-[100%] overflow-y-hidden">
				{/* <div className="flex md:flex-row sm:flex-col bg-gray-800 w-full justify-between pl-[35rem] border-t-2 border-b-2 border-gray-600" > */}
				{/* <div className="m-auto -ml-[33rem] text-xl md:text-2xl font-semibold font-serif py-3 md:py-0">
						Id. Problem Title
					</div> */}
				{/* <div className="md:flex hidden">
						<div className="px-4 py-2">
							<LanguagesDropdown onSelectChange={onSelectChange} />
						</div>
						<div className="px-4 py-2 md:visible">
							<ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
						</div>
					</div> */}

				{/* </div> */}

				<div className="m-auto ms-8 w-3/4 text-xl md:text-2xl font-semibold font-serif py-3 md:w-screen pb-2 mb-6 md:fixed md:z-10 top-0 md:left-0 lg:left-[2%] md:mt-[4rem] lg:mt-[5rem] md:pt-[3%] md:h-[15%] lg:h-12 lg:pt-2 md:bg-slate-950 underline underline-offset-[1rem]">
					Id. Problem Title
				</div>

				<div className="flex flex-col md:flex-row md:h-[77.7vh] border-2  overflow-y-scroll overflow-x-hidden border-slate-950 md:mt-[3rem]">
					{/* md:pt-4 */}
					<div className="left problem sm:w-screen md:w-[42%] md:overflow-y-scroll md:border-r border-gray-600 ps-6 lg:-mt:8">
						{/* <div className="overflow-y-scroll"> */}

						<div className="overflow-y-scroll">
							{/* md:mt-16 */}
							<ProblemDescription />
						</div>

						{/* </div> */}

					</div>
					<div className="right w-screen md:w-[58%] flex flex-col md:overflow-y-scroll md:border-r border-gray-600 sm:px-6 md:pl-6">

						<div className="h-fit">
							<div className="flex justify-center md:justify-start max-[400px]:flex-col max-[400px]:items-center min-[767px]:flex-col min-[846px]:flex-row min-[767px]:items-start ">
								{/* min-[850px]:mt-[6%] */}
								<div className="md:px-2 py-2">
									<LanguagesDropdown onSelectChange={onSelectChange} />
								</div>
								<div className="md:px-4 py-2">
									<ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
								</div>

							</div>

							<div style={{ height: "56vh", transition: 'height 0.3s ease' }} className="mt-2">
								<CodeEditorWindow
									// codeEditorHeight
									code={code}
									onChange={onChange}
									language={language?.value}
									theme={theme.value}
								// value={codeEditorHeight}
								/>
							</div>
						</div>

						<div className={`w-full md:mb-12 ${expanded ? '' : 'mt-[-40vh] md:ms-[1%] bg-opacity-40 bg-gray-700 box-shadow-blur backdrop-blur-sm rounded-xl transition-all duration-300 ease-in-out z-40 w-[98%]'}`}>
							<div className={`flex flex-col md:w-[98%] md:ml-[1%] md:h-fit min-[550px]:flex-row max-[850px]:mt-[6%]  `}>
								<div className="w-screen ms-0 min-[550px]:w-4/12 h-full">
									{/* border-2 border-red-500 mt-4 pt-[4%] pr-[2%] pl-[1%] md:h-[75%] */}
									<CustomInput
										customInput={customInput}
										setCustomInput={setCustomInput}
									/>
								</div>

								<div className="  min-[550px]:mt-4 md:mt-4 w-screen min-[550px]:w-8/12">
									<OutputWindow outputDetails={outputDetails} />
								</div>
							</div>
						</div>

						{/* <div></div> */}


						{/* <div>
							<CustomInput
								customInput={customInput}
								setCustomInput={setCustomInput}
							/>
						</div>

						<div className="mb-4 md:mb-20">
							<OutputWindow outputDetails={outputDetails} />
						</div> */}

						<div className="fill-available flex w-[99%] md:w-[56.5%] justify-center md:justify-between md:px-7 bg-gray-900 border-2 border-gray-600 md:fixed md:bottom-0 pb-2 bg-opacity-70 md:-ml-[1.5rem] z-50">

							<div className="">
								<button
									onClick={toggleCodeEditorHeight}
									className="mt-2 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md  focus:ring focus:ring-blue-300 focus:outline-none active:bg-blue-600 text-base transition duration-300 ease-in-out flex items-center"
								>
									Console
									
										{expanded ? (<MdOutlineKeyboardDoubleArrowDown className="ms-2 text-2xl"/>) : (<MdOutlineKeyboardDoubleArrowUp className="ms-2 text-2xl"/>)}
								
									
								</button>
							</div>
							<div className="flex">
								<button
									onClick={handleCompile}
									disabled={!code}
									className={classnames(
										"text-green-500 hover:text-green-600 focus:ring focus:ring-green-300 focus:outline-none active:bg-green-700 transition duration-300 ease-in-out flex justify-center mt-2 w-32 border border-black rounded-md px-4 py-1 hover:shadow  bg-slate-700 hover:bg-slate-800 flex-shrink-0 text-lg font-bold",
										!code ? "opacity-50" : ""
									)}
								>
									<FaPlay className="pt-2 text-xl" />
									{processing ? "Processing..." : "Run"}
								</button>

								<button
									onClick={handleCompile}
									disabled={!code}
									className={classnames(
										"bg-green-500 hover:bg-green-600 focus:ring focus:ring-green-300 focus:outline-none active:bg-green-700 text-white transition duration-300 ease-in-out mt-2 w-32 ml-4 text-lg border border-black rounded-md px-4 py-1 hover:shadow flex-shrink-0 font-bold",
										!code ? "opacity-50" : ""
									)}
								>
									Submit
									{/* {processing ? "Submitting..." : "Submit"} */}
								</button>
							</div>

						</div>

						{/* {outputDetails && <OutputDetails outputDetails={outputDetails} />} */}
					</div>
				</div>
			</div>



			{/* <div className="flex flex-row space-x-4 justify-between px-4 h-full overflow-hidden py-4">
        <ProblemDescription />
        
        <div className="flex flex-col w-7/12 h-full justify-start overflow-y-auto items-end">
      
          <CodeEditorWindow
            code={code}
            onChange={onChange}
            language={language?.value}
            theme={theme.value}
          />

          <div className="right-container flex flex-col-reverse w-full">
            
            <OutputWindow outputDetails={outputDetails} />
            <CustomInput
              customInput={customInput}
              setCustomInput={setCustomInput}
            />
          </div>
            <div className="flex fixed z-10 bottom-0 bg-slate-700 w-[52%]">
              <button
                onClick={handleCompile}
                disabled={!code}
                className={classnames(
                  "mt-4 w-fit  border-2 border-black z-10 rounded-md px-4 py-2 hover:shadow  bg-white flex-shrink-0",
                  !code ? "opacity-50" : ""
                )}
              >
                {processing ? "Processing..." : "Compile and Execute"}
              </button>
              <button
                onClick={handleCompile}
                disabled={!code}
                className={classnames(
                  "mt-4 w-fit  border-2 border-black z-10 rounded-md px-4 py-2 hover:shadow  bg-white flex-shrink-0",
                  !code ? "opacity-50" : ""
                )}
              >
                {processing ? "Processing..." : "Compile and Execute"}
              </button>
            </div>

            {outputDetails && <OutputDetails outputDetails={outputDetails} />}
          
        </div>
        <div className="flex fixed bottom-0 right-0 bg-slate-700 w-[53%]">
              <button
                onClick={handleCompile}
                disabled={!code}
                className={classnames(
                  "mt-4 w-fit  border-2 border-black z-10 rounded-md px-4 py-2 hover:shadow  bg-white flex-shrink-0",
                  !code ? "opacity-50" : ""
                )}
              >
                {processing ? "Processing..." : "Compile and Execute"}
              </button>
              <button
                onClick={handleCompile}
                disabled={!code}
                className={classnames(
                  "mt-4 w-fit  border-2 border-black z-10 rounded-md px-4 py-2 hover:shadow  bg-white flex-shrink-0",
                  !code ? "opacity-50" : ""
                )}
              >
                {processing ? "Processing..." : "Compile and Execute"}
              </button>
            </div>

      </div> */}
		</div>
	);
};
export default CodeWindow;










// import React, { useEffect, useState } from "react";
// import CodeEditorWindow from "./CodeEditorWindow";
// import axios from "axios";
// import { classnames } from "../utils/general";
// import { languageOptions } from "../constants/languageOptions";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import { defineTheme } from "../lib/defineTheme";
// import useKeyPress from "../hooks/useKeyPress";
// import OutputWindow from "./OutputWindow";
// import CustomInput from "./CustomInput";
// import OutputDetails from "./OutputDetails";
// import ThemeDropdown from "./ThemeDropdown";
// import LanguagesDropdown from "./LanguagesDropdown";

// const cppDefault = `
// #include<bits/stdc++.h>
// using namespace std;

// signed main() {
//   cout << "Made by Kevin Tamakuwala";
// }
// `;

// const CodeWindow = () => {
//   const [code, setCode] = useState(cppDefault);
//   const [customInput, setCustomInput] = useState("");
//   const [outputDetails, setOutputDetails] = useState();
//   const [processing, setProcessing] = useState(null);
//   const [theme, setTheme] = useState("cobalt");
//   const [language, setLanguage] = useState(languageOptions[0]);

//   const enterPress = useKeyPress("Enter");
//   const ctrlPress = useKeyPress("Control");

//   const onSelectChange = (sl) => {
//     console.log("selected Option...", sl);
//     setLanguage(sl);
//   };

//   useEffect(() => {
//     if (enterPress && ctrlPress) {
//       console.log("enterPress", enterPress);
//       console.log("ctrlPress", ctrlPress);
//       handleCompile();
//     }
//   }, [ctrlPress, enterPress]);
//   const onChange = (action, data) => {
//     switch (action) {
//       case "code": {
//         setCode(data);
//         break;
//       }
//       default: {
//         console.warn("case not handled!", action, data);
//       }
//     }
//   };
//   const handleCompile = () => {
//     setProcessing(true);
//     const formData = {
//       language_id: language.id,
//       source_code: btoa(code),
//       stdin: btoa(customInput),
//     };
//     const options = {
//       method: "POST",
//       url: "https://judge0-ce.p.rapidapi.com/submissions",
//       params: { base64_encoded: "true", fields: "*" },
//       headers: {
//         "content-type": "application/json",
//         "Authorization": true,
//         "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
//         "X-RapidAPI-Key": "a947ffeda4msh650089f42152dfdp1a205cjsnebeda844ebe8",
//       },
//       data: formData,
//     };

//     axios
//       .request(options)
//       .then(function (response) {
//         console.log("res.data", response.data);
//         const token = response.data.token;
//         checkStatus(token);
//       })
//       .catch((err) => {
//         let error = err.response ? err.response.data : err;
//         let status = err.response.status;
//         console.log("status", status);
//         if (status === 429) {
//           console.log("too many requests", status);

//           showErrorToast(`Quota of 100 requests exceeded for the Day!`, 10000);
//         }
//         setProcessing(false);
//         console.log("catch block...", error);
//       });
//   };

//   const checkStatus = async (token) => {
//     const options = {
//       method: "GET",
//       url: "https://judge0-ce.p.rapidapi.com/submissions/" + token,
//       params: { base64_encoded: "true", fields: "*" },
//       headers: {
//         "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
//         "X-RapidAPI-Key": "a947ffeda4msh650089f42152dfdp1a205cjsnebeda844ebe8",
//       },
//     };
//     try {
//       let response = await axios.request(options);
//       let statusId = response.data.status?.id;

//       if (statusId === 1 || statusId === 2) {
//         setTimeout(() => {
//           checkStatus(token);
//         }, 2000);
//         return;
//       } else {
//         setProcessing(false);
//         setOutputDetails(response.data);
//         showSuccessToast(`Compiled Successfully!`);
//         console.log("response.data", response.data);
//         return;
//       }
//     } catch (err) {
//       console.log("err", err);
//       setProcessing(false);
//       showErrorToast();
//     }
//   };

//   function handleThemeChange(th) {
//     const theme = th;
//     console.log("theme...", theme);

//     if (["light", "vs-dark"].includes(theme.value)) {
//       setTheme(theme);
//     } else {
//       defineTheme(theme.value).then((_) => setTheme(theme));
//     }
//   }
//   useEffect(() => {
//     defineTheme("oceanic-next").then((_) =>
//       setTheme({ value: "oceanic-next", label: "Oceanic Next" })
//     );
//   }, []);

//   const showSuccessToast = (msg) => {
//     toast.success(msg || `Compiled Successfully!`, {
//       position: "top-right",
//       autoClose: 1000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//     });
//   };
//   const showErrorToast = (msg, timer) => {
//     toast.error(msg || `Something went wrong! Please try again.`, {
//       position: "top-right",
//       autoClose: timer ? timer : 1000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//     });
//   };

//   return (
//     <>
//       <ToastContainer
//         position="top-right"
//         autoClose={2000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />

//       <div className="flex flex-row">
//         <div className="px-4 py-2">
//           <LanguagesDropdown onSelectChange={onSelectChange} />
//         </div>
//         <div className="px-4 py-2">
//           <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
//         </div>
//       </div>
//       <div className="flex flex-row space-x-4 items-start px-4 py-4">
//         <div className="flex flex-col w-full h-full justify-start items-end">
//           <CodeEditorWindow
//             code={code}
//             onChange={onChange}
//             language={language?.value}
//             theme={theme.value}
//           />
//         </div>

//         <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
//           <OutputWindow outputDetails={outputDetails} />
//           <div className="flex flex-col items-end">
//             <CustomInput
//               customInput={customInput}
//               setCustomInput={setCustomInput}
//             />
//             <button
//               onClick={handleCompile}
//               disabled={!code}
//               className={classnames(
//                 "mt-4 border-2 border-black z-10 rounded-md px-4 py-2 hover:shadow  bg-white flex-shrink-0",
//                 !code ? "opacity-50" : ""
//               )}
//             >
//               {processing ? "Processing..." : "Compile and Execute"}
//             </button>
//           </div>
//           {outputDetails && <OutputDetails outputDetails={outputDetails} />}
//         </div>
//       </div>
//     </>
//   );
// };
// export default CodeWindow;
