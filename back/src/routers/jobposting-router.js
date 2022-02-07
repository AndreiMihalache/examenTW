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
    let pageSize = 2;

    if (req.query.desc) {
      query.where.deadline = {
        [Op.like]: req.query.deadline,
      };
    }

    if (req.query.sortBy) {
      const criteria = req.query.sortBy.split(":");
      console.log(criteria);
      query.order = [criteria];
    }

    if (req.query.pageSize) {
      pageSize = parseInt(req.query.pageSize);
    }
    if (!isNaN(parseInt(req.query.page))) {
      query.limit = pageSize;
      query.offset = pageSize * parseInt(req.query.page);
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

router.delete("/jobpostings/:jobPostingId", async (req, res) => {
  try {
    const jobposting = await JobPosting.findByPk(req.params.jobPostingId);
    if (jobposting) {
      await jobposting.destroy();
      res.sendStatus(200);
    } else {
      res.status(204).json({ message: "Nu exista Job Postings" });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
