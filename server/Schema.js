// server/Schema.js

const mongoose = require('mongoose');

// Define the schema for the contact
const contactSchema = new mongoose.Schema({
    fullname: String,
    registrationno: String,
    email: String,
    year: String,
    department: String,
    mobileno: String,
    domain: String,
    additionalPreferences: [String], // Array of strings for preferences
    photo: String,
    github: String,
    linkedin: String
});

// Create and export the Contact model
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
