# Still on development. Not ready to be implemented.
This readme file is still incomplete. I'm still detailing the parameters for each method
or any other parameter can change still I publish the finished first version. You will know
when it happens when I publish this as an NPM package and delete this paragraph.

# Crawler to retrieve the app ranking
![alt text](https://travis-ci.org/midyan/appstore-playstore-crawler-api.svg?branch=master)

##What is it?
It's a simple NodeJS API that returns the current day's App ranking in its category.
It uses the *google-play-scraper* and the *app-store-scraper* packages form npm to
retrieve the basic app data, and then calculate it's ranking. Please note, it can only
get the first 200 (100 for the Apple App Store) apps of each category, so it can only
return the app ranking if it is one of the top 200/100.

##Installation
```
npm install unified-app-crawler
```
then
```javascript
var unifiedCrawler = require('unified-app-crawler')
```
or (ES6)
```javascript
import {unifiedCrawler} from 'unified-app-crawler'
```

#The API structure
It returns two objects, one for the Apple App Store and one for the Google Play Store.
Each of these objects have three methods that are equivalents for each store:

##Methods
- [getSearchResult](#getSearchResult): Retrieves the 250 first results for a given string as search parameter
- [getEntireListOfCategory](#getEntireListOfCategory): Retrieves the top apps for a single category. It return 100 apps for the Apple App Store and 200 for the Google Play Store
- [getRanking](#getRanking): Gets the ranking of a given App.

##For the Apple App Store

### getSearchResult
Retrieves the 250 first results for a given string as search parameter. It could be any string.

For the Apple App Store
```javascript
var unifiedCrawler = require('google-play-scraper');

unifiedCrawler.apple.getSearchResult('Uber')
  .then(result => console.log(result))
```

The log would be:
```javascript
'SEARCH RESULT HERE'
```

For the Google Play Store:

```javascript
var unifiedCrawler = require('google-play-scraper');

unifiedCrawler.google.getSearchResult('Uber')
  .then(result => console.log(result))
```

The log would be:
```javascript
'SEARCH RESULT HERE'
```

### getEntireListOfCategory
Retrieves the first 200 (Google Play Store) or the first 100 (For the Apple App Store)
top apps from a certain category.

For the Google Play Store:

```javascript
var unifiedCrawler = require('google-play-scraper');

var searchOptions = {

}

unifiedCrawler.google.getEntireListOfCategory(searchOptions)
  .then(result => console.log(result))
```

The log would be:
```javascript
'SEARCH RESULT HERE'
```

For the Apple App Store:

```javascript
var unifiedCrawler = require('google-play-scraper');

var searchOptions = {

}

unifiedCrawler.apple.getEntireListOfCategory(searchOptions)
  .then(result => console.log(result))
```

The log would be:
```javascript
'SEARCH RESULT HERE'
```

### getRanking
Retrieves the ranking of and app from every category it is placed on each App Store.

For the Google Play Store:

```javascript
var unifiedCrawler = require('google-play-scraper');

var searchOptions = {

}

unifiedCrawler.google.getRanking(searchOptions)
  .then(result => console.log(result))
```

The log would be:
```javascript
'SEARCH RESULT HERE'
```

For the Apple App Store:

```javascript
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

#How to test it?
To run all unit testing simply do:
```
npm test
```

#Thanks and acknowledgments
