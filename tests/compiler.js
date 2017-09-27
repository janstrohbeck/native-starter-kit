const fs = require('fs');
const path = require('path');
const babel = require('babel-core');
const ts = require('typescript');
const tsConfig = require('../tsconfig.json');

const origJs = require.extensions['.js'];

const nativeLibs = [
  'native-base-shoutem-theme',
  'react-native-easy-grid',
];

require.extensions['.js'] = function (module, fileName) {
  if (fileName.endsWith('node_modules/react-native/Libraries/react-native/react-native-implementation.js')) {
    fileName = path.resolve('./tests/support/mocks/react-native.js');
  } else if (fileName.endsWith('node_modules/native-base/dist/src/index.js')) {
    fileName = path.resolve('./tests/support/mocks/native-base.js');
  }
  if (fileName.indexOf('node_modules/') >= 0) {
    if (nativeLibs.filter(function (lib) { return fileName.indexOf(lib) >= 0; }).length > 0) {
      return module._compile('module.exports = {};', fileName);
    }
    return origJs(module, fileName);
  }
  const src = fs.readFileSync(fileName, 'utf8');
  const output = babel.transform(src, {
    filename: fileName,
    sourceFileName: fileName,
    presets: ['react-native'],
  }).code;

  return module._compile(output, fileName);
};

const compileTs = function (module, fileName) {
  const src = fs.readFileSync(fileName, 'utf8');
  const relativeFileName = path.relative(process.cwd(), fileName);
  const out = ts.transpileModule(src, {
    ...tsConfig,
    fileName: relativeFileName,
  });
  const js = out.outputText.replace(/\n\/\/# sourceMappingURL=[^.]*\.js\.map/, '');
  const sourceMap = JSON.parse(out.sourceMapText);
  const out2 = babel.transform(js, {
    presets: ['es2015'],
    filename: relativeFileName,
    sourceFileName: fileName,
    sourceMaps: true,
    inputSourceMap: sourceMap,
  });
  const es5 = out2.code;
  const sourceMap2 = out2.map;
  const output = es5 + '\n//# sourceMappingURL=data:application/json;base64,' + new Buffer(JSON.stringify(sourceMap2)).toString('base64');
  return module._compile(output, fileName);
};

require.extensions['.ts'] = compileTs;
require.extensions['.tsx'] = compileTs;
