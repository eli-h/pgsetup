const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people", (err, result) => {
    if (err) {
      return console.error("error running query", err);
    } 
    let userInputs = process.argv.slice(2)
    let person = result.rows.find((person) => userInputs.includes(person.first_name) || userInputs.includes(person.last_name))
    console.log(person); //output: 1
    client.end();
  });
});