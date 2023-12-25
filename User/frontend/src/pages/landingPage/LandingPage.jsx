import React from 'react'
import Home from './home/Home'
import Purpose from './purpose/Purpose'
import Review from './reviews/Review'

const LandingPage = () => {
  return (
    <div className="LandingPage">
      <Home />
      <Purpose />
      <Review />
      </div>
  )
}

export default LandingPage