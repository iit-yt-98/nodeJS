const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')


.all( (req , res , next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type" , "text/plain");
    next();
})

.get( (req , res , next) => {
    res.end("Will send all the Leaders to you!");
})

.post( (req , res , next) => {
    res.send("Will add the leader : " + req.body.name + " with details : " + req.body.description );
})

.put( (req , res , next) => {
    res.statusCode = 403;
    res.send("Sorry put operation is currently not supported!");
})

.delete((req , res , next) => {
    res.end("Will delete all the Leaders!");
});


leaderRouter.route('/:leaderId')

.get( (req , res , next) => {
    res.end("Will send Leader with id :" + req.params.leaderId);
})

.post( (req , res , next) => {
    res.statusCode = 403;
    res.end("Post operation is not supported on /leaders/" + req.params.leaderId);
})

.put((req,res,next) => {
    res.write("Updating the Leader: " + req.params.leaderId + '\n');
    res.end("Will update the Leader: " + req.body.name + " with details " + req.body.description);
})

.delete((req,res,next) => {
    res.end("Deleting the leader: " + req.params.leaderId);
});

module.exports = leaderRouter;

