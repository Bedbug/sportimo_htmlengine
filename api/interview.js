// Module dependencies.
var express = require('express'),
    router = express.Router(),
    moment = require('moment'),
    interview = require('../apiObjects/interview');


var api = {};
// ALL
api.interviews = function (req, res) {
    interview.getAllinterviews(function (err, data) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json({
                interviews: data
            });
        }
    });
};

// POST
api.addinterview = function (req, res) {
    interview.addinterview(req.body.interview, function (err, data) {
        if (err) res.status(500).json(err);
        else {
            res.status(201).json(data);
        }
    });
};

// GET
api.interview = function (req, res) {
    var id = req.params.id;
    //    var lang = req.params.lang;

    interview.getinterview(id, function (err, data) {
        if (err) {
            res.status(404).json(err);
        } else {
            if (data == null) {
                data = {};
                data.image = "http://www.fclm.ru/thumbs/img/publication/56/5691394607a9d/orig.jpg/orig.jpg";
                data.formateddate = "";
                data.text = "Article not found."
            }

            data.formateddate = moment(data.date).format('DD-MM-YYYY HH:mm');
            res.status(200).render('article', data);

        }
    });
};

// PUT
api.editinterview = function (req, res) {
    var id = req.params.id;

    return interview.editinterview(id, req.body.interview, function (err, data) {
        if (!err) {
            console.log("updated interview");

            return res.status(200).json(data);
        } else {
            return res.status(500).json(err);
        }
        return res.status(200).json(data);
    });

};

// DELETE
api.deleteinterview = function (req, res) {
    var id = req.params.id;
    return interview.deleteinterview(id, function (err, data) {
        if (!err) {
            console.log("removed interview");
            return res.status(204).send();
        } else {
            console.log(err);
            return res.status(500).json(err);
        }
    });
};




router.get('/interviews', api.interviews);
router.post('/interview', api.addinterview);
router.get('/interview/:id/:lang', api.interview);
//
//router.route('/interview/:id/')
//.get(api.interview)
//.put(api.editinterview)
//.delete(api.deleteinterview);


module.exports = router;
