module.exports = {
  compile: function () {

    var fs           = require('fs')
      , file         = require('file')
      , basePath     = 'app/templates'
      , templateFile = './app/js/src/templates.js'
      , subs         = [[ '\{\{ *([a-zA-Z\_\$\.\(\)]+) *\}\}'                      , function ( _, name           ) { return "<span data-bind='text: " + name + "'></span>" } ],
                        [ '\{\{ *(val)\: *([a-zA-Z\_\$\.\(\)]+) *\}\}'             , function ( _, _, name        ) { return"<!-- ko val: " + name + " --><!-- /ko -->";    } ],
                        [ '\{\{ *([a-zA-Z\_\$\.]+)\: *([a-zA-Z\_\$\.]+) *\}\}'     , function ( _, keyword, value ) { return "<!-- ko " + keyword + ": " + value + " -->";  } ],
                        [ '\{\{ *(\/[a-zA-Z\_\$\.]+) *\}\}'                        , "<!-- /ko -->"                                                                           ]]
      , templates    = []
      , compiled     = 'var templates = module.exports = {};\n\n'
      ;

    file.walkSync(basePath, function (dirPath, dirs, files) {
      files.forEach(function (file) {
        templates.push(dirPath + "/" + file)
      });
    });

    templates.forEach(function (template) {
      var tmpl = fs.readFileSync(template, 'utf8');
      subs.forEach(function (sub) { tmpl = tmpl.replace(new RegExp(sub[0], "g"), sub[1]); });
      tmpl = tmpl.replace( /\r?\n */g , ''    );
      tmpl = tmpl.replace( / +/g      , ' '   );
      tmpl = tmpl.replace( /\"/g      , '\\"' );

      compiled += 'templates["' + template.replace(/app(\/|\\)templates(\/|\\)|\.html$/g, '').replace(/(\\\\|\\)/g, '/') + '"] = "' + tmpl + '";\n\n';
    });

    fs.writeFileSync(templateFile, compiled, 'utf8');
  }
};