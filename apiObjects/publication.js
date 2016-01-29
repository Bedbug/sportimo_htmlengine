// Module dependencies.
var mongoose = require('mongoose'),
Publication = mongoose.models.Publication,
api = {};

//Common Callback Function Utility
var cbf=function(cb,err,data){
  if(cb && typeof(cb)=='function'){
    if(err) cb(err);
    else cb(false,data);
  }
};

// ALL
api.getAllPublications = function (cb) {
  return Publication.find(function(err, items) {
    cbf(cb,err,items);    
  });
};

// GET
api.getPublication = function (id,cb) {
  Publication.findOne({ '_id': id }, function(err, item) {
    cbf(cb,err,item);
  });
};

//Some
api.getPublications = function (offset,limit,cb) {
  return Publication.find({ skip: offset, limit: limit },function(err, items) {
    cbf(cb,err,items);    
  });
};

// POST
api.addPublication = function (item,cb) {

  if(item == 'undefined'){
    cb('No Publication Provided. Please provide valid item data.');
  }

  item = new Publication(item);

  item.save(function (err) {
    cbf(cb,err,item.toObject());
  });
};

// PUT
api.editPublication = function (id,updateData, cb) {
  Publication.findById(id, function (err, item) {

    
    
      if(typeof updateData["name"] != 'undefined'){
        item["name"] = updateData["name"];
      }
      
      if(typeof updateData["price"] != 'undefined'){
        item["price"] = updateData["price"];
      }
      

    return item.save(function (err) {
      cbf(cb,err,item.toObject()); 
    }); //eo item.save
  });// eo item.find
};

// DELETE
api.deletePublication = function (id,cb) {
  return Publication.findById(id, function (err, item) {
    return item.remove(function (err) {
      cbf(cb,err,true);      
    });
  });
};


module.exports = api;
