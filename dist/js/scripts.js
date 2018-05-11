'use strict';

function shuffle(array) {
  var currentIndex = array.length,
      temporaryValue,
      randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

var debug = false;

$(document).ready(function () {
  dbg = $('.debug');
  dbg.text('debugg');
  if (debug) {
    dbg.show();
  }
});

var ddTracks = [{
  'text': 'A Place To Bury Strangers - Never Coming Back',
  'url': 'A+Place+To+Bury+Strangers+-+Never+Coming+Back.mp3'
}, {
  'text': 'All Them Witches - Alabaster',
  'url': 'All+Them+Witches+-+Alabaster.mp3'
}, {
  'text': 'CHELSEA WOLFE - Offering',
  'url': 'CHELSEA+WOLFE+-+Offering.mp3'
}, {
  'text': 'Can -  Little Star of Bethlehem',
  'url': 'Can+-++Little+Star+of+Bethlehem.mp3'
}, {
  'text': 'Connan Mockasin - It_s Choade My Dear',
  'url': 'Connan+Mockasin+-+It_s+Choade+My+Dear.mp3'
}, {
  'text': 'Cut Worms - Cash for Gold',
  'url': 'Cut+Worms+-+Cash+for+Gold.mp3'
}, {
  'text': 'DakhaBrakha - Kolyskova',
  'url': 'DakhaBrakha+-+Kolyskova.mp3'
}, {
  'text': 'Death Grips - Eh',
  'url': 'Death+Grips+-+Eh.mp3'
}, {
  'text': 'Ex-Cult - New Face On',
  'url': 'Ex-Cult+-+New+Face+On.mp3'
}, {
  'text': 'Gladys Lazer - SW Georgia',
  'url': 'Gladys+Lazer+-+SW+Georgia.mp3'
}, {
  'text': 'Here Lies Man - I stand Alone',
  'url': 'Here+Lies+Man+-+I+stand+Alone.mp3'
}, {
  'text': 'Kevin Morby - Tin Can',
  'url': 'Kevin+Morby+-+Tin+Can.mp3'
}, {
  'text': 'Kikagaku Moyo - Green Sugar',
  'url': 'Kikagaku+Moyo+-+Green+Sugar.mp3'
}, {
  'text': 'King Khan _ The Shrines - I Wanna Be a Girl',
  'url': 'King+Khan+_+The+Shrines+-+I+Wanna+Be+a+Girl.mp3'
}, {
  'text': 'Mary Lattimore - Hello From the Edge of the Earth',
  'url': 'Mary+Lattimore+-+Hello+From+the+Edge+of+the+Earth.mp3'
}, {
  'text': 'Mercury Rev - Opus 40',
  'url': 'Mercury+Rev+-+Opus+40.mp3'
}, {
  'text': 'Pond - Paint Me Silver',
  'url': 'Pond+-+Paint+Me+Silver.mp3'
}, {
  'text': 'Preoccupations - Zodiac',
  'url': 'Preoccupations+-+Zodiac.mp3'
}, {
  'text': 'Sextile - Ripped',
  'url': 'Sextile+-+Ripped.mp3'
}, {
  'text': 'Shannon _ The Clams - I Leave Again',
  'url': 'Shannon+_+The+Clams+-+I+Leave+Again.mp3'
}, {
  'text': 'The Holydrug Couple - If I Could Find You (Eternity)',
  'url': 'The+Holydrug+Couple+-+If+I+Could+Find+You+(Eternity).mp3'
}, {
  'text': 'Tropa Magica - LSD Roma',
  'url': 'Tropa+Magica+-+LSD+Roma.mp3'
}, {
  'text': 'True Widow - Skull Eyes',
  'url': 'True+Widow+-+Skull+Eyes.mp3'
}, {
  'text': 'Ty Segall -  Every 1_s a Winner',
  'url': 'Ty+Segall+-++Every+1_s+a+Winner.mp3'
}, {
  'text': 'Ulrika Spacek - Ornament',
  'url': 'Ulrika+Spacek+-+Ornament.mp3'
}, {
  'text': 'Warpaint - Above Control',
  'url': 'Warpaint+-+Above+Control.mp3'
}, {
  'text': 'White Fence - To the Boy I Jumped in the Hemlock Alley',
  'url': 'White+Fence+-+To+the+Boy+I+Jumped+in+the+Hemlock+Alley.mp3'
}];

var testTracks = [{
  'url': '1.mp3'
}, {
  'url': '2.mp3'
}, {
  'url': '3.mp3'
}];

var dbg = null;

var tracks = shuffle(ddTracks);
var trackIndex = 0;
var audioKicking = false;
var autioInitiated = false;
var playCount = 0;
var audioContext = null;
var usingWebAudio = true;
var analyser = null;
var bufferLength = null;
var dataArray = null;
var viZdata = void 0;
var trackBuffer = void 0;
var trackSource = void 0;

function nextTrack() {
  audioKicking = false;
  var audioSrc = '//s3-us-west-2.amazonaws.com/ddaze-visualizer/dd18mix/' + tracks[trackIndex].url;

  window.fetch(audioSrc).then(function (response) {
    return response.arrayBuffer();
  }).then(function (arrayBuffer) {
    return audioContext.decodeAudioData(arrayBuffer, function (audioBuffer) {
      trackBuffer = audioBuffer;
    }, function (error) {
      return console.error(error);
    });
  }).catch(function (exception) {
    console.error('oh noes!', exception);
    dbg.append('<div>EXCEPTION</div>');
    dbg.append(exception);
  }).then(function () {
    if (!audioKicking) {
      audioKicking = true;
      $('.loading').hide();
      $('.play-it').show();
    };
    dbg.append('<div>Next Track Loaded</div>');
    trackIndex = (trackIndex + 1) % tracks.length;
  });
}

function updateTicker(text) {
  tickerText.text = 'NOW PLAYING: ' + text;
}

var playingIndex = 0;
function play(audioBuffer) {
  if (autioInitiated) {
    trackSource.buffer = null;
  }
  trackSource = audioContext.createBufferSource();
  trackSource.buffer = audioBuffer;
  trackSource.connect(analyser);
  trackSource.onended = function (event) {
    // Play the next track once this one has ended.. Assumes trackBuffer has been updated to the next track via nextTrack();
    // TODO: test to see if the next track is indeed ready to play.
    play(trackBuffer);
  };
  trackSource.start();
  dbg.append('<div>Playing New Track</div>');
  autioInitiated = true;

  // Visual stuff
  if (playCount > 0) {
    swapTextures();
  } else {
    snakeIntro();
  }
  updateTicker(tracks[playingIndex].text);

  playingIndex = (playingIndex + 1) % tracks.length;
  playCount++;
  nextTrack();
}

function initAudio(callback) {
  try {
    if (typeof AudioContext !== 'undefined') {
      audioContext = new AudioContext();
    } else if (typeof webkitAudioContext !== 'undefined') {
      audioContext = new webkitAudioContext();
    } else {
      usingWebAudio = false;
    }
  } catch (e) {
    usingWebAudio = false;
  }
  analyser = audioContext.createAnalyser();
  analyser.connect(audioContext.destination);
  analyser.fftSize = 32;
  bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);
  callback();
}

