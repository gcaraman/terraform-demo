import { t } from 'testcafe';
import { Authentication, Navigation, Assertion } from '../../actions';
import { Environment } from '../../config/environment';

const authentication = new Authentication();
const mapping = require('../../config/mapping.json');
const idReqArgObj = mapping.aws_db_snapshot.test.requiredArguments.db_instance_identifier;
const idReqArgKey = idReqArgObj.key;
const idReqArgSelector = idReqArgObj.selector;
const idReqArgMsg = idReqArgObj.message;
const statusReqArgObj = mapping.aws_db_snapshot.test.requiredArguments.status;
const statusReqArgKey = statusReqArgObj.key;
const statusReqArgSelector = statusReqArgObj.selector;
const statusReqArgMsg = statusReqArgObj.message;

function run(target, targetPath, index) {
  return new Promise((resolve, reject) => {
    const assertion = new Assertion(targetPath, index);
    const navigation = new Navigation(targetPath, index);

    fixture`Performing test for ${target} resource`
      .page`${Environment.iamUrl}`

    test(`${target} resource values in UI are matched with parsed tfstate file`, async t => {
      await authentication.loginWithIAM();
      await navigation.navigateToRdsPage(target);
      await assertion.requiredArguments(idReqArgKey, idReqArgSelector, target, idReqArgMsg, targetPath);
      await assertion.requiredArguments(statusReqArgKey, statusReqArgSelector, target, statusReqArgMsg, targetPath);
    });

    return resolve();
  });
};

module.exports = {
  run
} 
