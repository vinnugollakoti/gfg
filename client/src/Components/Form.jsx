import bg from "../assets/bg.png"
import phone from "../assets/phone.png"
import { useState } from "react"
import Loader from "./Loader"
import axios from "axios"
const Form = () => {
    const [fullname, setFullname] = useState("")
    const [registrationno, setRegistrationNo] = useState("")
    const [email, setEmail] = useState("")
    const [year, setYear] = useState("")
    const [department, setDepartment] = useState("")
    const [mobileno, setMobileNo] = useState("")
    const [domain, setDomain] = useState("")

    // extra
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(false)
    const [errmsg, setErrmsg] = useState("")

    const [checkboxes, setCheckboxes] = useState({
        agree1: false,
        agree2: false,
        agree3: false,
        agree4: false,
        agree5: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault(); 
        
        const allChecked = Object.values(checkboxes).every(value => value === true);
        if (!allChecked) {
            alert("Please accept all terms and conditions before submitting.");
            return;
        }

        setLoading(true)
        axios.post("https://gfg-cueb.onrender.com/register", {
            fullname,
            registrationno,
            email,
            year,
            department,
            mobileno,
            domain
        })
        .then((res) => {
            console.log(res.data)
            console.log("Form submitted with values:");
            console.log({ fullname, registrationno, email, year, department, mobileno, domain});
            setTimeout(() => {
                setLoading(false)
                setMessage(true)
            }, 1000)
        })
        .catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                console.log("Error occurred:", error.response.data.message);
                setErrmsg(error.response.data.message);
            } else {
                console.log("Error occurred:", error.message);
                setErrmsg("❌ An unexpected error occurred. Please try again.");
            }
            setLoading(false);
          });
        
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setCheckboxes(prev => ({
            ...prev,
            [name]: checked,
        }));
    };

  return (
    <div>
      <img src={bg} alt="" className="bg1" />
      <div className="main-form">
        <div className="form">
            <h1 className="font1">REGISTRATION FORM</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-1">
                <label htmlFor="text">Your Full Name :</label><br />
                <input type="text" required placeholder="Enter your full name" className="input1" onChange={(e) => setFullname(e.target.value)} />
                </div>
                <div className="form-1">
                <label htmlFor="text">Registration Number :</label><br />
                <input type="number" required placeholder="Enter your Registration number" className="input1" onChange={(e)=> setRegistrationNo(e.target.value)} />
                </div>
                <div className="form-1">
                <label htmlFor="text">Your Email-Id :</label><br />
                <input type="email" required placeholder="Enter your Email id" className="input1" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-1">
                <label htmlFor="checkbox">Year :</label><br />
                <div className="checkbox-div">
                <input type="radio" required name = "radio1" value="II Year (2023-2027 Batch)" className="checkbox" onChange={(e) => setYear(e.target.value)}/>
                <label htmlFor="radio1">II Year (2023-2027 Batch)</label>
                </div>
                <div className="checkbox-div">
                <input type="radio" required name="radio1" value="III Year (2023-2027 Batch)" className="checkbox" onChange={(e) => setYear(e.target.value)}/>
                <label htmlFor="radio1">III Year (2022-2026 Batch)</label>
                </div>
                </div>
                <div className="form-1">
                <label htmlFor="text">Your Department:</label><br />
                <input type="text" required placeholder="Enter your Department" className="input1" onChange={(e) => setDepartment(e.target.value)} />
                </div>
                <div className="form-1">
                <label htmlFor="number">Enter your Whatsapp No:</label><br />
                <input type="Number" required placeholder="Enter your Whatsapp No" className="input1" onChange={(e) => setMobileNo(e.target.value)} />
                </div>
                <div className="form-2">
                        <label htmlFor="text">Which Domain you are interested in ?
                        </label><br />
                        <input type="radio" required id="radio" name="radio" value="Technical" className="checkbox" onChange={(e)=> setDomain(e.target.value)} />
                        <label htmlFor="radio">Technical</label><br/>
                        <input type="radio" required id="radio" name="radio" value="Web Development" className="checkbox" onChange={(e)=> setDomain(e.target.value)} />
                        <label htmlFor="radio">Web Development</label><br/>
                        <input type="radio" required id="radio" name="radio" value="Graphic Designing" className="checkbox" onChange={(e)=> setDomain(e.target.value)} />
                        <label htmlFor="radio">Graphic Designing</label><br/>
                        <input type="radio" required id="radio" name="radio" value="Social Media" className="checkbox" onChange={(e)=> setDomain(e.target.value)} />
                        <label htmlFor="radio">Social Media</label><br/>
                        <input type="radio" required id="radio" name="radio" value="Article Writing & Report making" className="checkbox" onChange={(e)=> setDomain(e.target.value)} />
                        <label htmlFor="radio">Article Writing & Report making</label><br/>
                        <input type="radio" required id="radio" name="radio" value="Event Management" className="checkbox" onChange={(e)=> setDomain(e.target.value)} />
                        <label htmlFor="radio">Event Management</label><br/>
                </div>
                <div className="form-1">
                            <label>I understand that being an active member is essential for the growth of the student chapter.</label><br />
                            <input type="checkbox" id="agree1" name="agree1" className="checkbox" onChange={handleCheckboxChange} />
                            <label htmlFor="agree1">I AGREE</label>
                        </div>
                        <div className="form-1">
                            <label>I commit to actively participate in the chapter's activities and contribute to its success.</label><br />
                            <input type="checkbox" id="agree2" name="agree2" className="checkbox" onChange={handleCheckboxChange} />
                            <label htmlFor="agree2">I AGREE</label>
                        </div>
                        <div className="form-1">
                            <label>I commit to complete the tasks provided within the time period.</label><br />
                            <input type="checkbox" id="agree3" name="agree3" className="checkbox" onChange={handleCheckboxChange} />
                            <label htmlFor="agree3">I AGREE</label>
                        </div>
                        <div className="form-1">
                            <label>I acknowledge that in case of any concerns or queries, I should reach out to the Chairperson or the other core team members.</label><br />
                            <input type="checkbox" id="agree4" name="agree4" className="checkbox" onChange={handleCheckboxChange} />
                            <label htmlFor="agree4">I AGREE</label>
                        </div>
                        <div className="form-1">
                            <label>I agree not to disclose any information related to the chapter without core team permission.</label><br />
                            <input type="checkbox" id="agree5" name="agree5" className="checkbox" onChange={handleCheckboxChange} />
                            <label htmlFor="agree5">I AGREE</label>
                        </div>
                        <div className="form-1">
                            {loading ? (
                                <center>
                                <button className="button" type="submit">
                                    <span><Loader /></span>
                                </button>
                                </center>
                            ) : (
                                <center>
                                <button className="button">Register</button>
                                </center>
                            )}
                            </div>
                            {message && <p className="message-text">✔️ Your registation was successfull!</p>}
                            {errmsg && <div className="message-text">{errmsg}</div>}

            </form>
        </div>
        <div className="contact-blog">
            <h1 className="caption1">All the best!</h1>
            <p className="caption2">After Registration check your mail for your domain whatsapp group link if you didnt find the email check spam folders.</p>
            <h3 className="caption3">For any queryies</h3>
            <div className="contacts-phone">
                <img src={phone} alt="" className="phone" />
                <p className="caption3">+91 6301181244</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Form
