const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const morgan = require("morgan");
const app = express();
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :post-data"
  )
);

app.use(cors());

app.use(express.static("build"));

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423132",
  },
];

morgan.token("post-data", function (req, res) {
  const body = req.body;
  if (body && req.method === "POST") {
    return JSON.stringify({
      name: body.name,
      number: body.number,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  const date = new Date();
  const infoString = `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`;

  response.send(infoString);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  //Always respond with 204
  res.status(204).end();
});

app.use(express.json());

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({ error: "no info provided" });
  } else if (!body.name || !body.number) {
    return res.status(400).json({ error: "no name or no number provided" });
  } else if (persons.find((person) => person.name === body.name)) {
    return res.status(400).json({ error: "name must be unique" });
  }
  const newId = Math.floor(Math.random() * 999999);
  const person = {
    name: body.name,
    number: body.number,
    id: newId,
  };
  persons = persons.concat(person);

  res.json(person);
});
