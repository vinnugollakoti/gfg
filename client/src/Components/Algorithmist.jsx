import { useState, useEffect } from "react"
import coverphoto1 from '../assets/coverphoto1.jpeg'
import logo from '../assets/logo.webp'
import profile from '../assets/acclogo.webp'
import formlogo from '../assets/form.png'
import limitedlogo from '../assets/limitedppl.png'
import { useNavigate } from "react-router-dom"
import bg from "../assets/bg.png"
// import {useNavigate} from "react-router-dom"
const Algorithmist = () => {
    const navigate = useNavigate()
    const handleRegister = () => {
        navigate("/form")
    }

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("show");
            } else {
              entry.target.classList.remove("show");
            }
          });
        });
    
        const hiddenElements = document.querySelectorAll(".hidden");
        hiddenElements.forEach((el) => observer.observe(el));
    
        // Cleanup function to disconnect the observer when component unmounts
        return () => {
          hiddenElements.forEach((el) => observer.unobserve(el));
        };
      }, []);
    
    
      useEffect(() => {
        const observer2 = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("show2");
            } else {
              entry.target.classList.remove("show2");
            }
          });
        });
    
        const hiddenElements = document.querySelectorAll(".hidden2");
        hiddenElements.forEach((el) => observer2.observe(el));
    
        return () => {
          hiddenElements.forEach((el) => observer2.unobserve(el));
        };
      }, []);

  return (
    <div>
        {/* background image */}
        {/* <img src={bg} alt="" className="bg" /> */}
        {/* <nav className="navbar">
            <div className="nav-1">
                <img src={logo} alt="" className="logo"/>
            </div>
            <div className="nav-1-1">
                <div className="nav-name"><p>Dashboard</p></div>
                <div className="nav-name"><p>Algorithmist2024</p></div>
                <div className="nav-name"><p>Members</p></div>
                <div><img src={profile} alt=""  className="profilelogo"/></div>
            </div>
        </nav> */}
      <div>
        <img src={coverphoto1} alt="" className="coverphoto" />
      </div>
      <div className="register-modal">
      <div className="model hidden">
        <center>
        <h1 className="heading">Student Member Enrolment Program</h1></center>
        <div>
            <div className="about">
                <div>
                <p className="para1">We are delighted to inform you that <strong>GFG KARE STUDENT CHAPTER</strong> is excited to expand
                the community through <strong>Student Enrolment Drive</strong> with a passionate group of tech. enthusiasts and developing a culture of continuous learning.</p>

                <p className="para1"><strong>GFG KARE Student Chapter</strong> is always aims to create a community of like-minded individuals who are passionate about technology and innovation. This chapter provides a platform for every student to enhance their coding, technical, personality and communication skills.</p>
                <p className="para1">The students can select the interested domain during the Registration such as <strong>Technical</strong>,<strong> Web Development</strong>, <strong>Graphic Designing</strong>, <strong>Article Writing</strong>, and <strong>Marketing</strong> Based on their performance in the particular domain, students will be promoted to core learn team lead roles for the future tenures.</p>
                <p className="para1">This membership fee is also set at a nominal value to make it more available to all students, and this fee used in the benefits of members and enhancement of chapter’s activities, resources and growth.</p>
                </div>
            </div>
        </div>
      </div>
      {/* code */}
      <div className="card hidden2">
            <div className="card-content">
              <div className="info">
                <div className="info-item">
                  <h3 className="h3">
                    {/* <img
                      src={limitedlogo}
                      alt="Limited Registration"
                      className="icon"
                    /> */}
                    Limited Registration:
                  </h3>
                  <p className="p">300 Students</p>
                </div>
                <div className="info-item">
                  <h3 className="h3">Registration Deadline:</h3>
                  <p className="deadline p">07-08-2024, 8:00 PM</p>
                </div>
                <div className="info-item">
                  <h3 className="h3">Registration Fee:</h3>
                  <p className="p">Free</p>
                </div>
              </div>
              <div className="register">
                {/* <button className="register-btn" onClick={handleRegister}></button> */}
                <button  className="register-btn" onClick={handleRegister}>Register</button>
              </div>
            </div>
          </div>
      </div>

      <div className="model2 hidden">
        <center>
        <h1 className="heading1">Membership Benefits</h1>
        </center>
        <div className="rounds-details">
            <div className="about">
                <div className="main-about">
                <div className="round-number">
                    <h1 className="rank">01</h1>
                </div>
                <div className="round-about">
                    <h3>Boost Tech–Non technical Skill</h3>
                </div>
            </div>
            <div className="main-about">
                <div className="round-number">
                    <h1 className="rank">02</h1>
                </div>
                <div className="round-about">
                    <h3>Personality Development</h3>
                </div>
            </div>
            <div className="main-about">
                <div className="round-number">
                    <h1 className="rank">03</h1>
                </div>
                <div className="round-about">
                    <h3>Support and career guidance</h3>
                </div>
            </div>
            <div className="main-about">
                <div className="round-number">
                    <h1 className="rank">04</h1>
                </div>
                <div className="round-about">
                    <h3>Competitions and Hackathons</h3>
                </div>
            </div>
            <div className="main-about">
                <div className="round-number">
                    <h1 className="rank">05</h1>
                </div>
                <div className="round-about">
                    <h3>Internship Opportunity [Based on the performance]</h3>
                </div>
            </div>
            <div className="main-about">
                <div className="round-number">
                    <h1 className="rank">06</h1>
                </div>
                <div className="round-about">
                    <h3>Offline sessions in</h3>
                </div>
            </div>
            <div className="main-about">
                <div className="round-number">
                    <h1 className="rank">07</h1>
                </div>
                <div className="round-about">
                    <h3>Industrial Experts talk</h3>
                </div>
            </div>
            <div className="main-about">
                <div className="round-number">
                    <h1 className="rank">08</h1>
                </div>
                <div className="round-about">
                    <h3>Free workshop & webinars and lot more opportunities</h3>
                </div>
            </div>
            </div>
        </div>
        </div>
        <hr className="hr1" />
        <div className="contacts">
            <p className="line1"><i>For any further information and doubts contact : </i></p>
            <p className="line2">M.M.Navadeep - +91 70750 72880</p>
            <p className="line2">S.Sabari - +91 8754605197</p>
            <p className="line2">P.Venkateswara Rao - +91 93981 07277</p>
            <p className="line2">G.Prasanthi - +91 9032772680</p>
        </div>
        <hr className="hr2" />
        <div className="contacts2">
            <div className="contacts2-1">
                <center>
                <p className="line2">Faculty Coordinators</p>
                <p className="line2">R.Rajasekhar & R.Shanmukapriya</p>
                </center>
            </div>
            <div className="contacts2-1">
                <center>
                <p className="line2">Dr. N. Suresh Kumar</p>
                <p className="line2">Professor & HOD/CSEa</p>
                </center>
            </div>
            <div className="contacts2-1">
                <center>
                <p className="line2">Dr. P. Deepalakshmi</p>
                <p className="line2">Professor & Dean/SoC</p>
                </center>
            </div>
        </div>

    </div>
  )
}

export default Algorithmist
