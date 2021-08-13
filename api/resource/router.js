const express = require('express')
const Resources = require('./model')
const router = express.Router()

router.get('/', (req, res, next) => {
    Resources.getResources()
        .then(rss => {
            res.json(rss)
        })
        .catch(next)
})

module.exports = router