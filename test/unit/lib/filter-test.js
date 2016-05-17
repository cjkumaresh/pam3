var assert = require('chai').assert,
    filter = require('../../../lib/utils/filter');

describe('filter', function() {
    it('should return true for pam supported files', function () {
      assert.deepEqual(filter.getProperFiles("E:\Musics",["Vennilave.mp3", "invalid.lol"]), ["Vennilave.mp3"]);
    });
});
