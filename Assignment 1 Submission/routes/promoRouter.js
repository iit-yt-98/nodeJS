const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')


.all( (req , res , next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type" , "text/plain");
    next();
})

.get( (req , res , next) => {
    res.end("Will send all the promotions to you!");
})

.post( (req , res , next) => {
    res.send("Will add the promotion : " + req.body.name + " with details : " + req.body.description );
})

.put( (req , res , next) => {
    res.statusCode = 403;
    res.send("Sorry put operation is currently not supported!");
})

.delete((req , res , next) => {
    res.end("Will delete all the promotions!");
});


promoRouter.route('/:promoId')

.get( (req , res , next) => {
    res.end("Will send promotion with id :" + req.params.promoId);
})

.post( (req , res , next) => {
    res.statusCode = 403;
    res.end("Post operation is not supported on /promotions/" + req.params.promoId);
})

.put((req,res,next) => {
    res.write("Updating the promotion: " + req.params.promoId + '\n');
    res.end("Will update the promotion: " + req.body.name + " with details " + req.body.description);
})

.delete((req,res,next) => {
    res.end("Deleting the promotion: " + req.params.promoId);
});

module.exports = promoRouter;

