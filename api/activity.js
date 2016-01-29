// Module dependencies.
var express = require('express'),
    router = express.Router(),
    moment = require('moment'),
    activity = require('../apiObjects/activity');


var api = {};
// ALL
api.activities = function (req, res) {
    activity.getAllActivities(function (err, data) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json({
                activitys: data
            });
        }
    });
};

// POST
api.addactivity = function (req, res) {
    activity.addActivity(req.body.activity, function (err, data) {
        if (err) res.status(500).json(err);
        else {
            res.status(201).json(data);
        }
    });
};

// GET
api.activity = function (req, res) {
    var id = req.params.id;
    //    var lang = req.params.lang;

    activity.getActivity(id, function (err, data) {
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
api.editactivity = function (req, res) {
    var id = req.params.id;

    return activity.editactivity(id, req.body.activity, function (err, data) {
        if (!err) {
            console.log("updated activity");

            return res.status(200).json(data);
        } else {
            return res.status(500).json(err);
        }
        return res.status(200).json(data);
    });

};

// DELETE
api.deleteactivity = function (req, res) {
    var id = req.params.id;
    return activity.deleteactivity(id, function (err, data) {
        if (!err) {
            console.log("removed activity");
            return res.status(204).send();
        } else {
            console.log(err);
            return res.status(500).json(err);
        }
    });
};




router.get('/activities', api.activities);
router.post('/activity', api.addactivity);
router.get('/activity/:id/:lang', api.activity);
//
//router.route('/activity/:id/')
//.get(api.activity)
//.put(api.editactivity)
//.delete(api.deleteactivity);


module.exports = router;
