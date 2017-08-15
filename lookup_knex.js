const settings = require("./settings");

let knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});



knex('famous_people').select('*')
.then((result) => {
  let userInputs = process.argv[2];
  let person = result.find((person) => userInputs.includes(person.first_name) || userInputs.includes(person.last_name))
  console.log(`${person.id}: ${person.first_name} ${person.last_name}, ${person.birthdate}`);
})
.then(function () {
    return knex.destroy();
})

