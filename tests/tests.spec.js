const chai = require('chai')
const mainFile = require('../index.js')
const googleScraper = require('google-play-scraper')
const appleScraper = require('app-store-scraper')

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
//       .then(result => {
//         console.log(result)
//         expect(result).to.be.an('object')
//         done()
//       })
//       .catch(err => {
//         console.log(err)
//
//         done()
//       })
//     })
//   })
// })

// describe('Testing the Apple Scraper API', () => {
//   describe('Testing the App Function to retrive the app Info', () => {
//     it('Should return the App Info for Plants Vs Zombies', (done) => {
//       mainFile.getPvZApple()
//       .then(result => {
//         console.log(result)
//         expect(result).to.be.an('object')
//         done()
//       })
//       .catch(err => {
//         console.log(err)
//
//         done()
//       })
//     })
//   })
// })

describe('Testing the Google Scraper API', () => {
  //Permanent test
  describe('Testing how the search result return', () => {
    it('Should return details of the search by name', function(done) {
      this.timeout(15000)
      mainFile.google.getSearchResult("Uber", 100)
      .then(result => {
        // console.log(result)
        expect(result).to.be.an('array')
        done()
      })
      .catch(err => {
        // console.log(err)
        done(err)
      })
    })
    it('Should return 100 results', function(done) {
      this.timeout(15000)
      mainFile.google.getSearchResult("Uber", 'stringeher')
      .then(result => {
        expect(result).to.have.lengthOf(100)
        done()
      })
      .catch(err => {
        // console.log(err)
        done(err)
      })
    })
  })
})

describe('Testing the App Store Scraper API', () => {
  //Permanent test
  describe('Testing how the search result return', () => {
    it('Should return details of the search by name', function(done) {
      this.timeout(15000)
      mainFile.apple.getSearchResult("Uber", 1)
      .then(result => {
        // console.log(result)
        expect(result).to.be.an('array')
        done()
      })
      .catch(err => {
        // console.log(err)
        done(err)
      })
    })
  })
})

describe('Testing unified Crawler API', () => {
  describe('Testing getting entire list of a category', () => {
    var itemNumber = 200
    it('Should return '+itemNumber+' items', function(done) {
      this.timeout(15000)
      mainFile.google.getEntireListOfCategory({
        category: googleScraper.category.GAME,
        collection: googleScraper.collection.TOP_FREE,
        lang: 'en',
        country: 'us'
      })
      .then(result => {
        // console.log(result)
        expect(result).to.have.lengthOf(itemNumber)
        done()
      })
      .catch(err => {
        console.log(JSON.stringify(err))
        done(err)
      })
    })
  })

  describe('Getting category ranking from app ID and', () => {
    it('should return the ranking of Fruit Ninja App', function(done) {
      this.timeout(15000)
      mainFile.google.getRanking({
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
        done(err)
      })
    })
    it('should return the ranking of WhatsApp', function(done) {
      this.timeout(15000)
      mainFile.google.getRanking({
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
        done(err)
      })
    })
    it('should return the ranking of Word from Brazil Store', function(done) {
      this.timeout(15000)
      mainFile.google.getRanking({
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
        done(err)
      })
    })
    it('should return both rankings from game app', function(done) {
      this.timeout(15000)
      mainFile.google.getRanking({
        appId: 'com.nway.powerrangerslegacywars',
        country:'us'
      })
      .then(result => {
        console.log(result)
        expect(result).to.be.an('object')
        expect(result).to.have.property('rank').above(-1)
        expect(result).to.have.property('rankOverall')
        done()
        console.log("            Overall Ranking: "+result.rankOverall)
        console.log("            Category Ranking: "+result.rank)
      })
      .catch(err => {
        if (err) console.log(err)
        done(err)
      })
    })
  })

  describe('Testing AppStore API', () => {
    describe('List length of category that', () => {
      it('should return 100 apps', function(done){
        mainFile.apple.getEntireListOfCategory({
          collection: appleScraper.collection.TOP_FREE_IPAD,
          category: appleScraper.category.GAMES_ACTION,
          country: 'br'
        })
        .then(result => {
          // console.log(result)
          expect(result).to.be.an('array')
          done()
        })
        .catch(err => {
          if (err) console.log(err)

          done(err)
        })
      })
    })
    describe('Testing if genre rank is returned correctly', () => {
      it('should be a rank bigger than 0 for UBER', function(done){
        mainFile.apple.getRankingSingleGenre({
          free: true,
          id: 368677368,
          listOptions: {
            category: 6003,
            lang: 'en',
            country: 'us'
          }
        })
        .then(result => {
          expect(result).to.be.an('object')
          expect(result).to.have.property('listOptions')
          expect(result).to.have.property('rank')
          expect(result.rank).to.be.an('number')
          expect(result.rank).to.be.above(0)
          console.log("            Category Ranking: "+result.rank)
          done()
        })
        .catch(err => {
          if (err) console.log(err)

          done(err)
        })
      })
    })
  })
})
