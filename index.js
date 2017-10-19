const TfIdf = require('natural').TfIdf;

function Index() {
  this.tfidf = new TfIdf();
  this.index = {};
  this.docs = {};
}

module.exports = Index;

Index.prototype.addDocument = function (key, doc) {
  this.docs[key] = doc;

  for (const field in doc) {
    this.tfidf.addDocument(doc[field], key + ":" + field);
  }
};

const splitRegex = /[^\w\-]+/g;
Index.prototype.query = function (query) {
  const tfidf = this.tfidf;
  const results = {};
  query.split(splitRegex).forEach(function (word) {
    tfidf.tfidfs(word, function (i, measure, keyAndField) {
      keyAndField = keyAndField.split(':');
      const key = keyAndField[0];
      const field = keyAndField[1]; // XXX use field if we want to add weights
      if (!results[key]) {
        results[key] = {
          measure: 0,
          field: null,
        };
      }

      results[key].measure += measure;
      results[key].field = field;
    });
  });

  const resArr = [];
  for (const k in results) {
    if (results[k].measure > 0) {
      resArr.push({key: k, measure: results[k].measure, field: results[k].field});
    }
  }
  return resArr.sort(function (a, b) {
    return b.measure - a.measure;
  });
};
