const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Dishes = require('../models/dishes');


const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')



.get((req , res , next) => {
    Dishes.find({})
    .then( (dish) => {
        res.statusCode= 200;
        res.setHeader('Content-Type' , 'application/json');
        res.json(dish);
    } , (err) => next(err))
    .catch( (err) => next.apply(err));
})

.post((req,res,next) => {
     Dishes.create(req.body)
     .then( (dish) => {
         console.log("Dish Created MF",dish);
         res.statusCode = 200;
         res.setHeader('Content-Type', 'application/json');
         res.json(dish);
     } , (err) => next(err))
     .catch( (err) => next(err));
})

.put((req,res,next) => {
    res.statusCode = 403;
    res.end("Put operation is not supported!");
})

.delete((req,res,next) => {
    Dishes.remove({})
    .then( (resp) => {
        res.statusCode = 200;
         res.setHeader('Content-Type', 'application/json');
         res.json(resp);
    }, (err) => next(err))
    .catch( (err) => next(err));
});


dishRouter.route('/:dishId')


.get( (req, res , next) => {
    //res.end("Will send dish with id :" + req.params.dishId);
    Dishes.findById(req.params.dishId)
    .then( (dish) => {
        res.statusCode= 200;
        res.setHeader('Content-Type' , 'application/json');
        res.json(dish);
    } , (err) => next(err))
    .catch( (err) => next.apply(err));
} )

.post( (req , res , next) => {
    res.statusCode = 403;
    res.end("Post operation is not supported on /dishes/" + req.params.dishId);
})

.put((req,res,next) => {
    //res.write("Updating the dish: " + req.params.dishId + '\n');
    //res.end("Will update the dish: " + req.body.name + " with details " + req.body.description);
    Dishes.findByIdAndUpdate(req.params.dishId , {
        $set: req.body
    } , {new: true})
    .then( (dish) => {
        res.statusCode= 200;
        res.setHeader('Content-Type' , 'application/json');
        res.json(dish);
    } , (err) => next(err))
    .catch( (err) => next.apply(err));
})

.delete((req,res,next) => {
    //res.end("Deleting the dish: " + req.params.dishId);
    Dishes.findByIdAndRemove(req.params.dishId)
    .then( (resp) => {
        res.statusCode = 200;
         res.setHeader('Content-Type', 'application/json');
         res.json(resp);
    }, (err) => next(err))
    .catch( (err) => next(err));

});

module.exports = dishRouter;