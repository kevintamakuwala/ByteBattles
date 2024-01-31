import React, { useEffect, useState } from 'react'
import { Tooltip as ReactTooltip } from "react-tooltip"

const Submission = (props) => {

    const [background, setBackground] = useState("");
    
    useEffect(() => {
        setBackground(props.background);
    }, [props.background]);

    return (
        <div className={`grid max-[466px]:grid-rows-4 items-center min-[466px]:grid-cols-5 gap-[4%] px-[3%] py-[1%] mb-[3px] text-md md:text-xl ${background} text-white font-light `} >
            <div className='truncate overflow-ellipsis min-[466px]:col-span-2 ' data-tooltip-id='submission-name' >
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </div>
            <ReactTooltip 
                id='submission-name'
                place='top'
                variant='info'
                content='Lorem ipsum dolor sit, amet consectetur adipisicing elit.'
            />
            <div className='truncate overflow-ellipsis' >
                2 days ago
            </div>
            <div className='truncate overflow-ellipsis' >
                C++
            </div>
            <div className='truncate overflow-ellipsis text-base md:text-lg' >
                Write Answer
            </div>
        </div>
    )
}

export default Submission