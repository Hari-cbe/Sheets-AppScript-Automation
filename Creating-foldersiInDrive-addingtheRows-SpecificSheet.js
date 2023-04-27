function onCreateFolders(e) {
  let sheet = e.source.getActiveSheet();
  let range = e.range;
  let row = range.getRow();

  var lastColumn = sheet.getLastColumn();
  var isRowFilled = true;
  for (var column = 1; column <= lastColumn; column++) {
    var value = sheet.getRange(row, column).getValue();
    if (value === "" || value === null) {
      isRowFilled = false;
      break;
    }
  }

  // Perform an action if all the columns in the row are filled
  if (isRowFilled) {
      let techColumnIndex = sheet.getDataRange().getValues()[0].indexOf('Technology') + 1

      let value = sheet.getRange(row,techColumnIndex).getValue();
      let columnTech = sheet.getRange(1,techColumnIndex).getValue()
      let column = range.getColumn(); 

      if (columnTech == "$$Specific Column that need to checked" && value != ""){

      var folderId = "$$" // Parent Folder Id 
      var parentFolderName = DriveApp.getFolderById(folderId).getName() 

      var folderName = value;
      var parentFolder = DriveApp.getFoldersByName(parentFolderName).next();
      var folder = parentFolder.getFoldersByName(folderName);
      if (folder.hasNext()) {
          var copysheetId = folder.next().getId();
          createFiles(copysheetId,value,sheet,row);
      } 
      else {
          var newFolder = parentFolder.createFolder(folderName);
          copysheetId = newFolder.getId()
          createFiles(copysheetId,value,sheet,row)
      }

      function createFiles(copysheetId,value,sheet,row){
      var folder_ = DriveApp.getFolderById(copysheetId);
      
      // Check if the sheet already exists for this value
      var sheetName = value + " Data";
      var existingSheet = folder_.getFilesByName(sheetName);

      if (existingSheet.hasNext()) {
        var file = existingSheet.next();
          var existingSpreadsheet = SpreadsheetApp.openById(file.getId());
          var existingSheet_ = existingSpreadsheet.getActiveSheet();
          var lastRow = existingSheet_.getLastRow();
          var lastvalue = existingSheet_.getRange(lastRow,1,existingSheet_.getLastRow(),1).getValue();

          //Adding Headers to the Existing Sheet but the current active sheet 
          existingSheet_.getRange(1,1,1,sheet.getLastColumn()).setValues(sheet.getRange(1,1,1,sheet.getLastColumn()).getValues())
          .setFontWeight("bold").setFontSize(11).setHorizontalAlignment("center");

          if (sheet.getRange(row, 1, 1, 1).getValue() != lastvalue){
          var newRange = existingSheet_.getRange(lastRow + 1, 1, 1, sheet.getLastColumn());
          newRange.setValues(sheet.getRange(row, 1, 1, sheet.getLastColumn()).getValues());
          }
          else{
          var oldRange = existingSheet_.getRange(lastRow, 1, 1, sheet.getLastColumn());
          oldRange.setValues(sheet.getRange(row, 1, 1, sheet.getLastColumn()).getValues());
          }

        } 

        else {
            // Create a new spreadsheet and get its ID
          var newSpreadsheet = SpreadsheetApp.create(sheetName);
          var newSpreadsheetId = newSpreadsheet.getId();
          
          // Move the new spreadsheet to the folder
          var file = DriveApp.getFileById(newSpreadsheetId);
          folder_.addFile(file);
          
          // Get the first sheet of the new spreadsheet
          var newSheet = newSpreadsheet.getSheets()[0];
          
          // Setting the Row Headers
          newSheet.getRange(1,1,1,sheet.getLastColumn()).setValues(sheet.getRange(1,1,1,sheet.getLastColumn()).getValues())
          .setFontWeight("bold").setFontSize(11).setHorizontalAlignment("center");

          // Write the data to the new sheet
          newSheet.getRange(newSheet.getLastRow() + 1, 1, 1, sheet.getLastColumn())
          .setValues(sheet.getRange(row, 1, 1, sheet.getLastColumn()).getValues());

        }
      }
    }
  }
}
