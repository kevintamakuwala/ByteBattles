import React from "react";

const ProblemDescription = () => {
  return (
    <div className="overflow-hidden text-base md:text-lg font-sans px-8 pt-4 mb-4">
      <h2 className="text-lg md:text-xl font-semibold">Description</h2> <br />
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
      <br />
      <br />
      <h2 className="text-lg md:text-xl font-semibold">Constraints</h2>
      <div>
        <li>1 ≤ X,Y ≤ 1000</li>
      </div>
      <br />
      <br />
      <div>
        <h2 className="text-lg md:text-xl font-semibold">Sample 1</h2>

        <div className="container mx-auto mt-4 text-white">
          <table className="min-w-full bg-gray-600 border border-gray-800">
            <thead>
              <tr>
                <th className="py-2 px-4 border border-gray-800 w-1/2 text-left">
                  Input
                </th>
                <th className="py-2 px-4 border border-gray-800 w-1/2 text-left">
                  Expected Output
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border border-gray-800 w-1/2 text-left">
                  3 7
                </td>
                <td className="py-2 px-4 border border-gray-800 w-1/2 text-left">
                  21
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <br />
      <br />
      <div>
        <h2 className="md:text-xl font-semibold">Sample 2</h2>

        <div className="container mx-auto mt-4 text-white">
          <table className="min-w-full bg-gray-600 border border-gray-800">
            <thead>
              <tr>
                <th className="py-2 px-4 border border-gray-800 w-1/2 text-left">
                  Input
                </th>
                <th className="py-2 px-4 border border-gray-800 w-1/2 text-left">
                  Expected Output
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border border-gray-800 w-1/2 text-left">
                  7 8
                </td>
                <td className="py-2 px-4 border border-gray-800 w-1/2 text-left">
                  56
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProblemDescription;
