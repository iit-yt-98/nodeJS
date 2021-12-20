const express = require('express');
const bodyParser = require('body-parser');
const Leaders = require('../models/leaders');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')


/*.all( (req , res , next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type" , "text/plain");
    next();
})*/


.get( (req , res , next) => {
    //res.end("Will send all the Leaders to you!");
    Leaders.find({})
    .then( (leader) => {
        res.statusCode = 200;
        res.setHeader("Content-Type" , "application/json" );
        res.json(leader);
    } , (err) => next(err))
    .catch((err) => next.apply(err));
})

.post( (req , res , next) => {
    //res.send("Will add the leader : " + req.body.name + " with details : " + req.body.description );
    Leaders.create(req.body)
    .then( (leader) => {
        console.log("Leader created MF", leader);
        res.statusCode = 200;
        res.setHeader("Content-Type" , "application/json");
        res.json(leader);
    } , (err) => next(err))
    .catch( (err) => next.apply(leader));
})

.put( (req , res , next) => {
    res.statusCode = 403;
    res.send("Sorry put operation is currently not supported!");
})

.delete((req , res , next) => {
    //res.end("Will delete all the Leaders!");
    Leaders.remove({})
    .then( (resp) => {
        res.statusCode = 200;
        res.setHeader("Content-Type" , "application/json");
        res.json(resp);
    } , (err) => next(err))
    .catch( (err) => next.apply(err));
});


leaderRouter.route('/:leaderId')

.get( (req , res , next) => {
    //res.end("Will send Leader with id :" + req.params.leaderId);
    Leaders.findById(req.params.leaderId)
    .then( (leader) => {
        res.statusCode = 200;
        res.setHeader("Content-Type" , "application/json");
        res.json(leader);        
    } , (err) => next(err))
    .catch( (err) => next.apply(err))
})

.post( (req , res , next) => {
    res.statusCode = 403;
    res.end("Post operation is not supported on /leaders/" + req.params.leaderId);
})

.put((req,res,next) => {
    //res.write("Updating the Leader: " + req.params.leaderId + '\n');
    //res.end("Will update the Leader: " + req.body.name + " with details " + req.body.description);
    Leaders.findByIdAndUpdate(req.params.leaderId , {
        $set : req.body
    } , {new: true})
    .then( (leader) => {
        res.statusCode = 200;
        res.setHeader("Content-Type" , "application/json");
        res.json(leader);
    } , (err) => next(err))
    .catch((err) => next.apply(err));
})

.delete((req,res,next) => {
    //res.end("Deleting the leader: " + req.params.leaderId);
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then( (resp) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(resp);
    } , (err) => next(err))
    .catch( (err) => next(err));
});

module.exports = leaderRouter;

