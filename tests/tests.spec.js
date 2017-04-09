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
      this.timeout(10000)
      mainFile.getEntireListOfCategoryGoogle({
        category: googleScraper.category.GAME,
        collection: googleScraper.collection.TOP_FREE,
        lang: 'en',
        country: 'us'
      })
      .then(result => {
        // console.log(result.length)
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

  describe('Getting category ranking from app ID and', () => {
    it('should return the ranking of Fruit Ninja App', function(done) {
      this.timeout(10000)
      mainFile.getGoogleRanking({
          appId: 'com.halfbrick.fruitninja',
          lang: 'en',
          country:'us'
      })
      .then(result => {
        expect(result).to.be.an('object')
        expect(result).to.have.property('rank').above(-1)
        expect(result).to.have.property('rankOverall').above(-1)
        done()
        console.log("            Overall Ranking: "+result.rankOverall)
        console.log("            Category Ranking: "+result.rank)
      })
      .catch(err => {
        if (err) console.log(err)
        expect(err).to.equal(null)
        done()
      })
    })
    it('should return the ranking of WhatsApp', function(done) {
      this.timeout(10000)
      mainFile.getGoogleRanking({
          appId: 'com.whatsapp',
          lang: 'en',
          country:'us'
      })
      .then(result => {
        expect(result).to.be.an('object')
        expect(result).to.have.property('rank').above(-1)
        expect(result).to.not.have.property('rankOverall')
        done()
        console.log("            Overall Ranking: "+result.rankOverall)
        console.log("            Category Ranking: "+result.rank)
      })
      .catch(err => {
        if (err) console.log(err)
        expect(err).to.equal(null)
        done()
      })
    })
    it('should return the ranking of Word from Brazil Store', function(done) {
      this.timeout(10000)
      mainFile.getGoogleRanking({
          appId: 'com.microsoft.office.word',
          lang: 'pt',
          country:'br'
      })
      .then(result => {
        expect(result).to.be.an('object')
        expect(result).to.have.property('rank').above(-1)
        expect(result).to.not.have.property('rankOverall')
        done()
        console.log("            Overall Ranking: "+result.rankOverall)
        console.log("            Category Ranking: "+result.rank)
      })
      .catch(err => {
        if (err) console.log(err)
        expect(err).to.equal(null)
        done()
      })
    })
    it('should return both rankings from game app', function(done) {
      this.timeout(10000)
      mainFile.getGoogleRanking({
          appId: 'com.nway.powerrangerslegacywars',
          country:'us'
      })
      .then(result => {
        expect(result).to.be.an('object')
        expect(result).to.have.property('rank').above(-1)
        expect(result).to.have.property('rankOverall')
        done()
        console.log("            Overall Ranking: "+result.rankOverall)
        console.log("            Category Ranking: "+result.rank)
      })
      .catch(err => {
        if (err) console.log(err)
        expect(err).to.equal(null)
        done()
      })
    })
  })
})
