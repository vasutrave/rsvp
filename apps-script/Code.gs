/**
 * Wedding RSVP – Google Apps Script Web App
 *
 * DEPLOYMENT INSTRUCTIONS:
 *  1. Open Google Sheets and create a spreadsheet named e.g. "Wedding RSVPs".
 *  2. In the sheet, go to Extensions → Apps Script.
 *  3. Paste this entire file, replacing any existing content.
 *  4. Click Deploy → New deployment → Web app.
 *     - Execute as: Me
 *     - Who has access: Anyone (even anonymous)
 *  5. Authorise the script when prompted.
 *  6. Copy the Web App URL and paste it into CONFIG.scriptUrl in index.html.
 *  7. Re-deploy (Manage deployments → Edit) whenever you change this script.
 */

const SHEET_NAME = 'RSVPs';

/** Column headers — order must match appendRow() call below */
const HEADERS = [
  'Timestamp',
  'Attending',
  'Name',
  'Events',
  'Accommodation',
  'Arrival',
  'Departure',
  'Guests',
  'Message'
];

/**
 * Receives a form-encoded POST from the RSVP page and appends a row to the
 * active spreadsheet.  Returns JSON so the client can (optionally) read it.
 */
function doPost(e) {
  try {
    const ss    = SpreadsheetApp.getActiveSpreadsheet();
    let   sheet = ss.getSheetByName(SHEET_NAME);

    // First-run: create the sheet and freeze the header row
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, HEADERS.length)
           .setFontWeight('bold');
    }

    const p = e.parameter || {};

    sheet.appendRow([
      new Date(),
      p.attending      || '',
      p.name           || '',
      p.events         || '',
      p.accommodation  || '',
      p.arrival        || '',
      p.departure      || '',
      p.guests         || '',
      p.message        || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Run this function once from the Apps Script editor to verify the sheet
 * is accessible before going live.
 */
function testSetup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  Logger.log('Spreadsheet : %s', ss.getName());
  const sheet = ss.getSheetByName(SHEET_NAME);
  Logger.log('RSVPs sheet : %s', sheet ? 'found' : 'will be created on first submission');
}
