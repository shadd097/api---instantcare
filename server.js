const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose');
const dotenv = require('dotenv')

// const router = express.Router()
const asyncHandler = require('express-async-handler')
// const cloudinary = require('../config/cloudinary')
// const upload = require('../middleware/multer')
const Appointment = require('./models/appointment')


const PORT = process.env.PORT || 5000
// const images = require('./routes/uploadRoute')

//Allow access to .env file
dotenv.config()

const app = express()


// Middleware
app.use(cors())
app.use(express.json());
app.use(morgan("common"))

// //configure api from api route
// app.use('/api', images)

//Connect to MongoDB Atlas
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
}
).then(() => console.log("mongoDB is connected"))
.catch((err) => console.log(err));



// app.get(PORT, () => {
//   res.send("YOOOOOOOOOOOOOOO");
// })

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

// Port
app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`)
})