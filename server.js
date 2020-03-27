const express = require("express");
var path = require("path");
const logger = require("morgan");
const mongojs = require("mongojs");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));



// To allow heroku acessibility
mongoose.connect(process.env.MONGODB_URI || "mongodb://mattchley:MvjP72!SMEdzMy3@ds127944.mlab.com:27944/heroku_8lgds0tw", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// HTML Routes
app.get("/", function (req, res) {

  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/exercise", function (req, res) {

  res.sendFile(path.join(__dirname, "./public/exercise.html"));

});

app.get("/stats", function (req, res) {

  res.sendFile(path.join(__dirname, "./public/stats.html"));
});


// API Routes
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

// POST exercise
app.post("/api/workouts", function (req, res) {
  const workout = new Workout();
  workout.day = new Date().setDate(new Date().getDate());
  Workout.create(workout)
    .then(dbWorkout => {
      res.json(dbWorkout)
      console.log(dbWorkout)
    })
});


// PUT Workouts
app.put("/api/workouts/:id", (req, res) => {
  console.log(req.body)
  if (req.body.type === "cardio") {
    db.Workout.findOneAndUpdate(
      {
        _id: mongojs.ObjectId(req.params.id)
      },
      {
        $push: {
          exercises: {
            type: req.body.type,
            name: req.body.name,
            duration: req.body.duration,
            distance: req.body.distance
          }
        }
      }
    )
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  }
  if (req.body.type === "resistance") {
    db.Workout.findOneAndUpdate(
      {
        _id: mongojs.ObjectId(req.params.id)
      },
      {
        $push: {
          exercises: {
            type: req.body.type,
            name: req.body.name,
            duration: req.body.duration,
            weight: req.body.weight,
            reps: req.body.reps,
            sets: req.body.sets
          }
        }
      }
    )
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  }
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
