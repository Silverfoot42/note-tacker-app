# note-tracker-app

## Description

An application that allows a user to create and save notes. When a note is created it is added to a database and displays the newly created note on the side bar of the page. When a user selects a note from the sidebar it will be displayed on the main section of the webpage.

## Screenshots

![Alt text](note_taker_index_screenshot.png)

![Alt text](note_taker_notes_page_screenshot.png)

## Deployment Link

https://silverfoot42-note-taker-app-0045722284dd.herokuapp.com/

## Credits

The development of this code was assisted by the TA Stephon Autery:

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