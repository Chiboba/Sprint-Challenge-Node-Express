const express = require('express');

const dbProject = require('../data/helpers/projectModel.js');

const router = express.Router();

router.get('/:id', (req, res) => {
    const {id} = req.params;
    dbProject.get(id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch (error => {
        res.status(404).json({message: 'Project not found', error: error})
    })
})

router.get('/', (req, res) => {
    dbProject.get()
    .then(project => {
        res.status(200).json(project)
    })
    .catch (error => {
        res.status(404).json({message: 'Project not found', error: error})
    })
})

router.get('/actions/:id', (req, res) => {
    const {id} = req.params;
    dbProject.getProjectActions(id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch (error => {
        res.status(404).json({message: 'Actions not found', error: error})
    })
})

router.post('/', (req, res) => {
    const newProject = req.body;
    if (newProject.name.length > 128) {
        res.status(400).json({message: "!!Name is longer than 128 characters!!"})
    } else if (newProject.name === undefined || newProject.name.length === 0) {
        res.status(400).json({message: "Please include a name" })
    } else if (newProject.description === undefined || newProject.description.length === 0 ) {
        res.status(400).json({message: "Please include a description"})
    } else {
        dbProject.insert(newProject)
        .then(project => {
            res.status(201).json(project)
        })
        .catch (error => {
            res.status(500).json({message: "Project could not be made"})
        })
    }
})

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const updatedProject = req.body;
    if (updatedProject.name.length > 128) {
        res.status(400).json({message: "!!Name is longer than 128 characters!!"})
    } else if (updatedProject.name.length === 0 || updatedProject.name === undefined) {
        res.status(400).json({message: "Please include a name" })
    } else if (updatedProject.description.length === 0 || updatedProject.description === undefined) {
        res.status(400).json({message: "Please include a description"})
    } else {
        dbProject.update(id, updatedProject)
        .then(newProj => {
            if(newProj) {
                res.status(200).json({message: "Project updated"})
            } else {
                res.status(404).json({message: "Project not found"})
            }
        })
        .catch(error => {
            res.status(400).json({message: "Project could not be updated"})
        })
    }
})

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    dbProject.remove(id)
    .then(count => {
        res.status(201).json({message: `${count} project(s) removed`})
    })
    .catch(error => {
        res.status(500).json({message: "Project removed"})
    })
})

module.exports = router;