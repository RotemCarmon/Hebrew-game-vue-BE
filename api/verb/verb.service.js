// Mock DATABASE
const DB = require('../../../data/DB.json')

async function query(filterBy={}) {
  var query = _buildCriteria(filterBy);
  // const verbs = await dbService.runSQL(query);
    //  const verbs = [{e: 'e', h: 'h'},{e: 'e2', h: 'h2'}]
  const verbs = DB;
  return verbs
}

module.exports = {
  query
}

function _buildCriteria(filterBy) {
  var criteria = `SELECT * FROM toy`
  return criteria
}