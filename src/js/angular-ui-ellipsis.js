/*!
* angular-ui-ellipsis
* https://github.com/chesscai/angular-ui-ellipsis
* v0.0.1
*/
(function() {
    'use strict';

    angular
        .module('angular-ui-ellipsis', [])
        .directive('ellipsis', ['$window', ellipsis]);

    function ellipsis($window) {

    	//获取元素最终渲染背景色
    	function getRealBackgroundColor(ngDom) {
    		var bgc;
    		while(ngDom[0].nodeName.toLowerCase() !== 'html') {
    			bgc = getCurrentBackgroundColor(ngDom[0]);
    			if(bgc !== 'rgba(0, 0, 0, 0)' && bgc !== 'transparent') break;
    			ngDom = ngDom.parent();
    		}
    		return bgc;
    	}

    	//获取单前元素背景色
    	function getCurrentBackgroundColor(ele) {
    		return $window.getComputedStyle(ele, null).getPropertyValue('background-color');
    	}

    	return {
    		transclude: true,
    		template: '<div class="angular-ui-ellipsis">'+
    				'<div ng-transclude class="ellipsis-value"></div>'+
    				'<div ng-transclude class="whole-value"></div>'+
    			'</div>',
    		link: function(scope, elem, attrs, ctrl, transclude) {
    			var uiElem = elem.children('.angular-ui-ellipsis');
    			var isOpen = false;//click模式：是否展开

    			//table-cell ellipsis
    			if(/(td|th)/.test(elem[0].nodeName.toLowerCase())) elem.css('maxWidth', '0');

    			// ellipsis-hover：both single and multi
    			if(attrs.ellipsisHover) uiElem.addClass('hover');

    			// ellipsis-click: only single line
    			if(attrs.ellipsisClick && !attrs.ellipsisMultiline) {
    				uiElem.removeClass('hover');
    				uiElem.addClass('read-more');
    				uiElem.bind('click', clickHandle);

    				function clickHandle() {
    					if(isOpen) {
    						isOpen = false;
    						uiElem.addClass('read-more');
    						uiElem.removeClass('click');
    					}else {
    						isOpen = true;
    						uiElem.removeClass('read-more');
    						uiElem.addClass('click');
    					}
    				}
    			}

    			// ellipsis-multiline
    			if(attrs.ellipsisMultiline) {
    				var multiline = attrs.ellipsisMultiline;
    				var oh = uiElem.children()[0].offsetHeight;//[0]get origin dom
    				var bgc = getRealBackgroundColor(uiElem.children());
    				var bgStyle = 'background:'+ bgc +';'+
    					'background:-webkit-linear-gradient(left, transparent, '+ bgc +' 30%);'+
    					'background:-moz-linear-gradient(left, transparent, '+ bgc +' 30%);'+
    					'background:-ms-linear-gradient(left, transparent, '+ bgc +' 30%);'+
    					'background:-o-linear-gradient(left, transparent, '+ bgc +' 30%);';

    				var symbol = '<div class="ellipsis-symbol" style="'+ bgStyle +'">'+
    						'...'+ 
    						(attrs.ellipsisClick ? '<span>&nbsp;&nbsp;read more</span>' : '')+
    						'</div>';

    				uiElem
    					.addClass('multiline')
    					.children().eq(0)//get first jqLite
    					.css('height', oh*multiline+'px')
    					.append(symbol);

    				// ellipsis-click: only multiline
    				if(attrs.ellipsisClick) {
    					uiElem.bind('click', clickHandle);
    				}

    				function clickHandle() {
    					if(isOpen) {
    						isOpen = false;
    						uiElem.children().eq(0)
    							.css('height', oh*multiline+'px')
    							.children().removeClass('hide');
    					}else {
    						isOpen = true;
    						uiElem.children().eq(0)
    							.css('height', 'auto')
    							.children().addClass('hide');
    					}
    				}
    			}
    		}
    	}
    }

})();