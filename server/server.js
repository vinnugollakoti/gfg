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
    const { fullname, registrationno, email, year, department, mobileno, domain, additionalPreferences } = req.body;

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

    // Define additional preferences links
    const additionalLinks = {
        ML: "https://chat.whatsapp.com/CV1w56clzY4CbqZIXt×NOb",
        DSA: "https://chat.whatsapp.com/HPFqcCNqPVjlHnYqMkpfHG",
        GATE: "https://chat.whatsapp.com/EDmiXkYBuRqOwdGiQvyCSo"
    };

    // Determine the WhatsApp link based on the domain
    let whatsappLink = domainLinks[domain] || "#";
    let additionalPreferencesHTML = '';

    // Construct additional preferences email content
    if (Array.isArray(additionalPreferences)) {
        additionalPreferences.forEach(preference => {
            const link = additionalLinks[preference];
            if (link) {
                additionalPreferencesHTML += `<h3><strong>${preference}: </strong><a href="${link}">Join here 👈</a></h3>`;
            }
        });
    }

    let emailHTML;

    // Check domain and construct email content accordingly
    if (domain === "Technical") {
        emailHTML = `
        <div class="main">
          <center>
            <h2 class="heading1">Welcome to GFG KARE STUDENT CHAPTER - Your Spot Confirmation!</h2>
          </center>
          <div class="main2">
              <h3>Dear ${fullname},</h3>
              <p>Thank you for registering with GFGKARE! We are thrilled to welcome you to our community of passionate and talented individuals.</p>
              <p>We are pleased to confirm that you have opted for the role of Technical. This role plays a crucial part in our mission to enhance knowledge through mentorship. Here are the additional preferences links you have chosen:</p>
              ${additionalPreferencesHTML} <!-- Include additional preferences links -->
              <h3><strong>Here’s what you can expect next:</strong></h3>
              <ul>
                <li>Orientation Session: We will be hosting an orientation session. This will be a great opportunity for you to learn more about your role and meet fellow members.</li>
                <li>You will be assigned to a team of like-minded individuals. Your team lead will reach out to you shortly to introduce themselves and discuss upcoming sessions.</li>
              </ul>
              <h3><strong>Stay Connected</strong></h3>
              <p>Follow us on Social Media: <a href="https://www.linkedin.com/company/gfg-kare-student-chapter/posts/?feedView=all">Linkedin</a></p>
              <p>If you have any questions or need further assistance, please don’t hesitate to reach out to us at <a href="mailto:gfgkarestudentchapter@klu.ac.in">gfgkarestudentchapter@klu.ac.in</a> or visit our website <a href="https://gfgkare.github.io">gfgkare.github.io</a></p>
          </div>
          <div class="main">
            <center><h1>Greetings from GFG TEAM - KARE</h1></center>
          </div>
        </div>`;
    } else {
        emailHTML = `
        <div class="main">
          <center>
            <h2 class="heading1">Welcome to GFG KARE STUDENT CHAPTER - Your Spot Confirmation!</h2>
          </center>
          <div class="main2">
              <h3>Dear ${fullname},</h3>
              <p>Thank you for registering with GFGKARE! We are thrilled to welcome you to our community of passionate and talented individuals.</p>
              <p>We are pleased to confirm that you have opted for the role of ${domain}. This role plays a crucial part in our mission to enhance knowledge through mentorship. Here is the WhatsApp group link for the role you have chosen:</p>
              <h3><strong>${domain}: </strong><a href="${whatsappLink}">Join here 👈</a></h3>
              ${additionalPreferencesHTML} <!-- Include additional preferences links -->
              <h3><strong>Here’s what you can expect next:</strong></h3>
              <ul>
                <li>Orientation Session: We will be hosting an orientation session. This will be a great opportunity for you to learn more about your role and meet fellow members.</li>
                <li>You will be assigned to a team of like-minded individuals. Your team lead will reach out to you shortly to introduce themselves and discuss upcoming sessions.</li>
              </ul>
              <h3><strong>Stay Connected</strong></h3>
              <p>Follow us on Social Media: <a href="https://www.linkedin.com/company/gfg-kare-student-chapter/posts/?feedView=all">Linkedin</a></p>
              <p>If you have any questions or need further assistance, please don’t hesitate to reach out to us at <a href="mailto:gfgkarestudentchapter@klu.ac.in">gfgkarestudentchapter@klu.ac.in</a> or visit our website <a href="https://gfgkare.github.io">gfgkare.github.io</a></p>
          </div>
          <div class="main">
            <center><h1>Greetings from GFG TEAM - KARE</h1></center>
          </div>
        </div>`;
    }

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
            domain,
            additionalPreferences // Store additional preferences as an array
        });
        await newRegistration.save();

        var mailOptions = {
            from: 'gfgkarestudentchapter@gmail.com',
            to: email, 
            subject: 'Welcome to GFG KARE STUDENT CHAPTER - Your Spot Confirmation!',
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






app.get("/", (req, res) => {
  res.send("hi");
});

mongoose.connect(mongoURI)
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Failed to connect to MongoDB", err));


app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
