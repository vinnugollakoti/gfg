const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Contact = require("./Schema"); // Import the Contact model
const nodemailer = require("nodemailer");
const multer = require("multer");
const fs = require("fs")
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

const mongoURI = "mongodb+srv://vinnugollakoti:vinnu1244@cluster0.cwivpr4.mongodb.net/gfg";

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'gfgkarestudentchapter@gmail.com',
      pass: 'gswrefjeexlhteyu'
    }
});

// Email styles (unchanged from your code)
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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const sendEmail = async (to, subject, htmlContent) => {
  const mailOptions = {
      from: 'gfgkarestudentchapter@gmail.com',
      to,
      subject,
      html: htmlContent
  };

  try {
      await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${to}`);
  } catch (error) {
      console.error(`Error sending email to ${to}:`, error);
      throw error;  // Rethrow the error to be handled by the calling code
  }
};


// server/Schema.js and other existing imports

app.post("/register", upload.single("photo"), async (req, res) => {
  const { fullname, registrationno, email, year, department, mobileno, domain, additionalPreferences } = req.body;
  const photo = req.file ? req.file.path : ""; // Path to the uploaded photo

  if (!fullname || !registrationno || !email || !year || !department || !mobileno || !domain) {
      return res.status(400).json({ message: "All fields are required!" });
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
      ML: "https://chat.whatsapp.com/CV1w56clzY4CbqZIXt×NOb",
      DSA: "https://chat.whatsapp.com/HPFqcCNqPVjlHnYqMkpfHG",
      GATE: "https://chat.whatsapp.com/EDmiXkYBuRqOwdGiQvyCSo"
      
  };
  const additionalPreferencesArray = JSON.parse(additionalPreferences);


  let whatsappLink = domainLinks[domain] || "#";
  let additionalPreferencesHTML = '';
        if (domain === 'Technical' && Array.isArray(additionalPreferencesArray)) {
            additionalPreferencesArray.forEach(preference => {
                const link = additionalLinks[preference];
                if (link) {
                    additionalPreferencesHTML += `<h3><strong>${preference}: </strong><a href="${link}">Join here 👈</a></h3>`;
                }
            });
        }

  let emailHTML;

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
            ${additionalPreferencesHTML}
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
            <p>We are pleased to confirm that you have opted for the role of ${domain}. This role plays a crucial part in our mission to enhance knowledge through mentorship. Here is the WhatsApp group link:</p>
            <h3><strong>WhatsApp Link:</strong></h3>
            <a href="${whatsappLink}">Join here 👈</a>
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

  const newContact = new Contact({
      fullname,
      registrationno,
      email,
      year,
      department,
      mobileno,
      domain,
      additionalPreferences: Array.isArray(additionalPreferences) ? JSON.parse(additionalPreferences) : [],
      photo
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


app.use('/uploads', express.static('uploads'));

app.get("/", (req, res) => {
  res.send("hi");
});

mongoose.connect(mongoURI)
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Failed to connect to MongoDB", err));

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
