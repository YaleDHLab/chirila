/* Reconstructions family function */
function populateReconstructionsTable(data) {
  var length = data.length/100;
  $("#reconstructions .total-pages").text(Math.round(length));
  for (var i = 1; i <= length; i++) {
      $("#reconstructions #pagination").append(
          $('<option>').attr("value", i).text(i)
      );    
  }
  populateReconstructionsTableHelper(0, 1, data);
};

function populateReconstructionsTableHelper(start, end, data) {
  //clear word table
  $("#reconstructions-table-main tbody").empty();

  //set start and end values for parsin through word data
  //increments of 100's
  start = start * 100;
  end = end * 100;

  //loop through and get data (can change order by switched <td>'s but remember to switch within the HTML too!)
  for (var i = start; i < end; i++) {
      //get item
      var item = data[i];
      //get properties
      var form = item.Reconstruction_Form.toString();
      var level = item.Reconstruction_Level.toString();
      var gloss = item.Reconstruction_Gloss.toString();
      var notes = item.Reconstruction_Notes.toString();
    
      if (form != "") {
        var $tr = $('<tr>').append(
            $('<td>').text(form).addClass("form"),
            $('<td>').text(level).addClass("level"),
            $('<td>').text(gloss).addClass("gloss"),
            $('<td>').text(notes).addClass("notes")
        );
        //append to table
        $("#reconstructions-table-main .list").append($tr); 
      }
  }
};

function reconstructionsTableSort() {
    var options = {
        valueNames: [ 'form', 'level', 'gloss' ]
    };
    var userList = new List('reconstructions-table', options);   
}   

$("#reconstructions #pagination").on("change", function(){
  var start = parseInt($("#reconstructions #pagination").val(), 10) - 1;
  var end = parseInt($("#reconstructions #pagination").val(), 10);
  populateReconstructionsTableHelper(start, end, _globalData);
  reconstructionsTableSort();
});