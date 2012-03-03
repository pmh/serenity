/*
Copyright (c) 2010 Ryan Schuft (ryan.schuft@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

//
// This code is based in part on the work done in Ruby to support
// infection as part of Ruby on Rails in the ActiveSupport's Inflector
// and Inflections classes.  It was initally ported to Javascript by
// Ryan Schuft (ryan.schuft@gmail.com) in 2007.
// 
// Modified by Patrik Hedman (patrik.hedman@gmail.com) 2012
// 
// The code is available at http://code.google.com/p/inflection-js/
//
// The basic usage is:
//   1. Include this script on your web page.
//   2. Call functions on any String object in Javascript
//
// Currently implemented functions:
//
// `Serenity.Inflector.pluralize(word, plural) == String`
// renders a singular English language noun into its plural form
// normal results can be overridden by passing in an alternative
//
// `Serenity.Inflector.singularize(word, singular) == String`
// renders a plural English language noun into its singular form
// normal results can be overridden by passing in an alterative
//

var Serenity = { Object: require("./object") };

var Inflector = Serenity.Object.clone(function () {
  //
  // `_uncountable_words` contains a list of nouns which uses the same form for both it's singular and plural form.
  //
  this._uncountable_words = [
    'equipment', 'information', 'rice', 'money', 'species', 'series',
    'fish', 'sheep', 'moose', 'deer', 'news'
  ];
  
  //
  // `_plural_rules` contains a set of rules for translating a word from it's singular form to it's plural form.
  //
  this._plural_rules = [
    [ new RegExp('(m)an$'                 , 'gi'), '$1en'     ],
    [ new RegExp('(pe)rson$'              , 'gi'), '$1ople'   ],
    [ new RegExp('(child)$'               , 'gi'), '$1ren'    ],
    [ new RegExp('^(ox)$'                 , 'gi'), '$1en'     ],
    [ new RegExp('(ax|test)is$'           , 'gi'), '$1es'     ],
    [ new RegExp('(octop|vir)us$'         , 'gi'), '$1i'      ],
    [ new RegExp('(alias|status)$'        , 'gi'), '$1es'     ],
    [ new RegExp('(bu)s$'                 , 'gi'), '$1ses'    ],
    [ new RegExp('(buffal|tomat|potat)o$' , 'gi'), '$1oes'    ],
    [ new RegExp('([ti])um$'              , 'gi'), '$1a'      ],
    [ new RegExp('sis$'                   , 'gi'), 'ses'      ],
    [ new RegExp('(?:([^f])fe|([lr])f)$'  , 'gi'), '$1$2ves'  ],
    [ new RegExp('(hive)$'                , 'gi'), '$1s'      ],
    [ new RegExp('([^aeiouy]|qu)y$'       , 'gi'), '$1ies'    ],
    [ new RegExp('(x|ch|ss|sh)$'          , 'gi'), '$1es'     ],
    [ new RegExp('(matr|vert|ind)ix|ex$'  , 'gi'), '$1ices'   ],
    [ new RegExp('([m|l])ouse$'           , 'gi'), '$1ice'    ],
    [ new RegExp('(quiz)$'                , 'gi'), '$1zes'    ],
    [ new RegExp('s$'                     , 'gi'), 's'        ],
    [ new RegExp('$'                      , 'gi'), 's'        ]
  ];
  
  //
  // `_singular_rules` contains a set of rules for translating a word from a noun to it's plural form.
  //
  this._singular_rules = [
    [ new RegExp('(m)en$'                                                        , 'gi'), '$1an'    ],
    [ new RegExp('(pe)ople$'                                                     , 'gi'), '$1rson'  ],
    [ new RegExp('(child)ren$'                                                   , 'gi'), '$1'      ],
    [ new RegExp('([ti])a$'                                                      , 'gi'), '$1um'    ],
    [ new RegExp('((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$' , 'gi'), '$1$2sis' ],
    [ new RegExp('(hive)s$'                                                      , 'gi'), '$1'      ],
    [ new RegExp('(tive)s$'                                                      , 'gi'), '$1'      ],
    [ new RegExp('(curve)s$'                                                     , 'gi'), '$1'      ],
    [ new RegExp('([lr])ves$'                                                    , 'gi'), '$1f'     ],
    [ new RegExp('([^fo])ves$'                                                   , 'gi'), '$1fe'    ],
    [ new RegExp('([^aeiouy]|qu)ies$'                                            , 'gi'), '$1y'     ],
    [ new RegExp('(s)eries$'                                                     , 'gi'), '$1eries' ],
    [ new RegExp('(m)ovies$'                                                     , 'gi'), '$1ovie'  ],
    [ new RegExp('(x|ch|ss|sh)es$'                                               , 'gi'), '$1'      ],
    [ new RegExp('([m|l])ice$'                                                   , 'gi'), '$1ouse'  ],
    [ new RegExp('(bus)es$'                                                      , 'gi'), '$1'      ],
    [ new RegExp('(o)es$'                                                        , 'gi'), '$1'      ],
    [ new RegExp('(shoe)s$'                                                      , 'gi'), '$1'      ],
    [ new RegExp('(cris|ax|test)es$'                                             , 'gi'), '$1is'    ],
    [ new RegExp('(octop|vir)i$'                                                 , 'gi'), '$1us'    ],
    [ new RegExp('(alias|status)es$'                                             , 'gi'), '$1'      ],
    [ new RegExp('^(ox)en'                                                       , 'gi'), '$1'      ],
    [ new RegExp('(vert|ind)ices$'                                               , 'gi'), '$1ex'    ],
    [ new RegExp('(matr)ices$'                                                   , 'gi'), '$1ix'    ],
    [ new RegExp('(quiz)zes$'                                                    , 'gi'), '$1'      ],
    [ new RegExp('s$'                                                            , 'gi'), ''        ]
  ];
  
  //
  // `_non_titlecased_words` contains a list of words that should not be capitalized for title case.
  //
  this._non_titlecased_words = [
    'and', 'or', 'nor', 'a', 'an', 'the', 'so', 'but', 'to', 'of', 'at',
    'by', 'from', 'into', 'on', 'onto', 'off', 'out', 'in', 'over',
    'with', 'for'
  ];
  
  //
  // Regular expressions used for converting between String formats
  //
  this._id_suffix         = new RegExp( '(_ids|_id)$' , 'g' );
  this._underbar          = new RegExp( '_'           , 'g' );
  this._space_or_underbar = new RegExp( '[\ _]'       , 'g' );
  this._uppercase         = new RegExp( '([A-Z])'     , 'g' );
  this._underbar_prefix   = new RegExp( '^_'                );
  
  //
  // `apply_rules` applies a rules based replacement on a string.
  //
  this._apply_rules = function(str, rules, override) {
    var skip = this._uncountable_words;
    if (override) {
      str = override;
    } else {
      var ignore = (skip.indexOf(str.toLowerCase()) > -1);
      if (!ignore) {
        for (var x = 0; x < rules.length; x++) {
          if (str.match(rules[x][0])) {
            str = str.replace(rules[x][0], rules[x][1]);
            break;
          }
        }
      }
    }
    return str;
  };
  
  //
  // `pluralize` takes a word and an optional override and returns it in it's pluralized version.
  // 
  //     Serenity.Inflector.pluralize('octopus'); #=> "octopi"
  //     Serenity.Inflector.pluralize('person');  #=> "people"
  //     Serenity.Inflector.pluralize('person', 'guys');  #=> "guys"
  //
  this.pluralize = function(word, plural) {
    return this._apply_rules(word, this._plural_rules, plural);
  };
  
  //
  // `pluralize` takes a word and an optional override and returns it in it's singularized version.
  //
  //     Serenity.Inflector.singularize("people") //=> "person"
  //     Serenity.Inflector.singularize("octopi") //=> "octopus"
  //
  this.singularize = function(word, singular) {
    return this._apply_rules(word, this._singular_rules, singular);
  };

});

module.exports = Inflector;