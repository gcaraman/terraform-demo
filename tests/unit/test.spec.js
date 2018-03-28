const chai = require('chai');

describe('unit test', () => {
  it('test spec', () => {
    let data = 'data';
    chai.expect(data).to.eql('data');
  });
});