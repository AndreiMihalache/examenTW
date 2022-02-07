const express = require("express");
const JobPosting = require("../models/jobposting");
const Candidate = require("../models/candidate");
const { req, res } = require("express");

const router = new express.Router();

router.post("/jobpostings/:jobpostingId/candidates", async (req, res) => {
  try {
    const jobposting = await JobPosting.findByPk(req.params.jobpostingId);
    if (jobposting) {
      const candidate = await Candidate.create(req.body);
      jobposting.addCandidate(candidate);
      await jobposting.save();
      res.status(200).json(candidate);
    } else {
      res.status(204).json({ message: "Nu exista Job Posting" });
    }
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});

router.get("/jobpostings/:jobpostingId/candidates", async (req, res) => {
  try {
    const jobposting = await JobPosting.findByPk(req.params.jobpostingId);
    if (jobposting) {
      const candidates = await Candidate.findAll({
        where: { jobpostingId: req.params.jobpostingId },
      });

      if (candidates.length > 0) {
        res.status(200).json(candidates);
      } else {
        res.status(204).json({ message: "Nu exista candidat" });
      }
    } else {
      res.status(204).json({ message: "Nu exista Job Posting" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get(
  "/jobpostings/:jobpostingId/candidates/:candidateId",
  async (req, res) => {
    try {
      const jobposting = await JobPosting.findByPk(req.params.jobpostingId);
      if (jobposting) {
        const candidate = await Candidate.findByPk(req.params.candidateId);
        if (candidate) {
          res.status(200).json(candidates);
        } else {
          res.status(204).json({ message: "Nu exista candidat" });
        }
      } else {
        res.status(204).json({ message: "Nu exista Job Posting" });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

router.put(
  "/jobpostings/:jobpostingId/candidates/:candidateId",
  async (req, res) => {
    try {
      const jobposting = await JobPosting.findByPk(req.params.jobpostingId);
      if (jobposting) {
        const candidate = await Candidate.findByPk(req.body.candidateId);
        if (candidate) {
          await candidate.update(req.body);
          res.status(200).json(candidate);
        } else {
          res.status(204).json({ message: "Nu exista candidat" });
        }
      } else {
        res.status(204).json({ message: "Nu exista Job Posting" });
      }
    } catch (err) {
      res.status(500).send({ err: err.message });
    }
  }
);

router.delete("/jobpostings/:jobpostingId/candidates", async (req, res) => {
  try {
    const jobposting = await JobPosting.findById(req.params.jobpostingId);
    if (jobposting) {
      const candidates = await Candidate.findAll();
      if (candidates.length > 0) {
        for (const candidate of candidates) {
          await candidate.destroy();
        }
        res.status(200).json({ message: "Entitati sterse" });
      } else {
        res.status(204).json({ message: "Entitati copil nu exista" });
      }
    } else {
      res.status(204).json({ message: "Nu exista Job Posting" });
    }
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});
router.delete(
  "/jobpostings/:jobpostingId/candidates/:candidateId",
  async (req, res) => {
    try {
      const jobposting = await JobPosting.findById(req.params.jobpostingId);
      if (jobposting) {
        const candidate = await Candidate.findById(req.params.candidateId);
        if (candidate) {
          await candidate.destroy();
          res.status(200).json({ message: "Entitate stearsa" });
        } else {
          res.status(204).json({ message: "Nu exista candidat" });
        }
      } else {
        res.status(204).json({ message: "Nu exista Job Posting" });
      }
    } catch (err) {
      res.status(404).send({ err: err.message });
    }
  }
);

module.exports = router;
