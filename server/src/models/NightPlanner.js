const mongoose = require('mongoose');

const locationPlanSchema = new mongoose.Schema({
  locationdata_id: { type: String, required: true },
  duration: { type: Number, required: true },
  order: { type: Number, required: true },
  longitude: { type: Number, required: true },
  latitude: { type: Number, required: true },
});

const nightPlannerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  locationCityId: { type: Number, required: true },
  locationCity: { type: String, required: true },
  locationPlans: { type: [locationPlanSchema], required: true },
});

const NightPlannerModel = mongoose.model('NightPlanner', nightPlannerSchema);

module.exports = NightPlannerModel;
