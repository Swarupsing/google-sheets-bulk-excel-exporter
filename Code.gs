function downloadAllTabsAsExcelZip() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  var zipBlobs = [];
  
  // Loop through all sheets and convert each into its own Excel file
  for (var i = 0; i < sheets.length; i++) {
    var sheet = sheets[i];
    var name = sheet.getName();
    var sheetId = sheet.getSheetId();
    
    // Construct the URL to export ONLY this specific sheet tab as an Excel file
    var url = ss.getUrl().replace(/edit$/, '') + 'export?format=xlsx&gid=' + sheetId;
    
    try {
      var response = UrlFetchApp.fetch(url, {
        headers: {
          'Authorization': 'Bearer ' +  ScriptApp.getOAuthToken()
        },
        muteHttpExceptions: true
      });
      
      var blob = response.getBlob().setName(name + ".xlsx");
      zipBlobs.push(blob);
    } catch(e) {
      Logger.log("Failed to export sheet: " + name + ". Error: " + e.toString());
    }
  }
  
  // Package all individual Excel files into one ZIP archive
  var zip = Utilities.zip(zipBlobs, ss.getName() + "_Separate_Excel_Sheets.zip");
  
  // Save the final ZIP archive to the root of your Google Drive
  var file = DriveApp.createFile(zip);
  
  // Display a popup window with the download link
  var htmlOutput = HtmlService.createHtmlOutput(
    '<p style="font-family: Arial, sans-serif;">Your ZIP file containing all Excel sheets is ready!</p>' +
    '<div style="text-align: center; margin-top: 20px;">' +
    '<a href="' + file.getUrl() + '" target="_blank" style="padding: 10px 20px; background-color: #107c41; color: white; text-decoration: none; border-radius: 4px; font-weight: bold; font-family: Arial, sans-serif;">Open ZIP File in Drive</a>' +
    '</div>'
  ).setWidth(350).setHeight(150);
  
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Export Complete');
}

// Automatically creates a custom navigation button in your toolbar
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Bulk Excel Export')
    .addItem('Download All Tabs as Excel ZIP', 'downloadAllTabsAsExcelZip')
    .addToUi();
}