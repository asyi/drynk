var express = require('express'),
  app = express(),
  request = require('request'),
  qs = require('querystring'),
  path = require('path'),
  bodyParser = require('body-parser')

var key = 'MDowMDIzMDAxYS1mMDAxLTExZTgtODQxZS1mYjk4YWU4NzU5MmI6VjJEY1c4NGFKVFVGNjRFNXRaeUlDMWF2Rjlxd0hMWjFLVWdy'; // Your LCBO API Key goes here

if (!key) {
  throw new Error('You must register and specify your own \'Backend / Server\' type LCBO API Key.  Keys can be attained from: https://lcboapi.com/');
}

var expressRouter = function() {
  var router = express.Router();

  router.get('/items', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var options = {
      url: 'https://lcboapi.com/products',
      qs: req.query,
      headers: {
        'Authorization': 'Token token="' + key + '"'
      }
    };

    request.get(options, function(err, response, data) {
      if (err) { return res.status(500).send(); }

      return res.json(JSON.parse(data));
    });
  });

  return router;
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', expressRouter());

app.listen(1337, function() {
  console.log('LCBO Proxy Server listening on port 1337, test using: http://localhost:1337/api/items');
});