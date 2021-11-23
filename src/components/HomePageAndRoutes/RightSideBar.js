import React from 'react'
import nerdyMP4 from '../../components/assets/nerdy.mp4'
import Sentence from '../../components/Sentence/Sentence'

const RightSideBar = props => {
  return (
    <div>
      <div className="nerdy-HomePageAndRoutes">
        <video autoPlay loop muted playsInline className="nerdy">
          <source src={nerdyMP4} type="video/mp4" />
        </video>

        <h1 className="hoverYellow pulse-grow">Storyverse</h1>
      </div>

      <div className="HomePageAndRoutes-sentence">
        <Sentence />
      </div>
    </div>
  )
}

export default RightSideBar
