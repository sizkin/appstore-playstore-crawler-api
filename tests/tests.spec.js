const chai = require('chai')
const mainFile = require('../index.js')

describe('Successful first build', () => {
  it('Should log that index.js was built successfuly', (done) => {
    mainFile.logBuild()
    done()
  })
})
