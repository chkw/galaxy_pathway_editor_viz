// Upload a file to a Galaxy user's history using Galaxy's upload API.

var UPLOAD_API_URL = 'api/tools';

function setupUpload() {
    var currentId = parent.Galaxy.currHistoryPanel.model.get('id');
    console.log('id: ' + currentId);
}

/**
 * some metadata for the upload
 */
function configureUpload() {
    // configure tool
    tool_input = {};
    tool_input['dbkey'] = genome;
    tool_input['file_type'] = file_type;
    tool_input['files_0|NAME'] = file.name;
    tool_input['files_0|type'] = 'upload_dataset';
    tool_input['files_0|url_paste'] = url_paste;
    tool_input['space_to_tabs'] = space_to_tabs;

    // setup data
    data = {};
    data['history_id'] = this.current_history;
    data['tool_id'] = 'upload1';
    data['inputs'] = JSON.stringify(tool_input);
}

/**
 * file gets added to a FormData object.
 */
function constructUploadForm() {
    // construct form data
    var formData = new FormData();
    for (var key in data)
    formData.append(key, data[key]);

    // add file to form
    formData.append('files_0|file_data', file, file.name);
}

/**
 * form object has to be posted to api/tools by calling/copying the send() function from static/scripts/utils/galaxy.uploadbox.js
 */
function sendUploadForm() {

}
