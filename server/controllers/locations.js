import Location from "../models/Location.js";
import City from "../models/City.js";

export const getLocationsByCity = async (req, res) => {
  try {
    const { CityId } = req.params;
    const locations = await Location.find({ CityId });
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

export const getLocationSearch = async (req, res) => {
  try {
    const { term } = req.params;
    const locations = await Location.find({ term: { $regex: '.*title.*' } }).limit(5);
    res.status(200).json(locations);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


export const getCities = async (req, res) => {
  try {
    const cities = await City.find();
    console.log(cities);
    res.status(200).json(cities);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};