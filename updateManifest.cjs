const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'dist', 'assets');
const cssFile = fs.readdirSync(assetsDir).find(file => file.endsWith('.css'));
const jsFile = fs.readdirSync(assetsDir).find(file => file.endsWith('.js'));

const buildDir = path.join(__dirname, 'dist');
const manifestPath = path.join(buildDir, 'manifest.json');

if (cssFile && jsFile) {
  let manifest = {};
  if (fs.existsSync(manifestPath)) {
    manifest = require(manifestPath);
  } else {
    fs.readFile('./manifestTemplate.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading JSON file:', err);
        return;
      }
      try {
        manifest = JSON.parse(data);
        manifest.content_scripts[0].css = [`assets/${cssFile}`];
        manifest.content_scripts[0].js = [`assets/${jsFile}`];
        fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
      }
    });
  }
} else {
  console.error('CSS or JS file not found in the build directory.');
}
