// Module dependencies.
var mongoose = require('mongoose'),
interview = mongoose.models.Interviews,
api = {};

//Common Callback Function Utility
var cbf=function(cb,err,data){
  if(cb && typeof(cb)=='function'){
    if(err) cb(err);
    else cb(false,data);
  }
};

// ALL
api.getAllinterviews = function (cb) {
  return interview.find(function(err, items) {
    cbf(cb,err,items);    
  });
};

// GET
api.getinterview = function (id,cb) {
    
   
    
  interview.findOne({ '_id': id }, function(err, item) {
    cbf(cb,err,item);
  });
};

//Some
api.getinterviews = function (offset,limit,cb) {
  return interview.find({ skip: offset, limit: limit },function(err, items) {
    cbf(cb,err,items);    
  });
};

// POST
api.addinterview = function (item,cb) {

  if(item == 'undefined'){
    cb('No interview Provided. Please provide valid item data.');
  }

  item = new interview(item);

  item.save(function (err) {
    cbf(cb,err,item.toObject());
  });
};

// PUT
api.editinterview = function (id,updateData, cb) {
  interview.findById(id, function (err, item) {

    
    
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
api.deleteinterview = function (id,cb) {
  return interview.findById(id, function (err, item) {
    return item.remove(function (err) {
      cbf(cb,err,true);      
    });
  });
};


module.exports = api;
