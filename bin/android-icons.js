#!/usr/bin/env node
'use strict'
var abbrev = require('abbrev')
var argv = require('yargs')
var icons = require('../')

// help
argv.help('help')
argv.alias('h', 'help')

// register abbreviated aliases
var abbrevs = abbrev(['help', 'size', 'format'])
var aliases = Object.keys(abbrevs)
aliases.forEach(function (alias) {
  if (alias !== abbrevs[alias]) {
    argv.alias(alias, abbrevs[alias])
  }
})

// document options
argv.option('size', {
  description: 'number of pixels (width) or string identifiying the icon image'
})
argv.option('format', {
  description: 'format of the output to stdout (csv or json)'
})

// will show up in help
argv.usage('Usage: android-icons [options]')

argv.example('$ android-icons --size 48', 'mdpi.png,48')
argv.example('$ android-icons --size 48 --format json', '{"name":"mdpi.png","width":48}')
argv.example('$ android-icons --size xhdpi', 'xhdpi.png,96')

argv = argv.argv

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
  var options = {
    size: argv.size
  }

  var output = icons(options)
  if (output) console.log(formatLog(output, argv))
}

cli()
