const express = require('express');
const mongoose = require('mongoose'); // Import mongoose library
const app = express();
const dbURI = "mongodb+srv://munagalavamsi37:1234@cluster0.x3hwgmg.mongodb.net/adminConsole?retryWrites=true&w=majority";

app.get('/', (req, res) => {
  res.send('Hello World!');
});

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








app.listen(5000, () => {
  console.log('Express server is running on localhost:5000');
});
