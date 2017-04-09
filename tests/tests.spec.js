const chai = require('chai')
const mainFile = require('../index.js')
const googleScraper = require('google-play-scraper')

var expect = chai.expect

/**
 * Old tests won't be deleted, only commented. Please, let these old tests be,
 * they will only throw errors if you uncomment them
 */


// describe('Successful first build', () => {
//   it('Should equal to 3', (done) => {
//     expect(mainFile.logBuild()).to.equal(3)
//     done()
//   })
// })

// describe('Testing the Google Scraper API', () => {
//   describe('Testing the App Function to retrive the app Info', () => {
//     it('Should return the App Info for Plants Vs Zombies', (done) => {
//       mainFile.getPvZGoogle()
//       .then((result) => {
//         console.log(result)
//         expect(result).to.be.an('object')
//         done()
//       })
//       .catch((err) => {
//         console.log(err)
//         expect(err).to.equal(null)
//         done()
//       })
//     })
//   })
// })

// describe('Testing the Apple Scraper API', () => {
//   describe('Testing the App Function to retrive the app Info', () => {
//     it('Should return the App Info for Plants Vs Zombies', (done) => {
//       mainFile.getPvZApple()
//       .then((result) => {
//         console.log(result)
//         expect(result).to.be.an('object')
//         done()
//       })
//       .catch((err) => {
//         console.log(err)
//         expect(err).to.equal(null)
//         done()
//       })
//     })
//   })
// })

describe('Testing the Google Scraper API', () => {
  //Permanent test
  describe('Testing how the search result return', () => {
    it('Should return details of the search by name', function(done) {
      this.timeout(10000)
      mainFile.getGoogleSearchResult("Fruit Ninja")
      .then((result) => {
        // console.log(result)
        expect(result).to.be.an('array')
        done()
      })
      .catch((err) => {
        // console.log(err)
        expect(err).to.equal(null)
        done()
      })
    })
  })
})

describe('Testing the App Store Scraper API', () => {
  //Permanent test
  describe('Testing how the search result return', () => {
    it('Should return details of the search by name', function(done) {
      this.timeout(10000)
      mainFile.getAppleSearchResult("Fruit Ninja")
      .then((result) => {
        // console.log(result)
        expect(result).to.be.an('array')
        done()
      })
      .catch((err) => {
        // console.log(err)
        expect(err).to.equal(null)
        done()
      })
    })
  })
})

describe('Testing unified Crawler API', () => {
  describe('Testing getting entire list of a category', () => {
    var itemNumber = 200
    it('Should return '+itemNumber+' items', function(done) {
      this.timeout(1000000)
      mainFile.getEntireListOfCategoryGoogle({
        category: googleScraper.category.GAME,
        collection: googleScraper.collection.TOP_FREE,
        lang: 'en',
        country: 'us'
      })
      .then(result => {
        console.log(result.length)
        expect(result).to.have.lengthOf(itemNumber)
        done()
      })
      .catch(err => {
        console.log(JSON.stringify(err))
        expect(err).to.equal(null)
        done()
      })
    })
  })
})
