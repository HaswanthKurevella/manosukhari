 const express = require('express');
const mongoose = require('mongoose'); // Import mongoose library
const bodyParser = require('body-parser');
const app = express();
const dbURI = "mongodb+srv://munagalavamsi37:1234@cluster0.x3hwgmg.mongodb.net/adminConsole?retryWrites=true&w=majority";
const cors = require("cors");
app.get('/', (req, res) => {
  res.send('Hello World!');
});




// const corsOptions = {
//   origin: 'http://localhost:5173', // Replace with your frontend's URL
//   optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
// // };

// app.use(cors(corsOptions));



app.use(cors());
app.use(bodyParser.json()); 

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

const therapistSchema = new mongoose.Schema({
    username:String,
    email:String,
    mobile:String,
    qualification:String,
});

const TherapistModel = mongoose.model('therapists', therapistSchema);

app.get('/api/therapists', (req, res) => {
  TherapistModel.find({},{password:0})
    .then((therapists) => {
      res.json({
        confirmation: 'success',
        data: therapists,
      });
    })
    .catch((error) => {
      console.error('Error fetching therapists:', error);
      res.status(500).json({
        confirmation: 'error',
        message: 'Internal server error',
      });
    });
});


// retriving the single therapist data

app.get('/api/therapists/:id', (req, res) => {
    TherapistModel.findById(req.params.id)
        .then((therapist) => {
            res.json({
                confirmation: 'success',
                data: therapist,
            });
        })
        .catch((error) => {
            console.error('Error fetching therapist by id:', error);
            res.status(500).json({
                confirmation: 'error',
                message: 'Internal server error',
            });
        });
});


// api for the feedback form
const feedbackSchema = new mongoose.Schema({
    title: String,
    description: String,
  },
  {
    collection: 'feedbacks',
    timestamps: true
    });
  
const FeedbackModel = mongoose.model('feedback', feedbackSchema);


app.post('/api/feedback', async (req, res) => {
    try {
      const { title, description } = req.body;
  
      // Create a new feedback document
      const feedback = new FeedbackModel({
        title,
        description,
      });
  
      // Save the feedback document to MongoDB Atlas
      await feedback.save();
  
      res.status(201).json({
        confirmation: 'success',
        message: 'Feedback saved successfully',
      });
    } catch (error) {
      console.error('Error saving feedback:', error);
      res.status(500).json({
        confirmation: 'error',
        message: 'Internal server error',
        error: error.message, // Include the error message in the response
      });
    }
  });
  
// Define a User Model

const User = mongoose.model('User', new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    mobile: String,
},{
    collection: 'userRegistration',
    timestamps: true
}));


app.post('/api/register', async (req, res) => {
  try {
    const { username, mobileNumber, email, password, qualification, photo } = req.body;

    // Create a new Therapist if needed and save it to the database

    res.status(201).json({ message: 'Therapist registered successfully' });
  } catch (error) {
    console.error('Error registering therapist:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Define a schema and model for the assessment data
const assessmentSchema = new mongoose.Schema({
  depressionScore: Number,
  stressScore: Number,
  anxiousScore: Number,
  // Add other fields here if needed
},{
  collection: 'assessment',
  timestamps: true
});

app.post('/api/save-assessment', async (req, res) => {
  try {
    const assessmentData = req.body;
    const assessment = new Assessment(assessmentData);
    await assessment.save();
    res.json({ message: 'Assessment data saved successfully' });
  } catch (error) {
    console.error('Error saving assessment data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(8000, () => {
  console.log('Express server is running on localhost:8000');
});