import React from 'react'
import "./Home.css"
import CodingPerson from "../../../assets/coding-person1.png"
import {Link} from "react-router-dom"

const Home = () => {

  // const onButtongetStartedClick = useCallback(() => {
  //     // Please sync "Problem Set" to the project
  //   }, []);

  return (
    <div className='main__container'>
      <div className='left_container'>
        <p className='heading-container'>Start your coding journey today.</p>
        <p className='description-container'>Practice Competitive Programming and Data Structures & Algorithms with our diversified problemset and weekly contests.</p>
        <button className='getStart-container'><Link to="/problem">Get Started</Link></button>
      </div>
      <div className='right_container'>
        <img className='coding-img' alt='coding' loading='lazy' src={CodingPerson} draggable='false' />
      </div>
    </div>
  )
}

export default Home