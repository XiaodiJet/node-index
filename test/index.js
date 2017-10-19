const Index = require('../');
const assert = require('assert');

function getIndex() {
  const index = new Index();
    index.addDocument('asdf', {
        field1: "asdf qwerty rock",
        field2: "qwerty asdf"
    });
    index.addDocument('lol', {
        field1: "i dream in shadows",
        field2: "qwerty shadows"
    });
    index.addDocument('rofl', {
        field1: "the flock of madness chases me",
        field2: "asdf shadow"
    });
    return index;
}

describe("Indexing asdf", function() {
    it("should not result in an error", function() {
      const index = getIndex();
    });
});

describe("Searching for 'qwerty'", function() {
    it("should return correct search results", function() {
      const index = getIndex();
      const results = index.query('qwerty');
        assert(results.length === 2, "Search results are not the right size");
        assert(results[0].key === 'asdf', "First result is not right");
        assert(results[1].key === 'lol', "Second result is not right");
    });
});

