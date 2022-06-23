const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user.model');
const jwt = require('jsonwebtoken');
const app = express();
const bcrypt = require('bcryptjs');
const connection = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect('mongodb://localhost:27017/topzone1', connectionParams);
    console.log('succesfully connected to db');
  } catch (e) {
    console.log(e);
  }
};

connection();
app.use(cors());
app.use(express.json());

app.post('/api/register', async (req, res) => {
  try {
    const newPassword = bcrypt.hash(req.body.password, 10);
    if (req.body.password == req.body.confirm) {
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirm: req.body.confirm,
        country: req.body.country,
      });
      res.json({ status: 'ok' });
    } else {
      console.log('passwords dont match');
    }
  } catch (e) {
    res.json({ status: 'false' });
    console.log(e);
  }
});

app.post('/api/login', async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (!user) {
    res.json({ status: 'invalid passowrd' });
  }

  //const isPasswordValid = bcrypt.compare(req.body.password, user.password);

  if (user) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      'secret123'
    );
    res.json({ status: 'ok', user: token });
  } else {
    res.json({ status: 'error', user: 'false' });
  }
});

app.get('/api/welcome', async (req, res) => {
  const token = req.headers['x-access-token'];

  try {
    const decoded = jwt.verify(token, 'secret123');
    const email = decoded.email;
    const user = await User.findOne({ email: email });

    return res.json({ status: 'ok', quote: user.quote });
  } catch (error) {
    console.log(error);
    res.json({ status: 'error', error: 'invalid token' });
  }
});
app.listen(8080, () => {
  console.log('conected to port 8080');
});
