const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000' // Allow requests from your React app
}));

// Define your routes...

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
