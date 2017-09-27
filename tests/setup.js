const chai = require('chai');
const chaiEnzyme = require('chai-enzyme');
const sinonChai = require('sinon-chai');

chai.use(chaiEnzyme());
chai.use(sinonChai);

const sinon = require('sinon');

global.expect = chai.expect;
global.sinon = sinon;

require('source-map-support').install({ hookRequire: true });
const Adapter = require('enzyme-adapter-react-16');
require('enzyme').configure({ adapter: new Adapter() });
