
jQuery(document).ready(function() 
{ 
	
	//insert a chunk of html
	var body = jQuery("body");
	var hide = body.data("hidetoolbar");
	//console.log(hide);
	
	if( hide != true )
	{	
		var path = window.location.pathname;
		if( window.location.search )
		{
			path = path + window.location.search;
		}
	
		jQuery.get("/openedit/components/toolbar/admintoolbarselector.html", {path:	path }, function(data) 
		{
			
			body.prepend(data);
			
			loadToolbar();
		});
	}	
	
	$(document).on("click",  ".oeDialog" ,function(){
		var target = $(this).data('target');
		if(target == null){
			target = $(this).attr('href');
		}
		var title= $(this).data('title');
		if(title != null){
			
			$('#modal-title').text(title);
		}
		$('#edit-modal-body').load(target,function(result){
			var textareas = jQuery(".htmleditor");
			if(textareas.size() > 0){
			
				loadEditors();
			}
			$('#editmodal').modal({show:true});
		
		});
	  return false;
		
	});	
	
	
	$(document).on("click",  ".oemodechange" ,function(e){
		
		var target = $(this).attr('href');
		jQuery.get(target, function(){
			
			location.reload();
			
		});
	     e.preventDefault();
		}
	);
		
	jQuery("a.openeditdialog").each(
		function() 
		{
			var height  = jQuery(window).height();
			var width  = jQuery(window).width();
			height = height * 0.9;
			width = width * 0.9;
			if(width < 900){
				width = 1050;
			}
			
			var newfancy = jQuery(this).fancybox(
			{ 
				'zoomSpeedIn': 300, 'zoomSpeedOut': 300, 'overlayShow': true,
				enableEscapeButton: true, type: 'iframe', 
				height: height, width: width
			});
		}
	); 
	jQuery("a.oeinlineedit").on('click',
			function(e) 
			{	
			
			var container = $(this).parent().parent().parent();
			container = $(container);
			var editpath = container.data("editpath");
			var app = jQuery("#application");

			var catalogid = app.data("catalogid");
			alert("using " + catalogid);
			var home = $("#openedit").data("home");
			if(!home)
			{
				home = "";
			}
			var savepath = home + "/openedit/components/html/save.html";
			
		 	CKEDITOR.config.saveSubmitURL = savepath + "?editPath=" + editpath;	 //TODO: Save this URL specific to this editor
		 	CKEDITOR.config.filebrowserBrowseUrl =  home+ '/openedit/components/html/browse/index.html?editPath=$editPath';
		    CKEDITOR.config.filebrowserUploadUrl = home+ '/openedit/components/html/edit/actions/imageupload-finish.html';
		    CKEDITOR.config.filebrowserImageBrowseUrl = home+'/openedit/components/html/browse/index.html?editPath=$editPath';
			CKEDITOR.config.filebrowserImageUploadUrl = home+ '/openedit/components/html/edit/actions/imageupload-finish.html';
			CKEDITOR.config.entities =false;
			CKEDITOR.config.basicEntities= true;
				e.preventDefault();
				var content = container.find(".openediteditcontent" ).get(0);
				//var content = jQuery(".openediteditcontent" ).get(0);
				content.setAttribute('contenteditable', 'true');
				var editor = CKEDITOR.inline( content,
					 {
					 extraConfig : { 'oldcontent' : 'null'
						 
					 
					 },
        			 startupFocus : true ,        			 
        			 on: 
        			   {
        			   	dataReady: function( event ) {
        			   		
        			   		 event.editor.config.extraConfig.oldcontent = event.editor.getData();
        			   	},        			   
		                 blur: function( event ) {
          	
		                    var data = event.editor.getData();
							
							if( data != editor.config.extraConfig.oldcontent )
							{
									$(window).on("beforeunload", function() {
										return "You have unsaved changes.  Reloading will loose these changes.";
										
										
									});
								
							}
							return false;
							//event.editor.destroy();
		                 } ,
		                 savecontentdone: function( event )    {
		                	 location.reload();

		                 }  
		              }      
                } );
                
               
                	
				/*
				if( typeof content.ckeditorGet == "undefined")
				{
					CKEDITOR.inline( content,
					 {
        				startupFocus : true
        			 }
        			);	
				}
				*/
//				content.focus();

/*
  				jQuery(content).blur( function() {
	                content.setAttribute('contenteditable', 'false');
	               
					for(name in CKEDITOR.instances)
					{
					    CKEDITOR.instances[name].destroy()
					}

	             } ); 
*/

				return false;
			}
	);		

	
	
	
	jQuery(document).on('click',".oe-dataedit",
		function(e) 
		{	
			
			var container = $(this).data("target");
			container = $(container);
			var searchtype = container.data("searchtype");
			var id = container.data("dataid");
			var field = container.data("field");
			var viewtype = container.data("viewtype");
			if( !viewtype )
			{
				viewtype = "html";
			}
			var home = $("#openedit").data("home");
			if(!home)
			{
				home = "";
			}
			e.preventDefault();
			
			var catalogid = jQuery("#application").data("catalogid");
			var apphome = jQuery("#application").data("apphome");
			var savepath = home  + apphome + "/components/data/save.html";
			
			if( viewtype == "html")
			{
			 	CKEDITOR.config.saveSubmitURL = savepath + "?searchtype=" + searchtype + "&field=" + field + "&id=" +id + "&catalogid=" + catalogid;	 //TODO: Save this URL specific to this editor
				CKEDITOR.config.filebrowserBrowseUrl =  home+ '/openedit/components/html/browse/index.html?editPath=$editPath';
			    CKEDITOR.config.filebrowserUploadUrl = home+ '/openedit/components/html/edit/actions/imageupload-finish.html';
			    CKEDITOR.config.filebrowserImageBrowseUrl = home+'/openedit/components/html/browse/index.html?editPath=$editPath';
				CKEDITOR.config.filebrowserImageUploadUrl = home+ '/openedit/components/html/edit/actions/imageupload-finish.html';
				CKEDITOR.config.entities =false;
				CKEDITOR.config.basicEntities= true;
				
				var content = container.get(0);
				//var content = jQuery(".openediteditcontent" ).get(0);
				content.setAttribute('contenteditable', 'true');
				var editor = CKEDITOR.inline( content,
				{
					 extraConfig : { 'oldcontent' : 'null'},
        			 startupFocus : true ,        			 
        			 on: 
        			 {
        			   	dataReady: function( event ) 
        			   	{
        			   		
        			   		 event.editor.config.extraConfig.oldcontent = event.editor.getData();
        			   	},        			   
		                blur: function( event ) 
		                {
	                        content.setAttribute('contenteditable', 'false');
		                    var data = event.editor.getData();
							event.editor.destroy();
		                } ,
		                savecontentdone: function( event )    
		                {
		                		event.editor.destroy();
		                }  
		             }      
                });
	                
		}
		else if( viewtype == "input")
		{
			var oldborder = container.css("border"); 
			container.css("border","1px dashed black");
			var content = container.get(0);
			content.setAttribute('contenteditable', 'true');
			container.focus();
			var options = container.data();
			options.save = true;
			options.oemaxlevel = 1;
			options.id = options.dataid;
			var field = options.field;
			container.keyup(function(evt)
			{
				//save as we go?
				// enter pressed
				var contents = content.innerHTML;
				options[field + ".value"] = contents;

				$.get(savepath,options,function()
				{
					//reset border  
					//content.setAttribute('contenteditable', 'false'); 
					container.css("border",oldborder); 				
				});
			});
			//Capture the enter key
			
		}
		return false;
	});		
	
	
jQuery("form.oeajaxform").bind('submit',	
		function() 
		{
			var targetdiv = jQuery(this).attr("targetdiv");
			targetdiv = targetdiv.replace(/\//g, "\\/");
			//allows for posting to a div in the parent from a fancybox.
			if(targetdiv.indexOf("parent.") == 0)
			{
				targetdiv = targetdiv.substr(7);
				parent.jQuery(this).ajaxSubmit({
					target:"#" + targetdiv, 
					success: function() { $(document).trigger( "domchanged", "#" + targetdiv ); }
				 });
	
				
				//closes the fancybox after submitting
				parent.jQuery.fn.fancybox.close();
			}
			else
			{
				jQuery(this).ajaxSubmit({
					target:"#" + targetdiv, 
					success: function() { $(document).trigger( "domchanged", "#" + targetdiv ); }
				 });
	
			}
			return false;
		}
	);

	
});
	
	loadToolbar = function()
	{
		jQuery("#oeselector").mouseenter(
			function()
			{
				if( jQuery("#oeadmintoolbarlocation").is(":visible"))
				{
					return;
				}
				var me = jQuery(this); 
				jQuery.get(me.attr("href"), {}, function(data) 
						{
							me.html(data);
							jQuery("#oeadmintoolbarlocation").mouseleave(
									function() 
									{
										jQuery(this).hide();
									}
							);
						}
					);
			}
	);
	}
	

showHover = function(inAssetId)
{
	var el = document.getElementById("oehover");
	el = jQuery(el);
	if( el.attr("status") == "show")
	{
		if( inAssetId == el.attr("assetid") )
		{
			el.show();
		}
	}
}


refreshFileMenu = function(){
	var editpath = $("#fileoptionsmenu").data("editpath");
	
	var home = $("#openedit").data("home");
	if(!home)
	{
		home = "";
	}
	$("#fileoptionsmenu").load(home + "/openedit/components/html/edit/menu.html?oemaxlevel=1&editPath=" + editpath);
	
}

