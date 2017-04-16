const appleScraper = require('app-store-scraper')
const _ = require('lodash')
const q = require('q')
const async = require('async')


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
 * Gets list of top 100 apps from category/collection
 * its ID
 * @function
 * @param {object} options - App Options
 * @returns promise
 */
var getEntireListOfCategoryApple = (listOptions) => {
  var dfd = q.defer()

  listOptions.num = 100

  var index = listOptions.start

  var funcArray = [
    (callback) => {
      appleScraper
        .list(listOptions)
        .then(result => {

          callback(null, result)
        })
        .catch(err => callback(err))
    }
  ]
  async.waterfall(
    funcArray,
    (err, result) => err ? dfd.reject(err) : dfd.resolve(result)
  )
  return dfd.promise
}

/**
 * Get ranking for individual ranking of genre
 * @function
 * @param {object} options - App Options
 * @returns promise
 */
var getAppleRankingSingleGenre = (options) => {
  var dfd = q.defer()

  options = options || {}

  options = {
    free: options.free || true,
    id: options.id || 1038508829,
    listOptions: {
      category: (options.listOptions || {}).category || 6014,
      lang: (options.listOptions || {}).lang || 'en',
      country: (options.listOptions || {}).counter || 'us'
    }
  }

  if (options.free) {
    options.listOptions.collection = appleScraper.collection.TOP_FREE_IOS
  } else {
    options.listOptions.collection = appleScraper.collection.TOP_PAID_IOS
  }

  var funcArray = [
    (callback) => {
      appleScraper
        .list(options.listOptions)
        .then(result => {
          callback(null, result, options)
        })
        .catch(err => callback(err))
    },
    (genreList, options, callback) => {
      // console.log(genreList)
      options.rank = _.findIndex(genreList, (app) => app.id == options.id) + 1
      // options.rank = parseInt(options.rank)
      callback(null, options)
    }
  ]

  async.waterfall(
    funcArray,
    (err, result) => err ? dfd.reject(err) : dfd.resolve(result)
  )

  return dfd.promise
}

/**
 * Get ranking for all genres of app
 * @function
 * @param {object} options - App Options
 * @returns promise
 */
var getOverallRankingApple = (options) => {
  var dfd = q.defer()

  options = options || {}

  options = {
    free: options.free || true,
    id: options.id || 1038508829,
    listOptions: {
      category: (options.listOptions || {}).category || 6014,
      lang: (options.listOptions || {}).lang || 'en',
      country: (options.listOptions || {}).counter || 'us'
    }
  }

  var funcArray = []

  appleScraper
    .app(options)
    .then(result => {
      getFuncArrayAppleRanking(result, options)
        .then(funcArray => {
          async.waterfall(
            funcArray,
            (err, result) => err ? dfd.reject(err) : dfd.resolve(result)
          )
        })
        .catch(err => dfd.reject(err))
    })
    .catch(err => dfd.reject(err))



  return dfd.promise
}

/**
 * Get function array for apple waterfall
 * @function
 * @param {object} options - App Options
 * @returns promise
 */
var getFuncArrayAppleRanking = (appDetails, options) => {
  var dfd = q.defer()

  var genres = appDetails.genreIds
  var count = 0

  var funcArray = []

  _.forEach(genres, (genres, i) => {

    if (i == 0) {
      funcArray.push(
        (callback) => {
          getAppleRankingSingleGenre
          callback(null)
        }
      )
    } else {
    }

    count++
    if (count == genres.length) {
    }
  })

  return dfd.promise
}


module.exports = {
  getSearchResult: getAppleSearchResult,
  getEntireListOfCategory: getEntireListOfCategoryApple,
  getRankingSingleGenre: getAppleRankingSingleGenre
}
