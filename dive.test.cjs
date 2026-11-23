const {test} = require("node:test");
const assert = require("node:assert/strict");
const {initial,next} = require("./dive.js");
const go = s => next(s,"go");
test("checking the loadout and leaving costs nothing",()=>assert.deepEqual(next(go(initial()),"back"),initial()));
test("starting a dive charges 3 and saving records one sighting",()=>{
  let s=go(go(initial())); assert.deepEqual(s,{page:2,energy:5,entries:0});
  s=go(s); assert.deepEqual(go(s),{page:0,energy:5,entries:1});
});
test("a third dive cannot start with only two energy",()=>{
  let s=initial();for(let i=0;i<8;i++)s=go(s);
  assert.deepEqual(s,{page:0,energy:2,entries:2});assert.deepEqual(go(s),s);
});