initAudio(nextTrack);

var muted = false;
$('.play-it').click(function (e) {
  if (usingWebAudio && audioContext.state === 'suspended') {
    audioContext.resume();
  }
  e.preventDefault();
  play(trackBuffer);
  if (!debug) {
    dbg.append(usingWebAudio, audioContext.state);
    $('.loading-screen').remove();
  }
});

$('.mute-toggle').click(function () {
  if (muted) {
    trackSource.connect(analyser);
    $(this).text('mute');
  } else {
    trackSource.disconnect();
    $(this).text('unmute');
  }
  muted = !muted;
});
"use strict";
'use strict';

function mapRange(num, in_min, in_max, out_min, out_max) {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

var count = 0;
var tickerText = '';
var snakeSegsReverse = void 0;
var snakesReady = false;
var videoSprite = void 0;
var snakeSegs = void 0;
var bgVidSprite = void 0;
var vidTex = void 0;
var vidTex2 = void 0;
var logo = void 0;
var bigRect = void 0;

function nowPLayingTicker() {
    TweenMax.to(tickerText, 30, { x: -2000, ease: Linear.easeNone, onComplete: function onComplete() {
            tickerText.x = app.renderer.width;
            nowPLayingTicker();
        } });
}

function snakeIntro() {
    nowPLayingTicker();
    TweenMax.to(logo, 5, { alpha: 1 });

    var _loop = function _loop(i) {
        TweenMax.to(snakeSegs[i], 10, { width: app.renderer.width * ((i + 1) / snakeSegs.length), height: app.renderer.height * ((i + 1) / snakeSegs.length), delay: i * 0.7,
            onComplete: function onComplete() {
                if (i + 1 == snakeSegs.length) {
                    snakesReady = true;
                }
            }
        });
    };

    for (var i = 0; i < snakeSegs.length; i++) {
        _loop(i);
    }
}

function snakeCenter() {
    for (var i = 0; i < snakeSegs.length; i++) {
        TweenMax.to(snakeSegs[i], .1, {
            width: app.renderer.width * ((i + 1) / snakeSegs.length),
            height: app.renderer.height * ((i + 1) / snakeSegs.length),
            x: app.renderer.width / 2,
            y: app.renderer.height / 2,
            delay: i * 0.1
        });
    }
}

function swapTextures() {
    videoSprite.setTexture(videoSprite.texture == vidTex ? vidTex2 : vidTex);

    var _loop2 = function _loop2(i) {
        setTimeout(function () {
            snakeSegs[i].setTexture(snakeSegs[i].texture == vidTex ? vidTex2 : vidTex);
            if (i + 1 == snakeSegs.length) {
                setTimeout(function () {
                    bgVidSprite.setTexture(bgVidSprite.texture == vidTex ? vidTex2 : vidTex);
                }, 100);
            }
        }, 100 * i);
    };

    for (var i = 0; i < snakeSegs.length; i++) {
        _loop2(i);
    }
};

var app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0xFFFFFF
});

