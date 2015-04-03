#!/usr/bin/env node
'use strict'
var abbrev = require('abbrev')
var argv = require('minimist')(process.argv.slice(2), abbrev('help', 'version', 'size', 'format'))
var pkg = require('./package.json')
var icons = require('./')

function help () {
  console.log([
    pkg.description,
    '',
    'Use `--format json` to set output to JSON.',
    'Get specifc icon by size or name by using `--size`.',
    '',
    'Examples:',
    '  $ android-icons --size 48',
    '  mdpi.png,48',
    '',
    '  $ android-icons --size 48 --format json',
    '  {"name":"mdpi.png","width":48}',
    '',
    '  $ android-icons --size xhdpi',
    '  xhdpi.png,96'
  ].join('\n'))
}

function formatLog (icons, argv) {
  var format = (argv.format || 'csv').toLowerCase()
  if (format === 'json') {
    return JSON.stringify(icons)
  }
  if (!Array.isArray(icons)) {
    icons = [icons]
  }
  return icons.map(function (icon) {
    return icon.name + ',' + icon.width
  }).join('\n')
}

function cli () {
  if (argv.help) return help()

  if (argv.version) return console.log(pkg.version)

  var options = {
    size: argv.size || argv.s
  }

  var output = icons(options)
  if (output) console.log(formatLog(output, argv))
}

cli()
