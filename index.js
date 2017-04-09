const googleScraper = require('google-play-scraper')
const appleScraper = require('app-store-scraper')
const q = require('q')

var getGoogleSearchResult = (options) => {
  var dfd = q.defer()

  googleScraper
    .search(options)
    .then((result) => {
      return googleScraper
              .app({appId: result[0].appId})
    })
    .then((result)=>{
      dfd.resolve(result)
    })
    .catch((err) => {
      dfd.reject(err)
    })

  return dfd.promise
}

module.exports = {
  getGoogleSearchResult: getGoogleSearchResult
}
