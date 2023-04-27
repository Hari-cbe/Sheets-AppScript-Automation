const MasterSheetId = "$$Master Sheet ID"

function onCopyHeaders(){
  copytoL1();
}

function copytoL1(){
  let spreadSheet = SpreadsheetApp.openById(MasterSheetId);
  let sourceSheet = spreadSheet.getSheetByName('Database');

  let sourceRange = sourceSheet.getSheetValues(1,1,1,sourceSheet.getLastColumn());
  let rowCount = sourceRange.length;
  let columnCount = sourceRange[0].length;
  
  let targetSheet = spreadSheet.getSheetByName('L1');
  let targetRange = targetSheet.getRange(1,1,rowCount,columnCount);
  targetRange.setValues(sourceRange)
  targetRange.setFontWeight("bold").setFontSize(11).setHorizontalAlignment("center")
  copytoL2();
}
// You Can Create as many function you need
function copytoL2(){
  let spreadSheet = SpreadsheetApp.openById(MasterSheetId);
  let sourceSheet = spreadSheet.getSheetByName('L1');

  // Adding Columns to the current sheet 
  let columIndex =  sourceSheet.getDataRange().getValues()[0].indexOf('$$Last Column Where the columns need to be added') + 1
  console.log(columIndex)
  if(sourceSheet.getMaxColumns() < 36){
    sourceSheet.insertColumnsAfter(columIndex,3)
  }
  
  var range = sourceSheet.getRange(1,columIndex + 1,1,3)
  var headers = [["$$Columns List Seperated With commas"]];
  range.setValues(headers)

  let sourceRange = sourceSheet.getSheetValues(1,1,1,sourceSheet.getLastColumn());
  let rowCount = sourceRange.length;
  let columnCount = sourceRange[0].length;
  
  let targetSheet = spreadSheet.getSheetByName('L2');
  let targetRange = targetSheet.getRange(1,1,rowCount,columnCount);
  targetRange.setValues(sourceRange)
  // Styling the row 
  targetRange.setFontWeight("bold").setFontSize(11).setHorizontalAlignment("center")
  copytoL3();
}



