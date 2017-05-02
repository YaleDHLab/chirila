//API Keys
var _gmapKey = "AIzaSyBq_JAExTxvT_Tin75QXSkEdoEtkxzYruM";

//NodeJS Boilerplate
var express = require('express'),
  path = require('path'),
  pug = require('pug'),
  csv = require('csvtojson'),
  http = require('http');

//Setting required items from node packages
var app = express()
//Set where viewfiles are. TODO make sep.
app.set('views', path.join(__dirname, 'views'));
//Set where public files are
app.use(express.static(__dirname + '/public'));
//Jade templating language
app.set("view engine", "pug")

//Express routing
app.get('/', function(req, res) {
  var indexFAQ = require(__dirname + '/public/json/index_faq.json');
  
  res.render("index", {
    pageTitle: 'Home | Chirila DB',
    pageId: 'index',
    headerBG: 'indexHeader',
    pageHeaderTitle: 'Welcome to Chirila DB',
    pageHeaderSubtitle: 'A database of the language of Australia',
    indexFAQ: indexFAQ,
    mapScripts: false
  })
})

app.get('/index', function(req, res) {
  var indexFAQ = require(__dirname + '/public/json/index_faq.json');
  
  res.render("index", {
    pageTitle: 'Home | Chirila DB',
    pageId: 'index',
    headerBG: 'indexHeader',
    pageHeaderTitle: 'Welcome to Chirila DB',
    pageHeaderSubtitle: 'A database of the language of Australia',
    indexFAQ: indexFAQ,
    mapScripts: false
  })
})

app.get('/languages', function(req, res) {
  var headers = ["Language", "Subgroup", "Family", "ISOCode", "Glottocode", "AIATSIS Code", "Variety"];
  
  res.render("languages", {
    pageTitle: 'Languages | Chirila DB',
    pageId: 'languages',
    headerBG: 'languageHeader',
    pageHeaderTitle: 'Languages',
    pageHeaderSubtitle: 'View all languages in the dataset',
    headerInfo: headers,
    data: myData,
    gMapKey: _gmapKey,
    mapScripts: true    
  })
});

app.get('/languages/:language', function(req, res) {
  var lang = req.params.language;
  var langWords = [];
  
  for (var i = 0; i < myData.length; i++) {
    var item = myData[i];
    if (item.StdLanguageName == lang) {
      langWords.push(item);
    }
  }

  res.render("language_sub", {
    pageTitle: lang + ' | Chirila DB',
    pageId: 'languages-sub',
    headerBG: 'languageSubHeader',
    pageHeaderTitle: lang,
    pageHeaderSubtitle: langWords[0].Subgroup + " | " + langWords[0].Family,
    data: langWords,
    gMapKey: _gmapKey,
    mapScripts: true   
  })
});

app.get('/words', function(req, res) {
  var headers = ["Word", "Phonetic Form", "Og. Gloss", "Language Name", "PoS", "Source"];
  
  res.render("words", {
    pageTitle: 'Words | Chirila DB',
    pageId: 'words',
    headerBG: 'wordsHeader',
    pageHeaderTitle: 'Words',
    pageHeaderSubtitle: 'View all words in the dataset',
    headerInfo: headers,
    data: myData,
    mapScripts: false    
  })
});

app.get('/reconstructions', function(req, res) {
  var headers = ["Form", "Level", "Gloss", "Notes"];
  
  res.render("reconstructions", {
    pageTitle: 'Reconstructions | Chirila DB',
    pageId: 'reconstructions',
    headerBG: 'reconstructionsHeader',
    pageHeaderTitle: 'Reconstructions',
    pageHeaderSubtitle: 'View all reconstructions in the dataset',
    headerInfo: headers,
    data: myData,
    mapScripts: false    
  })
});

app.get('/download', function(req, res) {
  res.render("download", {
    pageTitle: 'Download | Chirila DB',
    pageId: 'download',
    headerBG: 'downloadHeader',
    pageHeaderTitle: 'Download',
    pageHeaderSubtitle: 'Download the complete Chirila Dataset',
    mapScripts: false    
  })
});

app.get('/downloadSuccess', function(req, res) {
  var file = 'FullChirilaDataset.csv';
  
  /*
  if (req.params.downloadAuth == "verified") {
    res.download(file);
  }
  */
  
  res.render("downloadSuccess", {
    pageTitle: 'Download Success | Chirila DB',
    pageId: 'downloadSuccess',
    headerBG: 'downloadHeader',
    pageHeaderTitle: 'Download Success',
    pageHeaderSubtitle: 'You may now download the complete Chirila Dataset',
    mapScripts: false    
  })
});

//Express listening
app.listen(8080, function(){
  console.log('Example app listening on port 8080! Chirila app running.')
})

//This will hold all our data
var myData = [];
//Path to CSV file
var csvFilePath = __dirname + '/data/smallDataSetCleansed.csv';
//Converter for csvToJson
const converter=csv({
  noheader: false,
  trim: true,
  delimiter: ",",
  workerNum: 4,
})

csv().fromFile(csvFilePath).on('json', (json, rowIndex)=> {
  myData.push(json);
}).on('error', (err)=> {
  console.log("error", err);
}).on('end', ()=> { 
  //console.log(myData);
});



