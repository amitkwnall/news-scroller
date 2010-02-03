var Ticker = new Class({
	 setOptions: function(options) {
	 	  this.options = Object.extend({
	 	  	 speed: 2500,  // defaults
	 	  	 delay: 150, //5000,
	 	  	 direction: 'vertical',
	 	  	 onComplete: Class.empty,
	 	  	 onStart: Class.empty
	 	  }, options || {});
	 },
	 //
	 //  initialize
	 //
	 initialize: function(el,options){
	 	  this.setOptions(options);
	 	  this.el = $(el); // the ticker el (which changes) within the ticker container
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
	 	  
	 	  this.next(); // scroll to next item
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
	 	  
	 	  // call next again after waiting for effect to finish and delay time 
	 	  mytimer = this.next.bind(this).delay(this.options.delay + this.options.speed);
	 },

	 //
	 // pause 
	 //
	 pause: function() {
	    $clear(mytimer); // stop timer
	    mytimer = null;
	 },

	 //
	 // resume
	 //
	 resume: function() {
	    // call next if not running
	    if (mytimer == null) {this.next();}
	 }
});

var mytimer = null;

window.addEvent('domready', function() {
   var hor = new Ticker('TickerVertical', {
      speed : 10000, delay : 0, direction : 'vertical'});
      
      // was speed : 500, delay : 5000
      
    $('stop_scroll').addEvent('click', function() {
		$('play_scroll_cont').style.display='block';
		$('stop_scroll_cont').style.display='none';
		hor.pause();
	});
    $('play_scroll').addEvent('click', function() {
		$('stop_scroll_cont').style.display='block';
		$('play_scroll_cont').style.display='none';
		hor.resume();
	});
});