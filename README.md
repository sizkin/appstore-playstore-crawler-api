# Crawler to retrieve the app ranking
![alt text](https://travis-ci.org/midyan/appstore-playstore-crawler-api.svg?branch=master)

## What is it?
  It's a simple NodeJS API that returns the current day's App ranking in its category.
  It uses the *google-play-scraper* and the *app-store-scraper* packages form npm to
  retrieve the basic app data, and then calculate it's ranking. Please note, it can only
  get the first 200 (100 for the Apple App Store) apps of each category, so it can only
  return the app ranking if it is one of the top 200/100.

## Installation
  ```
  npm install unified-app-crawler
  ```
  then
  ```javascript
  var unifiedCrawler = require('unified-app-crawler')
  ```
  or (ES6)
  ```javascript
  import { unifiedCrawler } from 'unified-app-crawler'
  ```

# The API structure
  It returns two objects, one for the Apple App Store and one for the Google Play Store.
  Each of these objects have three methods that are equivalents for each store:

## Methods
  - [getSearchResult](#getsearchresult): Retrieves 1 to 250 top results for a given string as search parameter
  - [getEntireListOfCategory](#getentirelistofcategory): Retrieves the top apps for a single category. It return 100 apps for the Apple App Store and 200 for the Google Play Store
  - [getRanking](#getranking): Gets the ranking of a given App.
  - [getRankingSingleGenre (Apple only)](#getrankingsinglegenre): Gets the ranking from a single genre for a Apple App

### getSearchResult
  Retrieves 1 to 250 top results for a given string as search parameter. It could be any string.

  For the Apple App Store
  ```javascript
  var unifiedCrawler = require('google-play-scraper');

  unifiedCrawler.apple.getSearchResult('Uber', 100)
    .then(result => console.log(result))
  ```

  The log would be:
  ```javascript
  [
    { id: 368677368,
      appId: 'com.ubercab.UberClient',
      title: 'Uber',
      url: 'https://itunes.apple.com/us/app/uber/id368677368?mt=8&uo=4',
      description: 'Uber is a ridesharing app for fast, reliable rides in minutes—day or night. There’s no need to park or wait for a taxi or bus. ...,
      icon: 'http://is3.mzstatic.com/image/thumb/Purple111/v4/32/36/9a/32369abe-e5a8-60b2-1d90-9322a7c87aa9/source/512x512bb.jpg',
      genres: [ 'Travel', 'Lifestyle' ],
      genreIds: [ '6003', '6012' ],
      primaryGenre: 'Travel',
      primaryGenreId: 6003,
      contentRating: '4+',
      languages:
       [ 'AR',
         'AZ',
         ...],
      size: '251481088',
      requiredOsVersion: '8.0',
      released: '2010-05-21T03:11:23Z',
      updated: '2017-04-12T20:32:07Z',
      releaseNotes: 'We update the app as often as possible to make it faster and more reliable for you. Check back next week to see the latest features and fixes available.\n\nLove the app? Rate us! Your feedback keeps the Uber engine running. \nHave a question? Tap Help in the Uber app or visit help.uber.com.',
      version: '3.241.2',
      price: 0,
      currency: 'USD',
      free: true,
      developerId: 368677371,
      developer: 'Uber Technologies, Inc.',
      developerUrl: 'https://itunes.apple.com/us/developer/uber-technologies-inc/id368677371?uo=4',
      developerWebsite: 'https://uber.com',
      score: 3,
      reviews: 48023,
      currentVersionScore: 2,
      currentVersionReviews: 187,
      screenshots:
       [ 'http://a1.mzstatic.com/us/r30/Purple71/v4/79/39/ac/7939ac16-348b-692e-7cf1-0f6a7b225388/screen696x696.jpeg',
         ...],
      appletvScreenshots: [],
      supportedDevices:
       [ 'iPad2Wifi-iPad2Wifi',
         'iPad23G-iPad23G',
         ...]
    }
  ]

  ```

  For the Google Play Store:

  ```javascript
  var unifiedCrawler = require('google-play-scraper');

  unifiedCrawler.google.getSearchResult('Uber', 100)
    .then(result => console.log(result))
  ```

  The log would be:

    [ { url: 'https://play.google.com/store/apps/details?id=com.ubercab',
        appId: 'com.ubercab',
        title: 'Uber',
        summary: 'Ride with Uber for fast, reliable rides that are affordable and available 24/7.',
        developer: 'Uber Technologies, Inc.',
        icon: '//lh3.googleusercontent.com/grsL-sVOds-X3WXwQKYplloxD2wkWLUmpXFYTX2dmbAltKTRskhDX4rsdLwavMv5LHQ=w340',
        score: 4.3,
        price: '0',
        free: true },
      { url: 'https://play.google.com/store/apps/details?id=com.ubercab.driver',
        appId: 'com.ubercab.driver',
        title: 'Uber Driver',
        summary: 'Drive with Uber and earn anytime, 24/7 around your schedule.',
        developer: 'Uber Technologies, Inc.',
        icon: '//lh3.googleusercontent.com/RnRTWHIjUhy3GO-TvMzw-IWCrLHTjizyJyEdXw1cTerxrmYF0bFmZYVzzwtWzgVMYno=w340',
        score: 4.4,
        price: '0',
        free: true },
      ...Plus more 98 results
    ]

### getEntireListOfCategory
  Retrieves the first 200 (Google Play Store) or the first 100 (For the Apple App Store) top apps from a certain category.

  Search Options:
  * `category`: The google Play Category name. You can find a list here on the original google-play-scraper : [List](https://github.com/facundoolano/google-play-scraper/blob/dev/lib/constants.js).
  * `collection`: The google Play Collection name. You can find a list here on the original google-play-scraper : [List](https://github.com/facundoolano/google-play-scraper/blob/dev/lib/constants.js).
  * `lang` : Not required, and it defaults to 'en'.
  * `country`: Not required, and it defaults to 'us'.


  For the Google Play Store:

  ```javascript
  var unifiedCrawler = require('google-play-scraper');

  var searchOptions = {
    category: googleScraper.category.GAME,         
    collection: googleScraper.collection.TOP_FREE,
    lang: 'en',
    country: 'us'
  }

  unifiedCrawler.google.getEntireListOfCategory(searchOptions)
    .then(result => console.log(result))
  ```

  The log would be:
  ```javascript
  [ { url: 'https://play.google.com/store/apps/details?id=com.nintendo.zara',
    appId: 'com.nintendo.zara',
    title: 'Super Mario Run',
    summary: 'A new kind of Mario game that you can play with one hand.',
    developer: 'Nintendo Co., Ltd.',
    icon: '//lh3.googleusercontent.com/ERlp5QdPfuJeiU0_O5knXjnyvsoraJ2vfR3AaORksQR5ml63zLtyPL-i_umCSudkng=w340',
    score: 3.6,
    price: '0',
    free: true },
  { url: 'https://play.google.com/store/apps/details?id=com.bitmango.go.wordcookies',
    appId: 'com.bitmango.go.wordcookies',
    title: 'Word Cookies',
    summary: 'Swipe the hidden word cookies and become a true chef!',
    developer: 'BitMango',
    icon: '//lh3.googleusercontent.com/zCV_ut2J8ixSv8L2gTT_0ugiElvJitbuwOl9m9HYg-EM0VqVGqbdAjvoFNjhPA4Mrg=w340',
    score: 4.6,
    price: '0',
    free: true },
  ...Plus all other results]
  ```

  For the Apple App Store:

  Search Options:
  * `category`: The Apple App Store Category name. You can find a list here on the original app-store-scraper : [List](https://github.com/facundoolano/app-store-scraper/blob/master/lib/constants.js).
  * `collection`: The Apple App Store Collection name. You can find a list here on the original app-store-scraper : [List](https://github.com/facundoolano/app-store-scraper/blob/master/lib/constants.js).
  * `lang` : Not required, and it defaults to country.
  * `country`: Not required, and it defaults to 'us'.

  ```javascript
  var unifiedCrawler = require('google-play-scraper');

  var searchOptions = {
    collection: appleScraper.collection.TOP_FREE_IPAD,
    category: appleScraper.category.GAMES_ACTION,
    country: 'br'
  }

  unifiedCrawler.apple.getEntireListOfCategory(searchOptions)
    .then(result => console.log(result))
  ```

  The log would be:
  ```javascript
  [ { id: '1139172614',
    appId: 'com.spilgames.UphillRush',
    title: 'Uphill Rush',
    icon: 'http://is1.mzstatic.com/image/thumb/Purple122/v4/0c/42/92/0c429221-f5b8-273b-ac58-365df0be099a/pr_source.png/100x100bb-85.png',
    url: 'https://itunes.apple.com/br/app/uphill-rush/id1139172614?mt=8&uo=2',
    price: 0,
    currency: 'USD',
    free: true,
    description: 'Se prepare para ação extrema com toboáguas no simulador de parque aquático mais louco do mundo! Sobreviva o máximo que puder enquanto você realiza manobras loucas e voa sobre tudo em seu caminho! Voe baixo em espirais, loops e muito mais! Você desbravará parques aquáticos incríveis e conquistará pistas realmente insanas. Isso é mais do que diversão ao sol...',
    developer: 'SPIL GAMES',
    developerUrl: 'https://itunes.apple.com/br/developer/spil-games/id345597129?mt=8&uo=2',
    developerId: '345597129',
    genre: 'Jogos',
    genreId: '6014',
    released: '2017-03-15T05:26:46-07:00' },
    ...Plus all other results]
  ```

### getRanking
  Retrieves the ranking of and app from every category it is placed on each App Store.

  For the Google Play Store:
  Search Options:
  * `appId`: The Google Play ID of the app. Defaults to `'com.halfbrick.fruitninja'`.
  * `lang` : Not required, and it defaults to 'en'.
  * `country`: Not required, and it defaults to 'us'.

  ```javascript
  var unifiedCrawler = require('google-play-scraper');

  var searchOptions = {
    appId: 'com.nway.powerrangerslegacywars',
    country:'us'
  }

  unifiedCrawler.google.getRanking(searchOptions)
    .then(result => console.log(result))
  ```

  The log would be:
  ```javascript
  { title: 'Power Rangers: Legacy Wars',
  summary: 'Battle Players in Real-Time with Rangers &amp; Villains from Power Rangers history.',
  icon: '//lh3.googleusercontent.com/7BoyiDFrwn6bQs4uX-xc1Usg2JFUmlKO9NkPFc9X9FxoJjnJg6I9rQROGn27ER4zMsh_=w300',
  price: '0',
  free: true,
  minInstalls: 5000000,
  maxInstalls: 10000000,
  score: 4.2,
  reviews: 97382,
  developer: 'nWay Inc.',
  developerEmail: 'support@nway.mail.helpshift.com',
  developerWebsite: 'http://playlegacywars.com',
  updated: 'April 13, 2017',
  version: '1.1.5',
  genre: 'Action',
  genreId: 'GAME_ACTION',
  familyGenre: undefined,
  familyGenreId: undefined,
  size: undefined,
  description: 'Rita Repulsa, the space witch, has infected the Morphin Grid, creating virtual monsters and Ranger clones programmed to fight on her behalf. Fight back with your ...',
  descriptionHTML: 'Rita Repulsa, the space witch, has infected the Morphin Grid, creating virtual monsters and Ranger clones programmed to ...',
  histogram: { '1': 9932, '2': 3151, '3': 7851, '4': 10806, '5': 65642 },
  offersIAP: true,
  adSupported: false,
  androidVersionText: '4.0 and up',
  androidVersion: '4.0',
  contentRating: 'Teen',
  screenshots:
   [ '//lh3.googleusercontent.com/LvY0Gh59q0vTgHOJ7CGVreF0Xo91786noCZ6ovp_QpcPx-HFTpxVi2HmqPMtODAv=h310 ...' ],
  video: undefined,
  comments:
   [ 'Good game if you have good wifi. Also guys I noticed when I first downloaded this game, when I was Ready to battle I got to choose 1 of my teams out of the three that I had put together in roster, before each battle. ...'],
  recentChanges:
   [ '1.1.5 Patch Notes',
     ...],
  preregister: false,
  url: 'https://play.google.com/store/apps/details?id=com.nway.powerrangerslegacywars&hl=en&gl=us',
  appId: 'com.nway.powerrangerslegacywars',
  rank: 7,
  rankOverall: 39 }

  ```
  The .rank attribute is the current rank for the apps category, and the .rankOverall is the rank of the app on the Parent category. A certain game can be at Rank 4 on Action Games category but on Rank 12 for Games category.

  For the Apple App Store:

  var unifiedCrawler = require('google-play-scraper');

  var searchOptions = {

  }

  unifiedCrawler.apple.getRanking(searchOptions)
    .then(result => console.log(result))
  ```

  The log would be:
  ```javascript
  'SEARCH RESULT HERE'
  ```

# How to test it?
  To run all unit testing simply do:
  ```
  npm test
  ```

# Thanks and acknowledgments
