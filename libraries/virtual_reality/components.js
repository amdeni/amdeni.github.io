/********************************************************************************************/
/********************************************************************************************/
/******************************            VR           *******************************/
/********************************************************************************************/
/********************************************************************************************/

var _library = 'virtual_reality';
var _path = '/virtual_reality/';


//TYPE: RECTANGLE
prx.types.vrrectangle = {
    name: "vrrectangle"
    ,onDisplay: function(item,containerid,symbol) {


        var _id = (!containerid) ? item.id : containerid+'-'+item.id;


        var _props = '';

        var cR = '';
        cR += '<div id="' + _id + '" class="box pos type-vrrectangle '+ prx.items.getComponentBaseClasses(item, containerid, symbol) +'" data-shape-type="'+item.typeName+'" ' + prx.items.getComponentBaseAttributes(item, containerid, symbol)  + '>';

        cR += '<style>';
        cR += prx.items.getComponentBaseStyle(item, containerid, symbol);
        cR += '#'+_id+' .inner-rec { background-color: '+prx.componentsHelper.getProp(item.backgroundColor,'color-background')+';} ';
        cR += '</style>';

        cR += prx.items.getComponentPrependDivs(item, containerid, symbol);
        cR += '<div id="rec-' + _id + '" class="inner-rec liveUpdate-backgroundColor-background-color changeProperty-backgroundColor changeProperty-backgroundColor-background-color">';
        cR += '</div>';
        cR += prx.items.getComponentAppendDivs(item, containerid, symbol);
        cR += '</div>';
        return cR;
    }
    ,interactions: [
        prx.commonproperties.actions
    ]
    ,propertyGroups: [
        {
            caption: 'Style',
            properties: [
                [
                    {
                        caption: 'Background',
                        name: 'backgroundColor',
                        proptype: 'background-color',
                        type: 'colorpicker',
                        value: function(item,name) { return item.backgroundColor; },
                        liveUpdate: 'background-color',
                        changeProperty: {
                            caption: 'Background Color',
                            selector: '.inner-rec',
                            property: 'background-color',
                            transitionable: true
                        }
                    }
                ]
            ]
        }
    ]

};



//TYPE: ACTION AREA
prx.types.vractionarea = {
    name: "vractionarea"
    ,onDisplay: function(item,containerid,symbol) {
        var _id = (!containerid) ? item.id : containerid+'-'+item.id;

        var cR = '<div id="' + _id + '" ' + prx.items.getComponentBaseAttributes(item, containerid, symbol)  + ' class="' + prx.items.getComponentBaseClasses(item, containerid, symbol) + ' box pos type-vractionarea">';
        cR += '<style>';
        cR += prx.items.getComponentBaseStyle(item, containerid, symbol);
        cR += '</style>';
        cR += prx.items.getComponentPrependDivs(item, containerid, symbol);
        cR += '<div id="rec-' + _id + '" class="inner-rec" >';
        cR += '<div></div>';
        cR += '</div>';
        cR += prx.items.getComponentAppendDivs(item, containerid, symbol);
        cR += '</div>';
        return cR;
    }
    ,interactions: [
        prx.commonproperties.actions
    ]

};


