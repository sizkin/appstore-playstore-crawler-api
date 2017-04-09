const chai = require('chai')
const mainFile = require('../index.js')

var expect = chai.expect

/**
 * Old tests won't be deleted, only commented. Please, let these old tests be,
 * they will only throw errors if you uncomment them
 */

// First Build Test
// describe('Successful first build', () => {
//   it('Should equal to 3', (done) => {
//     expect(mainFile.logBuild()).to.equal(3)
//     done()
//   })
// })

describe('Testing the Google Scraper API', () => {
  describe('Testing the App Function to retrive the app Info', () => {
    it('Should return the App Info for Plants Vs Zombies', (done) => {
      mainFile.getPvZGoogle()
      .then((result) => {
        console.log(result)
        expect(result).to.be.an('object')
        done()
      })
      .catch((err) => {
        console.log(err)
        expect(err).to.equal(null)
        done()
      })
    })
  })
})

describe('Testing the Apple Scraper API', () => {
  describe('Testing the App Function to retrive the app Info', () => {
    it('Should return the App Info for Plants Vs Zombies', (done) => {
      mainFile.getPvZApple()
      .then((result) => {
        console.log(result)
        expect(result).to.be.an('object')
        done()
      })
      .catch((err) => {
        console.log(err)
        expect(err).to.equal(null)
        done()
      })
    })
  })
})
