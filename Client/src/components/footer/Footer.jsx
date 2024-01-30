import React from 'react'
import "./Footer.scss"

const Footer = () => {
  return (
    <div className='footer'>
      <div className="container">
        <div className="top">
          <div className="item">
            <h2>Categories</h2>
            <span>Graphics & Design</span>
            <span>Digital Marketing</span>
            <span>Writing</span>
            <span>Video</span>
          </div>

          <div className="item">
            <h2>Categories</h2>
            <span>Music & Audio</span>
            <span>Programming & Tech</span>
            <span>Data</span>
            <span>Business</span>
          </div>

          <div className="item">
            <h2>Categories</h2>
            <span>SEO</span>
            <span>Voice Over</span>
            <span>Social Media</span>
            <span>Video Editing</span>
          </div>

          <div className="item">
            <h2>Categories</h2>
            <span>Translation</span>
            <span>Animation</span>
            <span>Design</span>
            <span>Video shoot</span>
          </div>

          <div className="item">
            <h2>Categories</h2>
            <span>Logo Design</span>
            <span>Photography</span>
            <span>Interior</span>
            <span>Sitemap</span> 
          </div>
        </div>

        <hr />
        
        <div className="bottom">
          <div className="left">
            <h2>gigCrafters<span className='dot'>.</span></h2>
            <span>A place for Achievers</span>
          </div>
          <div className="right">
            <div className="social">
              <img src="img/twitter.png" alt=""/> 
              <img src="img/facebook.png" alt=""/> 
              <img src="img/linkedin.png" alt=""/>
              <img src="img/pinterest.png" alt=""/> 
              <img src="img/instagram.png" alt=""/>   
            </div>  
            <div className="link">
              <img src="img/language.png" alt=""/>
              <span>English</span>
            </div>
            <div className="link">
              <img src="img/coin.png" alt=""/>
              <span>USD</span>
            </div>
            <img src="img/accessibility.png" alt=""/>
          </div>    
        </div>
      </div>
    </div>
  )
}

export default Footer