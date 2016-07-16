var _ = require('lodash');

// SAMPLE
// id: '4446615048021',
//   name: 'Deniz Aslan',
//   picture:
//    { data:
//       { is_silhouette: false,
//         url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/12439125_4310556926653_2253072521179427388_n.jpg?oh=3bf29ec513c932dd46b4296bedb5bdad&oe=5824A23F' } },
//   email: 'deniztetik31@gmail.com',
//   birthday: '10/31/1991',
//   link: 'https://www.facebook.com/app_scoped_user_id/4446615048021/',
//   location: { id: '108424279189115', name: 'New York, New York' },
//   verified: true }

// TODO: add random pictures for people, add to db

 var firstNames = ['Joe', 'Andrew', 'Adam', 'Eve', 'Barbara', 'George', 'Frodo', 'Bohee', 'Rebecca', 'Deniz', 'Joseph', 'John', 'Tyler', 'Phil', 'Abigail', 'Anteo', 'Alex'];
 var lastNames = ['Shmo', 'Leonardi', 'Adams', 'Reiser', 'Jennings', 'Taylor', 'Baggins', 'Park', 'Gray', 'Tetik', 'Martin', 'Michelin', 'Lambe', 'Teves', 'Felix', 'Fabris', 'Friedman'];

 var pictures = [];
 var emailHandles = ['coolkid196', 'lamepersonhater183', 'xofirefairyxo', 'newyorkkid482', 'californiagurl86', 'emperorpenguin23', 'temporaryperson389', 'preppydude283', 'lambosrkool39', 'salsalady49', 'iliketurtles01', 'warmblankets33', 'billabongguy38', 'guitarist942', 'pumalover91', 'solitaryperson129', 'audiodork0871', 'sailor927', 'cooltrainerjoey'];
 var emailDomains = ['yahoo', 'gmail', 'me', 'icloud'];
 var birthYears = ['78', '80', '82', '84', '86', '88', '90', '92', '94'];

 var fbLink = 'https://example.com';
 var cities = 'New York, New York';
 var cityId = '108424279189115';

 function populateTestUsers(numberOfUsers) {
   var userEmailHandles = emailHandles;
   console.log(emailHandles);
   var testUsers = [];
   for (var i = 0; i < numberOfUsers; i++) {
     var testUser = {};
     testUser.name = _.sample(firstNames) + ' ' + _.sample(lastNames);
     testUser.picture = { data: { is_silhouette: false, url: 'https://example.com' } };
     testUser.email = userEmailHandles.pop() + '@' + _.sample(emailDomains) + '.com';
     testUser.birthday = '1/1/' + _.sample(birthYears);
     testUser.location = { id: cityId, name: cities };
     testUser.verified = true;
     testUsers.push(testUser);
   }
   return testUsers;
 }

 console.log(populateTestUsers(18  ));
