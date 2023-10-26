import NightPlan from "../models/NightPlan.js";

export const getNightPlans = async (req, res) => {
    try {
      const locations = await NightPlan.find();
      res.status(200).json(locations);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };
