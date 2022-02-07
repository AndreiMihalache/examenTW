const express = require("express");
const JobPosting = require("../models/jobposting");
const { req, res } = require("express");
const { Op } = require("sequelize");

const router = new express.Router();

router.post("/jobpostings", async (req, res) => {
  try {
    const jobposting = await JobPosting.create(req.body);
    res.status(201).json(jobposting);
  } catch (err) {
    {
      res.status(500).send(err.message);
    }
  }
});

router.get("/jobpostings", async (req, res) => {
  try {
    const query = {
      where: {},
      order: [],
    };

    if (req.query.desc) {
      query.where.speed = {
        [Op.eq]: req.query.minspeed,
      };
    }

    if (req.query.deadline) {
      query.where.weight = {
        [Op.eq]: req.query.minweight,
      };
    }

    if (req.query.sortBy) {
      const criteria = req.query.sortBy.split(":");
      console.log(criteria);
      query.order = [criteria];
    }

    const jobpostings = await JobPosting.findAll(query);
    if (jobpostings.length > 0) {
      res.json({ content: jobpostings, length: jobpostings.length });
    } else {
      res.status(204).json({ message: "Nu exista Job Postings" });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put("/jobpostings/:jobPostingId", async (req, res) => {
  try {
    const jobposting = await JobPosting.findByPk(req.params.jobPostingId);
    if (jobposting) {
      await jobposting.update(req.body);
      res.status(200).json(jobposting);
    } else {
      res.status(204).json({ message: "Nu exista Job Postings" });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
