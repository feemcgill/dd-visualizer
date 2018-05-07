'use strict';

var ddTracks = [{
  'url': 'White-Fence_To-the-Boy-I-Jumped-in-the-Hemlock-Alley.mp3',
  'text': 'To the Boy I Jumped in the Hemlock Alley by White Fence'
}, {
  'url': 'Tame-Impala_Yes-Im-Changing.mp3',
  'text': 'Yes I\'m Changing by Tame Impala'

}, {
  'url': 'Mercury-Rev_Opus-40.mp3',
  'text': 'Opus 40 by Mercury Rev'

}];

var testTracks = [{
  'url': '1.mp3'
}, {
  'url': '2.mp3'
}, {
  'url': '3.mp3'
}];

var dbg = null;
$(document).ready(function () {
  dbg = $('.debug');
  dbg.text('ios8');
});

var tracks = testTracks;

var trackIndex = 0;
var audioKicking = false;
var autioInitiated = false;
var playCount = 0;

var audioContext = null,
    usingWebAudio = true;

//const audioContext = new AudioContext();


var analyser = null;
var bufferLength = null;
var dataArray = null;

var viZdata = void 0;

var trackBuffer = void 0;
var trackSource = void 0;

function nextTrack() {
  audioKicking = false;
  trackIndex = (trackIndex + 1) % tracks.length;
  var audioSrc = './audio/' + tracks[trackIndex].url;

  // window.fetch(audioSrc)
  //   .then(response => {
  //     //response.arrayBuffer();
  //     console.log(response);
  //     dbg.text(response.status);
  //     return response.arrayBuffer();
  //   })
  //   .then(arrayBuffer => {
  //     const audioData = audioContext.decodeAudioData(arrayBuffer);
  //     console.log(audioData);
  //     dbg.append('<div>decode audio data!!</div>');
  //     return audioData;
  //   })
  //   .catch((exception) => {
  //     console.error('oh noes!', exception)
  //     dbg.append('<div>EXCEPTION</div>');
  //     dbg.append(exception);
  //   })
  //   .then(audioBuffer => {
  //     trackBuffer = audioBuffer;
  //     setTimeout(() => {
  //       tickerText.text =  'NOW PLAYING: ' + tracks[trackIndex].text;
  //       nowPLayingTicker();
  //     }, 3500);
  //     dbg.append('<div>got the track should play</div>');
  //     play(trackBuffer);
  //   });


  window.fetch(audioSrc).then(function (response) {
    return response.arrayBuffer();
  }).then(function (arrayBuffer) {
    return audioContext.decodeAudioData(arrayBuffer, function (audioBuffer) {
      trackBuffer = audioBuffer;
    }, function (error) {
      return console.error(error);
    });
  });
  setTimeout(function () {
    dbg.append('<div>got the track should play</div>');
    play(trackBuffer);
  }, 1000);
}

function play(audioBuffer) {
  if (autioInitiated) {
    trackSource.buffer = null;
  }
  trackSource = audioContext.createBufferSource();
  trackSource.buffer = audioBuffer;
  //trackSource.connect(audioContext.destination);
  trackSource.connect(analyser);

  trackSource.onended = function (event) {
    nextTrack();
  };
  trackSource.start();
  dbg.append('should start now');
  audioKicking = true;
  autioInitiated = true;
  if (playCount > 0) {
    swapTextures();
  } else {
    snakeIntro();
  }
  playCount++;
}

function initAudio() {
  console.log('init audio');
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

  // context state at this time is `undefined` in iOS8 Safari
  if (usingWebAudio && audioContext.state === 'suspended') {
    var resume = function resume() {
      audioContext.resume();

      setTimeout(function () {
        if (audioContext.state === 'running') {
          document.body.removeEventListener('touchend', resume, false);
        }
      }, 0);
    };

    document.body.addEventListener('touchend', resume, false);
  }

  nextTrack();
}

'';

