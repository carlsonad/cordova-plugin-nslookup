 
exports.defineAutoTests = function () {
  describe('NsLookup (window.NsLookup)', function () {
    it('should exist', function (done) {
      expect(window.NsLookup).toBeDefined();
      done();
    });
  });

  describe('Success callback', function () {

    it('should take an argument that is an array of results', function (done) {
      var n, success, err, q;
        q = [
          {query: 'google.com', type: 'AAAA'}
        ];
        success = function (r) {
          expect(r).toBeDefined();
          expect(r.length > 0).toBe(true);
          expect(r[0].query).toBe('google.com');
          expect(r[0].type).toBe('AAAA');
          expect(typeof r[0].result[0].address).toBe('string');
          done();
        };
        err = function (e) {
          console.log('Error: ' + e);
        };
        n = new NsLookup();
        n.nslookup(q, success, err);
    });
  });
};
