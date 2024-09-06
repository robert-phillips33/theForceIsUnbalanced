const express = require('express');
const app = express();
const cors = require('cors'); 

app.use(cors()); // Handling cross-origin requests
app.use(express.json()); // Parsing JSON bodies

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Star Wars Jedi API';
app.locals.jediData = [
  {
    id: '1',
    name: 'Yoda',
    rank: 'Grand Master',
    alignment: 'Light Jedi',
    fightingStyle: 'Form IV (Ataru), Form V (Shien)'
  },
];

// get all Jedi
app.get('/api/v1/jedi', (req, res) => {
  res.status(200).json(app.locals.jediData);
});

// get specific category of Jedi
app.get('/api/v1/jedi/:type', (req, res) => {
  const { type } = req.params;
  const jediType = app.locals.jediData[type];
  if (!jediType) {
    return res.status(404).send({ error: `No data found for type: ${type}` });
  }
  res.status(200).json(jediType);
});

// post a new Jedi
app.post('/api/v1/jedi', (req, res) => {
  const { name, rank, alignment, fightingStyle } = req.body;
  
  if (!name || !rank || !alignment || !fightingStyle) {
    return res.status(422).json({ error: 'Missing required fields' });
  }

  const newJedi = { id: Date.now(), name, rank, alignment, fightingStyle };
  app.locals.jediData.push(newJedi);
  res.status(201).json(newJedi);
});

// invalid routes and error associated wittit
app.use((req, res) => {
  res.status(404).send('Endpoint not found');
});

// RUN DA SERVER!
app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}`);
});