var muted = false;
$('.play-it').click(function () {
  initAudio();
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

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
// function mapRange (value, a, b, c, d) {
//     value = (value - a) / (b - a);
//     return c + value * (d - c);
// }

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

function nowPLayingTicker() {
    TweenMax.to(tickerText, 30, { x: -2000, ease: Linear.easeNone, onComplete: function onComplete() {
            tickerText.x = app.renderer.width;
            nowPLayingTicker();
        } });
}

function snakeIntro() {
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

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);

// load the texture we need
PIXI.loader.add('fun', 'img/logo.png').load(function (loader, resources) {

    //vidTex = new PIXI.Texture.fromVideo('vid/vid1-w.mp4');
    vidTex = new PIXI.Texture.fromImage('img/rg.jpg');
    vidTex.baseTexture.source.loop = true;
    vidTex.baseTexture.source.muted = true;

    //vidTex2 = new PIXI.Texture.fromVideo('vid/froth-2.mp4');
    vidTex2 = new PIXI.Texture.fromImage('img/rg.jpg');
    vidTex2.baseTexture.source.loop = true;
    vidTex2.baseTexture.source.muted = true;

    var bigRect = new PIXI.Graphics();
    bigRect.beginFill(0xffffff, 1);
    bigRect.drawRect(0, 0, window.innerWidth, window.innerHeight);
    bigRect.endFill();
    bigRect.aplha = .4;
    bigRect.interactive = true;
    app.stage.addChild(bigRect);

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

        var logoX = mapRange(e.data.global.x, 0, app.renderer.width, wwH + logoOffset, wwH - logoOffset);
        var logoY = mapRange(e.data.global.y, 0, app.renderer.height, whH + logoOffset, whH - logoOffset);
        TweenMax.to(logo, 2, { x: logoX, y: logoY });
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

    var logo = new PIXI.Sprite(resources.fun.texture);
    logo.x = app.renderer.width / 2;
    logo.y = app.renderer.height / 2;
    logo.scale.x = 0;
    logo.scale.y = 0;
    logo.anchor.x = 0.5;
    logo.anchor.y = 0.5;
    app.stage.addChild(logo);

    tickerText = new PIXI.Text('', { fontFamily: 'SerifGothicStd-Bold', fontSize: 36, fill: 0x666666, align: 'left' });
    app.stage.addChild(tickerText);
    tickerText.x = app.renderer.width / 2;
    tickerText.y = app.renderer.height - 50;
    tickerText.blendMode = PIXI.BLEND_MODES.ADD;
    tickerText.x = app.renderer.width;

    app.stage.addChild(videoSprite);

    videoSprite.mask = logo;

    var analJamCont = new PIXI.Sprite();
    app.stage.addChild(analJamCont);
    // analJamCont.anchor.x = 0.5;
    // analJamCont.anchor.y = 0.5;
    analJamCont.x = 100;
    analJamCont.y = 100;
    var analShapes = [];
    for (var _i = 0; _i < 4; _i++) {
        for (var j = 0; j < 4; j++) {
            var _fun = new PIXI.Sprite();
            _fun.width = 40;
            _fun.height = 40;
            var _funmask = new PIXI.Graphics();
            _funmask.beginFill(0xffffff);
            _funmask.drawCircle(0, 0, 1);
            _funmask.endFill();
            // Setup the position of the fun
            _fun.x = 100 * _i;
            _fun.y = 100 * j;
            _fun.x = ww * _i / 4;
            _fun.y = wh * j / 4;
            _fun.alpha = 0.7;
            analShapes.push(_fun);
            _fun.addChild(_funmask);
            //fun.mask = funmask;
            //analJamCont.addChild(fun);            
        }
    }

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
            for (var _i2 = 0; _i2 < analShapes.length; _i2++) {
                var e = analShapes[_i2];
                e.scale.x = dataArray[_i2];
                e.scale.y = dataArray[_i2];
            }
        }
    });
});
// var canvas = document.createElement('canvas');
// var texture = PIXI.Texture.fromCanvas(canvas);
// var spriteMask = new PIXI.Texture(texture);
// mySprite.mask = spriteMask;