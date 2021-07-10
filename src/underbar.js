(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n === undefined) {
      return array[array.length - 1];
    }

    if (n <= 0) {
      return [];
    } else if (n > array.length) {
      return array;
    } else if (n > 0) {
      return array.slice(n - 1, n + 1);
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    // If collection is an ARRAY...
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    }
    // If collection is an OBJECT...
    else {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }

  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target) {
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var container = [];
    _.each(collection, function(element) {
      if (test(element) === true) {
        container.push(element);
      }
    }
    );
    return container;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    var container = [];
    _.filter(collection, function(element) {
      if (!test(element)) {
        container.push(element);
      }
    });
    return container;
  };


  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator) {

    var trueOrFalse = [];
    var result = [];

    if (iterator === undefined) {
      for (var i = 0; i < array.length; i ++) {
        if (!result.includes(array[i])) {
          result.push(array[i]);
        }
      }
    // } else if (isSorted === false){
    //   for(i = 0; i < array.length; i ++){
    //     if(!trueOrFalse.includes(iterator(array[i]))){
    //       trueOrFalse.push(iterator(array[i]));
    //       result.push(array[i]);
    //     }
    //   }
    } else {
      for (i = 0; i < array.length; i ++) {
        if (!trueOrFalse.includes(iterator(array[i]))) {
          trueOrFalse.push(iterator(array[i]));
          result.push(array[i]);
        }
      }
    }

    return result;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var container = [];
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        container.push(iterator(collection[i]));
      }
      return container;
    } else {
      for (var key in collection) {
        container.push(iterator(collection[key]));
      }
      return container;
    }
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item) {
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    // check for accumulator
    var noAccumulator = arguments.length === 2;

    // iterate through collection
    _.each(collection, function(item) {
      // if accumulator does not exist
      if (noAccumulator) {
        // set accumulator to false
        noAccumulator = false;
        // set first item of collection as accumulator
        accumulator = item;
      } else {
        // set accumulator to result of iterator function with accumulator and item applied
        accumulator = iterator(accumulator, item);
      }
    });
    // return accumulator
    return accumulator;
  };


  // --------------------
  // ! END OF PART ONE !
  // --------------------
  //
  // Congrats! You've reached the end of Underbar Part 1!
  //
  // This means that you should return to Learn and move on to the next lesson:
  //    - Learn Unit: Debugging
  //    - Learn Lesson: Before Moving On
  //
  // CAUTION:
  //
  //   - Do not proceed on to Underbar Part 2 (below) without reading the
  //     slides on Scopes & Closure
  //
  // --------------------


  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = (collection, iterator) => {
    return _.reduce(collection, (wasTrue, value) => {
      if (wasTrue) {
        if (iterator) {
          return iterator(value) ? true : false;
        } else {
          return (value) ? true : false;
        }
      } else {
        return false;
      }
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = (collection, iterator) => {
    return !_.every(collection, value => {
      return (iterator) ? !iterator(value) : !value;
    });
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    var objects = _.map(arguments, item => item).slice(1);

    _.each(objects, item => {
      _.each(item, (value, key) => {
        obj[key] = value;
      })
    });
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var objects = _.map(arguments, item => item).slice(1);

    _.each(objects, item => {
      _.each(item, (value, key) => {
        if (!obj.hasOwnProperty(key)) {
          obj[key] = value;
        }
      })
    });
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = func => {
    var alreadyCalled = false;
    var result;

    return function() {
      if (!alreadyCalled) {
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }

      return result;
    };
  };

  // Memorize an expensive function's results by storing them. In our implementation
  // you may assume that the function takes only one argument and that it is a primitive.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {

    var map = {};

    return function(){

        var str = '';
        // Stringify the arguments so they can be used as object keys

        _.each(arguments, function(element){
          str = str + element + " ";
        });

        /*
        for(var i = 0; i < arguments.length; i++){
            str = str + arguments[i] + " ";
        }*/

      if(map[str] == undefined){ // If map does not contain the passed-in args
        map[str] = func.apply(this, arguments); // "Args": result is inputted to map
      }

      return map[str]; // Return stored result if it exists in map
    };

  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = _.map(arguments, item => item).slice(2);

    setTimeout(function(){
      func.apply(this, args);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  _.shuffle = array => {
    // Implementation based on the Knuth Algorithm:
    // http://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
    var clonedArary = array.slice();
    var shuffled = [];
    var randomIndex;
    var temp;
    var last;

    for (last = clonedArary.length - 1; last >= 0; last--) {
      temp = clonedArary[last];
      randomIndex = Math.floor(Math.random() * (last));
      clonedArary[last] = clonedArary[randomIndex];
      clonedArary[randomIndex] = temp;
      shuffled.push(clonedArary.pop());
    }
    return shuffled;

    // Simpler version using the native sort method
    // where shuffle can be seen as "randomly sorting"
    // return array.slice().sort(function() {return 0.5 - Math.random()});
  };


  /**
   * EXTRA
   * ======
   */

  // Calls the method named by functionOrKey on each value in the list.
  _.invoke = (collection, functionOrKey, args) => {
    return _.map(collection, item => {
      if (typeof(functionOrKey) === "function") {
        return functionOrKey.apply(item, args);
      } else {
        return item[functionOrKey].apply(item, args);
      }
    });
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {

    if(iterator === 'length'){
      return collection.sort(function(a,b){return a.length - b.length});
    }



    //collection = [{name : 'curly', age : 50}, {name : 'moe', age : 30}]
    //iterator= function(person) { return person.age; }

    var index = 0;

    return _.pluck(
      _.map(collection, function(value, key, list) {

      return {
        value: value,
        index: index++,
        criteria: iterator(value, key, list)
      };

    }).sort(function(left, right) {

      var a = left.criteria;
      var b = right.criteria;

      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }

      return left.index - right.index;
    }), 'value');
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var output = [];
    for (var index = 0; index < arguments.length; index++) {
      output[index] = _.pluck(arguments, index);
    }
    return output;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  _.flatten = (nestedArray) => {
    var flat = [];

    (function deepFlatten(nestedArray) {
      for(var i = 0; i < nestedArray.length; i++) {
        if(Array.isArray(nestedArray[i])) {
          deepFlatten(nestedArray[i]);
        } else {
          flat.push(nestedArray[i]);
        }
      }
    })(nestedArray);
    return flat;
  };
  // TODO: second alternative that doesn't rely on a closure
  // but instead passes the result along each recursive call, as the function
  // signature in the excercise seems to hint towards...


  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var commons = [];
    var numArrays = arguments.length;
    var firstArray = arguments[0];
    for (var i = 0; i < firstArray.length; i++) {
      var item = firstArray[i];
      if (_.contains(commons, item)) {
        continue;
      }
      for (var j = 1; j < numArrays; j++) {
        if (!_.contains(arguments[j], item)) {
          break;
        }
      }
      if (j === numArrays) {
        commons.push(item);
      }
    }
    return commons;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var allTheRest = _.flatten(Array.prototype.slice.call(arguments, 1));
    return _.filter(array, value => !_.contains(allTheRest, value));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Simple implementation without scheduling
  // _.throttle = function(func, wait) {
  //   var callable = true;
  //   var result;

  //   return function() {
  //     if (callable) {
  //       callable = false;
  //       result = func.apply(this, arguments);
  //       setTimeout(function(){
  //         callable = true;
  //       }, wait);
  //     }
  //     return result;
  //   };
  // };

  // Timer based implementation allowing for scheduling
  _.throttle = (func, wait) => {
    var lastTrigger;
    var timer;
    var results;

    return function () {
      // For Date.now() details: https://goo.gl/iYn3fA
      // For better compatibility use new Date().getTime();
      var now = Date.now();

      if (lastTrigger && now < lastTrigger + wait) {

        clearTimeout(timer);
        timer = setTimeout(function () {
          lastTrigger = now;
          results = func.apply(this, arguments);
        }, wait);

      } else {
        lastTrigger = now;
        results =func.apply(this, arguments);
      }
    };
  };
}());
