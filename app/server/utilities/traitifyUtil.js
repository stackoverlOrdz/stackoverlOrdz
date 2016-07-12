// var traitify = require('traitify');
var http = require('http');
var https = require('https');
var _ = require('underscore');

// traitify.setHost("https://api-sandbox.traitify.com");
// traitify.setVersion("v1");
// traitify.setSecretKey("eehk5r98913mgc3ni8s73jkdq2");

var testResultsArray = [];


// exports.createAssessment = function(deckId) {
function createAssessment(deckId) {
  var options = {
    hostname: 'api.traitify.com',
    path: '/v1/assessments',
    method: 'POST',
    headers: {
      'Authorization': 'Basic eehk5r98913mgc3ni8s73jkdq2:x',
      'Content-Type': 'application/json'
    }
  };

  var req = https.request(options, function(res) {
    res.on('data', function(body) {
      // console.log('Body: ' + body);
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  //write data to request body
  req.write(JSON.stringify({ deck_id: 'core' }));
  req.end();
}

function getAssessment(assessmentId) {
  var body = '';

  var options = {
    hostname: 'api.traitify.com',
    path: '/v1/assessments/' + assessmentId + '/slides',
    method: 'GET',
    headers: {
      'Authorization': 'Basic eehk5r98913mgc3ni8s73jkdq2:x'
    }
  };

  var req = https.request(options, function(res) {
    res.on('data', function(result) {
      body += result;
    });

    res.on('end', function() {
      body = JSON.parse(body);
      body.forEach(function(item) {
        var testResult = {};
        testResult.id = item.id;
        testResult.response = Boolean(Math.round(Math.random()));
        testResult.time_taken = 1000;
        testResultsArray.push(testResult);
      });
      console.log(testResultsArray);
      testSubmitResults(assessmentId);
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  req.end();
}

// TEST //

function testSubmitResults(assessmentId) {
  var options = {
    hostname: 'api.traitify.com',
    path: '/v1/assessments/' + assessmentId + '/slides',
    method: 'PUT',
    headers: {
      'Authorization': 'Basic eehk5r98913mgc3ni8s73jkdq2:x'
    }
  };

  var req = https.request(options, function(res) {
    res.on('data', function(body) {
      // console.log('Body: ' + body);
    });
    res.on('end', function() {
      console.log
      getResults(assessmentId);
    });
  });

  //write data to request body
  req.write(JSON.stringify(testResultsArray));
  req.end();
}

function getResults(assessmentId) {
  var body = '';
  var options = {
    hostname: 'api.traitify.com',
    path: '/v1/assessments/' + assessmentId + '/?data=blend,types,traits',
    method: 'GET',
    headers: {
      'Authorization': 'Basic eehk5r98913mgc3ni8s73jkdq2:x'
    }
  };

  var req = https.request(options, function(res) {
    res.on('data', function(result) {
      body += result;
    });

    res.on('end', function() {
      body = JSON.parse(body);
      console.log("personality_types", body.personality_types);
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  req.end();
}

// createAssessment('core');
// getAssessment('482ef9e1-486f-4a9b-97a6-467894c993ee');
testSubmitResults('482ef9e1-486f-4a9b-97a6-467894c993ee');
// getResults('482ef9e1-486f-4a9b-97a6-467894c993ee');
