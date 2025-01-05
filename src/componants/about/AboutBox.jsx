import React from 'react'

const AboutBox = () => {
  return (
    <div className="about_boxes grid">
        <div className="about_box">\
            <i className="about_icon icon-fire">
                
            </i>
            <div >
                    <h3 className="about_title">198</h3>
                    <span className="about_subtitle">project completed</span>
                </div>
        </div>

        <div className="about_box">\
            <i className="about_icon icon-cup">
            </i>
            <div >
                    <h3 className="about_title">5670</h3>
                    <span className="about_subtitle">Cup of coffee</span>
            </div>
        </div><div className="about_box">\
            <i className="about_icon icon-badge">
                
            </i>
            <div >
                    <h3 className="about_title">3</h3>
                    <span className="about_subtitle">nominees winner</span>
                </div>
        </div>
    </div>
  )
}

export default AboutBox