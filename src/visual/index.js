import appState from './../state.js';
import {analyser, dataArray} from './../audio/audioInit.js';
import mapRange from './../util/mapRange.js';
import randomInt from './../util/randomInt.js';



let count = 0;
let tickerText = null;
let snakeSegsReverse;
let snakesReady = false;
let videoSprite;
let snakeSegs;
let bgVidSprite;
let vidTex;
let vidTex2;
let logo;
let bigRect;
let mouseTimeout = null;
let mouseInterval = null;
let wwH;
let whH;
let tunnelOffset = 170;
let logoOffset = 10;

function autoAnimate(){
    const x = randomInt(0, app.screen.width);
    const y = randomInt(0, app.screen.height);
    if (snakesReady) {
        TweenMax.staggerTo(snakeSegsReverse, 10, { x: mapRange(x, 0, app.renderer.width, wwH-tunnelOffset, wwH+tunnelOffset), y: mapRange(y, 0, app.renderer.height, whH-tunnelOffset, whH+tunnelOffset) }, .15);  
    }
}

function setMouseInterval() {
    mouseInterval = setInterval(autoAnimate, 10000);        
}

function nowPLayingTicker(){
    TweenMax.to(tickerText, 30, {x: -2000, ease:Linear.easeNone, onComplete: function(){
        tickerText.x = app.renderer.width;
        nowPLayingTicker();
    }} )
}

const snakeIntro = function(){
    nowPLayingTicker();
    TweenMax.to(logo, 5, {alpha: 1});
    for (let i = 0; i < snakeSegs.length; i++) {
        TweenMax.to(snakeSegs[i], 10, {width: app.renderer.width * ((i + 1) / snakeSegs.length), height: app.renderer.height * ((i + 1) / snakeSegs.length), delay: i * 0.7, 
            onComplete: function(){
                if (i+1 == snakeSegs.length) {
                    snakesReady = true;
                    mouseTimeout = setTimeout(setMouseInterval, 2000);
                }
            }
        })
    }
}

function snakeCenter(){
    for (let i = 0; i < snakeSegs.length; i++) {
        TweenMax.to(snakeSegs[i], .1, {
            width: app.renderer.width * ((i + 1) / snakeSegs.length), 
            height: app.renderer.height * ((i + 1) / snakeSegs.length),
            x: app.renderer.width / 2,
            y: app.renderer.height / 2,
            delay: i * 0.1,
        })
    }
}


const swapTextures = function() {
    videoSprite.setTexture(videoSprite.texture == vidTex ? vidTex2 : vidTex);
    for (let i = 0; i < snakeSegs.length; i++) {
        setTimeout(() => {
            snakeSegs[i].setTexture(snakeSegs[i].texture == vidTex ? vidTex2 : vidTex);
            if (i+1 == snakeSegs.length) {
                setTimeout(() => {
                    bgVidSprite.setTexture(bgVidSprite.texture == vidTex ? vidTex2 : vidTex);
                }, 100);
            }
        }, 100 * i);
    }        
};

const updateTicker = function(text){
    tickerText.text =  'NOW PLAYING: ' + text;            
}

const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor : 0xFFFFFF
});

document.body.appendChild(app.view);

