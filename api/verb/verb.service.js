
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

async function addVerb(verb) {
  const { infinitive } = verb;
  
  const infQuery = ` INSERT INTO infinitive (englishInf, hebrewInf) VALUES ("${infinitive.eng}","${infinitive.heb}");`;

  const okPacket = await dbService.runSQL(infQuery);

  if (okPacket.affectedRows !== 0) {
    const id = okPacket.insertId;
    
    // save to tenses DBs with infinitive id as FK
    const querys = _addTenses(verb, id);
    
    querys.forEach(async (query) => {
      await dbService.runSQL(query);
    });
  }

  return infQuery;
}

module.exports = {
  getInfinitives,
  getConjugation,
  addVerb,
};

function _buildCriteria(params) {
  let { id, tense, preposition } = params;

  if (tense === "past" || tense === "future") {
    if (preposition === "me_m" || preposition === "me_f") {
      preposition = "me";
    }
    if (preposition === "we_m" || preposition === "we_f") {
      preposition = "we";
    }
    if (preposition === "they_m" || preposition === "they_f") {
      preposition = "they";
    }
  }
  if (tense === "future") {
    if (preposition === "you_m_p" || preposition === "you_f_p") {
      preposition = "you_p";
    }
  }
  if (tense === "present") {
    if (
      preposition === "me_m" ||
      preposition === "you_m_s" ||
      preposition === "he"
    ) {
      preposition = "m_s";
    }
    if (
      preposition === "me_f" ||
      preposition === "you_f_s" ||
      preposition === "she"
    ) {
      preposition = "f_s";
    }
    if (
      preposition === "we_m" ||
      preposition === "you_m_p" ||
      preposition === "they_m"
    ) {
      preposition = "m_p";
    }
    if (
      preposition === "we_f" ||
      preposition === "you_f_p" ||
      preposition === "they_f"
    ) {
      preposition = "f_p";
    }
  }

  const criteria = `SELECT ${preposition} FROM ${tense} WHERE infId = ${id}`;
  return criteria;
}

// BEING EXECUTADE AFTER THE INFINITIVE ID IS RETURNED FROM THE DB
function _addTenses(verb, id) {

  const { past, present, future } = verb;
  const querys = []
  const pastQuery = `INSERT INTO past (infId, me, we, you_m_s, you_f_s, you_m_p, you_f_p, he, she, they) VALUES (${id}, "${past.me}","${past.we}","${past.you_m_s}","${past.you_f_s}", "${past.you_m_p}","${past.you_f_p}","${past.he}","${past.she}","${past.they}");`;
  querys.push(pastQuery)
  
  const presentQuery = `INSERT INTO present (infId, m_s, f_s, m_p, f_p) VALUES (${id},"${present.m_s}","${present.f_s}","${present.m_p}","${present.f_p}");`;
  querys.push(presentQuery)
  
  const futureQuery = `INSERT INTO future (infId, me, we, you_m_s, you_f_s, you_p, he, she, they) VALUES (${id}, "${future.me}","${future.we}","${future.you_m_s}","${future.you_f_s}", "${future.you_p}","${future.he}","${future.she}","${future.they}");`; // TODO: Forfiegn key
  querys.push(futureQuery)
  
  
  return querys;
}
