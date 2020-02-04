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

  ////////////////////////////




  // Get route for retrieving a single post
  app.get("/api/posts/:id", function (req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Post.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Author]
    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  // POST route for saving a new post
  app.post("/api/workouts", function (req, res) {
    // console.log(new Date().setDate(new Date().getDate()))
    const workout =new Workout();
    workout.day = new Date().setDate(new Date().getDate());
    Workout.create(workout)
    .then(dbWorkout => {
      res.json(dbWorkout)
      console.log(dbWorkout)
    })
    // db.workout.insert(
    //   {
    //     day: new Date().setDate(new Date().getDate()),
    //     exercises: []
    //   }, (error, data) => {
    //     if (error) {
    //       res.send(error);
    //     } else {
    //       res.json(data);
    //     }
    //   });
    // .then(function (dbWorkout) {
    //   res.json(dbWorkout);
    //   console.log(dbWorkout)
    // });
  });


  // DELETE route for deleting posts
  app.delete("/api/posts/:id", function (req, res) {
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  // PUT route for updating posts
  app.put("/api/posts", function (req, res) {
    db.Post.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function (dbPost) {
        res.json(dbPost);
      });
  });
};
© 2020 GitHub, Inc.