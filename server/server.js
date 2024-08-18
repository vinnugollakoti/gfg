const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Data = require("../server/Schema")
const nodemailer = require("nodemailer")
const app = express();

app.use(cors());
app.use(express.json());

const mongoURI = "mongodb+srv://vinnugollakoti:vinnu1244@cluster0.cwivpr4.mongodb.net/gfg";

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'gfgkarestudentchapter@gmail.com',
      pass: 'gswrefjeexlhteyu'
    }
});
// css styles for email content
const emailStyles = `
<style>
    .main {
      width: 70%;
      margin-left: 15%;
      background-color: #2F8D46;
    }
    .heading1 {
      color: white;
      font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
      padding-top: 4%;
    }
    .main2 {
      background-color: rgba(255, 255, 255, 0.875);
      padding-top: 4%;
      padding-bottom: 4%;
    }
    strong {
      font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    }
    h3 {
      font-family: Verdana, Geneva, Tahoma, sans-serif;
    }
    h1 {
      color: white;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      margin-top: 0;
      padding: 2%;
    }
  </style>`;


  app.post("/register", async (req, res) => {
    const { fullname, registrationno, email, year, department, mobileno, domain } = req.body;
    if (!fullname || !registrationno || !email || !year || !department || !mobileno || !domain) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    // Define WhatsApp links for each domain
    const domainLinks = {
        "Technical": "https://chat.whatsapp.com/I49e5b3RtNxJBI1FFfcJf3",
        "Web Development": "https://chat.whatsapp.com/Cd3idzMDnAj6O8XyNmCFAt",
        "Graphic Designing": "https://chat.whatsapp.com/Bj4ADcpAkf1BjvDkHcGXZA",
        "Social Media": "https://chat.whatsapp.com/LrcLYjY3ldx7dT49j2HkJA",
        "Article Writing & Report making": "https://chat.whatsapp.com/JKb77FNcy1eGeB43uzYHTl",
        "Event Management": "https://chat.whatsapp.com/JHdyo96oEBAAjc7X0cz0pG"
    };

    const whatsappLink = domainLinks[domain] || "#";

    const emailHTML = `
    <div class="main">
      <center>
        <h2 class="heading1">Hey ${fullname}, you are registered successfully 🎉</h2>
      </center>
      <div class="main2">
        <center>
          <h3><strong>Name of the student: </strong>${fullname}</h3>
          <h3><strong>Registration Number: </strong>${registrationno}</h3>
          <h3><strong>Email: </strong>${email}</h3>
          <h3><strong>Mobile no (WhatsApp): </strong>${mobileno}</h3>
          <h3><strong>Year: </strong>${year}</h3>
          <h3><strong>Department: </strong>${department}</h3>
          <h3><strong>Your chosen Domain: </strong>${domain}</h3>
          <h3><strong>Join this WhatsApp link: <a href="${whatsappLink}">Click here 👈</a></strong></h3>
        </center>
      </div>
      <div class="main">
        <center><h1>Greetings from GFG TEAM - KARE</h1></center>
      </div>
    </div>`;

    try {
        const user = await Data.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "🚫 You are already registered!" });
        }
        const newRegistration = new Data({
            fullname,
            registrationno,
            email,
            year,
            department,
            mobileno,
            domain
        });
        await newRegistration.save();

        var mailOptions = {
            from: 'gfgkarestudentchapter@gmail.com',
            to: email, 
            subject: 'Hurry! Your Registration for student-enrollment is successful!',
            html: emailStyles + emailHTML
        };
          
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        return res.json({ message: "You are registered successfully!" });

    } catch (error) {
        console.error("Error in storing the user in database:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

app.get("/",(res,req)=>{res.send("hi")})


mongoose.connect(mongoURI)
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Failed to connect to MongoDB", err));


app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
