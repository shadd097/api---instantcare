const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose');
const dotenv = require('dotenv')

const asyncHandler = require('express-async-handler')
const Appointment = require('./models/appointment')


const PORT = process.env.PORT || 10000

//Allow access to .env file
dotenv.config()

const app = express()


// Middleware
app.use(cors())
app.use(express.json());
app.use(morgan("common"))


//Connect to MongoDB Atlas
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
}
).then(() => console.log("mongoDB is connected"))
.catch((err) => console.log(err));


//POST Upload Route
app.post('/createAppointment', asyncHandler(async (req, res) => {
  try {
    //Create Uploads
    let appointment = new Appointment({
		date: req.body.date,
		type: req.body.type
    })
    //Save Upload
    const createdAppointment = await appointment.save();
    res.status(201).json(createdAppointment);
  } catch (err) {
    console.log(err);
  }

}))

//Get Route
app.get('/getAppointments', asyncHandler(async (req, res) => {
  try {

    const appointments = await Appointment.find();
    res.status(201).json(appointments);
  } catch (err) {
    console.log(err);
  }

}))


// Endpoint to handle DELETE request for deleting an appointment by ID
app.delete('/deleteAppointment/:id', async (req, res) => {
  console.log("HELLO");
  const appointmentId = req.params.id;
  const deletedAppointment = await Appointment.deleteOne({ _id: appointmentId });
  
  if (deletedAppointment) {
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } else {
    res.status(404).json({ message: 'Appointment not found' });
  }
});

// Port
app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`)
})