prx.imageChecked = {};
prx.types.vrimage = {
    name: "vrimage"
    , onDisplay: function (item, containerid, symbol) {
        var _id = (!containerid) ? item.id : containerid + '-' + item.id;

        var assetUrl = prx.componentsHelper.getProp(item.imgSrc,'asset');
        var thumbUrl = '';

        if (prx.urlCache != undefined) {
            thumbUrl = prx.urlCache.thumbs[prx.componentsHelper.getProp(item.imgSrc.fileId, 'other')] || '';
        }
        var missing = prx.url.static + '/images/editor/missing.png';


        if (prx.editor) {

            if( $('#image-load-container').length == 0 )
                $('<div id="image-load-container"></div>').appendTo('body');

            var container = document.getElementById('image-load-container');

            var img = document.createElement("img");

            container.appendChild(img);

            img.onload = function (e) {

                container.removeChild(img);

                $('#' + _id).css('background-image', '');
                $('#' + _id + ' .mask-inner').css('background-image', '');

                delete prx.imageChecked[toCheck];

                $('#' + _id + '-img-wrapper').removeClass('missing');
                $('#' + _id + '-img-wrapper').find('div').remove();

            }

            img.onerror = function (e) {
                $('#' + _id).css('background-image', '');

                prx.imageChecked[toCheck] = missing;
                $('#' + _id + '-img').attr('src', missing);

                var title = $('<div>' + prx.utils.escapeHTML(item.caption) + '</div>');
                $('#' + _id + '-img-wrapper').addClass('missing');
                $('#' + _id + '-img-wrapper').css('background-image', '');

                $('#' + _id + '-img-wrapper').find('div').remove();
                $('#' + _id + '-img-wrapper').prepend($('<div></div>'));
                $('#' + _id + '-img-wrapper').append(title);
                $('#' + _id + '-img-wrapper').append($('<div></div>'));

                container.removeChild(img);
            }

            var toCheck = '' + assetUrl;

            img.style.visibility = 'hidden';
            container.appendChild(img);
            img.setAttribute('src', toCheck);
            img.setAttribute('alt', 'na');

            if (prx.imageChecked[assetUrl] !== undefined && prx.imageChecked[assetUrl] !== missing) {
                assetUrl = prx.imageChecked[assetUrl] || assetUrl;
                prx.items.addAll();
            }

            assetUrl = prx.imageChecked[assetUrl] || assetUrl;

        }

        var missingClass = '', wrapperBackground = assetUrl;
        if (assetUrl == missing) {
            thumbUrl == '';
            missingClass = ' missing';
            wrapperBackground = '';
        }
        //gy check for gifs
        var fileId = prx.componentsHelper.getProp(item.imgSrc.fileId,'other');
        var fileType = fileId.substr(fileId.lastIndexOf('.') + 1);


        if(thumbUrl != '' ) {thumbUrl = ' style="background-image:  url(' + thumbUrl + ');" '}


        var cR = '<div id="' + _id + '"' + thumbUrl;
        cR +=  ' ' + prx.items.getComponentBaseAttributes(item, containerid, symbol)  + ' class="' + prx.items.getComponentBaseClasses(item, containerid, symbol) + ' box pos type-vrimage ">';

        cR += '<style>';
        cR += prx.items.getComponentBaseStyle(item, containerid, symbol);
        cR += '</style>';

        cR += prx.items.getComponentPrependDivs(item, containerid, symbol, '');

        cR += '<div class="image-inner">';

        cR += '<div id="' + _id + '-img-wrapper" class="type-image-wrapper ' + ((item.imgSrc.fileId !== undefined && prx.componentsHelper.getProp(item.imgSrc.fileId.slice(-4),'other') == '.svg') ? ' type-image-svg' : '') + missingClass  + (fileType=='gif' ? ' gif' : '') + '" ' +
            'style="background-image: url(' + wrapperBackground + ');">';

        cR += '<div></div>'

        var tempH = item.height, tempW = item.width;

        cR += '<img id="' + _id + '-img" src="' + ((prx.componentsHelper.getProp(item.imgSrc.fileId,'other') == "") ? "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7 style=\"width:"+tempW+";height:"+tempH+"\"" : assetUrl) + '" width="100%" height="100%" />';

        if (assetUrl == missing)
            cR += '<div>' + prx.utils.escapeHTML(item.caption) + '</div>';

        cR += '<div></div>'
        cR += '</div>'

        cR += '</div>';

        if (prx.editor && prx.componentsHelper.getProp(item.imgSrc.fileId,'other') == "d310bece0e91b91b485ed62166d1fc2e.svg" && prx.componentsHelper.getProp(item.imgSrc.assetType,'other') == "gallery") {
            cR += '<div class="type-image-hover-message">Double-click to edit image</div>';
            cR += '<style>#' + _id + ' .image-inner { background-color: #f9f9f9; }</style>'
            cR += '<style>#' + _id + ' .type-image-wrapper { border: ' + 1 * prx.componentsHelper.getScale(item.lib) + 'px solid #eee; box-sizing: border-box; }</style>'
        }

        cR += prx.items.getComponentAppendDivs(item, containerid, symbol);
        cR += '</div>';

        return cR;
    }
    , onResize: function (item, containerid, symbol) {
        // disable autoresize
        prx.componentsHelper.setAutoresizeValue(item, containerid, symbol, false);
    }, interactions: [{
        caption: 'Interactions',
        name: 'actions',
        type: 'action',
        value: function (item, name) {
            if (typeof(item.actions) == "undefined") {
                item.actions = [];
            }
            return item.actions.length;
        },
        hiddenByDefault: function (item) {
            if (typeof(item.propagateEvents) != "undefined" && item.propagateEvents) {
                return true;
            }
            return false;
        }
    }]
    ,propertyGroups: [
        {
            caption: 'Image',
            properties: [
                [
                    {
                        caption: false
                        ,name: 'imgSrc'
                        ,type: 'combo-asset'
                        ,displayValue: function(item,name) {
                        if(item.imgSrc.fileId == '') {
                            return 'No asset selected.';
                        }
                        return prx.utils.escapeHTML(item.imgSrc.name);
                    }
                        ,value: function(item,name) {
                        return JSON.stringify({
                            allow: 'image',
                            asset: item.imgSrc
                        });
                    }
                        ,changeProperty: {
                        caption: 'Image',
                        rerender: true
                    },
                        hiddenByDefault: function(item){
                            return false;
                        }

                    }
                ],
                [
                    {
                        caption: 'Reset to 1x size'
                        ,name: 'resetdimensionsdpr'
                        ,type: 'link'
                        ,onClick: function(item) {

                            return prx.componentsHelper.resetDimensions(item, true);
                        }
                        ,hiddenByDefault: function(item){
                            item.imgSrc.fileId = item.imgSrc.fileId || '';
                            //return value
                            var r = prx.imageFunctions.checkImageMultiplier(item) == false;

                            r = r || false;

                            return r;
                        }
                    }
                ],
                [
                    {
                        caption: function(item){

                            var multiplier = prx.imageFunctions.checkImageMultiplier(item);

                            if (multiplier !== false)
                                return 'Reset to ' + multiplier + 'x size (original)';
                            else
                                return 'Reset to original size';
                        }
                        ,name: 'resetdimensions'
                        ,type: 'link'
                        ,onClick: function(item) {

                        return prx.componentsHelper.resetDimensions(item);
                    },
                        hiddenByDefault: function(item){
                            return false;
                        }
                    }
                ],
                [
                    {
                        caption: 'Reset to aspect ratio'
                        , name: 'resetaspectratio'
                        , type: 'link'
                        , onClick: function(item) {
                        if ($.browser.msie) {
                            $('#' + item.id + " > img").removeAttr("width").removeAttr("height").css({
                                width: "auto",
                                height: "auto"
                            }).prop('naturalWidth', $('#' + item.id + " img").width()).prop('naturalHeight', $('#' + item.id + " img").height());
                        }

                        var _beforeWidth = $('#' + item.id + " img").prop('naturalWidth');
                        var _beforeHeight = $('#' + item.id + " img").prop('naturalHeight');

                        var _afterWidth = item.width;
                        var _afterHeight = (_afterWidth / _beforeWidth) * _beforeHeight;

                        _afterHeight = parseInt(Math.round(_afterHeight));

                        item.height = _afterHeight;

                        item.aspectratio = (_afterWidth / _beforeWidth);

                        $("#property-aspectratio").prop( "checked", true ).change();

                        return item;
                    },
                        hiddenByDefault: function(item){
                            item.imgSrc.fileId = item.imgSrc.fileId || '';
                            //return value
                            var r = item.imgSrc.fileId.slice(-4) == '.svg';

                            r = r || false;

                            return r;

                        }
                    }
                ]

            ]
        }
    ]
};


