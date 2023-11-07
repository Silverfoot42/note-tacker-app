const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const util = require('util');


const readFromFile = util.promisify(fs.readFile);

const router = express.Router();

router.get('/notes', (req, res) => {
  readFromFile('./db/db.json').then((data) =>
    res.json(JSON.parse(data))
  );
});

router.post('/notes', (req, res) => {
  const { title, text } = req.body;
console.log(req.body);
  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuidv4(),
    };
   
    fs.readFile("./db/db.json", 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(newNote);
        fs.writeFile('./db/db.json', JSON.stringify(parsedData), (err) => {
          if (err) {
            console.error(err);
          } else {
            res.json(newNote);
          }
        });
    }});

}});

module.exports = router;