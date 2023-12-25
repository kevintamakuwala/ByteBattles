import React from 'react'
import "./Review.css"
import WorldMap from "../../../assets/worldMap.png"
import Priyansh from "../../../assets/piyush.png"
import Abhishek from "../../../assets/abhishek.png"
import Striver from "../../../assets/striver.png"
import Star from "../../../assets/star.png"
import Netflix from "../../../assets/netflix.png"
import Discord from "../../../assets/discord.png"
import Spotify from "../../../assets/spotify.png"
import Amazon from "../../../assets/amazon.png"

const Review = () => {
    return (
        <div className='review-container'>
            <div className='review-heading'>
                Trusted by Thousands of <br />
                Working Professionals and Students
            </div>
            <div className='world-map'>
                <img src={WorldMap} alt="" srcset="" draggable='false' />
            </div>
            <div className='user-reviews'>
                <div className='users'>
                    <div className='user-info'>
                        <img src={Priyansh} alt="" className='user-img' draggable='false' />
                        <div className='user-workarea'>
                            <h3>Priyansh Agarwal</h3>
                            <p>Zomato, Gurgaon</p>
                        </div>
                        <img src={Star} alt="" className='star-img' draggable='false' />
                        <p className='user-rating'>4.7</p>
                    </div>
                    <div className='review-description'>
                        <p className='review-details'>
                            “Wow... I am very happy to use ByteBattles, it turned out to be more than my expectations. Very good platform for acing CP and Interviews.”
                        </p>
                    </div>
                </div>

                <div className='users'>
                    <div className='user-info'>
                        <img src={Abhishek} alt="" className='user-img' draggable='false' />
                        <div className='user-workarea'>
                            <h3>Abhishek Saini</h3>
                            <p>Google, Bangalore</p>
                        </div>
                        <img src={Star} alt="" className='star-img' draggable='false' />
                        <p className='user-rating'>4.5</p>
                    </div>
                    <div className='review-description'>
                        <p className='review-details'>
                            “Wow... I am very happy to use ByteBattles, it turned out to be more than my expectations. Very good platform for acing CP and Interviews.”
                        </p>
                    </div>
                </div>

                <div className='users'>
                    <div className='user-info'>
                        <img src={Striver} alt="" className='user-img' draggable='false' />
                        <div className='user-workarea'>
                            <h3>Striver</h3>
                            <p>Google, Warsaw</p>
                        </div>
                        <img src={Star} alt="" className='star-img' draggable='false' />
                        <p className='user-rating'>4.6</p>
                    </div>
                    <div className='review-description'>
                        <p className='review-details'>
                            “Wow... I am very happy to use ByteBattles, it turned out to be more than my expectations. Very good platform for acing CP and Interviews.”
                        </p>
                    </div>
                </div>
            </div>

            <div className='company-reviews'>
                <img src={Netflix} alt="" className='netflix-img' draggable='false' />
                <img src={Amazon} alt="" className='amazon-img' draggable='false' />
                <img src={Discord} alt="" className='discord-img' draggable='false' />
                <img src={Spotify} alt="" className='spotify-img' draggable='false' />
            </div>

        </div>
    )
}

export default Review   