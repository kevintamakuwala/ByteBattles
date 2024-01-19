// import React from 'react'
// import "../purpose/Purpose.css"
// import MAANG from "../../../assets/maang.png"
// import Contests from "../../../assets/contests.png"
// import Problems from "../../../assets/problems.png"
// import PurposeImg from "../../../assets/purpose.png"
// import CheckMark from "../../../assets/checkmark.png"


// const Purpose = () => {
//     return (
//         <div className='wrapper__container'>
//             <div className='work_container'>
//                 <div className='work-box'>
//                     <div className='maang-div'>
//                         <img src={MAANG} alt="maang" draggable={false} className='maang-img' />
//                         <div className='work-description'>
//                             <h1>MAANG</h1>
//                             <p>interviews</p>
//                         </div>
//                     </div>
//                     <div class="vertical-line"></div>
//                     <div className='maang-div'>
//                         <img src={Contests} alt="maang" draggable={false} className='maang-img' />
//                         <div className='work-description'>
//                             <h1>Weekly</h1>
//                             <p>Contests</p>
//                         </div>
//                     </div>
//                     <div class="vertical-line"></div>
//                     <div className='maang-div'>
//                         <img src={Problems} alt="maang" draggable={false} className='problems-img' />
//                         <div className='work-description'>
//                             <h1>2000+</h1>
//                             <p>Problems</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className='purpose_container'>
//                 <div className='left-div'>
//                     <img src={PurposeImg} alt="" srcset="" draggable='false' />
//                 </div>
//                 <div className='right-div'>
//                     <h1 className='purpose-heading'>Why Us?</h1>
//                     <div className='purpose-points'>
//                         <div className='purposes'>
//                             <img src={CheckMark} alt="" draggable={false} />
//                             <p className='purpose-description'>Interview focused problems.</p>
//                         </div>
//                         <div className='purposes'>
//                             <img src={CheckMark} alt="" draggable={false} />
//                             <p className='purpose-description'>Join Live Contest and Hone Your Skill.</p>
//                         </div>
//                         <div className='purposes'>
//                             <img src={CheckMark} alt="" draggable={false} />
//                             <p className='purpose-description'>Track your Progress and Compete Globally.</p>
//                         </div>
//                         <div className='purposes'>
//                             <img src={CheckMark} alt="" draggable={false} />
//                             <p className='purpose-description'>Solve Problems in a time Frame.</p>
//                         </div>
//                         <div className='purposes'>
//                             <img src={CheckMark} alt="" draggable={false} />
//                             <p className='purpose-description'>Progress Analysis done by Our Software.</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Purpose





// import React from 'react';
// import MAANG from '../../../assets/maang.png';
// import Contests from '../../../assets/contests.png';
// import Problems from '../../../assets/problems.png';
// import PurposeImg from '../../../assets/purpose.png';
// import CheckMark from '../../../assets/checkmark.png';

// const Purpose = () => {
//   return (
//     <div className="flex flex-col w-full bg-purple-900">
//       <div className="flex bg-purple-900">
//         <div className="flex items-center justify-around mx-6 w-screen bg-white rounded-2xl my-14">
//           <div className="flex items-center">
//             <img src={MAANG} alt="maang" draggable={false} className="w-24" />
//             <div className="flex flex-col items-start justify-center ml-4">
//               <h1 className="text-2xl font-bold">MAANG</h1>
//               <p>interviews</p>
//             </div>
//           </div>
//           <div className="border-l-2 border-gray-400 h-20"></div>
//           <div className="flex items-center">
//             <img src={Contests} alt="maang" draggable={false} className="w-24" />
//             <div className="flex flex-col items-start justify-center ml-4">
//               <h1 className="text-2xl font-bold">Weekly</h1>
//               <p>Contests</p>
//             </div>
//           </div>
//           <div className="border-l-2 border-gray-400 h-20"></div>
//           <div className="flex items-center">
//             <img src={Problems} alt="maang" draggable={false} className="w-34 pr-8" />
//             <div className="flex flex-col items-start justify-center">
//               <h1 className="text-2xl font-bold">2000+</h1>
//               <p>Problems</p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="flex w-full p-2 pt-3">
//         <div className="bg-purple-900 w-full">
//           <img src={PurposeImg} alt="" draggable="false" className="object-cover w-full" />
//         </div>
//         <div className="bg-purple-900 w-3/4 flex flex-col justify-center pl-2 pt-1.5">
//           <h1 className="text-white font-bold text-3xl">Why Us?</h1>
//           <div className="flex flex-col">
//             <div className="flex items-center">
//               <img src={CheckMark} alt="" draggable={false} className="w-4" />
//               <p className="pl-2 text-white">Interview focused problems.</p>
//             </div>
//             <div className="flex items-center">
//               <img src={CheckMark} alt="" draggable={false} className="w-4" />
//               <p className="pl-2 text-white">Join Live Contest and Hone Your Skill.</p>
//             </div>
//             <div className="flex items-center">
//               <img src={CheckMark} alt="" draggable={false} className="w-4" />
//               <p className="pl-2 text-white">Track your Progress and Compete Globally.</p>
//             </div>
//             <div className="flex items-center">
//               <img src={CheckMark} alt="" draggable={false} className="w-4" />
//               <p className="pl-2 text-white">Solve Problems in a time Frame.</p>
//             </div>
//             <div className="flex items-center">
//               <img src={CheckMark} alt="" draggable={false} className="w-4" />
//               <p className="pl-2 text-white">Progress Analysis done by Our Software.</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Purpose;



