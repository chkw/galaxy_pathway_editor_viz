console.log('historyUpload.js is loading');
// Upload a file to a Galaxy user's history using Galaxy's upload API.

//var historyId = parent.Galaxy.currHistoryPanel.model.get('id');
function galaxyHistoryUploader(historyId) {
    console.log('creating galaxyHistoryUploader for history ' + historyId);
    var UPLOAD_API_URL = '/api/tools';
    console.log('UPLOAD_API_URL: ' + UPLOAD_API_URL);

    this.historyId = historyId;

    this.postToHistory = function(file_type, fileName, fileText) {
        console.log('postToHistory');
        var genome = '?';
        var url_paste = '';
        var space_to_tabs = false;

        // configure tool
        var tool_input = {};
        tool_input['dbkey'] = genome;
        tool_input['file_type'] = file_type;
        tool_input['files_0|NAME'] = fileName;
        tool_input['files_0|type'] = 'upload_dataset';
        tool_input['files_0|url_paste'] = url_paste;
        tool_input['space_to_tabs'] = space_to_tabs;

        console.log('tool_input: ' + JSON.stringify(tool_input));

        // setup data
        var data = {};
        data['history_id'] = this.historyId;
        data['tool_id'] = 'upload1';
        data['inputs'] = JSON.stringify(tool_input);

        console.log('data: ' + JSON.stringify(data));

        // construct form data
        var fData = new FormData();

        console.log('1');
        fData.append("k1", "v1");
        console.log('1');
        fData.append('k2', 'v2');
        console.log('1');
        fData.append('k3', 'v3');
        console.log('1');

        for (var key in data) {
            var k = JSON.stringify(key);
            var v = JSON.stringify(data[key]);
            console.log('key: ' + k + '\tval: ' + v);
            fData.append(k, v);
        }

        // add file to form

        var fileBlob = new Blob([fileText], {
            type : "text/plain"
        });

        fData.append('files_0|file_data', fileBlob, fileName);

        console.log('fData: ' + JSON.stringify(fData));
        console.log('fData.toString: ' + fData.toString()[0]);

        // form object has to be posted to api/tools by calling/copying the send() function from static/scripts/utils/galaxy.uploadbox.js
        // http://stackoverflow.com/questions/5392344/sending-multipart-formdata-with-jquery-ajax
        // http://stackoverflow.com/questions/6974684/how-to-send-formdata-objects-with-ajax-requests-in-jquery
        var jqxhr = $.post(UPLOAD_API_URL, null, function() {
            console.log("success");
        }).done(function() {
            console.log("second success");
        }).fail(function() {
            console.log("error");
        }).always(function() {
            console.log("finished");
        });
    };

}