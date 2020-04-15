const express = require('express')
const router = express.Router()

// for speed we will use JSON data instead of connecting to a db
const source = require('./employee_data.json')

    // define the employees endpoint
    router.get('/employees', (req, res, next) => {
        let data = source.employees
        if (req.query) {} // seperate out data fetching into source file
        if (data) {
            res.json(data)
        } else {
            res.status(400).send("Error fetching employee data")
        }
    })

    // defined the physical-assessments endpoint
    router.get('/physical-assesments', (req, res, next) => {
        let data = source.physical_assesments
        if (data.physical_assesments) {
            res.json(data.physical_assesments)
        } else {
            res.status(400).send("Error fetching assessment data")
        }
    })

module.exports = router
