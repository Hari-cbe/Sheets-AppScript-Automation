const SHEETID = '$$Change Your MasterSheet id';
const CURRENTSHEET = $$change your Active sheet ID

// When Opening the Sheet it will Run -- Trigger the function in the OnOpen 
function onOpenEmail(){
  const ui =  SpreadsheetApp.getUi();
  ui.createMenu('Functions').addItem("Email",'sendReportAsPDF').addToUi();
}

function getFileAsBlob(exportUrl) {
 let response = UrlFetchApp.fetch(exportUrl, {
     muteHttpExceptions: true,
     headers: {
       Authorization: 'Bearer ' +  ScriptApp.getOAuthToken(),
     },
   });
 return response.getBlob();
}

function sendReportAsPDF() {
 let blob = getFileAsBlob(`https://docs.google.com/spreadsheets/d/${SHEETID}/export?format=xlsx&portrait=false&size=b5&gridlines=true&gid=${CURRENTSHEET}`);
  let file = DriveApp.createFile(blob);
  Logger.log(file.getUrl());
  var message = {
    to: "$$Your Mail Id",
    subject: "",
    body: "",
    name: "",
    attachments: [blob.setName("$$Sheet-Name")]
  }
  MailApp.sendEmail(message);
}
