const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const Promotions = require("../models/promotions");


const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')


/*.all( (req , res , next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type" , "text/plain");
    next();
})*/

.get( (req , res , next) => {
    Promotions.find({})
    .then( (promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type' , 'application/json');
        res.json(promotion);
    } , (err) => {next(err)})
    .catch( (err) => next.apply(err));
    //res.end("Will send all the promotions to you!");
})

.post( (req , res , next) => {
    Promotions.create(req.body)
    .then( (promotion) =>{
        console.log("Promotion Created MF", promotion);
        res.statusCode = 200;
        res.setHeader('Content-type' , 'application/json');
        res.json(promotion);
    } , (err) => next(err))
    .catch( (err) => next.apply(err));
    //res.send("Will add the promotion : " + req.body.name + " with details : " + req.body.description );
})

.put( (req , res , next) => {
    res.statusCode = 403;
    res.send("Sorry put operation is currently not supported!");
})

.delete((req , res , next) => {
    //res.end("Will delete all the promotions!");
    Promotions.remove({}).
    then( (resp) => {
        res.statusCode =200;
        res.setHeader("Content-Type", 'applications/json');
        res.json(resp);
    } , (err) => next(err))
    .catch( (err) => next(err));

});


promoRouter.route('/:promoId')

.get( (req , res , next) => {
    //res.end("Will send promotion with id :" + req.params.promoId);
     Promotions.findById(req.params.promoId)
     .then( (promotion) => {
         res.statusCode =200;
         res.setHeader("Content-Type" , "applications/json");
         res.json(promotion);
     } , (err) => next(err))
     .catch( (err) => next.apply(err));
})

.post( (req , res , next) => {
    res.statusCode = 403;
    res.end("Post operation is not supported on /promotions/" + req.params.promoId);
})

.put((req,res,next) => {
   // res.write("Updating the promotion: " + req.params.promoId + '\n');
    //res.end("Will update the promotion: " + req.body.name + " with details " + req.body.description);
    Promotions.findByIdAndUpdate( req.params.promoId , {
        $set : req.body
    },{new: true})
    .then( (promotion) => {
        res.statusCode = 200;
        res.setHeader("Content-Type" , "applications/json");
        res.json(promotion);
    } , (err) => next(err))
    .catch( (err) => next.apply(err));
})

.delete((req,res,next) => {
    //res.end("Deleting the promotion: " + req.params.promoId);
    Promotions.findByIdAndRemove(req.params.promoId)
    .then( (resp) => {
        res.statusCode = 200;
        res.setHeader("Content-Type" , "applications/json");
        res.json(resp);
    } , (err) => next(err))
    .catch((err) => next.apply(err));
});

module.exports = promoRouter;

