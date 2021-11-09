var rect = {
    perimeter: (x , y) => (2*(x + y)),
    area: (x , y) => (x*y)
}


function solveRect(x , y){
    console.log("Solving for the value L is : " + x + " and B is : " + y)
    if(x <= 0 || y <= 0){
        console.log("You gotta be kidding me")
    }else{
        console.log("Area is " + rect.area(x , y) + " and Perimeter is " + rect.perimeter(x , y))
    }
}


solveRect(5 , 2)
solveRect(5 , -2)
solveRect(50 , 12)
