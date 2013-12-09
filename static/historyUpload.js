// Upload a file to a Galaxy user's history using Galaxy's upload API.

//var historyId = parent.Galaxy.currHistoryPanel.model.get('id');

//function uploadToGalaxyHistory(fileText, fileName, hdaJSObject) {
function galaxyHistoryUpload(historyId) {
    console.log('creating galaxyHistoryUploader for history ' + historyId);
    var UPLOAD_API_URL = 'api/tools';

    this.historyId = historyId;

    this.postToHistory = function(file_type, fileName, fileText) {
        var genome = '?';
        var url_paste = '';
        var space_to_tabs = false;

        // configure tool
        tool_input = {};
        tool_input['dbkey'] = genome;
        tool_input['file_type'] = file_type;
        tool_input['files_0|NAME'] = fileName;
        tool_input['files_0|type'] = 'upload_dataset';
        tool_input['files_0|url_paste'] = url_paste;
        tool_input['space_to_tabs'] = space_to_tabs;

        // setup data
        data = {};
        data['history_id'] = this.historyId;
        data['tool_id'] = 'upload1';
        data['inputs'] = JSON.stringify(tool_input);

        // construct form data
        var formData = new FormData();
        for (var key in data) {
            formData.append(key, data[key]);
        }

        // add file to form

        var fileBlob = new Blob([fileText], {
            type : "text/plain"
        });

        formData.append('files_0|file_data', fileBlob, fileName);

        // form object has to be posted to api/tools by calling/copying the send() function from static/scripts/utils/galaxy.uploadbox.js
        var jqxhr = $.post(UPLOAD_API_URL, formData, function() {
            alert("success");
        }).done(function() {
            alert("second success");
        }).fail(function() {
            alert("error");
        }).always(function() {
            alert("finished");
        });
    };

}