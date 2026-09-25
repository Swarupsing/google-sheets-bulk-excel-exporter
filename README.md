# Google Sheets Bulk Excel Exporter

A Google Apps Script that exports every tab in a Google Spreadsheet as a separate Excel (`.xlsx`) file and combines all the files into a single ZIP archive.

## Features

* Export all tabs from a Google Spreadsheet
* Convert each tab into an individual Excel file
* Automatically create a ZIP archive containing all Excel files
* Save the ZIP file directly to Google Drive
* Add a custom **Bulk Excel Export** menu to Google Sheets
* Works with spreadsheets containing multiple tabs

## Example

Suppose your Google Spreadsheet contains:

* Sheet 1
* Sheet 2
* Sheet 3
* Sheet 4

The script creates:

```text
Spreadsheet_Name_Separate_Excel_Sheets.zip
│
├── Sheet 1.xlsx
├── Sheet 2.xlsx
├── Sheet 3.xlsx
└── Sheet 4.xlsx
```

The ZIP file is automatically saved to the root of your Google Drive.

## How to Use

### 1. Open your Google Spreadsheet

Open the Google Spreadsheet containing the tabs you want to export.

### 2. Open Apps Script

Go to:

**Extensions → Apps Script**

### 3. Add the script

Copy the contents of `Code.gs` from this repository and paste it into the Apps Script editor.

Save the project.

### 4. Reload the spreadsheet

Return to your Google Spreadsheet and reload the page.

After reloading, you should see a new menu:

**Bulk Excel Export**

### 5. Export the sheets

Click:

**Bulk Excel Export → Download All Tabs as Excel ZIP**

The first time you run the script, Google will ask you to authorize the required permissions.

Complete the authorization process.

### 6. Get the ZIP file

After the export finishes, the script displays a button that opens the generated ZIP file in Google Drive.

## Required Permissions

The script uses Google Apps Script services to:

* Read the active Google Spreadsheet
* Export individual spreadsheet tabs
* Make an authorized request to the Google Sheets export endpoint
* Create the resulting ZIP file in Google Drive

Google will request authorization when the script is run for the first time.

## How It Works

The script:

1. Gets the active Google Spreadsheet.
2. Retrieves all sheets/tabs.
3. Gets the unique ID (`gid`) of each sheet.
4. Uses the Google Sheets export URL to export each individual tab as an Excel file.
5. Stores the exported Excel files temporarily as blobs.
6. Combines the files into a ZIP archive.
7. Saves the ZIP archive to Google Drive.
8. Displays a link to the generated ZIP file.

## Limitations

* The script exports the sheets from the currently active Google Spreadsheet.
* Users must have appropriate access to the spreadsheet.
* Google Apps Script authorization is required.
* The generated ZIP file is saved to the root of Google Drive.
* Very large spreadsheets may take longer to process because each tab is exported separately.

## Contributing

Suggestions, improvements, bug fixes, and other contributions are welcome.

If you find an issue or have an idea for improving the script, feel free to open an issue or submit a pull request.

## License

This project is open source. See the `LICENSE` file for details.
