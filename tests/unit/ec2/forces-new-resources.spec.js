const chai = require('chai');
let fs = require('fs');
let path = require('path');

describe('Terraform show log assertion', () => {
  it('Test terraform show log should fail if contains "new resource required" keyword', () => {
    let data = fs.readFileSync(path.resolve(__dirname, '../../../ec2/.resource/tfshow.txt'));
    chai.expect(data.toString(),  '"new resource required" keyword is detected in terraform show log').not.to.have.string('new resource required')
  });

  it('Test terraform show log should fail if contains "forces new resource" keyword', () => {
    let data = fs.readFileSync(path.resolve(__dirname, '../../../ec2/.resource/tfshow.txt'));
    chai.expect(data.toString(),  '"forces new resource" keyword is detected in terraform show log').not.to.have.string('forces new resource')
  });
});
