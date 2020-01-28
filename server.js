const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populatedb", { useNewUrlParser: true });

// HTML Routes
// app.get("/", function (req, res) {
 
//   res.sendFile(path.join(__dirname, "../public/index.html"));
// });

// app.get("/exercise", function (req, res) {
  
//   res.sendFile(path.join(__dirname, "../public/exercise.html"));
// });

// app.get("/stats", function (req, res) {
  
//   res.sendFile(path.join(__dirname, "../public/stats.html"));
// });


// API Routes
// Post exercise
app.post("/api/workouts", (req, res) => {
  db.Workout.insert(req.body, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.send(data);
    }
  });
});

// Get Workouts(works)
app.get("/api/workouts", (req, res) => {
  db.Workout.find({}, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.send(data);
    }
  });
});

// Get Workouts with range (works)
app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({}, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.send(data);
    }
  });
});

// PUT Workouts
// db.collection.update(query, update, [options], [callback])
app.put("/api/workouts:id", (req, res) => {
  db.Workout.update(req.body, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.send(data);
    }
  });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
