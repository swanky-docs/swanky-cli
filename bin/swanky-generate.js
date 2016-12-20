#!/usr/bin/env node

const program = require('commander')
const generate = require('../src/generators/base-generator')

// -----------------------------------------------------
// Help
// -----------------------------------------------------
program.usage('[template-type]')

program.on('--help', function () {
  console.log('  Examples:')
  console.log('')
  console.log(chalk.gray('    # create a custom Swanky Docs template scaffold'))
  console.log('    $ swanky generate snippet [my-snippet-name]')
  console.log('')
})

program.parse(process.argv)

// -----------------------------------------------------
// Start the base generator
// -----------------------------------------------------
generate(program.args)

