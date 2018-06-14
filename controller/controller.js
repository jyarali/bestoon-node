var mongoose = require('mongoose'),
    path = require('path'),
    User = mongoose.model('user'),
    income = mongoose.model('income'),
    expense = mongoose.model('expense'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcryptjs'),
    verifyToken = require('./tokenvalidate'),
    config = require('../config');

exports.jroot = (req, res) => {
    res.send("Welcome to my test api!");
};

exports.list_incomes = (req, res) => {
    income.find({
            userid: req.userId
        }).exec()
        .then(result => {
            if (result.length > 0) {
                var total = 0;
                for (i = 0; i < result.length; i++) {
                    total += result[i].meghdar;
                };
                return res.status(200).json({
                    total_incomes: result.length,
                    sum: total,
                    userId: result[0].userid,
                    incomes: result.map(income => {
                        return {
                            id: income._id,
                            tozihat: income.explain,
                            meghdar: income.meghdar,
                            url: "http://localhost:3000/income/" + income._id
                        }
                    })
                });
            } else {
                return res.status(200).json({
                    message: "you did not save any income yet!"
                });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

exports.create_income = (req, res) => {
    var new_income = new income({
        explain: req.body.explain,
        meghdar: req.body.meghdar,
        userid: req.userId
    });
    new_income.save()
        .then(result => {
            res.status(200).json({
                message: "income saved successfully",
                created_income: {
                    tozihat: result.explain,
                    meghdar: result.meghdar
                },
                requst: {
                    type: "post",
                    url: "http://localhost:3000/income/" + result._id
                }
            });
        })
        .catch(error => {
            res.status(500).json(error);
        });
};


exports.list_expense = (req, res) => {
    expense.find({
            userid: req.userId
        }).exec()
        .then(result => {
            if (result.length > 0) {
                var total = 0;
                for (i = 0; i < result.length; i++) {
                    total += result[i].meghdar;
                };
                return res.status(200).json({
                    total_expenses: result.length,
                    sum: total,
                    userId: result[0].userid,
                    expenses: result.map(expense => {
                        return {
                            id: expense._id,
                            tozihat: expense.explain,
                            meghdar: expense.meghdar,
                            url: "http://localhost:3000/expense/" + expense._id
                        }
                    })
                });
            } else {
                return res.status(200).json({
                    message: "you did not save any expense yet!"
                });
            }
        })
        .catch(error => {
            res.status(500).json(error)
        })
};

exports.create_expense = (req, res) => {
    var new_expense = new expense({
        explain: req.body.explain,
        meghdar: req.body.meghdar,
        userid: req.userId
    });
    new_expense.save()
        .then(result => {
            res.status(200).json({
                message: "expense saved successfully",
                created_expense: {
                    tozihat: result.explain,
                    meghdar: result.meghdar
                },
                requst: {
                    type: "post",
                    url: "http://localhost:3000/expense/" + result._id
                }
            });
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

exports.read_income = (req, res) => {
    income.findById(req.params.incomeId).select("-__v").populate({
            path: "userid",
            select: "name email"
        }).exec()
        .then(result => {
            res.status(200).json(
                result
            );
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

exports.update_income = (req, res) => {
    income.findOneAndUpdate({
            _id: req.params.incomeId
        }, req.body, {
            new: true
        }).exec()
        .then(result => {
            res.status(200).json({
                message: 'income updated successfully!'
            });
        })
        .catch(error => {
            res.status(500).json(error);
        });
};


exports.delete_income = (req, res) => {
    income.remove({
            _id: req.params.incomeId
        }).exec()
        .then(result => {
            res.status(200).json({
                message: "income deleted successfully!"
            });
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

exports.read_expense = (req, res) => {
    expense.findById(req.params.expenseId).select("-__v").populate({
            path: "userid",
            select: "name email"
        }).exec()
        .then(result => {
            res.status(200).json(
                result
            );
        })
        .catch(error => {
            res.status(500).json(
                error
            );
        });
};

exports.update_expense = (req, res) => {
    expense.findOneAndUpdate({
            _id: req.params.expenseId
        }, req.body, {
            new: true
        }).exec()
        .then(result => {
            res.status(200).json({
                message: 'expense updated successfully!'
            });
        })
        .catch(error => {
            res.status(500).json(error);
        });
};


exports.delete_expense = (req, res) => {
    expense.remove({
            _id: req.params.expenseId
        }).exec()
        .then(result => {
            res.status(200).json({
                message: "expense deleted successfully!"
            });
        })
        .catch(error => {
            res.status(500).json(error);
        });
};