function onEdit(e) {
  let source = e.source.getActiveSheet();
  let range = e.range;
  let row = range.getRow();

  // Check if all the columns in the row are filled
  var lastColumn = source.getLastColumn();
  var isRowFilled = true;
  for (let column = 1; column <= lastColumn; column++) {
    var value = source.getRange(row, column).getValue();
    if (value === "" || value === null) {
      isRowFilled = false;
      break;
    }
  }

  // Perform an action if all the columns in the row are filled
  if (isRowFilled) {
    let col = range.getColumn(); 
    let val = range.getValue();
    // let Dropped_ = true;

  switch(e.range.getSheet().getName()){
    case "Database":
    let L1Cleared =  source.getDataRange().getValues()[0].indexOf('L1 Interview cleared') + 1;
    let columnL1clearedValue = source.getRange(row,L1Cleared).getValue();
    let colL1Cleared = source.getRange(1,L1Cleared).getValue();
   
    if (colL1Cleared == "L1 Interview cleared" && columnL1clearedValue != "" 
        && columnL1clearedValue != "No"){
    addRows("L1")
  }
  break;

  case "L1":
    let L2Cleared =  source.getDataRange().getValues()[0].indexOf('L2 Interview cleared') + 1;
    let columnL2clearedValue = source.getRange(row,L2Cleared).getValue();
    let colL2Cleared = source.getRange(1,L2Cleared).getValue();
    if (colL2Cleared == "L2 Interview cleared" && columnL2clearedValue != "" && columnL2clearedValue != "No"){
      addRows("L2");
  }
  break;

  case "L2":
    let L3Cleared =  source.getDataRange().getValues()[0].indexOf('L3 Interview cleared') + 1;
    let columnL3clearedValue = source.getRange(row,L3Cleared).getValue();
    let colL3Cleared = source.getRange(1,L3Cleared).getValue();
    if (colL3Cleared == "L3 Interview cleared" && columnL3clearedValue != "" && columnL3clearedValue != "No"){
      addRows("L3")
  }
  break;

  case "L3":
    let L4Cleared =  source.getDataRange().getValues()[0].indexOf('L4 Interview cleared') + 1;
    let columnL4clearedValue = source.getRange(row,L4Cleared).getValue();
    let colL4Cleared = source.getRange(1,L4Cleared).getValue();
    if (colL4Cleared == "L4 Interview cleared" && columnL4clearedValue != "" && columnL4clearedValue != "No"){
      addRows("L4")
    }
  break;
  
  case "L4":
  let FICleared =  source.getDataRange().getValues()[0].indexOf('Final Interview cleared') + 1;
    let columnFIclearedValue = source.getRange(row,FICleared).getValue();
    let colFICleared = source.getRange(1,FICleared).getValue();
    if (colFICleared == "Final Interview cleared" && columnFIclearedValue != "" && columnFIclearedValue != "No"){
      addRows("Final Interview")
    }
  break;

  case "Final Interview":
    let OfferReleased =  source.getDataRange().getValues()[0].indexOf('Offer Release') + 1;
    let columnOFclearedValue = source.getRange(row,OfferReleased).getValue();
    let colOFCleared = source.getRange(1,OfferReleased).getValue();

    if (colOFCleared == "Offer Release" && columnOFclearedValue != "" && columnOFclearedValue != "No"){
      addRows("Venkat")
      importSelectedColumns("Offer Release")
    }
    else{
      importSelectedColumns("Offer Release")
    }
    break;

  default:
    return;
  }
  // Add a specific Rannge of columns to a sheet
  function importSelectedColumns(sheetName) {  
    let selectedColumns = [1, 9, 16,47]; 
    let ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName("Final Interview");
    let ssThis = SpreadsheetApp.getActiveSpreadsheet();
    let sheetRawData = ssThis.getSheetByName("Offer Release");
        
    selectedColumns.forEach(function(column_,i ){
      let data = sheet.getRange(1,column_, sheet.getLastRow(),1).getValues();
      sheetRawData.getRange(1,1+i, sheet.getLastRow(), 1).setValues(data);    
    }) 
  }

 // Function to add the rows in the specfic Sheet 
   function addRows(sheetName){
    let ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(source.getName());
    let targetSheet  = ss.getSheetByName(sheetName);
    let data = sheet.getRange(row,1,1,sheet.getLastColumn()).getValues();
    
    var checkValue = source.getRange(row, 1, 1, 1).getValues()[0][0]
    var targetFirstColumn = targetSheet.getRange(1,1,targetSheet.getLastRow(),1).getValues();
    $isavaliable = false
    var targetRowIndex = 0  
    for( let i = 0;i<=targetFirstColumn.length ;i++){
      if (targetFirstColumn[i] == checkValue){
        $isavaliable = true;
        targetRowIndex = i
      }
    }
 // Check wheather already the data is present in the sheet if the data is present. 
// The data will be added in the same row otherwise the data will be appended to the lastrow of the sheet
    if (!$isavaliable){
        targetSheet.appendRow(data[0]);
      } 
        else{
         targetSheet.getRange(targetRowIndex + 1,1,1,sheet.getLastColumn())
         .setValues(sheet.getRange(row,1,1,sheet.getLastColumn()).getValues());
        }
	}
  }
}
