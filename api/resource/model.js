const db = require('../../data/dbConfig');

function getResources() {
    return db('resources as rss')
}


module.exports = {
    getResources
}