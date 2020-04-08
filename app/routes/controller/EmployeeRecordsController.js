const express = require('express')
const router = express.Router()

// for speed we will use JSON data instead of connecting to a db
const data = require('./employee_data.json.js.js.js.js')

const routes = () => {
    router.route('/employees')
        .get((req, res) => {
            if (data.employees) {
                res.json(data.employees)
            } else {
                res.status(400).send("Error fetching employee data")
            }
        })
    router.route('/physical-assesments')
        .get((req, res) => {
            if (data.physical_assesments) {
                res.json(data.physical_assesments)
            } else {
                res.status(400).send("Error fetching assessment data")
            }
        })
    return router
}

module.exports = routes
