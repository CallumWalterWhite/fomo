import Location from "../models/Location.js";

export const getLocations = async (req, res) => {
    try {
      const locations = await Location.find();
      res.status(200).json(locations);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };