const fs = require('fs');
const path = require('path');
const mergejson = require('mergejson');

const i18nFolder = './i18n/';
const outDir = path.join('src', 'i18n');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir);
}

fs.readdirSync(i18nFolder).forEach(dir => {
  const filename = dir + '.json';
  const arr = [];
  fs.readdirSync(path.join(i18nFolder, dir)).forEach(file => {
    const content = fs.readFileSync(path.join(i18nFolder, dir, file), 'utf8');
    arr.push(JSON.parse(content));
  });
  const allJson = mergejson(arr);
  fs.writeFileSync(path.join(outDir, filename), JSON.stringify(allJson), 'utf8');
});
