import express from "express";
import { ObjectId } from "mongodb";
import { getDb } from "../db/conn.mjs";

const router = express.Router();

/*
GET ALL RECORDS
GET /record
*/
router.get("/", async (req, res) => {
  try {
    const db = getDb();

    const results = await db
      .collection("records")
      .find({})
      .toArray();

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

/*
GET SINGLE RECORD
GET /record/:id
*/
router.get("/:id", async (req, res) => {
  try {
    const db = getDb();

    const result = await db.collection("records").findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!result) {
      return res.status(404).json({
        message: "Record not found",
      });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

/*
CREATE RECORD
POST /record
*/
router.post("/", async (req, res) => {
  try {
    const db = getDb();

    const newRecord = {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    };

    const result = await db
      .collection("records")
      .insertOne(newRecord);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

/*
UPDATE RECORD
PATCH /record/:id
*/
router.patch("/:id", async (req, res) => {
  try {
    const db = getDb();

    const updates = {
      $set: req.body,
    };

    const result = await db.collection("records").updateOne(
      {
        _id: new ObjectId(req.params.id),
      },
      updates
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

/*
DELETE RECORD
DELETE /record/:id
*/
router.delete("/:id", async (req, res) => {
  try {
    const db = getDb();

    const result = await db.collection("records").deleteOne({
      _id: new ObjectId(req.params.id),
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

export default router;