document.body.appendChild(app.view);

PIXI.loader.add('fun', 'img/logo.png').load(function (loader, resources) {

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

    var ww = app.renderer.width;
    var wh = app.renderer.height;
    var wwH = ww / 2;
    var whH = wh / 2;
    var tunnelOffset = 170;
    var logoOffset = 10;
    bigRect.on('mousemove', function (event) {
        var e = event;
        //TweenMax.to(thing, 2, { x: e.data.global.x, y: e.data.global.y });
        if (snakesReady) {
            TweenMax.staggerTo(snakeSegsReverse, 10, { x: mapRange(e.data.global.x, 0, app.renderer.width, wwH - tunnelOffset, wwH + tunnelOffset), y: mapRange(e.data.global.y, 0, app.renderer.height, whH - tunnelOffset, whH + tunnelOffset) }, .15);
        }

        // const logoX = mapRange(e.data.global.x, 0, app.renderer.width, wwH+logoOffset, wwH-logoOffset);
        // const logoY = mapRange(e.data.global.y, 0, app.renderer.height, whH+logoOffset, whH-logoOffset);
        // TweenMax.to(logo, 2, {x:logoX, y:logoY});
    });

    bigRect.on('click', function (event) {
        swapTextures();
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


    var funCont = new PIXI.Sprite();
    app.stage.addChild(funCont);

    snakeSegs = [];
    var snakeLength = 6;
    for (var i = snakeLength; i > 0; i--) {
        var fun = new PIXI.Sprite(vidTex);
        var funmask = new PIXI.Graphics();
        funmask.beginFill(0xFF3300);
        funmask.drawCircle(0, 0, 100);
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
        fun.finalScale = 5 * (i / snakeLength);
        fun.width = 0;
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

    tickerText = new PIXI.Text('', { fontFamily: 'SerifGothicStd-Bold', fontSize: 36, fill: 0x666666, align: 'left' });
    app.stage.addChild(tickerText);
    tickerText.x = app.renderer.width / 2;
    tickerText.y = app.renderer.height - 50;
    tickerText.blendMode = PIXI.BLEND_MODES.ADD;
    tickerText.x = app.renderer.width;

    app.stage.addChild(videoSprite);

    videoSprite.mask = logo;

    // const analJamCont = new PIXI.Sprite();
    // app.stage.addChild(analJamCont);
    // // analJamCont.anchor.x = 0.5;
    // // analJamCont.anchor.y = 0.5;
    // analJamCont.x = 100;
    // analJamCont.y = 100;
    // const analShapes = [];
    // for (let i = 0; i < 4; i++) {
    //     for (let j = 0; j < 4; j++) {
    //         const fun = new PIXI.Sprite();
    //         fun.width = 40;
    //         fun.height = 40;
    //         const funmask = new PIXI.Graphics();
    //         funmask.beginFill(0xffffff);
    //         funmask.drawCircle(0,0,1);
    //         funmask.endFill();
    //         // Setup the position of the fun
    //         fun.x = 100 * i;
    //         fun.y = 100 * j;
    //         fun.x = ww * i / 4;
    //         fun.y = wh * j / 4;
    //         fun.alpha = 0.7;        
    //         analShapes.push(fun);
    //         fun.addChild(funmask);
    //         //fun.mask = funmask;
    //         //analJamCont.addChild(fun);            

    //     }        
    // }


    app.stage.addChild(bigRect);

    app.ticker.add(function () {
        count += 0.01;
        // thing.clear();
        // thing.beginFill(0x8bc5ff, 0.4);
        //thing.drawCircle(0 + Math.cos(count)* 20, 0 + Math.sin(count)* 20, 440 + Math.sin(count)* 400);
        //thing.drawCircle(200, 200, 200);


        if (audioKicking) {
            //thing.drawCircle(100, 100, dataArray[10]);

            var r = mapRange(dataArray[10], 0, 255, 0.1, 0.3);

            analyser.getByteFrequencyData(dataArray);
            logo.scale.x = r;
            logo.scale.y = r;
            // for (let i = 0; i < analShapes.length; i++) {
            //     const e = analShapes[i];
            //     e.scale.x = dataArray[i];
            //     e.scale.y = dataArray[i];                
            // }
        }
    });
});
// var canvas = document.createElement('canvas');
// var texture = PIXI.Texture.fromCanvas(canvas);
// var spriteMask = new PIXI.Texture(texture);
// mySprite.mask = spriteMask;


function getWindowSize() {
    var wWidth = window.innerWidth;
    var wHeight = window.innerHeight;
    var data = {
        width: wWidth,
        height: wHeight
    };
    return data;
}

function sizeIt() {
    var size = getWindowSize();

    var w = size.width;
    var h = size.height;

    app.renderer.view.style.width = w + "px";
    app.renderer.view.style.height = h + "px";
    app.renderer.resize(w, h);

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

(function ($, sr) {

    var debounce = function debounce(func, threshold, execAsap) {
        var timeout;

        return function debounced() {
            var obj = this,
                args = arguments;
            function delayed() {
                if (!execAsap) func.apply(obj, args);
                timeout = null;
            };

            if (timeout) clearTimeout(timeout);else if (execAsap) func.apply(obj, args);

            timeout = setTimeout(delayed, threshold || 50);
        };
    };
    // smartresize 
    jQuery.fn[sr] = function (fn) {
        return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
    };
})(jQuery, 'smartresize');

jQuery(window).smartresize(function () {
    sizeIt();
});