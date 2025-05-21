require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect(
  process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

//User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  }
});
const User = mongoose.model("User", userSchema);

//Exercise Schema
const exerciseSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  description: String,
  duration: Number,
  date: Date
});
const Exercise = mongoose.model("Exercise", exerciseSchema);

//Middleware
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

//Create new user
app.post("/api/users", async (req, res) => {
  const { username } = req.body;
  try {
    const newUser = await User.create({username: username});
    console.log("User successfully created")
    res.json({username: newUser.username, _id: newUser._id});
  } catch (err) {
    console.log(err);
  }
});

//Get list of users
app.get("/api/users", async (req, res) => {
  try {
    const userList = await User.find({});
    console.log(`List returned ${userList.length} items`);
    res.json(userList);
  } catch(err) {
    console.log(err);
  }
});

//Post new exercise
app.post("/api/users/:id/exercises", async (req, res) => {
  const { id } = req.params;
  const { description, duration, date } = req.body;
  try {
    const user = await User.findById(id, "_id username");
    if (!user) {
      res.send("User not found");
    } else {
      const newExercise = await Exercise.create({
        user_id: user._id,
        description,
        duration,
        date: date ? new Date(date) : new Date()
      });
      res.json({
        _id: user._id,
        username: user.username,
        description: newExercise.description,
        duration: newExercise.duration,
        date: new Date(newExercise.date).toDateString()
      });
    }
  } catch(err) {
    console.log(err);
    res.send("There was an error");
  }
});

//Get a users logs
app.get("/api/users/:id/logs", async (req, res) => {
  const { from, to, limit } = req.query;
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.json("User not found");
    } else {
      let dateObj = {};
      if (from) {
        dateObj["$gte"] = new Date(from);
      }
      if (to) {
        dateObj["$lte"] = new Date(to);
      }
      let filter = {
        user_id: id
      }
      if (from || to) {
        filter.date = dateObj;
      }
      const userExercises = await Exercise.find(filter).limit(+limit ?? 500);
      res.json({
        username: user.username,
        count: userExercises.length,
        _id: user._id,
        log: userExercises.map((exercise) => ({
          description: exercise.description,
          duration: exercise.duration,
          date: exercise.date.toDateString()
        }))
      });
    }
  } catch(err) {
    console.log(err);
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Your app is listening on port ${listener.address().port}...`);
});