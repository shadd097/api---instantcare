const mongoose = require('mongoose')

const Schema = mongoose.Schema

const appointmentSchema = new Schema({
  date: {
  	type: String,
    required: true,
  },
  type: {
	  type: String,
    required: true,
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Appointment', appointmentSchema)