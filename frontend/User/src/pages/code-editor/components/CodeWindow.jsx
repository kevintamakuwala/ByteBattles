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
import { useLocation, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../constants";
import LoadingIndicator from "../../../common/LoadingIndicator";

const cppDefault = `#include<bits/stdc++.h>
using namespace std;

signed main() {
  cout << "Welcome to Byte Battles...";
}
`;

const CodeWindow = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(cppDefault);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState();
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(languageOptions[0]);

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const location = useLocation();

  const problemTitle = location.pathname
    .replace(/^\/problems\//, "")
    .replace(/-/g, " ");

  const [problemData, setProblemData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        if (location.state && location.state.problem !== undefined) {
          data = location.state.problem;
        } else {
          const response = await fetch(
            `${API_BASE_URL}/problems/title/${problemTitle}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );

          if (response.ok) {
            data = await response.json();
          } else {
            alert("Invalid Problem");
            navigate("/problemset/");
            return;
          }
        }
        setProblemData(data);
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };

    fetchData();
  }, [location.state, problemTitle]);

  // Rest of your component code...

  const onSelectChange = (sl) => {
    setLanguage(sl);
  };

  useEffect(() => {
    if (enterPress && ctrlPress) {
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

  const handleCompile = (formData) => {
    setProcessing(true);

    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        Authorization: true,
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        // Key-1:
        // "X-RapidAPI-Key": "a947ffeda4msh650089f42152dfdp1a205cjsnebeda844ebe8",
        
		// Key-2:
        // "X-RapidAPI-Key": "f30831f1b1mshaecab54a43c6574p121731jsn22ac1ef78751",

        // Key-3:
        // "X-RapidAPI-Key": "7d17e17a3emshadc9a4db55ca221p134345jsn04d17d4a4f2f",
		
		// Key-4:
		'X-RapidAPI-Key': '364f61d56dmshfa3e94f46c1408cp19896bjsn9cb3a3f1b27c',
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        let status = err.response.status;
        if (status === 429) {
          showErrorToast(`Quota of 100 requests exceeded for the Day!`, 10000);
        }
        setProcessing(false);
      });

    setExpanded(false);
  };
  const handleRun = () => {
    const formData = {
      language_id: language.id,
      source_code: btoa(code),
      stdin: btoa(customInput),
    };
    handleCompile(formData);
  };

  const runTestCases = async (formData, expectedOutput) => {
    setProcessing(true);

    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        Authorization: true,
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        // Key-1:
        // "X-RapidAPI-Key": "a947ffeda4msh650089f42152dfdp1a205cjsnebeda844ebe8",
        
		// Key-2:
        // "X-RapidAPI-Key": "f30831f1b1mshaecab54a43c6574p121731jsn22ac1ef78751",

        // Key-3:
        // "X-RapidAPI-Key": "7d17e17a3emshadc9a4db55ca221p134345jsn04d17d4a4f2f",
		
		// Key-4:
		'X-RapidAPI-Key': '364f61d56dmshfa3e94f46c1408cp19896bjsn9cb3a3f1b27c',
      },
      data: formData,
    };

    try {
      let response = await axios.request(options);
      const token = response.data.token;

      let status = undefined;

      while (status === undefined) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        status = await checkStatus(token, true, expectedOutput);
      }
      return status;
    } catch (err) {
      showErrorToast("Error in runTestCases");
      setProcessing(false);
      setExpanded(false);
      return false;
    }
  };

  const handleSubmit = async () => {
    const testCaseList = problemData.testCaseList;
    let allTestCasesPassed = true;

    for (let i = 0; i < testCaseList.length; i++) {
      const formData = {
        language_id: language.id,
        source_code: btoa(code),
        stdin: btoa(testCaseList[i].input),
      };

      const status = await runTestCases(
        formData,
        testCaseList[i].expectedOutput
      );

      if (status === false) {
        allTestCasesPassed = false;
        showErrorToast(`Wrong Answer on Test Case ${i + 1}`);
        break;
      }
    }

    if (allTestCasesPassed) {
      showSuccessToast("Accepted");
    }
  };

  const checkStatus = async (token, submit = false, expectedOutput = null) => {
    const options = {
      method: "GET",
      url: "https://judge0-ce.p.rapidapi.com/submissions/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        // Key-1:
        // "X-RapidAPI-Key": "a947ffeda4msh650089f42152dfdp1a205cjsnebeda844ebe8",
        
		// Key-2:
        // "X-RapidAPI-Key": "f30831f1b1mshaecab54a43c6574p121731jsn22ac1ef78751",

        // Key-3:
        // "X-RapidAPI-Key": "7d17e17a3emshadc9a4db55ca221p134345jsn04d17d4a4f2f",
		
		// Key-4:
		'X-RapidAPI-Key': '364f61d56dmshfa3e94f46c1408cp19896bjsn9cb3a3f1b27c',
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          checkStatus(token, submit, expectedOutput);
        }, 2000);
      } else {
        setProcessing(false);
        let ans = false;
        if (submit === false) {
          setOutputDetails(response.data);
          showSuccessToast(`Compiled Successfully!`);
        } else {
          statusId = response.data?.status?.id;
          if (statusId === 3) {
            if (atob(response.data.stdout) !== null) {
              return atob(response.data.stdout) === expectedOutput;
            } else showErrorToast("Error");
          }
        }
        return ans;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      showErrorToast();
    }
  };

  function handleThemeChange(th) {
    const theme = th;

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

  const [expanded, setExpanded] = useState(true);

  const toggleCodeEditorHeight = () => {
    setExpanded(!expanded);
  };

  if (
    localStorage.getItem("id") !== null &&
    localStorage.getItem("id") !== undefined
  ) {
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
          <div className="m-auto ms-8 w-3/4 text-xl md:text-2xl font-semibold font-serif py-3 md:w-screen pb-2 mb-6 md:fixed md:z-10 top-0 md:left-0 lg:left-[2%] md:mt-[4rem] lg:mt-[5rem] md:pt-[3%] md:h-[15%] lg:h-12 lg:pt-2 md:bg-slate-950 underline underline-offset-[1rem]">
            {problemData?.problemId}. {problemData?.title}
          </div>

          <div className="flex flex-col md:flex-row md:h-[77.7vh] border-2  overflow-y-scroll overflow-x-hidden border-slate-950 md:mt-[3rem]">
            <div className="left problem sm:w-screen md:w-[42%] md:overflow-y-scroll md:border-r border-gray-600 ps-6 lg:-mt:8">
              <div className="overflow-y-scroll">
                {!problemData ? (
                  <LoadingIndicator />
                ) : (
                  <ProblemDescription problem={problemData} />
                )}
              </div>
            </div>
            <div className="right w-screen md:w-[58%] flex flex-col md:overflow-y-scroll md:border-r border-gray-600 sm:px-6 md:pl-6">
              <div className="h-fit">
                <div className="flex justify-center md:justify-start max-[400px]:flex-col max-[400px]:items-center min-[767px]:flex-col min-[846px]:flex-row min-[767px]:items-start ">
                  <div className="md:px-2 py-2">
                    <LanguagesDropdown onSelectChange={onSelectChange} />
                  </div>
                  <div className="md:px-4 py-2">
                    <ThemeDropdown
                      handleThemeChange={handleThemeChange}
                      theme={theme}
                    />
                  </div>
                </div>

                <div
                  style={{ height: "56vh", transition: "height 0.3s ease" }}
                  className="mt-2"
                >
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

              <div
                className={`w-full md:mb-12 ${
                  expanded
                    ? ""
                    : "mt-[-40vh] bg-opacity-40 bg-gray-700 box-shadow-blur backdrop-blur-sm rounded-xl transition-all duration-300 ease-in-out z-40 w-[98%]"
                }`}
              >
                <div
                  className={`flex flex-col md:w-[98%] md:ml-[1%] md:h-fit min-[550px]:flex-row max-[850px]:mt-[6%]  `}
                >
                  <div className="w-screen ms-0 min-[550px]:w-4/12 h-full">
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

              <div className="fill-available flex w-[99%] md:w-[56.5%] justify-center md:justify-between md:px-7 bg-gray-900 border-2 border-gray-600 md:fixed md:bottom-0 pb-2 bg-opacity-70 md:-ml-[1.5rem] z-50">
                <div className="">
                  <button
                    onClick={toggleCodeEditorHeight}
                    className="mt-2 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md  focus:ring focus:ring-blue-300 focus:outline-none active:bg-blue-600 text-base transition duration-300 ease-in-out flex items-center"
                  >
                    Console
                    {expanded ? (
                      <MdOutlineKeyboardDoubleArrowUp className="ms-2 text-2xl" />
                    ) : (
                      <MdOutlineKeyboardDoubleArrowDown className="ms-2 text-2xl" />
                    )}
                  </button>
                </div>
                <div className="flex">
                  <button
                    onClick={handleRun}
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
                    onClick={handleSubmit}
                    disabled={!code}
                    className={classnames(
                      "bg-green-500 hover:bg-green-600 focus:ring focus:ring-green-300 focus:outline-none active:bg-green-700 text-white transition duration-300 ease-in-out mt-2 w-32 ml-4 text-lg border border-black rounded-md px-4 py-1 hover:shadow flex-shrink-0 font-bold",
                      !code ? "opacity-50" : ""
                    )}
                  >
                    Submit
                  </button>
                </div>
              </div>

              {/* {outputDetails && <OutputDetails outputDetails={outputDetails} />} */}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    navigate("/login");
    window.scrollTo(0, 0);
  }
};
export default CodeWindow;
