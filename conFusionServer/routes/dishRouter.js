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











//now for editing a field like comment inside the actual outer field

dishRouter.route('/:dishId/comments')

.get((req , res , next) => {
    Dishes.findById(req.params.dishId)
    .then( (dish) => {
        if(dish != null){
            res.statusCode= 200;
            res.setHeader('Content-Type' , 'application/json');
            res.json(dish.comments);
        }else{
            err = new Error("Dish "+ req.params.dishId + " not Found!");
            err.status = 404;
            return next(err);
        }
        
    } , (err) => next(err))
    .catch( (err) => next.apply(err));
})

.post((req,res,next) => {
     Dishes.findById(req.params.dishId)
     .then( (dish) => {

        if(dish != null){
            res.statusCode= 200;
            
            dish.comments.push(req.body);
            dish.save()
            .then( (dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type' , 'application/json');
                res.json(dish.comments);
            });
            
        }else{
            err = new Error("Dish "+ req.params.dishId + " not Found!");
            err.status = 404;
            return next(err);
        }
     } , (err) => next(err))
     .catch( (err) => next(err));
})

.put((req,res,next) => {
    res.statusCode = 403;
    res.end("Put operation is not supported on /dishes/"+req.params.dishId+"/comments");
})

.delete((req,res,next) => {

    Dishes.findById(req.params.dishId)
    .then( (dish) => {
        if(dish != null){

            for(var i = (dish.comments.length -1) ; i>=0 ; i--){
                dish.comments.id(dish.comments[i]._id).remove();
            }
            dish.save()
            .then( (dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type' , 'application/json');
                res.json(dish.comments);
            });
            
        }else{
            err = new Error("Dish "+ req.params.dishId + " not Found!");
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch( (err) => next(err));
});


dishRouter.route('/:dishId/comments/:commentId') 


.get( (req, res , next) => {
    //res.end("Will send dish with id :" + req.params.dishId);
    Dishes.findById(req.params.dishId)
    .then( (dish) => {
        if(dish != null && dish.comments.id(req.params.commentId) != null){
            res.statusCode= 200;
            res.setHeader('Content-Type' , 'application/json');
            res.json(dish.comments.id(req.params.commentId));
        }else if(dish == null){
            err = new Error("Dish "+ req.params.dishId + " not Found!");
            err.status = 404;
            return next(err);
        }else{
            err = new Error("Comment "+ req.params.commentId + " not Found!");
            err.status = 404;
            return next(err);
        }
    } , (err) => next(err))
    .catch( (err) => next.apply(err));
} )

.post( (req , res , next) => {
    res.statusCode = 403;
    res.end("Post operation is not supported on /dishes/" + req.params.dishId+"/comments/"+req.params.commentId);
})

.put((req,res,next) => {
    //res.write("Updating the dish: " + req.params.dishId + '\n');
    //res.end("Will update the dish: " + req.body.name + " with details " + req.body.description);
    Dishes.findByIdAndUpdate(req.params.dishId)
    .then( (dish) => {
        if(dish != null && dish.comments.id(req.params.commentId) != null){
            if(req.body.rating){
                dish.comments.id(req.params.commentId).rating =  req.body.rating;
            }
            if(req.body.comment){
                dish.comments.id(req.params.commentId).comment =  req.body.comment;
            }
            dish.save()
            .then( (dish) => {
                res.statusCode= 200;
                res.setHeader('Content-Type' , 'application/json');
                res.json(dish);
            } , err => next(err));
        }else if (dish == null){
            err= new Error("Dish" + req.params.dishId+" not Found!");
            err.status = 404;
            return next(err);
        }else{
            err = new Error("Comment "+req.params.commentId+" not Found!");
            err.status = 404;
            return next(err);
        }
    } , (err) => next(err))
    .catch( (err) => next.apply(err));
})

.delete((req,res,next) => {
    //res.end("Deleting the dish: " + req.params.dishId);
    Dishes.findById(req.params.dishId)
    .then( (dish) => {
        if (dish != null && dish.comments.id(req.params.commentId) != null) {
            dish.comments.id(req.params.commentId).remove();
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);                
            }, (err) => next(err));
        }
        else if (dish == null) {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch( (err) => next(err));

});

module.exports = dishRouter;