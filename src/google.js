const googleScraper = require('google-play-scraper')
const _ = require('lodash')
const q = require('q')
const async = require('async')


/**
 * Get search result by entering name of App
 * from Google Play Store.
 * @function
 * @param {string} appName - Name of App
 * @returns promise
 */
var getGoogleSearchResult = (appName, amount) => {
  var dfd = q.defer()
  appName = appName || 'Plants Vs Zombies'

  amount = parseInt(amount)
  
  if (amount) {
    if (amount < 1) amount = 1
    if (amount > 250) amount = 250
  } else {
    amount = 100
  }

  googleScraper
    .search({
      term: appName,
      num: amount
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
    country: options.country || 'us',
    collection: options.collection || ''
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
          listOptions.collection = (options.collection == '') ? (result.free ?
            googleScraper.collection.TOP_FREE :
            googleScraper.collection.TOP_PAID) :
            options.collection;
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
          console.log(listOptions);
          /*** 
           * Nick Chan<sizkin@gmail.com> Fixed 
           * Missing the count before at this result set 
           * e.g.
           * listOptions.start -> 200
           * appInfo.rank = listOptions.start + (_.findIndex(result, (app) => app.appId === appInfo.appId) + 1)
           * Non-fixed:
           * Only find the index of the app at this result array
           * Fixed:
           * Need to sum the offset from `listOptions.start` 
           ***/
          appInfo.rank = listOptions.start + (_.findIndex(result, (app) => app.appId === appInfo.appId) + 1)
          callback(null, listOptions, appInfo)
        })
        .catch(err => callback(err))
    },
    (listOptions, appInfo, callback) => {
      if (appInfo.genreId.indexOf('GAME') > -1) {
        listOptions.category = googleScraper.category.GAME
        getEntireListOfCategoryGoogle(listOptions)
          .then(result => {
            appInfo.rankOverall = _.findIndex(result, (app) => app.appId === appInfo.appId) + 1
            callback(null, appInfo)
          })
          .catch(err => callback(err))
      } else if (appInfo.genreId.indexOf('FAMILY') > -1) {
        listOptions.category = googleScraper.category.FAMILY
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
    (err, result) => err ? dfd.reject(err) : dfd.resolve(result)
  )

  return dfd.promise
}

module.exports = {
  getSearchResult: getGoogleSearchResult,
  getEntireListOfCategory: getEntireListOfCategoryGoogle,
  getRanking: getGoogleRanking
}
