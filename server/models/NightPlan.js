const mongoose = require('mongoose');

// Define the Location schema
const locationSchema = new mongoose.Schema({
  order: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  locationId: {
    type: String,
    required: true,
  },
});

// Define the NightPlanner schema
const nightPlannerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: true
  },
  locations: [locationSchema], // Array of location objects
});

// Create a model for NightPlanner schema
const NightPlanner = mongoose.model('NightPlanner', nightPlannerSchema);

export default NightPlanner;

