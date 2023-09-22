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


const MoodSchema = new mongoose.Schema({
  mood: String,
}, {
  collection: 'mood',
  timestamps: true
});

const MoodModel = mongoose.model('Mood', MoodSchema);

app.post('/api/save-mood', async (req, res) => {
  try {
    const { mood } = req.body;

    const newMood = new MoodModel({
      mood,
    });

    await newMood.save();

    res.status(201).json({ message: 'Mood saved successfully' });
  } catch (error) {
    console.error('Error saving mood:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
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


  const MoodSchema = new mongoose.Schema({
    mood: String,
  }, {
    collection: 'mood',
    timestamps: true
  });
  
  const MoodModel = mongoose.model('Mood', MoodSchema);
  
  app.post('/api/save-mood', async (req, res) => {
    try {
      const { mood } = req.body;
  
      const newMood = new MoodModel({
        mood,
      });
  
      await newMood.save();
  
      res.status(201).json({ message: 'Mood saved successfully' });
    } catch (error) {
      console.error('Error saving mood:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
// Define a User Model

const userSchema = new mongoose.Schema({
  username: String,
  mobileNumber: String,
  email: String,
  password: String,
},{
  collection: 'userRegister',
  timestamps: true
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());

app.post('/api/userRegister', async (req, res) => {
  const { username, mobileNumber, email, password } = req.body;

  const newUser = new User({
    username,
    mobileNumber,
    email,
    password,
  });

  try {
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Define a schema and model for the assessment data
const assessmentSchema = new mongoose.Schema({
  depressionScore: Number,
  stressScore: Number,
  anxiousScore: Number,
},{
  collection: 'assessment',
  timestamps: true
});

const Assessment = mongoose.model('Assessment', assessmentSchema);

app.use(bodyParser.json());

app.post('/api/save-assessment', async (req, res) => {
  try {
    const assessmentData = req.body;
    const assessment = new Assessment(assessmentData);
    await assessment.save();
    res.json({ message: 'Assessment data saved successfully' });
  } catch (error) {
    console.error('Error saving assessment data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// login api for the user

app.post('/api/userLogin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // You should implement password hashing and validation here
    // Compare the hashed password stored in the database with the provided password

    if (user.password !== password) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});


app.listen(8000, () => {
  console.log('Express server is running on localhost:8000');
});