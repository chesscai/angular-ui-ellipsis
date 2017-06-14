## angular文字显示控件
github: [angular-ui-ellipsis](https://github.com/chesscai/angular-ui-ellipsis)

### options

```html
	<div ellipsis
		ellipsis-hover="true" or ellipsis-click="true"
		ellipsis-multiline="3">some text...</div>
```

### use

```html
<!DOCTYPE html>
<html>
<head>
<title>angular-ui-ellipsis</title>
<meta charset="UTF-8">
<link rel="stylesheet" href="../dist/angular-ui-ellipsis.min.css">
</head>
<body ng-app="myApp">
	<div ng-controller="MyCtrl as vm">
		<div ellipsis>{{vm.text}}</div>
		...
	</div>
	<script src="../bower_components/angular/angular.js"></script>
	<script src="../dist/angular-ui-ellipsis.min.js"></script>
	<script>
		(function() {
		    'use strict';

		    angular
		        .module('myApp', ['angular-ui-ellipsis'])
		        .controller('MyCtrl', myCtrl);

		    function myCtrl() {
		        var vm = this;
		        vm.text = 'some text...';
		    }

		})();
	</script>
</body>
</html>
```

### example

```shell
> bower install

> npm install

> gulp serve

```