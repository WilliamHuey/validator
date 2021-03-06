var validator = 'undefined' == typeof window
  ? require('..')
  : require('tower-validator'); // how to do this better?

var assert = require('assert');

describe('validator', function(){
  beforeEach(validator.clear);

  it('define', function(){
    var calls = [];

    validator.on('define', function(name, fn){
      calls.push(name);
    });
    
    validator('random', function random(a, b){
      return a === b;
    });

    assert(1 === validator.collection.length);
    assert(true === validator.has('random'));
    assert(false === validator.has('random2'));
    assert(1 === calls.length);
    assert('random' === calls[0]);
  });

  it('should scope to a namespace', function(){
    var attrValidator = validator.ns('attr');

    var calls = [];

    validator.on('define', function(name, fn){
      calls.push(name);
    });
    
    attrValidator('random', function eq(a, b){
      return a === b;
    });

    assert(1 === validator.collection.length);
    assert(true === validator.has('attr.random'));
    assert(false === validator.has('random'));
    assert(1 === calls.length);
    assert('attr.random' === calls[0]);
  });
});