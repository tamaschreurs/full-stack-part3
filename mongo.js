const mongoose = require("mongoose");

const argumentLength = process.argv.length;

if (argumentLength !== 3 && argumentLength !== 5) {
  console.log(
    "Did not receive the right number of arbuments (password, name, number). Program will exit."
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb://fullstack:${password}@cluster0-shard-00-00.6md35.mongodb.net:27017,cluster0-shard-00-01.6md35.mongodb.net:27017,cluster0-shard-00-02.6md35.mongodb.net:27017/phonebook?ssl=true&replicaSet=atlas-vk9xup-shard-0&authSource=admin&retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (argumentLength === 5) {
  const name = process.argv[3];
  const number = process.argv[4];

  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then((result) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else if (argumentLength === 3) {
  Person.find({}).then((persons) => {
    console.log("phonebook:");
    persons.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}
