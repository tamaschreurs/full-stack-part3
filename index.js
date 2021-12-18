require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT;
const morgan = require("morgan");
const Person = require("./models/person");
const app = express();
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :post-data"
  )
);

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

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
  Person.find({}).then((people) => {
    response.json(people);
  });
});

app.get("/info", (request, response, next) => {
  Person.countDocuments({})
    .then((count) => {
      const date = new Date();
      response.send(
        `<p>Phonebook has info for ${count} people</p><p>${date}</p>`
      );
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndRemove(id)
    .then((person) => res.status(204).end())
    .catch((error) => next(error));
  //Always respond with 204
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({ error: "no info provided" });
  } else if (!body.name || !body.number) {
    return res.status(400).json({ error: "no name or no number provided" });
  }

  Person.find({ name: body.name }).then((result) => {
    if (result.length > 0) {
      return res.status(400).json({ error: "name must be unique" });
    } else {
      const person = new Person({
        name: body.name,
        number: body.number,
      });

      person.save().then((savedPerson) => {
        res.json(savedPerson);
      });
    }
  });
});

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedNote) => {
      res.json(updatedNote);
    })
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);
