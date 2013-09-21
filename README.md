# Smoothscroll

## A jQuery plugin to enable custom scrollbars on every browser.

This plugin do not require you to change your html/dom. Period.

## Demo

Please click [here](http://warry.github.io/smoothscroll.js) to see it in action.

## Installation

Put the script in your page:

	<script src="jquery.smoothscroll.js"></script>
	<script type="text/javascript">
		$(function(){
			$(".scroll").smoothScroll();
		}());
	</script>

Then add some style:

	.smoothScroll {
		position: absolute;
		width: 5px;
		background: rgba(0,0,0,0);
		min-height: 15px;
		-webkit-transition: background 200ms linear;
		-moz-transition: background 200ms linear;
		transition: background 200ms linear;
	}
	.smoothScroll.show {
		background: rgba(0,0,0,.05);
	}
	.smoothScroll.move {
		background: rgba(0,0,0,.3);
	}
	.smoothScroll:hover {
		background: rgba(0,0,0,.7);
	}
	.smoothScroll.drag {
		background: rgba(0,0,0,1);
	}

## Todo:

- Horizontal scrollbars
- Configuration

### Tested:

- Chrome 29 Mac & Windows
- Firefox 24 Mac & Windows
- IE 10 Windows
- IE 9 Windows

### Licence

The MIT License (MIT)

Copyright (c) 2013 Maxime Dantec

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.