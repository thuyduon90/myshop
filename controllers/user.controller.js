var User = require('../models/user.model');
var db = require('../db');
var shortid = require('shortid');

module.exports.index = async function(req, res) {
    res.render('users/index', {
        users: await User.find()
    });
};

module.exports.search = async function(req, res) {
    var q = req.query.q;
    var matchedUsers = await User.find();
    matchedUsers = matchedUsers.filter(function(user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    })
    res.render('users/index', {
        users: matchedUsers,
        searchKey: q
    });
}

module.exports.create = function(req, res) {
    res.render('users/create');
};


module.exports.get = async function(req, res) {
    var id = req.params.id;
    var user = await User.findOne({ _id: id });
    res.render('users/view', {
        user: user
    });
};

module.exports.postCreate = function(req, res) {
    req.body.id = shortid.generate();
    req.body.avatar = req.file.path.split('/').slice(1).join('/');

    db.get('users').push(req.body).write();
    res.redirect('/users');
};