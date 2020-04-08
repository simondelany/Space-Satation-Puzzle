const express = require('express')
const router = express.Router()

// for speed we will use JSON data instead of connecting to a db
const data = require('./employee_data.json')

    // define the employees endpoint
    router.get('/employees', (req, res, next) => {
        if (data.employees) {
            res.json(data.employees)
        } else {
            res.status(400).send("Error fetching employee data")
        }
    })

    // defined the physical-assessments endpoint
    router.get('/physical-assesments', (req, res, next) => {
        if (data.physical_assesments) {
            res.json(data.physical_assesments)
        } else {
            res.status(400).send("Error fetching assessment data")
        }
    })

module.exports = router
