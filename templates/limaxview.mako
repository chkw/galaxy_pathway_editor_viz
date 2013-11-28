<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>${hda.name} | ${visualization_name}</title>

## ----------------------------------------------------------------------------
<link type="text/css" rel="Stylesheet" media="screen" href="/static/style/base.css">

## ----------------------------------------------------------------------------
##<script type="text/javascript" src="/static/scripts/libs/jquery/jquery.js"></script>
<script type="text/javascript" src="http://code.jquery.com/jquery-1.10.2.js"></script>
##<script type="text/javascript" src="/static/scripts/libs/jquery/jquery.migrate.js"></script>
##<script type="text/javascript" src="/static/scripts/libs/d3.js"></script>

<script type="text/javascript" src="/plugins/visualizations/limaxview/static/d3.v3.js"></script>

<script type="text/javascript" src="/plugins/visualizations/limaxview/static/jquery.contextMenu.js"></script>
<link type="text/css" rel="stylesheet" href="/plugins/visualizations/limaxview/static/jquery.contextmenu.css">
<link type="text/css" rel="stylesheet" href="/plugins/visualizations/limaxview/static/main19.css">

##<script type="text/javascript" src="/plugins/visualizations/limaxview/static/jquery.rdfquery.core.js"></script>

<link type="text/css" src="/plugins/visualizations/limaxview/static/main18.css"></script>

<script type="text/javascript" src="/plugins/visualizations/limaxview/static/graphData.js"></script>
<link type="text/css" rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
<script type="text/javascript" src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>

</head>

## ----------------------------------------------------------------------------
<body>
%if not embedded:
## dataset info: only show if on own page
<div id="chart-header" class="header">
    <h2 class="title">limax View of of '${hda.name}'</h2>
    <div id="tooltip"></div>
    <p class="subtitle">${hda.info}</p>
</div>
%endif

<div id="sbgn_editor" class="graph-view-div"></div>

<script type="text/javascript" src="/plugins/visualizations/limaxview/static/main19.js"></script>


<script type="text/javascript">
	var hdaId   = '${trans.security.encode_id( hda.id )}',
        hdaExt  = '${hda.ext}',
        graphDataURL = "${h.url_for( controller='/datasets', action='index')}/" + hdaId + "/display?to_ext=" + hdaExt;
        
    console.log('using url: ' + graphDataURL);

	d3.text(graphDataURL, function(error, data) {
		if (error !== null) {
			console.log("error getting graph data --> " + error);
		}

		// var graph = new graphData();
		if (endsWith(graphDataURL.toUpperCase(), 'PID')) {
			console.log('reading data as pid');
			graph.readPid(data);
		} else if (endsWith(graphDataURL.toUpperCase(), 'SIF')) {
			console.log('detected sif format, but going to read data as pid');
			// graph.readSif(data);
			graph.readPid(data);
		} else {
			console.log('reading data as tab');
			graph.readTab(data);
		}

		startEditor();
	});
</script>


<!--
<script type="text/javascript">
$(document).ready(function() {
    var hdaId   = '${trans.security.encode_id( hda.id )}',
        hdaExt  = '${hda.ext}',
        ajaxUrl = "${h.url_for( controller='/datasets', action='index')}/" + hdaId + "/display?to_ext=" + hdaExt,

        gv = $("#graphview").graphViewer({height:900, width:900});


    %if hda.ext == 'sif':
    $.ajax( ajaxUrl, {
        success: function(txtDoc) {
            parse_sif(txtDoc, gv.add_node, gv.add_edge);
            gv.render();
        },
        dataType : "text"
    });

    %endif

});
</script>
 -->

</body>
