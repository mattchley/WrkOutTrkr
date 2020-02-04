var db = require("../models");
const mongojs = require("mongojs");
const Workout = require("../models/workout");


// Routes
// =============================================================
module.exports = function (app) {

  // GET route for getting all of the posts
  app.get("/api/workouts", function (req, res) {
    db.Workout.find({})
      .then(dbWorkout => {
        res.json(dbWorkout);
        console.log(dbWorkout)
      })
      .catch(err => {
        res.json(err);
      });
  });

  app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
      .then(dbWorkout => {
        res.json(dbWorkout);
        // console.log(dbWorkout)
      })
      .catch(err => {
        res.json(err);
      });
  });

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


  // POST route for saving a new post
  app.post("/api/workouts", function (req, res) {
    const workout = new Workout();
    workout.day = new Date().setDate(new Date().getDate());
    Workout.create(workout)
      .then(dbWorkout => {
        res.json(dbWorkout)
        console.log(dbWorkout)
      })


  });
}