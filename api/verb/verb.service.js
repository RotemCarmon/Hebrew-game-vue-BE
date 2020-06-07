const dbService = require("../../services/db.service");

async function getInfinitives() {
  var query = `SELECT * FROM infinitive;`;
  const verbs = await dbService.runSQL(query);

  return verbs;
}

async function getConjugation(params = {}) {
  const query = _buildCriteria(params);
  const conjugation = await dbService.runSQL(query);
  return conjugation;
}

module.exports = {
  getInfinitives,
  getConjugation,
};

function _buildCriteria(params) {
  let { id, tense, preposition } = params;
  if (tense === "past") {
    if (preposition === "me_m" || preposition === "me_f") {
      preposition = "me";
    }
  }
  if (tense === "past" || tense === "future") {
    if (preposition === "we_m" || preposition === "we_f") {
      preposition = "we";
    }
  }

  const criteria = `SELECT ${preposition} FROM ${tense} WHERE infId = ${id}`;
  return criteria;
}
