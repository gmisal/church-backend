import express from "express";
import Group from "../models/Group.js";

const router = express.Router();

//Create a new group
router.post("/", async (req, res) => {
  const group = new Group(req.body);
  try {
    const savedGroup = await group.save();
    res.status(201).json(savedGroup);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get all groups
router.get("/", async (req, res) => {
  try {
    const groups = await Group.find().populate("members");
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;