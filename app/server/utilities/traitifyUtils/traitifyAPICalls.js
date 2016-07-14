var https = require('https');

var testResultsArray = [];

var optionsTemplate = {
  hostname: 'api.traitify.com',
  path: '/v1/assessments',
  headers: {
    'Authorization': 'Basic eehk5r98913mgc3ni8s73jkdq2:x'
  }
}


// exports.createAssessment = function(deckId) {
function createAssessment(deckId, callback) {
  // var options = {
  //   hostname: 'api.traitify.com',
  //   path: '/v1/assessments',
  //   method: 'POST',
  //   headers: {
  //     'Authorization': 'Basic eehk5r98913mgc3ni8s73jkdq2:x',
  //     'Content-Type': 'application/json'
  //   }
  // };
  var options = optionsTemplate;
  options.method = 'POST';
  options.headers['Content-Type'] = 'application/json';

  var survey = '';

  var req = https.request(options, function(res) {
    res.on('data', function(body) {
      survey += body;
    });

    res.on('end', function(body) {
      console.log("createAssessment survey", survey);
      // send survey object in callback
      // e.g. survey
      // {"id":"c3effb3f-a57d-4f2a-bbdf-fd0d242d6545",
      // "deck_id":"core","tags":null,"completed_at":null,
      // "created_at":1468444927272,"locale_key":"en-US"}
      callback(survey);
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  //write data to request body
  req.write(JSON.stringify({ deck_id: 'core' }));
  req.end();
}

function getAssessment(assessmentId, callback) {
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

      /// FOR TESTING ONLY ////
      // body.forEach(function(item) {
      //   var testResult = {};
      //   testResult.id = item.id;
      //   testResult.response = Boolean(Math.round(Math.random()));
      //   testResult.time_taken = 1000;
      //   testResultsArray.push(testResult);
      // });
      // console.log(testResultsArray);
      callback(body);
      // testSubmitResults(assessmentId);
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
      // console.log
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
      //  console.log("personality_types", body.personality_types);
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  req.end();
}

module.exports = {
  createAssessment: createAssessment,
  getAssessment: getAssessment,
  testSubmitResults: testSubmitResults,
  getResults: getResults
}
// createAssessment('core');
// getAssessment('482ef9e1-486f-4a9b-97a6-467894c993ee');
// testSubmitResults('482ef9e1-486f-4a9b-97a6-467894c993ee');
// getResults('482ef9e1-486f-4a9b-97a6-467894c993ee');