import React from 'react';
import MAANG from '../../../assets/maang.png';
import Contests from '../../../assets/contests.png';
import Problems from '../../../assets/problems.png';
import PurposeImg from '../../../assets/purpose.png';
import CheckMark from '../../../assets/checkmark.png';

const Purpose = () => {
  return (
    <div className='wrapper__container flex flex-col w-screen bg-slate-950 mt-8'>
      <div className='work_container flex bg-slate-950 mx:6 md:mx-0 '>
        <div className='work-box flex items-center justify-around bg-white rounded-2xl w-full mx-12 md:mx-16 md:w-screen ml:4 my-12'>
          <div className='maang-div flex items-center w-fit'>
            <img src={MAANG} alt='maang' draggable={false} className='maang-img w-7 h-7 md:w-10 md:h-10' />
            <div className='work-description flex flex-col items-start justify-center ml-2 md:ml-4'>
              <h1 className='text-sm md:text-xl lg:text-2xl font-bold'>MAANG</h1>
              <p className='text-xs md:text-lg'>interviews</p>
            </div>
          </div>
          <div className='vertical-line border-l-2 border-gray-400 h-16 my-4'></div>
          <div className='maang-div flex items-center'>
            <img src={Contests} alt='maang' draggable={false} className='maang-img w-7 h-7 md:w-10 md:h-10' />
            <div className='work-description flex flex-col items-start justify-center ml-2 md:ml-4'>
              <h1 className='text-sm md:text-xl lg:text-2xl font-bold'>Weekly</h1>
              <p className='text-xs md:text-lg'>Contests</p>
            </div>
          </div>
          <div className='vertical-line border-l-2 border-gray-400 h-16 my-2'></div>
          <div className='maang-div flex items-center'>
            <img src={Problems} alt='maang' draggable={false} className='problems-img w-9 h-7 md:w-10 md:h-10 pr-2 md:pr-4' />
            <div className='work-description flex flex-col items-start justify-center'>
              <h1 className='text-sm md:text-xl lg:text-2xl font-bold'>2000+</h1>
              <p className='text-xs md:text-lg'>Problems</p>
            </div>
          </div>
        </div>
      </div>
      <div className='purpose_container flex w-full p-2 pt-3 mx-8 my-4'>
        <div className='left-div bg-slate-950 hidden md:block w-full ms-10 pt-6'>
          <img src={PurposeImg} alt='' draggable='false' className='object-cover w-3/4' />
        </div>
        <div className='right-div bg-slate-950 w-screen md:w-screen lg:w-3/4 flex flex-col items-center justify-center lg:pl-2 mr-12 lg:me-20'>
          <h1 className='purpose-heading text-white font-bold text-2xl md:text-3xl lg:text-4xl m-autos mb-2 lg:mb-4'>Why Us?</h1>
          <div className='purpose-points flex flex-col text-base md:text-lg lg:text-xl'>
            <div className='purposes flex items-center lg:py-2'>
              <img src={CheckMark} alt='' draggable={false} className='w-5 md:w-6' />
              <p className='purpose-description pl-2 text-white'>Interview focused problems.</p>
            </div>
            <div className='purposes flex items-center py-2'>
              <img src={CheckMark} alt='' draggable={false} className='w-5 md:w-6' />
              <p className='purpose-description pl-2 text-white'>Join Live Contest and Hone Your Skill.</p>
            </div>
            <div className='purposes flex items-center py-2'>
              <img src={CheckMark} alt='' draggable={false} className='w-5 md:w-6' />
              <p className='purpose-description pl-2 text-white'>Track your Progress and Compete Globally.</p>
            </div>
            <div className='purposes flex items-center py-2'>
              <img src={CheckMark} alt='' draggable={false} className='w-5 md:w-6' />
              <p className='purpose-description pl-2 text-white'>Solve Problems in a time Frame.</p>
            </div>
            <div className='purposes flex items-center py-2'>
              <img src={CheckMark} alt='' draggable={false} className='w-5 md:w-6' />
              <p className='purpose-description pl-2 text-white'>Progress Analysis done by Our Software.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purpose;
