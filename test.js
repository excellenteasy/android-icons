'use strict'
var test = require('tape')
var androidIcons = require('./')
var exec = require('child_process').exec

test('returns all icons in array', function (t) {
  t.plan(2)
  var icons = androidIcons()
  t.ok(Array.isArray(icons), 'returned an array')
  t.equal(icons.length, 9, '9 icons returned')
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

test('cli returns all icons as csv', function (t) {
  t.plan(1)
  var expected = [
    'mdpi.png,48',
    'hdpi.png,72',
    'xhdpi.png,96',
    'xxhdpi.png,144',
    'xxxhdpi.png,192',
    'splash-pwa-hdpi.png,192',
    'splash-pwa-xhdpi.png,256',
    'splash-pwa-xxhdpi.png,384',
    'splash-pwa-xxxhdpi.png,512\n'
  ].join('\n')
  exec('./bin/android-icons.js', function (error, stdout, stderr) {
    var err = error || stderr
    if (err) {
      return t.fail('calling cli produced an error: ' + err)
    }
    t.equal(stdout, expected, 'cli returned expected output')
  })
})

test('cli returns icon for size hdpi', function (t) {
  t.plan(1)
  var expected = 'hdpi.png,72\n'
  exec('./bin/android-icons.js --size 72', function (error, stdout, stderr) {
    var err = error || stderr
    if (err) {
      return t.fail('calling cli produced an error: ' + err)
    }
    t.equal(stdout, expected, 'cli returned expected output')
  })
})

test('cli returns icon for size xhdpi', function (t) {
  t.plan(1)
  var expected = 'xhdpi.png,96\n'
  exec('./bin/android-icons.js --size xhdpi', function (error, stdout, stderr) {
    var err = error || stderr
    if (err) {
      return t.fail('calling cli produced an error: ' + err)
    }
    t.equal(stdout, expected, 'cli returned expected output')
  })
})

test('cli returns all icons as json w/abbreviated flags', function (t) {
  t.plan(3)
  var expected = '[{"name":"mdpi.png","width":48},{"name":"hdpi.png","width":72},{"name":"xhdpi.png","width":96},{"name":"xxhdpi.png","width":144},{"name":"xxxhdpi.png","width":192},{"name":"splash-pwa-hdpi.png","width":192},{"name":"splash-pwa-xhdpi.png","width":256},{"name":"splash-pwa-xxhdpi.png","width":384},{"name":"splash-pwa-xxxhdpi.png","width":512}]\n'
  exec('./bin/android-icons.js --forma json', function (error, stdout, stderr) {
    var err = error || stderr
    if (err) {
      return t.fail('calling cli produced an error: ' + err)
    }
    t.equal(stdout, expected, 'cli returned expected output')
  })
  exec('./bin/android-icons.js --for json', function (error, stdout, stderr) {
    var err = error || stderr
    if (err) {
      return t.fail('calling cli produced an error: ' + err)
    }
    t.equal(stdout, expected, 'cli returned expected output')
  })
  exec('./bin/android-icons.js --f json', function (error, stdout, stderr) {
    var err = error || stderr
    if (err) {
      return t.fail('calling cli produced an error: ' + err)
    }
    t.equal(stdout, expected, 'cli returned expected output')
  })
})

test('cli returns icon for size w/abbreviated flag', function (t) {
  t.plan(3)
  var expected = 'hdpi.png,72\n'
  exec('./bin/android-icons.js --siz 72', function (error, stdout, stderr) {
    var err = error || stderr
    if (err) {
      return t.fail('calling cli produced an error: ' + err)
    }
    t.equal(stdout, expected, 'cli returned expected output')
  })
  exec('./bin/android-icons.js --si 72', function (error, stdout, stderr) {
    var err = error || stderr
    if (err) {
      return t.fail('calling cli produced an error: ' + err)
    }
    t.equal(stdout, expected, 'cli returned expected output')
  })
  exec('./bin/android-icons.js --s 72', function (error, stdout, stderr) {
    var err = error || stderr
    if (err) {
      return t.fail('calling cli produced an error: ' + err)
    }
    t.equal(stdout, expected, 'cli returned expected output')
  })
})

test('cli returns icon for size xhdpi w/ abbreviated flag', function (t) {
  t.plan(1)
  var expected = 'xhdpi.png,96\n'
  exec('./bin/android-icons.js --size xhdpi', function (error, stdout, stderr) {
    var err = error || stderr
    if (err) {
      return t.fail('calling cli produced an error: ' + err)
    }
    t.equal(stdout, expected, 'cli returned expected output')
  })
})
