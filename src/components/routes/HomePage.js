import React from 'react'
import { Link } from 'react-router-dom'

import AllImagesHomePage from './AllImagesHomePage'
import AllBlogsHomePage from './AllBlogsHomePage'

const HomePage = (props) => {
  const { user } = props
  const styles = {
    welcomeContainer: { position: 'absolute', width: '100%' },
    floatContainer: { display: 'flex', justifyContent: 'center' }
  }

  const welcomeBar = user => (
    <div className="welcomeContainer welcome-user py-4">
      <div style={{ fontSize: '25px', color: 'black', marginLeft: '15px' }}>Welcome Back, {user.username ? user.username : user.email }!</div>
    </div>
  )

  return (
    <React.Fragment>
      { user ? welcomeBar(user) : <div style={{ display: 'none' }}></div> }
      <br/>
      <div style={ styles.floatContainer }>
        <div style={{ display: 'block', marginRight: '10%' }}>
          <AllImagesHomePage
            {...props}
          />
          <Link to={'/all-images'} style={{ textAlign: 'right', color: 'white' }}>
            <p>See More</p>
          </Link>
        </div>
        <div style={{ display: 'block', marginLeft: '10%', textAlign: 'center' }}>
          <AllBlogsHomePage
            {...props}
          />
          <Link to={'/all-blogs'} style={{ textAlign: 'right', color: 'white' }}>
            <p>See More</p>
          </Link>
        </div>
      </div>
    </React.Fragment>
  )
}

export default HomePage
