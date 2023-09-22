const express = require('express');
const mongoose = require('mongoose'); // Import mongoose library
const app = express();
const dbURI = "mongodb+srv://munagalavamsi37:1234@cluster0.x3hwgmg.mongodb.net/adminConsole?retryWrites=true&w=majority";
const cors = require('cors');
const bodyParser = require('body-parser');
app.get('/', (req, res) => {
  res.send('Hello World!');
});

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
  
// registration endpoint 

//app.post('/register',async (req, res) => {
//     try {
//         const {email, password} = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const User = new User({email, password: hashedPassword});
//         await User.save();

//         res.status(201).json({message: 'User created successfully'});
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message: 'Something went wrong'});
//     }
// });

// Login endpoint

// app.post('/login', async (req, res) => {
//     try {
//         const {email, password} = req.body;
//         const user = await.User.findOne({email});

//         if(!user) {
//             return res.status(404).json({message: 'User not found'});
//         }
//         const passwordMatch = await bcrypt.compare(password, user.password);

//         if(passwordMatch) {
//             return res.status(200).json({message: 'Login successful'});
//         } else {
//             return res.status(401).json({message: 'Invalid credentials'});
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message: 'Something went wrong'});
//     }
// });




app.listen(5000, () => {
  console.log('Express server is running on localhost:5000');
});
