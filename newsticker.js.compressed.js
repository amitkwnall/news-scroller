var NewsTicker=new Class({options:{},mytimer:null,initialize:function(d,b){this.setOptions(b);this.el=$(d);if(!this.options.no_mouse_pause){this.el.addEvent("mouseenter",function(){this.pause()}.bind(this));this.el.addEvent("mouseleave",function(){this.resume()}.bind(this))}this.items=this.el.getElements("li");var a=0,c=0;if(this.options.direction.toLowerCase()=="horizontal"){c=this.el.getSize().y;this.items.each(function(e,f){a+=e.getSize().x})}else{a=this.el.getSize().x;this.items.each(function(e,f){c+=e.getSize().y})}this.el.setStyles({position:"absolute",top:0,left:0,width:a,height:c});this.fx=new Fx.Morph(this.el,{duration:this.options.speed,onComplete:function(){var e=(this.current==0)?this.items.length:this.current;this.items[e-1].inject(this.el,"bottom");this.el.setStyles({left:0,top:0})}.bind(this)});this.current=0;this.delay_then_next()},setOptions:function(a){this.options.speed=a.speed||500;this.options.delay=a.delay||5000;this.options.direction=a.direction||"vertical";this.options.no_mouse_pause=a.no_mouse_pause;if(a!=null&&a.delay<150){this.options.delay=150}},next:function(){this.current++;if(this.current>=this.items.length){this.current=0}var a=this.items[this.current];this.fx.start({top:-a.offsetTop,left:-a.offsetLeft});this.delay_then_next()},delay_then_next:function(){this.mytimer=this.next.bind(this).delay(this.options.delay+this.options.speed)},pause:function(){$clear(this.mytimer);this.mytimer=null},resume:function(){if(this.mytimer==null){this.next()}}});