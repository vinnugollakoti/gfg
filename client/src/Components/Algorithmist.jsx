import { useState, useEffect } from "react"
import coverphoto1 from '../assets/coverphoto1.jpeg'
import logo from '../assets/logo.webp'
import profile from '../assets/acclogo.webp'
import formlogo from '../assets/form.png'
import limitedlogo from '../assets/limitedppl.png'
const Algorithmist = () => {
  return (
    <div>
        <nav className="navbar">
            <div className="nav-1">
                <img src={logo} alt="" className="logo"/>
            </div>
            <div className="nav-1-1">
                <div className="nav-name"><p>Dashboard</p></div>
                <div className="nav-name"><p>Algorithmist2024</p></div>
                <div className="nav-name"><p>Members</p></div>
                <div><img src={profile} alt=""  className="profilelogo"/></div>
            </div>
        </nav>
      <div>
        <img src={coverphoto1} alt="" className="coverphoto" />
      </div>
      <div>
      <div className="model">
        <center>
        <h1 className="heading">Algorithmist <strong>2024</strong> </h1></center>
        <div>
            <div className="about">
                <div>
                <p>Algorithmist 24" is a series of coding events organized by the GFG KARE Student Chapter in sponsorship with GeeksforGeeks at Kalasalingam Academy of Research and Education. The competition comprises five rounds, each progressively raising the bar in terms of complexity and challenge. Participants will become familiar with 50 different algorithms and gain practical skills to apply them in real-world scenarios.Cash prizes and exciting rewards from GeeksforGeeks are provided for the top three performers in each round.</p>
                </div>
            <div>
                <div className="about-1">
                    <div><center>
                        <h3>▲ limited Registration</h3>
                        
                        <p>Registration closed</p></center>
                    </div>
                    <div><center>
                        <h3>▲ Team size</h3>
                        <p>Individual</p></center>
                    </div>
                    <div><center>
                        <h3>📝 Registration deadline</h3>
                        <p>closed</p></center>
                    </div>
                    <div><center>
                        <h3>💲 Entry fee</h3>
                        <p>Free</p></center>
                    </div>
                </div>
                <center>
                <div className="about-2">
                    <div>
                        <h4>Apply here {"->>"}</h4>
                    </div>
                    <div>
                    <button className="registrationbtn">Registration closed</button>
                    </div>
                </div></center>
            </div>
            </div>
            
        </div>
       
      </div>
      <div className="model2">
        <center>
        <h1 className="heading">ROUND DETAILS</h1>
        </center>
        <div className="rounds-details">
            <div className="about">
                <div className="main-about">
                <div className="round-number">
                    <h1 className="rank">01</h1>
                </div>
                <div className="round-about">
                    <h3>Quiz</h3>
                    <p>Get ready for a fun knowledge challenge! You'll answer 60 questions about 50 algorithms. Can you beat the clock?</p>
                </div>
            </div>
            <div className="main-about">
                <div className="round-number">
                    <h1 className="rank">02</h1>
                </div>
                <div className="round-about">
                    <h3>Quiz</h3>
                    <p>Share your coding expertise! During the Seminar round from Jan 7 to 9, 2024, you'll have 4-5 minutes to present an algorithm. Be the start of the show!</p>
                </div>
            </div>
            <div className="main-about">
                <div className="round-number">
                    <h1 className="rank">03</h1>
                </div>
                <div className="round-about">
                    <h3>Quiz</h3>
                    <p>Work together to solve problems in our Q&A Formation Round on Jan 28, 2024. Create tricky questions for others to answer. How good is your teamwork?</p>
                </div>
            </div>
            <div className="main-about">
                <div className="round-number">
                    <h1 className="rank">04</h1>
                </div>
                <div className="round-about">
                    <h3>Quiz</h3>
                    <p>Time to tackle tricky bugs! In the Debugging round of Feb 28, 2024, you'll solve 10 questions. Can you outsmart the code?</p>
                </div>
            </div>
            <div className="main-about">
                <div className="round-number">
                    <h1 className="rank">05</h1>
                </div>
                <div className="round-about">
                    <h3>Quiz</h3>
                    <p>It's the ultimate showdown! Join the Grand Finale on Mar 20, 2024, and show off your coding skills. Be the coding champion!</p>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>
  )
}

export default Algorithmist
