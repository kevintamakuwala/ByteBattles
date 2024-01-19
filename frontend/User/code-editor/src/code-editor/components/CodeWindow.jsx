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

	return (
		<div className="h-[100%] bg-gray-900 text-white">
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

			<div className="flex md:flex-row sm:flex-col bg-gray-800 w-full justify-between pl-[35rem] border-t-2 border-b-2 border-gray-600 fixed z-20" >
				<div className="m-auto -ml-[33rem] text-xl md:text-2xl font-semibold font-serif py-3 md:py-0">
					Id. Problem Title
				</div>
				<div className="md:flex hidden">
					<div className="px-4 py-2">
						<LanguagesDropdown onSelectChange={onSelectChange} />
					</div>
					<div className="px-4 py-2 md:visible">
						<ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
					</div>
				</div>

			</div>

			<div className="flex flex-col md:flex-row md:h-screen pt-16">
				<div className="left problem sm:w-screen md:w-8/12 md:overflow-y-scroll md:border-r border-gray-600 pr-2">
					{/* <div className="overflow-y-scroll"> */}
					<ProblemDescription />
					{/* </div> */}

				</div>
				<div className="right w-screen md:w-[55%] flex flex-col md:overflow-y-scroll sm:px-6">
					
					<div className="h-1/2 mt-2">
						<CodeEditorWindow
							code={code}
							onChange={onChange}
							language={language?.value}
							theme={theme.value}
						/>
					</div>
					<div>
						<CustomInput
							customInput={customInput}
							setCustomInput={setCustomInput}
						/>
					</div>

					<div className="mb-4 md:mb-20">
						<OutputWindow outputDetails={outputDetails} />
					</div>

					<div className="fill-available flex w-full justify-center bg-gray-900 border-2 border-gray-600 rounded-t-lg md:fixed md:bottom-0 pb-2 bg-opacity-95 md:-ml-[1.5rem]">
						<button
							onClick={handleCompile}
							disabled={!code}
							className={classnames(
								"text-green-500 hover:text-green-600 focus:ring focus:ring-green-300 focus:outline-none active:bg-green-700 transition duration-300 ease-in-out flex justify-center mt-4 w-32 border border-black rounded-md px-4 py-2 hover:shadow  bg-slate-700 hover:bg-slate-800 flex-shrink-0 text-lg font-bold",
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
								"bg-green-500 hover:bg-green-600 focus:ring focus:ring-green-300 focus:outline-none active:bg-green-700 text-white transition duration-300 ease-in-out mt-4 w-32 ml-4 text-lg border border-black rounded-md px-4 py-2 hover:shadow flex-shrink-0 font-bold",
								!code ? "opacity-50" : ""
							)}
						>
							Submit
							{/* {processing ? "Processing..." : "Submit"} */}
						</button>
					</div>

					{/* {outputDetails && <OutputDetails outputDetails={outputDetails} />} */}
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
