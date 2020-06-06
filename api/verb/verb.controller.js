const verbService = require("./verb.service");

async function getVerbs(req, res) {
  try {
    const verbs = await verbService.query(req.query);
    res.json(verbs);
  } catch (err) {
    res.status(500).send({ error: "cannot get verbs" });
  }
}

module.exports = {
  getVerbs,
};
