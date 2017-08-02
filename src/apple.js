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
var getAppleSearchResult = (appName, amount) => {
  var dfd = q.defer()
  appName = appName || 'Plants Vs Zombies'

  amount = parseInt(amount)

  if (amount) {
    if (amount < 1) amount = 1
    if (amount > 250) amount = 250
  } else {
    amount = 100
  }

  appleScraper
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
        .catch(err => {callback(err)})
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
var getAppleRankingSingleGenre = (nOptions, genre) => {
  var dfd = q.defer()

  nOptions = nOptions || {}

  nOptions = {
    free: nOptions.free == true,
    id: nOptions.id || 1038508829,
    listOptions: {
      category: (nOptions.listOptions || {}).category || [6014],
      lang: (nOptions.listOptions || {}).lang || 'en',
      country: (nOptions.listOptions || {}).country || 'us',
      collection: (nOptions.listOptions || {}).collection || ''
    }
  }

  var options = _.cloneDeep(nOptions)

  options.listOptions.category = parseInt(genre)

  /*
  options.listOptions.collection = options.free?
                                    appleScraper.collection.TOP_FREE_IOS :
                                    appleScraper.collection.TOP_PAID_IOS
  */

  options.listOptions.collection = (options.listOptions.collection == '') ? 
                                    (options.free ? 
                                     appleScraper.collection.TOP_FREE_IOS : 
                                     appleScraper.collection.TOP_PAID_IOS
                                    ) :
                                    options.listOptions.collection;

  var funcArray = [
    (callback) => {
      appleScraper
        .list(options.listOptions)
        .then(result => {
          // console.log(result)
          callback(null, result, options)
        })
        .catch(err => {
          callback(err)
        })
    },
    (genreList, options, callback) => {
      // console.log(genreList)
      options.rank = _.findIndex(genreList, (app) => app.id == options.id) + 1
      // console.log(options.rank)
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
var getRankingApple = (appOptions) => {
  var dfd = q.defer()

  appOptions = appOptions || {}

  appOptions = {
    id: appOptions.id || 1038508829,
    listOptions: {
      lang: (appOptions.listOptions || {}).lang || 'en',
      country: (appOptions.listOptions || {}).country || 'us'
    }
  }

  appleScraper
    .app(appOptions)
    .then(result => {
      // console.log(result)
      appOptions.free = result.free == true
      appOptions.listOptions.category = result.genreIds
      getFuncArrayAppleRanking(result, appOptions)
        .then(result => {
          // var array = result.funcArray
          var appDetails = result.appDetails
          async.waterfall(
            result.funcArray,
            (err, result) => {
              if (err) return dfd.reject(err)
              appDetails.ranks = result
              dfd.resolve(appDetails)
            }
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

  var genres = options.listOptions.category
  var count = 0

  var funcArray = []

  _.forEach(genres, (genre, i) => {
    if (i == 0) {
      funcArray[i] = (callback) => {
        getAppleRankingSingleGenre(options, genre)
          .then(result => {
            var resultArray = []
            resultArray[i] = {
              category: genre,
              cIndex: i,
              rank: result.rank,
              listOptions: result.listOptions
            }
            callback(null, resultArray, options)
          })
          .catch(err => dfd.reject(err))
      }
    } else {
      funcArray[i] = (resultArray, options, callback) => {
        getAppleRankingSingleGenre(options, genre)
          .then(result => {
            resultArray[i] = {
              category: genre,
              cIndex: i,
              rank: result.rank,
              listOptions: result.listOptions
            }
            callback(null, resultArray, options)
          })
          .catch(err => dfd.reject(err))
      }
    }

    count++
    if (count == genres.length) {
      // dfd.resolve({funcArray: funcArray, appDetails: appDetails})
      dfd.resolve({funcArray:funcArray, appDetails:appDetails})
    }
  })

  return dfd.promise
}

module.exports = {
  getSearchResult: getAppleSearchResult,
  getEntireListOfCategory: getEntireListOfCategoryApple,
  getRanking: getRankingApple,
  getRankingSingleGenre: getAppleRankingSingleGenre
}
