const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');
const users = [];

app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the username and password match any registered user
  const user = users.find((user) => user.username === username && user.password === password);
  
  if (user) {
    res.status(200).json({ message: 'Sign-in successful' });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});


app.post('/api/signup', (req, res) => {
  const { username, password } = req.body;

  // Check if the username is already taken
  if (users.find((user) => user.username === username)) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  // Create a new user object
  const newUser = {
    username,
    password,
  };

  // Store the user in the database
  users.push(newUser);

  // Return a success response
  res.status(200).json({ message: 'User registered successfully' });
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
