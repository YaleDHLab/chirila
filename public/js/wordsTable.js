    
//We need to do this like this because I don't have a good way of 
//dealing with pug table creation with passed variables.
//TODO: Make this less hacky

//Populate Words Table main function
function populateWordsTable(data) {
  //get length of data
  var length = data.length/100;
  $("#words .total-pages").text(Math.round(length));
  for (var i = 1; i <= length; i++) {
      $("#words #pagination").append(
          $('<option>').attr("value", i).text(i)
      );    
  }
  populateWordsTableHelper(0, 1, data);
};

//Helper function
function populateWordsTableHelper(start, end, data) {
  //clear word table
  $("#word-table-main tbody").empty();

  //set start and end values for parsin through word data
  //increments of 100's
  start = start * 100;
  end = end * 100;
  //console.log(data[0], data[100]);
  if (end > data.length - 1) {
    end = data.length - 1;
  }
  //console.log(start, end);

  //loop through and get data (can change order by switched <td>'s but remember to switch within the HTML too!)
  for (var i = start; i < end; i++) {
      //get item
      var item = data[i];
      //get properties
      var word = item.OriginalForm.toString();
      var langName = item.StdLanguageName.toString();
      var phoneticForm = item.PhonemicisedIPA.toString();
      var ogGloss = item.OriginalGloss.toString();
      var stdGloss = item.Std_Gloss.toString();
      var source = item.Author.toString();
      var pos = item.OriginalPofSpeech.toString();

      if (word != "") {
        $tr = $("tr");
        var $tr = $('<tr>').append(
            $('<td>').text(word).addClass("word"),
            $('<td>').text(phoneticForm).addClass("phonetic-form"),
            $('<td>').text(ogGloss).addClass("og-gloss"),
            $('<td>').text(langName).addClass("langname"),
            $('<td>').text(pos).addClass("pos"),
            $('<td>').text(source).addClass("source")
        );
        //append to table
        $("#word-table-main tbody").append($tr);
      }
  }
}

//Sorting function
function wordsTableSort() {
  var options = {
      valueNames: [ 'word', 'langname', 'og-gloss' ]
  };
  var userList = new List('word-table', options);   
}  

$("#words #pagination").on("change", function(){
  var start = parseInt($("#words #pagination").val(), 10) - 1;
  var end = parseInt($("#words #pagination").val(), 10);
  populateWordsTableHelper(start, end, _globalData);
  wordsTableSort();
});