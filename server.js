var express = require('express');
var app = express();

app.use(express.static('views'));

app.get('/', function(req,resp){
  resp.send('hello');
})




var dogs = [
  {
    id:1,
    name:'petunia',
    age:2
  },
  {
    id:2,
    name:'honeypie',
    age:5},
  {
    id:3,
    name:'stinky',
    age:10
  }
];
var cats = [
  {id:1, name:'java', age:5},
  {id:2, name:'script', age:3},
  {id:3, name:'demon', age:2}
];

var students = [
  {
    id:1,
    firstName:'Michal',
    lastName:'Vacek'
  },
  {
    id:2,
    firstName:'xxx',
    lastName:'yyy'
  },
  {
    id:3,
    firstName:'zzz',
    lastName:'aaa'
  }
]



app.get('/api/dogs', function(req,res) {
  res.json(dogs);
});

// app.get('/api/dogs/:dog_idx', function (request, response) {
//   response.json(dogs[request.params.dog_idx]);
// })
app.get('/api/dogs/:dog_idx', function (request, response) {
  var theAppropriateDog = dogs.filter(function(dog){
    return dog.id == request.params.dog_idx;
  })
  response.json(theAppropriateDog);
})


app.get('/api/cats', function(req,res) {
  res.json(cats);
});

// app.get('/api/cats/:cat_idx', function(request,response) {
//   response.json(cats[request.params.cat_idx]);
// });

app.get('/api/cats/:cat_idx', function (request, response) {
  var catId = request.params.cat_idx
  var theAppropriateCat = cats.filter(function(cat){
    return cat.id == catId;
  })
  response.json(theAppropriateCat);
})

app.get('/api/greeting/:first_name/:last_name', function(request,response) {
  var firstName = request.params.first_name;
  var lastName = request.params.last_name;
  response.send(`Hello, ${firstName} ${lastName}!`);
});

app.get('/api/catNamesWith/:catL', function (request, response) {
  var catFirstL = request.params.catL
  var theAppropriateCat = cats.filter(function(cat){
    return cat.name[0].toLowerCase() == catFirstL.toLowerCase();
  })
  response.json(theAppropriateCat);
})

app.get('/api/catAge/:catAge', function (request, response) {
  var catAge = request.params.catAge
  var theAppropriateCat = cats.filter(function(cat){
    return cat.age == catAge;
  })
  response.json(theAppropriateCat);
})

app.get('/api/students', function(request,response) {
  var studentIdFromUrl = request.query.id;
  var studentsWithThatId = students.filter(function(student){
    return student.id == studentIdFromUrl;
  });
  if (studentsWithThatId == ""){
    response.json(students);
  }else {
    response.json(studentsWithThatId);
  }
});




app.listen(3000, function(){
  console.log('listening to port 3000');
})
