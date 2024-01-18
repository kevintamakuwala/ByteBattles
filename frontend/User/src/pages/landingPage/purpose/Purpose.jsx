import React from 'react'
import "../purpose/Purpose.css"
import MAANG from "../../../assets/maang.png"
import Contests from "../../../assets/contests.png"
import Problems from "../../../assets/problems.png"
import PurposeImg from "../../../assets/purpose.png"
import CheckMark from "../../../assets/checkmark.png"


const Purpose = () => {
    return (
        <div className='wrapper__container'>
            <div className='work_container'>
                <div className='work-box'>
                    <div className='maang-div'>
                        <img src={MAANG} alt="maang" draggable={false} className='maang-img' />
                        <div className='work-description'>
                            <h1>MAANG</h1>
                            <p>interviews</p>
                        </div>
                    </div>
                    <div class="vertical-line"></div>
                    <div className='maang-div'>
                        <img src={Contests} alt="maang" draggable={false} className='maang-img' />
                        <div className='work-description'>
                            <h1>Weekly</h1>
                            <p>Contests</p>
                        </div>
                    </div>
                    <div class="vertical-line"></div>
                    <div className='maang-div'>
                        <img src={Problems} alt="maang" draggable={false} className='problems-img' />
                        <div className='work-description'>
                            <h1>2000+</h1>
                            <p>Problems</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='purpose_container'>
                <div className='left-div'>
                    <img src={PurposeImg} alt="" srcset="" draggable='false' />
                </div>
                <div className='right-div'>
                    <h1 className='purpose-heading'>Why Us?</h1>
                    <div className='purpose-points'>
                        <div className='purposes'>
                            <img src={CheckMark} alt="" draggable={false} />
                            <p className='purpose-description'>Interview focused problems.</p>
                        </div>
                        <div className='purposes'>
                            <img src={CheckMark} alt="" draggable={false} />
                            <p className='purpose-description'>Join Live Contest and Hone Your Skill.</p>
                        </div>
                        <div className='purposes'>
                            <img src={CheckMark} alt="" draggable={false} />
                            <p className='purpose-description'>Track your Progress and Compete Globally.</p>
                        </div>
                        <div className='purposes'>
                            <img src={CheckMark} alt="" draggable={false} />
                            <p className='purpose-description'>Solve Problems in a time Frame.</p>
                        </div>
                        <div className='purposes'>
                            <img src={CheckMark} alt="" draggable={false} />
                            <p className='purpose-description'>Progress Analysis done by Our Software.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Purpose