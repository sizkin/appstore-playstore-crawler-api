const googleScraper = require('google-play-scraper')
const appleScraper = require('app-store-scraper')
const async = require('async')
const _ = require('lodash')
const q = require('q')

/**
 * Get search result by entering name of App
 * from Google Play Store.
 * @function
 * @param {string} appName - Name of App
 * @returns promise
 */
var getGoogleSearchResult = (appName) => {
  var dfd = q.defer()
  appName = appName || 'Plants Vs Zombies'
  googleScraper
    .search({
      term: appName,
      num: 250
    })
    .then(result => {
      dfd.resolve(result)
    })
    .catch(error => {
      dfd.reject(error)
    })

  return dfd.promise
}

/**
 * Get search result by entering name of App
 * from Apple App Store.
 * @function
 * @param {string} appName - Name of App
 * @returns promise
 */
var getAppleSearchResult = (appName) => {
  var dfd = q.defer()
  appName = appName || 'Plants Vs Zombies'

  appleScraper
    .search({
      term: appName,
      num: 250
    })
    .then(result => {
      dfd.resolve(result)
    })
    .catch(error => {
      dfd.reject(error)
    })

  return dfd.promise
}

/**
 * Gets list of top 200 apps from category/collection
 * its ID
 * @function
 * @param {object} options - App Options
 * @returns promise
 */
var getEntireListOfCategoryGoogle = (listOptions) => {
  var dfd = q.defer()

  listOptions.start = 0
  listOptions.num = 120
  listOptions.throttle = 1

  var index = listOptions.start

  var funcArray = [
    (callback) => {
      var list = []
      googleScraper
        .list(listOptions)
        .then(result => {
          // console.log('ok ' + index)
          list = _.concat(list, result)
          listOptions.start = list.length
          index = list.length
          listOptions.num = 80
          callback(null, list, listOptions)
        })
        .catch(err => {
          console.log('error at index ' + index)
          console.log(err)
          callback(err)
        })
    },
    (list, listOptions, callback) => {
      googleScraper
        .list(listOptions)
        .then(result => {
          // console.log('ok ' + index)
          list = _.concat(list, result)
          listOptions.start = list.length
          index = list.length
          callback(null, list, listOptions)
        })
        .catch((err) => {
          // console.log('error at index ' + index)
          console.log(JSON.stringify(err))
          callback(err)
        })
    }
  ]
  async.waterfall(
    funcArray,
    (err, result) => err ? dfd.reject(err) : dfd.resolve(result)
  )
  return dfd.promise
}

/**
 * Gets ranking of app from Googe Play Store by
 * its ID
 * @function
 * @param {object} options - App Options
 * @returns promise
 */
var getGoogleRanking = (options) => {
  var dfd = q.defer()

  options = options || {}

  options = {
    appId: options.appId || 'com.halfbrick.fruitninja',
    lang: options.lang || 'en',
    country: options.country || 'us'
  }

  var funcArray = [
    (callback) => {
      googleScraper
        .app(options)
        .then(result => {
          // console.log(result)
          var listOptions = {
            category: googleScraper.category[result],
            lang: options.lang,
            country: options.country
          }

          listOptions.category = googleScraper.category[result.genreId]
          listOptions.collection = result.free ?
                                    googleScraper.collection.TOP_FREE :
                                    googleScraper.collection.TOP_PAID
          // console.log(listOptions.category)
          // console.log(listOptions)
          // console.log(result)
          callback(null, listOptions, result)
        })
        .catch(err => callback(err))
    },
    (listOptions, appInfo, callback) => {
      getEntireListOfCategoryGoogle(listOptions)
      .then(result => {
        appInfo.rank = _.findIndex(result, (app) => app.appId === appInfo.appId) + 1
        callback(null, listOptions, appInfo)
      })
      .catch(err => callback(err))
    },
    (listOptions, appInfo, callback) => {
      if(appInfo.genreId.indexOf('GAME') > -1){
        listOptions.category = googleScraper.category.GAME
        getEntireListOfCategoryGoogle(listOptions)
        .then(result => {
          appInfo.rankOverall = _.findIndex(result, (app) => app.appId === appInfo.appId) + 1
          callback(null, appInfo)
        })
        .catch(err => callback(err))
      } else {
        callback(null, appInfo)
      }
    }
  ]

  async.waterfall(
    funcArray,
    (err, result) => err? dfd.reject(err) : dfd.resolve(result)
  )

  return dfd.promise
}

module.exports = {
  getGoogleSearchResult: getGoogleSearchResult,
  getAppleSearchResult: getAppleSearchResult,
  getEntireListOfCategoryGoogle: getEntireListOfCategoryGoogle,
  getGoogleRanking: getGoogleRanking
}
