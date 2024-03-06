require("dotenv").config();
const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

//connecting to mysql database
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "rootdh@^sh1n1", //password of the database (root for you) can directly give the password here no need of process.env.PASSWORD
  //password: 'root',
  database: "studentdb", //schema name
});

// inserting the data into the database from client side
app.post("/insert", (req, res) => {
  //creating a table
  //grabbing the data from the client side (emp details)
  const name = req.body.name;
  const age = req.body.age;
  const department = req.body.department;
  const year = req.body.year;
  const cgpa = req.body.cgpa;
  const address = req.body.address;

  //inserting the data into the database
  db.query(
    "INSERT INTO form2 (name, age , department,year, cgpa, address) VALUES (?,?,?,?,?,?)",
    [name, age, department, year, cgpa, address], //callback function after it done
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values inserted"); //console message after inserting the data 
      }
    }
  );
});

//DISPLAY PROCESS - get request to get the data from the database 
app.get("/detail", (req, res) => {
  db.query("SELECT * FROM form2", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// DELETE PROCESS -  deletes data row based on ID
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM form2 WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Student deleted successfully");
    }
  });
});

const PORT=process.env.PORT||3000;

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
