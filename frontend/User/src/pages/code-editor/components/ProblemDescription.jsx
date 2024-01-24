import React, { useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { MdOutlineDone } from "react-icons/md";

// function CopyIcon({ className, onClick }) {
//   const handleCopy = () => {
//     const tdElement = document.querySelector(`.${className}`);
//     if (tdElement) {
//       const text = tdElement.textContent || tdElement.innerText;
//       onClick(text);
//     }
//   };

//   return (
//     <div onClick={handleCopy}>
//       <MdContentCopy className="mt-[6px] text-[20px] cursor-pointer" />
//     </div>
//   );
// }

function CopyIcon({ className, onClick }) {
    const handleCopy = () => {
        console.log(className);
        const tdElement = document.querySelector(`.${className}`);
        console.log('Selected Element:', tdElement);
        if (tdElement) {
            const text = tdElement.textContent || tdElement.innerText;
            console.log(text)
            onClick(text);
        }
    };

    return (
        <div onClick={handleCopy}>
            <MdContentCopy className="mt-[6px] text-[20px] cursor-pointer" />
        </div>
    );
}

const ProblemDescription = () => {

    const [copiedText, setCopiedText] = useState('');
    const [copiedStates, setCopiedStates] = useState({
        input1: false,
        output1: false,
        input2: false,
        output2: false,
      });



    const handleCopyClick = (className) => {
        const tdElement = document.querySelector(`.${className}`);
        const text = tdElement.textContent || tdElement.innerText;
        navigator.clipboard.writeText(text);
        setCopiedText(text);
        setCopiedStates((prevStates) => ({
            ...prevStates,
            [className]: true,
          }));
    };

    return (
        <div className="overflow-y-scroll text-base md:text-lg font-sans px-8 pt-4 mb-4">
            {/* lg:-mt-6  */}
            <h2 className="text-lg md:text-xl font-semibold pb-4">Description</h2>
            <div>
                Chef has invented 1-minute Instant Noodles. As the name suggests, each
                packet takes exactly 1 minute to cook.
                <br />
                Chef's restaurant has X stoves and only 1 packet can be cooked in a
                single stove at any minute.
                <br />
                How many customers can Chef serve in Y minutes if each customer orders
                exactly 1 packet of noodles?
                <br />
            </div>

            <h2 className="text-lg md:text-xl font-semibold pt-8 pb-4">Constraints</h2>
            <div>
                <li>1 ≤ X,Y ≤ 1000</li>
            </div>
            <div>
                <h2 className="text-lg md:text-xl font-semibold pt-8 pb-4">Sample 1</h2>

                <div className="container mx-auto mt-4 text-white">
                    <table className="min-w-full bg-gray-600 border border-gray-800">
                        <thead>
                            <tr>
                                <th className="border border-gray-800 py-2 ps-4">
                                    <div className="flex justify-between pe-8">
                                        <div>
                                            Input
                                        </div>
                                        <div className={`mt-[6px] text-[20px] ${copiedStates.input1 ? "text-green-400 text-[25px] mt-[2px]" : "cursor-pointer"}`}>
                                            <MdOutlineDone className={copiedStates.input1 ? "" : "hidden mt-[6px] text-[20px] text-green-600"} />
                                            <MdContentCopy className={copiedStates.input1 ? "hidden mt-[6px] text-[20px] cursor-pointer" : ""} onClick={() => handleCopyClick("input1")} />
                                        </div>
                                    </div>
                                </th>
                                <th className="border border-gray-800 py-2 ps-4">
                                    <div className="flex justify-between pe-8">
                                        <div>
                                            Output
                                        </div>
                                        <div className={`mt-[6px] text-[20px] ${copiedStates.output1 ? "text-green-400 text-[25px] mt-[2px]" : "cursor-pointer"}`}>
                                            <MdOutlineDone className={copiedStates.output1 ? "" : "hidden mt-[6px] text-[20px] text-green-600"} />
                                            <MdContentCopy className={copiedStates.output1 ? "hidden mt-[6px] text-[20px] cursor-pointer" : ""} onClick={() => handleCopyClick("output1")} />
                                        </div>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-2 px-4 border border-gray-800 w-1/2 text-left input1">
                                    3 7
                                </td>
                                <td className="py-2 px-4 border border-gray-800 w-1/2 text-left output1">
                                    21
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <h2 className="md:text-xl font-semibold pt-8 pb-4">Sample 2</h2>

                <div className="container mx-auto mt-4 text-white">
                    <table className="min-w-full bg-gray-600 border border-gray-800">
                        <thead>
                            <tr>
                                <th className="border border-gray-800 py-2 ps-4">
                                    <div className="flex justify-between pe-8">
                                        <div>
                                            Input
                                        </div>
                                        <div className={`mt-[6px] text-[20px] ${copiedStates.input2 ? "text-green-400 text-[25px] mt-[2px]" : "cursor-pointer"}`}>
                                            <MdOutlineDone className={copiedStates.input2 ? "" : "hidden mt-[6px] text-[20px] text-green-600"} />
                                            <MdContentCopy className={copiedStates.input2 ? "hidden mt-[6px] text-[20px] cursor-pointer" : ""} onClick={() => handleCopyClick("input2")} />
                                        </div>
                                    </div>
                                </th>
                                <th className="border border-gray-800 py-2 ps-4">
                                    <div className="flex justify-between pe-8">
                                        <div>
                                            Output
                                        </div>
                                        <div className={`mt-[6px] text-[20px] ${copiedStates.output2 ? "text-green-400 text-[25px] mt-[2px]" : "cursor-pointer"}`}>
                                            <MdOutlineDone className={copiedStates.output2 ? "" : "hidden mt-[6px] text-[20px] text-green-600"} />
                                            <MdContentCopy className={copiedStates.output2 ? "hidden mt-[6px] text-[20px] cursor-pointer" : ""} onClick={() => handleCopyClick("output2")} />
                                        </div>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-2 px-4 border border-gray-800 w-1/2 text-left input2">
                                    5 10
                                </td>
                                <td className="py-2 px-4 border border-gray-800 w-1/2 text-left output2">
                                    50
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
            </div>
        </div>
    );
};

export default ProblemDescription;
