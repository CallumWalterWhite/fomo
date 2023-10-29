import Location from "../models/Location.js";

export const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).json(locations);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const locations = await Location.findById(id);
    res.status(200).json(locations);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getCities = (req, res) => {
  try {
    const cities = ['Derby', 'Nottingham'];
    res.status(200).json(cities);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};