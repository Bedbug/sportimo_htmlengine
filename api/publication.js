// Module dependencies.
var express = require('express'),
router = express.Router(),
    moment = require('moment'),
publication = require('../apiObjects/publication');


var api = {};
// ALL
api.publications = function (req, res) {
	publication.getAllPublications(function(err,data){
		if (err) {
			res.status(500).json(err);
		} else {
			res.status(200).json({publications: data});
		}
	}); 
};

// POST
api.addpublication = function (req, res) {
	publication.addPublication(req.body.publication,function	(err,data){
		if(err) res.status(500).json(err);
		else {
			res.status(201).json(data);
		}
	});	
};

// GET
api.publication = function (req, res) {
	var id = req.params.id;
	publication.getPublication(id,function(err,data){
		if (err) {
			res.status(404).json(err);
		} else {
            data.publishDate = moment(data.publishDate).format('DD-MM-YYYY HH:mm');
              res.status(200).render('zoom',data);
//            res.status(200).render('publication',data);
//			res.status(200).json({publication: data});
		}
	}); 
};

// PUT
api.editpublication = function (req, res) {
	var id = req.params.id;

	return publication.editpublication(id,req.body.publication, function (err, data) {
		if (!err) {
			console.log("updated publication");
         
			return res.status(200).json(data);
		} else {
			return res.status(500).json(err);
		}
		return res.status(200).json(data);   
	});

};

// DELETE
api.deletepublication = function (req, res) {
	var id = req.params.id;
	return publication.deletepublication(id, function (err, data) {
		if (!err) {
			console.log("removed publication");
			return res.status(204).send();
		} else {
			console.log(err);
			return res.status(500).json(err);
		}
	});
};




router.get('/publications', api.publications);
router.post('/publication',api.addpublication);

router.route('/publication/:id')
.get(api.publication)
.put(api.editpublication)
.delete(api.deletepublication);


module.exports = router;
