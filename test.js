'use strict'
var test = require('tape')
var androidIcons = require('./')

test('returns all icons in array', function (t) {
  t.plan(2)
  var icons = androidIcons()
  t.ok(Array.isArray(icons), 'returned an array')
  t.equal(icons.length, 5, '5 icons returned')
})

test('returns icon for size 48 as Number', function (t) {
  t.plan(2)
  var icon = androidIcons({size: 48})
  t.ok(icon.name === 'mdpi.png', 'icon name correct')
  t.ok(icon.width === 48, 'icon width correct')
})

test('returns icon for size 48 as String', function (t) {
  t.plan(2)
  var icon = androidIcons({size: '48'})
  t.ok(icon.name === 'mdpi.png', 'icon name correct')
  t.ok(icon.width === 48, 'icon width correct')
})

test('returns icon for size 96', function (t) {
  t.plan(2)
  var icon = androidIcons({size: 96})
  t.ok(icon.name === 'xhdpi.png', 'icon name correct')
  t.ok(icon.width === 96, 'icon width correct')
})

test('returns icon for size xhdpi', function (t) {
  t.plan(2)
  var icon = androidIcons({size: 'xhdpi'})
  t.ok(icon.name === 'xhdpi.png', 'icon name correct')
  t.ok(icon.width === 96, 'icon width correct')
})
