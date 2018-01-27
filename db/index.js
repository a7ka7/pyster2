const pg = require('pg');
const dbUrl = process.env.DATABASE_URL;

function getQuestion(res, req) {
  // const data = {text: req.body.text, complete: false};

  pg.connect(dbUrl, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }

    const id = req.params.id;
    const query = client.query(`SELECT * FROM questions WHERE id=${id}`);
    const result = {};

    query.on('row', row => {
      result.data = row;
    });

    query.on('end', () => {
      done();
      return res.json(result.data);
    });
  });
}

function getAllQestions(req, res) {

  pg.connect(dbUrl, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }

    const query = client.query('SELECT * FROM questions');
    const results = [];

    query.on('row', row => {
      results.push(row);
    });

    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
}

module.exports = {
    getQuestion,
    getAllQestions
};
