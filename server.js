var express = require( 'express' );
var app = express();
var MongoClient = require( 'mongodb' ).MongoClient;
var bodyParser = require( 'body-parser' );
app.use( bodyParser.json() );
var ObjectId = require( 'mongodb' ).ObjectID;


var url = 'mongodb://localhost:27017/farm';


app.post( '/animals', function( req, res ) {
  var body = req.body
  MongoClient.connect( url, function( err, db ) {
    var collection = db.collection( 'animals' );
    collection.insert( { name: req.body.name,
                         type: req.body.type,
                         age: req.body.age 
                       });
    res.status( 200 ).end();
    db.close();
  });
});

app.put( '/animals/:id', function( req, res ) {
  MongoClient.connect( url, function( err, db ) {
    var collection = db.collection( 'animals' );
    var updateBody = req.body;
    console.log( updateBody )
    console.log( req.params.id )
    collection.updateOne( { _id: new ObjectId(req.params.id) }, { $set: updateBody  } )
    res.status( 200 ).end();
    db.close();
  })
})

app.delete( '/animals/:id', function( req, res ) {
  MongoClient.connect( url, function( err, db ) {
    var collection = db.collection( 'animals' );
    var updateBody = req.body;
    console.log( updateBody )
    console.log( req.params.id )
    collection.remove( { _id: new ObjectId(req.params.id) } )
    res.status( 200 ).end();
    db.close();
  })
})

app.get( '/animals', function( req, res ) {

  MongoClient.connect( url, function( err, db ) {
    var collection = db.collection( 'animals' );
    collection.find({}).toArray( function( err, docs ) {
      res.json( docs );
      db.close();
    });
  });

});

app.listen( '3000', function() {
  console.log( "Welcome to the year 3000!" );
});