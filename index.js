const googleScraper = require('google-play-scraper')
const appleScraper = require('app-store-scraper')
const q = require('q')

var getPvZGoogle = () => {
  var dfd = q.defer()
  googleScraper
    .app({appId: 'com.dxco.pandavszombies'})
    .then((result) => {
      dfd.resolve(result)
    })
    .catch((err)=>{
      dfd.reject(err)
    })
  return dfd.promise
}

var getPvZApple = () => {
  var dfd = q.defer()
  appleScraper
    .app({id: 403858572})
    .then((result) => {
      dfd.resolve(result)
    })
    .catch((err)=>{
      dfd.reject(err)
    })
  return dfd.promise
}

module.exports = {
  getPvZGoogle: getPvZGoogle,
  getPvZApple: getPvZApple
}
