const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const port = 3001;

// MySQL Connection
const db = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12754975",
  password: "BzeGisCFqw",
  database: "sql12754975",
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("MySQL connection failed:", err.stack);
    return;
  }
  console.log("Connected to MySQL database");
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to handle form submission
app.post("/submit", (req, res) => {
  const formData = req.body;

  const query = `
    INSERT INTO survey_responses (firstName, lastName, email, phone, ownCar, carBrand, kilometersDriven, travelWork, preferredTransport, easySurvey, intuitiveForm, relevantQuestions, additionalFeedback)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    formData.firstName,
    formData.lastName,
    formData.email,
    formData.phone || null,
    formData.ownCar || null,
    formData.carBrand || null,
    formData.kilometersDriven || null,
    formData.travelWork || null,
    formData.preferredTransport ? formData.preferredTransport.join(",") : null,
    formData.easySurvey || null,
    formData.intuitiveForm || null,
    formData.relevantQuestions || null,
    formData.additionalFeedback || null,
  ];

  db.query(query, values, (err) => {
    if (err) {
      console.error("Error saving data:", err);
      res.status(500).send("Error saving data");
      return;
    }
    res.send("Survey submitted successfully!");
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
