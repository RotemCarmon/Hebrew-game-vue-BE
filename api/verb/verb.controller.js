const verbService = require("./verb.service");

async function getInfinitives(req, res) {
  try {
    const verbs = await verbService.getInfinitives(req.query);
    res.json(verbs);
  } catch (err) {
    res.status(500).send({ error: "cannot get verbs" });
  }
}
async function getConjugation(req, res) {
  try {
    const conjugation = await verbService.getConjugation(req.query);
    res.json(conjugation);
  } catch (err) {
    res.status(500).send({ error: "cannot get conjugation" });
  }
}

async function addVerb(req, res) {
  try {
    const verb = await verbService.addVerb(req.body)
    res.json(verb);
  } catch (err) {
    res.status(500).send({ error: 'cannt add verbs' })
  }
}

module.exports = {
  getInfinitives,
  getConjugation,
  addVerb
};
