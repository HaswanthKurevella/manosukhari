const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dbURI = "mongodb+srv://munagalavamsi37:1234@cluster0.x3hwgmg.mongodb.net/adminConsole?retryWrites=true&w=majority";
const cors = require('cors');
const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt'); // You need to require bcrypt for password hashing

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Uncomment and use corsOptions if you want to specify origins
// const corsOptions = {
//   origin: 'http://localhost:5173', // Replace with your frontend's URL
//   optionsSuccessStatus: 200,
// };

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
  username: String,
  email: String,
  mobile: String,
  qualification: String,
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

const feedbackSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const FeedbackModel = mongoose.model('feedback', feedbackSchema);

app.post('/api/feedback', async (req, res) => {
  try {
    const { title, description } = req.body;
    const feedback = new FeedbackModel({
      title,
      description,
    });
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
      error: error.message,
    });
  }
});

// Define a User Model
const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  mobile: String,
}, {
  collection: 'userRegistration',
  timestamps: true,
}));

// Implement your login endpoint here

// app.post('/login', async (req, res) => {
//   try {
//     // Your login logic with bcrypt should go here
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Something went wrong' });
//   }
// });

app.listen(5000, () => {
  console.log('Express server is running on localhost:5000');
});
