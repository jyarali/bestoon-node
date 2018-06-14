var mongoose = require('mongoose'),
    path = require('path'),
    User = mongoose.model('user'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcryptjs'),
    config = require('../config');



exports.create_user = (req, res) => {
    User.find({
            email: req.body.email
        }).exec()
        .then(result => {
            if (result.length >= 1) {
                return res.status(409).json({
                    message: "Oops! email already exists!"
                });
            } else {
                var hashedPassword = bcrypt.hashSync(req.body.password, 8);
                var new_user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword
                });
                new_user.save()
                    .then(user => {
                        var token = jwt.sign({
                            id: user._id
                        }, config.secret, {
                            expiresIn: 86400
                        });
                        return res.status(200).json({
                            auth: true,
                            token: token,
                            message: "Welcome Dear " + user.name + "!"
                        });
                    })
                    .catch(error => {
                        return res.status(500).json(error);
                    });
            };
        });
};

exports.login_user = (req, res) => {
    User.findOne({
            email: req.body.email
        }).exec()
        .then(user => {
            if (!user) return res.status(404).json({
                message: "login failed!"
            });
            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) return res.status(401).send({
                auth: false,
                token: null
            });
            var token = jwt.sign({
                id: user._id
            }, config.secret, {
                expiresIn: 86400
            });
            res.status(200).send({
                auth: true,
                token: token
            });
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

// temporay code for deleting test users!
exports.delete_user = (req, res, next) => {
    User.findById(req.params.uid)
        .then(idresult => {
            if (idresult) {
                User.remove({
                        _id: idresult._id
                    }).exec()
                    .then(result => {
                        res.status(200).json({
                            message: "user removed successfully!"
                        });
                    })
                    .catch(error => {
                        res.status(500).json(error);
                    });
            } else {
                res.status(404).json({
                    message: "user not found!"
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "error 500"
            });
        });
};

// should be removed. jusr for test
exports.list_users = (req, res) => {
    User.find().select('-__v').exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(200).json(error);
        });
}