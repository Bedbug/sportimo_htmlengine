// Module dependencies.
var mongoose = require('mongoose'),
Activity = mongoose.models.Activities,
api = {};

//Common Callback Function Utility
var cbf=function(cb,err,data){
  if(cb && typeof(cb)=='function'){
    if(err) cb(err);
    else cb(false,data);
  }
};

// ALL
api.getAllActivities = function (cb) {
  return Activity.find(function(err, items) {
    cbf(cb,err,items);    
  });
};

// GET
api.getActivity = function (id,cb) {
    
   
    
  Activity.findOne({ '_id': id }, function(err, item) { 
    cbf(cb,err,item);
  });
};

//Some
api.getActivities = function (offset,limit,cb) {
  return Activity.find({ skip: offset, limit: limit },function(err, items) {
    cbf(cb,err,items);    
  });
};

// POST
api.addActivity = function (item,cb) {

  if(item == 'undefined'){
    cb('No Activity Provided. Please provide valid item data.');
  }

  item = new Activity(item);

  item.save(function (err) {
    cbf(cb,err,item.toObject());
  });
};

// PUT
api.editActivity = function (id,updateData, cb) {
  Activity.findById(id, function (err, item) {

    
    
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
api.deleteActivity = function (id,cb) {
  return Activity.findById(id, function (err, item) {
    return item.remove(function (err) {
      cbf(cb,err,true);      
    });
  });
};


module.exports = api;
