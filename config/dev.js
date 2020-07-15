module.exports = {
  host: 'localhost',
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'verb_db',
  insecureAuth: true
}