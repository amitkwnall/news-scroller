// Copyright (c) 2010 Larry Kluger
// Based on sw by Antonio Lupetti--
// http://woork.blogspot.com/2008/07/fantastic-news-ticker-newsvine-like.html 
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

var NewsTicker = new Class({
	 options: {}, // set by setOptions
	 mytimer: null, 
	 //
	 //  initialize
	 //
	 initialize: function(el,options){
	 	  this.setOptions(options);
	 	  this.el = $(el); // the ticker el (which changes) within the ticker container
	 	  if (!this.options.no_mouse_pause) {
	 	     this.el.addEvent('mouseenter', function(){this.pause();}.bind(this));
	 	     this.el.addEvent('mouseleave', function(){this.resume();}.bind(this));	 	     
	 	  };
	 	  this.items = this.el.getElements('li'); // array of the items to be scrolled
	 	  
	 	  var w = 0, // total width (visible and invisible) 
	 	      h = 0; // height width (visible and invisible)
	 	      
	 	  if(this.options.direction.toLowerCase()=='horizontal') {
	        h = this.el.getSize().y;
	 	  	 this.items.each(function(li,index) {w += li.getSize().x;});
	     } else {
	 	  	// vertical ticker
	 	  	w = this.el.getSize().x;
	 	  	this.items.each(function(li,index) {h += li.getSize().y;});
	 	  }
	 	  
	 	  // initialize place and size within container
	 	  this.el.setStyles({position: 'absolute', top: 0, left: 0, width: w,	height: h});
	 	  
	 	  // create fx object. Set options for the fx object's future use
	 	  this.fx = new Fx.Morph(this.el,
	 	    {duration:this.options.speed,
	 	     onComplete:function() {
	 	  	   // Each time an effect completes, do:
	 	  	   var i = (this.current==0) ? this.items.length : this.current;
	 	  	   this.items[i-1].inject(this.el, 'bottom'); // MOVES the prior item (which is now
	 	  	                                              // not visible) to the bottom of el
	 	  	   this.el.setStyles({left:0,	top:0});
	 	     }.bind(this)});
	 	  
	 	  this.current = 0; // initialize
	 	  
	 	  this.delay_then_next(); // start 'er up!
	 },
	 
	 //
	 // setOptions
	 //
	 setOptions: function(options) {
	    // set options, manage defaults and enforce requirements
	 	           this.options.speed = options.speed || 500;
	 	           this.options.delay = options.delay || 5000;
	 	       this.options.direction = options.direction || 'vertical';
	 	  this.options.no_mouse_pause = options.no_mouse_pause; // undefined will be false, which is the default
	 	  // requirements
	 	  if (options != null && options.delay < 150) {this.options.delay = 150;}  
	 },
	 
	 //
	 // next
	 //
	 next: function() {
	    // scroll to next item
	 	  this.current++;
	 	  if (this.current >= this.items.length) this.current = 0;
	 	  
	 	  var pos = this.items[this.current];
	 	  this.fx.start({         // moves the el -- scrolls it from 0 to new position (up or left)
	 	  	 top: -pos.offsetTop,
	 	  	 left: -pos.offsetLeft
	 	  });
	 	  
	 	  this.delay_then_next();
	 },
	 
	 //
	 // delay_then_next
	 //
	 delay_then_next: function() {
	 	  // call next after waiting for effect to finish and delay time 
	 	  this.mytimer = this.next.bind(this).delay(this.options.delay + this.options.speed);
	 },	 
	 
	 //
	 // pause 
	 //
	 pause: function() {
	    $clear(this.mytimer); // stop timer
	    this.mytimer = null;
	 },

	 //
	 // resume
	 //
	 resume: function() {
	    // call next if not running
	    if (this.mytimer == null) {this.next();}
	 }
});