prx.components.vrrectangle = {
    name: 'vrrectangle'
    ,type: 'vrrectangle'
    ,lib: _library
    ,caption: 'VR Rectangle'
    ,icon: '-1700px -900px'
    ,helper: prx.url.devices+'/virtual_reality/vrrectangle/helper.png'
    ,backgroundColor: 'C6C6C6'
    ,width: 100*prx.componentsHelper.getScale(_library)
    ,height: 100*prx.componentsHelper.getScale(_library)
    ,actions:[]
    ,typeName: 'rectangle'
    ,properties: "l,hpos,vpos,w,h"
};

prx.components.vractionarea = {
    name: 'vractionarea'
    ,type: 'vractionarea'
    ,lib: _library
    ,caption: 'VR Interaction Area'
    ,icon: '-1800px -900px'
    ,helper: prx.url.devices+'/virtual_reality/vractionarea/helper.png'
    ,width: 100*prx.componentsHelper.getScale(_library)
    ,height: 100*prx.componentsHelper.getScale(_library)
    ,properties: "l,hpos,vpos,w,h"
};
//TYPE: IMAGE
prx.components.vrimage = {
    name: 'vrimage'
    ,type: 'vrimage'
    ,lib: _library
    ,caption: 'VR Image'
    ,icon: '-1900px -900px'
    ,helper: prx.url.devices+'/virtual_reality/vrimage/helper.png'
    , imgSrc: {
        "fileId": "d310bece0e91b91b485ed62166d1fc2e.svg",
        "assetType": "gallery",
        "bucketsource": "static",
        "name": " image_placeholder.svg",
        "url": "f1353077251107/01eb56561388a5a9015bcab43ddeeab5.svg"
    }
    , width: 200 * prx.componentsHelper.getScale(_library)
    , height: 200 * prx.componentsHelper.getScale(_library)
    ,actions:[]
    ,autoResize: true
    ,aspectratio: true
    ,properties: "l,hpos,vpos,w,h"
};
