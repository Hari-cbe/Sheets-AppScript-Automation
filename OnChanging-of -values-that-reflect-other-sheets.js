function onAllChangeValues(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();

  // Get the edited cell's range and row number
  var range = e.range;
  var row = range.getRow();
  var col = range.getColumn();

  console.log("col",col)
  let mastersheet = e.source.getActiveSheet();
  let data = mastersheet.getRange(row,1,1,col).getValues();
  let checkValue = mastersheet.getRange(row, 1, 1, 1).getValues()[0][0];
  
  // Loop through all sheets and update the corresponding row in each sheet
  for (var i = 0; i < sheets.length ; i++) {
    var sheet = sheets[i];

    var targetFirstColumn = sheet.getRange(1,1,sheet.getLastRow(),1).getValues();
    let $isavaliable = false
    var targetRowIndex = 0
 
    for( let i = 0;i<=targetFirstColumn.length ;i++){
      if (targetFirstColumn[i] == checkValue){
        $isavaliable = true;
        targetRowIndex = i
      }
    }
  
    if ($isavaliable && (col <= sheet.getLastColumn())){
      if(sheet.getName() != "$$sheets that the values doesn't needed to be added"){
       sheet.getRange(targetRowIndex + 1,1,1,col).setValues(data);
      }
    }
  }
}