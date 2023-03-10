require("dotenv").config();
let mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let Person;

// =====================================
let personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String],
});

Person = new mongoose.model("Person", personSchema);
// =====================================
var createAndSavePerson = function(done) {
  let person = new Person({name: "Bill", age: 34, favoriteFoods: ["eggs", "fish"]});
  person.save(function(err, data) {
    if (err) return console.log(err);
    done(null, data)
  });
};

// =====================================
let arrayOfPeople = [
  { name: "Bill", age: 29, favoriteFoods: ["milk", "peach"] },
  { name: "Jack", age: 31, favoriteFoods: ["chocolate", "candy"] },
  { name: "Vincent", age: 35, favoriteFoods: ["meat", "coffee", "apples"] },
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, data) {
    if(err) return console.log(err);
    done(null ,data);
  });
};
// =====================================

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, data) {
    if(err)return console.log(err);
    done(null, data);
  })
};
// =====================================

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, data) {
    if(err)return console.log(err);
    done(null, data);
  })
};
// =====================================
const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, data) {
    if(err)return console.log(err);
    done(null , data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function(err, data) {
    if(err) return console.log(err);
    data.favoriteFoods.push(foodToAdd);
    data.save((err, data) => {
      if(err)return console.log(err);
      done(null , data);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(
    personId,
    (err, removedDoc) => {
      if(err) return console.log(err);
      done(null, removedDoc);
    }
  ); 
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, response) => {
    if(err) return console.log(err);
    done(null, response);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
  .sort({ name: 1 })
  .limit(2)
  .select({ age: 0 })
  .exec(function(error, people) {
    if(error) return console.log(error)
    done(null, people);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
