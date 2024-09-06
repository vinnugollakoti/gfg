const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Contact = require("./Schema"); // Import the Contact model
const nodemailer = require("nodemailer");
const fs = require("fs")
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

const mongoURI = "mongodb+srv://vinnugollakoti:vinnu1244@cluster0.cwivpr4.mongodb.net/gfg";


var transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
      user: 'mohanavamsi16@outlook.com',
      pass: 'fmyeynjakqxqxtsm'
    }
});

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


const sendEmail = async (to, subject, htmlContent) => {
  const mailOptions = {
      from: 'mohanavamsi16@outlook.com',
      to,
      subject,
      html: htmlContent + emailStyles
  };

  try {
      await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${to}`);
  } catch (error) {
      console.error(`Error sending email to ${to}:`, error);
      throw error;
  }
};

app.post("/register", async (req, res) => {
  const { fullname, registrationno, email, year, department, mobileno, domain,photo, additionalPreferences, github, linkedin } = req.body;
console.log(req.body)
  if (!fullname || !registrationno || !email || !year || !department || !mobileno || !domain) {
      return res.status(400).json({ message: "Please fill the details properly" });
  }

  const domainLinks = {
      "Technical": "https://chat.whatsapp.com/I49e5b3RtNxJBI1FFfcJf3",
      "Web Development": "https://chat.whatsapp.com/Cd3idzMDnAj6O8XyNmCFAt",
      "Graphic Designing": "https://chat.whatsapp.com/Bj4ADcpAkf1BjvDkHcGXZA",
      "Social Media": "https://chat.whatsapp.com/LrcLYjY3ldx7dT49j2HkJA",
      "Article Writing & Report making": "https://chat.whatsapp.com/JKb77FNcy1eGeB43uzYHTl",
      "Event Management": "https://chat.whatsapp.com/JHdyo96oEBAAjc7X0cz0pG"
  };

  const additionalLinks = {
      ML: "https://chat.whatsapp.com/CV1w56clzY4CbqZlXtxNOb",
      DSA: "https://chat.whatsapp.com/E8eFaJJoBB373CtOnDaOfP",
      GATE: "https://chat.whatsapp.com/DelDTfuUaWg67G688pnaRS"
  };
  const additionalPreferencesArray = JSON.parse(additionalPreferences || '[]');
  console.log('Parsed Additional Preferences:', additionalPreferencesArray);


  let whatsappLink = domainLinks[domain] || "#";
  let additionalPreferencesHTML = '';
        if (domain === 'Technical' && Array.isArray(additionalPreferencesArray)) {
            additionalPreferencesArray.forEach(preference => {
                const link = additionalLinks[preference];
                if (link) {
                    additionalPreferencesHTML += `<h4><strong>${preference}: </strong><a href="${link}">Join here 👈</a></h4>`;
                }
            });
        }

  let emailHTML;

  if (domain === "Technical") {
      emailHTML = `
      <div class="main">
        <center>
          <h1 class="heading1">Welcome to GFG KARE!</h1>
        </center>
        <div class="main2">
            <h3>Dear ${fullname},</h3>
            <p>You are successfully registered as a Student Member of GFG KARE for the academic year 2024 - 2025. We are thrilled to welcome you to a community of passionate, talented and like-minded individuals.</p>
            <p>We are pleased to confirm that you have opted for the role of Technical. This role plays a crucial part in our mission to enhance knowledge through mentorship.</p>
            <p>Join the WhatsApp groups for ${domain}${additionalPreferencesArray.length > 0 ? `, ${additionalPreferencesArray.join(", ")}` : ''} using the links given below:</p>
            <h3><strong>WhatsApp Link:</strong></h3>
            ${additionalPreferencesHTML}
            <h4><strong>Here's what you can expect after joining the group:</strong></h4>
            <ul>
              <li>Orientation Session: We will be hosting an orientation session. This will be a great opportunity for you to learn more about your role and meet fellow members.</li>
              <li>You will be assigned to a team of like-minded individuals. Your team lead will reach out to you shortly to introduce themselves and discuss upcoming sessions.</li>
            </ul>
            <p>If you have any questions or need further assistance, please don’t hesitate to reach out to us at <a href="mailto:gfgkarestudentchapter@klu.ac.in">gfgkarestudentchapter@klu.ac.in</a> or visit our website <a href="https://gfgkare.github.io">gfgkare.github.io</a></p>
            <h4><strong>Stay Connected :</strong></h4>
            <a href="https://www.linkedin.com/company/gfg-kare-student-chapter/">Linkedin</a><br/>
            <a href="https://www.instagram.com/gfgkare?igsh=MXU5aGFkMGp6d21saw==">Instagram</a>
        </div>
        <div class="main">
          <center><h3>GFG KARE 💚</h3></center>
        </div>
      </div>`;
  } else {
      emailHTML = `
      <div class="main">
        <center>
          <h1 class="heading1">Welcome to GFG KARE!</h1>
        </center>
        <div class="main2">
            <h3>Dear ${fullname},</h3>
            <p>You are successfully registered as a Student Member of GFG KARE for the academic year 2024 - 2025. We are thrilled to welcome you to a community of passionate, talented and like-minded individuals.</p>
            <p>We are pleased to confirm that you have opted for the role of ${domain}. This role plays a crucial part in our mission to enhance knowledge through mentorship.</p>
            <p>Join the ${domain} WhatsApp group. More information regarding the enrollment will be shared soon.</p>
            <h3><strong>WhatsApp Link:</strong></h3>
            <a href="${whatsappLink}">Join here 👈</a>
            <h4><strong>Here's what you can expect after joining the group:</strong></h4>
            <ul>
              <li>Orientation Session: We will be hosting an orientation session. This will be a great opportunity for you to learn more about your role and meet fellow members.</li>
              <li>You will be assigned to a team of like-minded individuals. Your team lead will reach out to you shortly to introduce themselves and discuss upcoming sessions.</li>
            </ul>
            <p>If you have any questions or need further assistance, please don’t hesitate to reach out to us at <a href="mailto:gfgkarestudentchapter@klu.ac.in">gfgkarestudentchapter@klu.ac.in</a> or visit our website <a href="https://gfgkare.github.io">gfgkare.github.io</a></p>
            <h4><strong>Stay Connected :</strong></h4>
            <a href="https://www.linkedin.com/company/gfg-kare-student-chapter/">Linkedin</a><br/>
            <a href="https://www.instagram.com/gfgkare?igsh=MXU5aGFkMGp6d21saw==">Instagram</a>
        </div>
        <div class="main">
          <center><h3>GFG KARE 💚</h3></center>
        </div>
      </div>`;
  }

  const newContact = new Contact({
      fullname,
      registrationno,
      email,
      year,
      department,
      mobileno,
      domain,
      additionalPreferences: Array.isArray(additionalPreferencesArray) ? additionalPreferencesArray : [],
      photo,
      github,
      linkedin
  });

  try {
      const user = await Contact.findOne({ email });
      if (user) {
          return res.status(400).json({ message: "🚫 You are already registered!" });
      }
      const savedContact = await newContact.save();
      console.log("New contact saved:", savedContact);

      await sendEmail(email, "Registration Confirmation", emailHTML);

      res.status(200).json({ message: "Registration successful, and email sent!" });
  } catch (error) {
      console.error("Error saving contact or sending email:", error);
      res.status(500).json({ message: "Internal Server Error" });
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
