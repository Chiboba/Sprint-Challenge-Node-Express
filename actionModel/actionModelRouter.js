const express = require('express');

const dbAction = require('../data/helpers/actionModel.js');

const {getProjectActions} = require('../data/helpers/projectModel.js');

const router = express.Router();
 
router.get('/:id', (req, res) => {
    const {id} = req.params;
    getProjectActions(id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch (error => {
        res.status(404).json({message: 'Action not found', error: error})
    })
})

router.post('/', (req, res) => {
    const newAction = req.body;
    if (newAction.project_id === undefined) {
        res.status(400).json({message: "Please provide a project id"})
    } else if (newAction.description.length > 128) {
        res.status(400).json({message: "!!Description too long!!"})
    } else if (newAction.description === undefined || newAction.description.length === 0 ) {
        res.status(400).json({message: "Please include a description"})
    } else if (newAction.notes === undefined || newAction.notes.length === 0 ) {
        res.status(400).json({message: "Please include notes"})
    } else {
        dbAction.insert(newAction)
        .then(action => {
            res.status(201).json(action)
        })
        .catch (error => {
            res.status(500).json({message: "Action could not be created"})
        })
    }
})

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const updatedAction = req.body;
    if (updatedAction.project_id === undefined) {
        res.status(400).json({message: "Please provide a project id"})
    } else if (updatedAction.description.length > 128) {
        res.status(400).json({message: "!!Description too long!!"})
    } else if (updatedAction.description === undefined || updatedAction.description.length === 0 ) {
        res.status(400).json({message: "Please include a description"})
    } else if (updatedAction.notes === undefined || updatedAction.notes.length === 0 ) {
        res.status(400).json({message: "Please include notes"})
    } else {
        dbAction.update(id, updatedAction)
        .then(newAct => {
            if(newAct) {
                res.status(200).json({message: "Action updated"})
            } else {
                res.status(404).json({message: "Action not found"})
            }
        })
        .catch(error => {
            res.status(400).json({message: "Action could not be updated"})
        })
    }
})

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    dbAction.remove(id)
    .then(count => {
        res.status(201).json({message: `${count} action(s) removed`})
    })
    .catch(error => {
        res.status(500).json({message: "Action removed"})
    })
})

module.exports = router;