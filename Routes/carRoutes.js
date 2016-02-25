var express = require('express');


var routes = function (Car) {
    var carRouter = express.Router();

    carRouter.route('/')
        .post(function (req, res) {
            var book = new Car(req.body);
            book.save();
            res.status(201).send(book);

        })
        .get(function (req, res) {

            var query = {};

            if (req.query.genre) {
                query.genre = req.query.genre;
            }
            Car.find(query, function (err, cars) {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    res.json(cars);
                }

            });
        });

    carRouter.use('/:carId', function (req, res, next) {
        Car.findById(req.params.carId, function (err, car) {
            if (err) {
                res.status(500).send(err);
            }

            else if (car) {
                req.car = car;
                next();
            }
            else {
                res.status(404).send('no book found');
            }
        });
    });
    carRouter.route('/:carId')
        .get(function (req, res) {
            res.json(req.car);
        })
        .put(function (req, res) {
            req.car.model = req.body.model;
            req.car.brand = req.body.brand;
            req.car.year = req.body.year;
            req.car.used = req.body.used;
            req.car.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    res.json(req.car);
                }
            });
        })
        .patch(function (req, res) {
            if (req.body._id) {
                delete req.body._id;
            }

            for (var p in req.body) {
                req.car[p] = req.body[p];
            }

            req.car.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    res.json(req.car);
                }
            });
        })
        .delete(function (req, res) {
            req.car.remove(function (err) {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    res.status(204).send('Removed');
                }
            });
        });
    return carRouter;
};

module.exports = routes;