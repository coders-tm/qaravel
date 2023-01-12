const mix = require("laravel-mix");
const { existsSync, unlinkSync } = require("fs");

const removeFiles = (stats, ...files) => {
  files.forEach((file) => {
    delete stats.compilation.assets[file];
    if (existsSync(`public/${file}`)) {
      unlinkSync(`public/${file}`);
    }
  });
};

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
  .copy("dist/pwa/index.html", "resources/views/app.blade.php")
  .copyDirectory("dist/pwa", "public")
  .then(async (stats) => {
    await removeFiles(stats, ["/index.html"]);
  });
