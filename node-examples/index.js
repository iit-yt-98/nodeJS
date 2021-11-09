var rect = require('./rectangle')


function solveRect(x , y){
    console.log("Solving for the value L is : " + x + " and B is : " + y)
    
    rect(x , y , (err , rectangle) => {
        if(err){
            console.log("Error is :" + err.message)
        }else{
            console.log("Area of rectangle is " + rectangle.area())
            console.log("Perimeter of rectangle is " + rectangle.perimeter())
        }
    })
    console.log("After running the method")
}


solveRect(5 , 2)
solveRect(5 , -2)
solveRect(50 , 12)
