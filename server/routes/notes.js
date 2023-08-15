const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

//ROUTE 1: Get All the Notes using: GET "/api/notes/fetchallnotes". login required    
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error");
    }
})



//ROUTE 2: Add a new Note using: POST "/api/notes/addnote". login required    
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, status } = req.body;
        //If there are errors, return Bad requests and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            user: req.user.id, title, description, status
        })
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error");
    }
})



//ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". login required 
// yha kaun se note ko update kr rhe ho ye btana padega..to isliye uss particular notes ki id deni padegi
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, status } = req.body;
        // Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };  //it means ki title aa raa h part of the request from user to hum update kr denge Note ko otherwise nhi krenge
        if (description) { newNote.description = description };
        if (status) { newNote.status = status };

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }

        // Allow updation only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error");
    }
})



//ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". login required 
// yha kaun se note ko delete kr rhe ho ye btana padega..to isliye uss particular notes ki id deni padegi
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {

        // Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }

        // Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Succes": "Note has been deleted", note: note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error");
    }


})

module.exports = router;