import React from 'react'
import HomeCards from './HomeCards'

const Home = () => {
  return (
    <>
      <div className='home-banner-image'>
        <div className='home-banner-text'>
          <h1 className='white-text varela'>PairPro</h1>
          <br></br>
          <h3 className='dark-orange-text courier'>Hello, world!</h3>
          <h5 className='white-text'>We won't REST until you find your</h5>
          <h5 className='white-text'>IDEal Pair Programming Partners</h5>
        </div>
      </div>
      <HomeCards />
    </>
  )
}

export default Home
