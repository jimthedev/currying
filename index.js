// Messing around with currying
//
// From http://joegrund.com/homemade-curry/
// Run with node index.js

// Helper to convert to an array, es5+
var toArray = Array.prototype.slice.call.bind(Array.prototype.slice);

// arity = how many arguments to satisfy
// fn = what function to run once they arguments are satisfied
function curry (arity, fn) {

  // We return a function so that it can be called and either get a final
  // value or another function that can be called to register another argument
  return function innerCurry() {

    // Get the args
    var args = toArray(arguments, 0, arity);

    // Only call the function if you actually gave all the arguments
    // If you didn't, we call a function that will return a partial
    return args.length === arity ? fn.apply(null, args) : buildArgs;

    // Stores the args on the new function that is returned so that we
    // don't need a single store but can actually have partial args
    function buildArgs () {
      var allArgs = args.concat(toArray(arguments));
      return innerCurry.apply(null, allArgs);
    }
  }
}

// This is just an example uncurried function
function sumUncurried(a,b) {
  return a+b;
}
// Call it a few times uncurried to make sure it works.
console.assert(sumUncurried(1,2)===3);
console.assert(sumUncurried(3,5)===8);

var sum = curry(2, sumUncurried);

var sum1 = sum(1);
var final3 = sum1(2);
console.log(final3);
console.assert(final3 === 3)

var final8 = sum(final3, 5);
console.log(final8);
console.assert(final8 === 8);