PIXI.loader.add('fun', 'img/logo.png').load((loader, resources) => {


    vidTex = new PIXI.Texture.fromVideo('vid/vid1-w.mp4');
    //vidTex = new PIXI.Texture.fromImage('img/rg.jpg');    
    vidTex.baseTexture.source.loop = true;
    vidTex.baseTexture.source.muted = true;

    vidTex2 = new PIXI.Texture.fromVideo('vid/froth-2.mp4');
    //vidTex2 = new PIXI.Texture.fromImage('img/rg.jpg');
    vidTex2.baseTexture.source.loop = true;
    vidTex2.baseTexture.source.muted = true;


    bigRect = new PIXI.Graphics();
    bigRect.beginFill(0xffffff, 1);
    bigRect.drawRect(0, 0, window.innerWidth, window.innerHeight);
    bigRect.endFill();
    bigRect.alpha = 0.0;
    bigRect.interactive = true;

    let ww = app.renderer.width;
    let wh = app.renderer.height;
    wwH = ww/2;
    whH = wh/2;



    bigRect.on('mousemove', function (event) {
        const e = event;
        if (snakesReady) {
            if (mouseTimeout) {
                clearInterval(mouseInterval);
                clearTimeout(mouseTimeout);           
            }            
            TweenMax.staggerTo(snakeSegsReverse, 10, { x: mapRange(e.data.global.x, 0, app.renderer.width, wwH-tunnelOffset, wwH+tunnelOffset), y: mapRange(e.data.global.y, 0, app.renderer.height, whH-tunnelOffset, whH+tunnelOffset) }, .15);            
            mouseTimeout = setTimeout(setMouseInterval, 1000);
        }
    });





    bigRect.on('click', function (event) {
        swapTextures()
    });

    bgVidSprite = new PIXI.Sprite(vidTex);
    bgVidSprite.width = app.screen.width;
    bgVidSprite.height = app.screen.height;
    app.stage.addChild(bgVidSprite);


    videoSprite = new PIXI.Sprite(vidTex2);
    videoSprite.width = app.screen.width;
    videoSprite.height = app.screen.height;

    // var thing = new PIXI.Graphics();
    // app.stage.addChild(thing);
    // thing.position.x = app.screen.width / 2;
    // thing.position.y = app.screen.height / 2;
    // thing.lineStyle(0);    
    // videoSprite.mask = thing;



    const funCont = new PIXI.Sprite();
    app.stage.addChild(funCont);
  
     snakeSegs = [];
     const snakeLength = 6;
     for (let i = snakeLength; i > 0; i--) {
         const fun = new PIXI.Sprite(vidTex);
         const funmask = new PIXI.Graphics();
         funmask.beginFill(0xFF3300);
         funmask.drawCircle(0,0,100);
         funmask.endFill();
         // Setup the position of the fun
         fun.x = app.renderer.width / 2;
         fun.y = app.renderer.height / 2;
        //  fun.x = i / snakeLength;
        //  fun.y = i / snakeLength;
         // Rotate around the center
         fun.anchor.x = 0.5;
         fun.anchor.y = 0.5;
 
         fun.width = app.renderer.width;
         fun.height = app.renderer.height;
         fun.finalScale = 5*(i / snakeLength);
        fun.width = 0
        fun.height = 0;
        // fun.scale.x = 0;
        // fun.scale.y = 0;

         fun.alpha = 0.9;        
         snakeSegs.push(fun);
         //fun.addChild(funmask);
         //fun.mask = funmask;
         funCont.addChild(fun);
     }

   
     snakeSegsReverse = snakeSegs.reverse();


    logo = new PIXI.Sprite(resources.fun.texture);
    logo.x = app.renderer.width / 2;
    logo.y = app.renderer.height / 2;
    logo.scale.x = 0;
    logo.scale.y = 0;
    logo.anchor.x = 0.5;
    logo.anchor.y = 0.5;
    logo.alpha = 0;
    app.stage.addChild(logo);


    tickerText = new PIXI.Text('',{fontFamily : 'SerifGothicStd-Bold', fontSize: 36, fill : 0x666666, align : 'left'});
    app.stage.addChild(tickerText);
    tickerText.x = app.renderer.width / 2;
    tickerText.y = app.renderer.height - 50;
    tickerText.blendMode = PIXI.BLEND_MODES.ADD;
    tickerText.x = app.renderer.width;
   
    app.stage.addChild(videoSprite);

    videoSprite.mask = logo;
    







    app.stage.addChild(bigRect);


    app.ticker.add(() => {
        count += 0.01;

        if (appState.audioKicking) {

            let r = mapRange(dataArray[10], 0, 255, 0.1, 0.3);

            analyser.getByteFrequencyData(dataArray);            
            logo.scale.x = r;
            logo.scale.y = r;

 
        }
    });
});



function getWindowSize(){
	const wWidth = window.innerWidth;
    const wHeight = window.innerHeight;
    const data = {
        width: wWidth,
        height: wHeight
    };
    return data;
}

function sizeIt() {
	const size = getWindowSize();
	
	const w = size.width;
	const h = size.height;

	app.renderer.view.style.width = w + "px";    
	app.renderer.view.style.height = h + "px";      
	app.renderer.resize(w,h);

    // bigRect.width = w;
    // bigRect.height = h;
    bgVidSprite.width = w;
    bgVidSprite.height = h;
    videoSprite.width = w;
    videoSprite.height = h;

    logo.x = w / 2;
    logo.y = h / 2;

    tickerText.y = h - 50;
    
    snakeCenter();
	// gameContainer.x = ((renderer.width - cWidth)/2);
	// gameContainer.y = (renderer.height - cHeight)/2;

	// if (rewardOnScreen) {		
	// 	spiralContainer.x = (renderer.width/2);
	// 	spiralContainer.y = (renderer.height/2);
	// 	swampFrameSize();
	// 	mirrorJamSize();
	// 	coverJamSize();
	// }

	// if (waterOnScreen) {
	// 	waterSprite.height = renderer.height;
	// 	waterSprite.width = renderer.width;
	// 	waterSprite.x = renderer.width/2;
	// 	waterSprite.y = renderer.height/2;			
	// }	
}

//sizeIt();

(function($,sr){

  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null; 
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 50); 
      };
  }
    // smartresize 
    jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');


jQuery(window).smartresize(function(){  
	sizeIt();
}); 


export {snakeIntro, swapTextures, updateTicker};