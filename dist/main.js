/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/audio/index.js":
/*!****************************!*\
  !*** ./src/audio/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.dataArray = exports.analyser = undefined;\n\nvar _playlist = __webpack_require__(/*! ./playlist */ \"./src/audio/playlist.js\");\n\nvar _playlist2 = _interopRequireDefault(_playlist);\n\nvar _shuffleArray = __webpack_require__(/*! ./../util/shuffleArray */ \"./src/util/shuffleArray.js\");\n\nvar _shuffleArray2 = _interopRequireDefault(_shuffleArray);\n\nvar _visual = __webpack_require__(/*! ./../visual */ \"./src/visual/index.js\");\n\nvar _state = __webpack_require__(/*! ./../state.js */ \"./src/state.js\");\n\nvar _state2 = _interopRequireDefault(_state);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar debug = false;\n\n$(document).ready(function () {\n  dbg = $('.debug');\n  dbg.text('debugg');\n  if (debug) {\n    dbg.show();\n  }\n});\n\nvar dbg = null;\n\nvar tracks = (0, _shuffleArray2.default)(_playlist2.default);\n\nvar trackIndex = 0;\nvar autioInitiated = false;\nvar playCount = 0;\nvar audioContext = null;\nvar usingWebAudio = true;\nvar analyser = null;\nvar bufferLength = null;\nvar dataArray = null;\nvar viZdata = void 0;\nvar trackBuffer = void 0;\nvar trackSource = void 0;\n\nfunction nextTrack() {\n  var audioSrc = '//s3-us-west-2.amazonaws.com/ddaze-visualizer/dd18mix/' + tracks[trackIndex].url;\n\n  window.fetch(audioSrc).then(function (response) {\n    return response.arrayBuffer();\n  }).then(function (arrayBuffer) {\n    return audioContext.decodeAudioData(arrayBuffer, function (audioBuffer) {\n      trackBuffer = audioBuffer;\n    }, function (error) {\n      return console.error(error);\n    });\n  }).catch(function (exception) {\n    console.error('oh noes!', exception);\n    dbg.append('<div>EXCEPTION</div>');\n    dbg.append(exception);\n  }).then(function () {\n    if (!_state2.default.audioKicking) {\n      _state2.default.audioKicking = true;\n      $('.loading').hide();\n      $('.play-it').show();\n    };\n    dbg.append('<div>Next Track Loaded</div>');\n    trackIndex = (trackIndex + 1) % tracks.length;\n  });\n}\n\n// function updateTicker(text){\n//   tickerText.text =  'NOW PLAYING: ' + text;  \n// }\n\nvar playingIndex = 0;\nfunction play(audioBuffer) {\n  if (autioInitiated) {\n    trackSource.buffer = null;\n  }\n  trackSource = audioContext.createBufferSource();\n  trackSource.buffer = audioBuffer;\n  trackSource.connect(analyser);\n  trackSource.onended = function (event) {\n    // Play the next track once this one has ended.. Assumes trackBuffer has been updated to the next track via nextTrack();\n    // TODO: test to see if the next track is indeed ready to play.\n    play(trackBuffer);\n  };\n  trackSource.start();\n  dbg.append('<div>Playing New Track</div>');\n  autioInitiated = true;\n\n  // Visual stuff\n  if (playCount > 0) {\n    (0, _visual.swapTextures)();\n  } else {\n    (0, _visual.snakeIntro)();\n  }\n  //updateTicker(tracks[playingIndex].text);\n\n  playingIndex = (playingIndex + 1) % tracks.length;\n  playCount++;\n  nextTrack();\n}\n\nfunction initAudio(callback) {\n  try {\n    if (typeof AudioContext !== 'undefined') {\n      audioContext = new AudioContext();\n    } else if (typeof webkitAudioContext !== 'undefined') {\n      audioContext = new webkitAudioContext();\n    } else {\n      usingWebAudio = false;\n    }\n  } catch (e) {\n    usingWebAudio = false;\n  }\n  exports.analyser = analyser = audioContext.createAnalyser();\n  analyser.connect(audioContext.destination);\n  analyser.fftSize = 32;\n  bufferLength = analyser.frequencyBinCount;\n  exports.dataArray = dataArray = new Uint8Array(bufferLength);\n  callback();\n}\n\ninitAudio(nextTrack);\n\nvar muted = false;\n$('.play-it').click(function (e) {\n  if (usingWebAudio && audioContext.state === 'suspended') {\n    audioContext.resume();\n  }\n  e.preventDefault();\n  play(trackBuffer);\n  if (!debug) {\n    dbg.append(usingWebAudio, audioContext.state);\n    $('.loading-screen').remove();\n  }\n});\n\n$('.mute-toggle').click(function () {\n  if (muted) {\n    trackSource.connect(analyser);\n    $(this).text('mute');\n  } else {\n    trackSource.disconnect();\n    $(this).text('unmute');\n  }\n  muted = !muted;\n});\n\nexports.analyser = analyser;\nexports.dataArray = dataArray;\n\n//# sourceURL=webpack:///./src/audio/index.js?");

/***/ }),

/***/ "./src/audio/playlist.js":
/*!*******************************!*\
  !*** ./src/audio/playlist.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar ddTracks = [{\n  'text': 'A Place To Bury Strangers - Never Coming Back',\n  'url': 'A+Place+To+Bury+Strangers+-+Never+Coming+Back.mp3'\n}, {\n  'text': 'All Them Witches - Alabaster',\n  'url': 'All+Them+Witches+-+Alabaster.mp3'\n}, {\n  'text': 'CHELSEA WOLFE - Offering',\n  'url': 'CHELSEA+WOLFE+-+Offering.mp3'\n}, {\n  'text': 'Can -  Little Star of Bethlehem',\n  'url': 'Can+-++Little+Star+of+Bethlehem.mp3'\n}, {\n  'text': 'Connan Mockasin - It_s Choade My Dear',\n  'url': 'Connan+Mockasin+-+It_s+Choade+My+Dear.mp3'\n}, {\n  'text': 'Cut Worms - Cash for Gold',\n  'url': 'Cut+Worms+-+Cash+for+Gold.mp3'\n}, {\n  'text': 'DakhaBrakha - Kolyskova',\n  'url': 'DakhaBrakha+-+Kolyskova.mp3'\n}, {\n  'text': 'Death Grips - Eh',\n  'url': 'Death+Grips+-+Eh.mp3'\n}, {\n  'text': 'Ex-Cult - New Face On',\n  'url': 'Ex-Cult+-+New+Face+On.mp3'\n}, {\n  'text': 'Gladys Lazer - SW Georgia',\n  'url': 'Gladys+Lazer+-+SW+Georgia.mp3'\n}, {\n  'text': 'Here Lies Man - I stand Alone',\n  'url': 'Here+Lies+Man+-+I+stand+Alone.mp3'\n}, {\n  'text': 'Kevin Morby - Tin Can',\n  'url': 'Kevin+Morby+-+Tin+Can.mp3'\n}, {\n  'text': 'Kikagaku Moyo - Green Sugar',\n  'url': 'Kikagaku+Moyo+-+Green+Sugar.mp3'\n}, {\n  'text': 'King Khan _ The Shrines - I Wanna Be a Girl',\n  'url': 'King+Khan+_+The+Shrines+-+I+Wanna+Be+a+Girl.mp3'\n}, {\n  'text': 'Mary Lattimore - Hello From the Edge of the Earth',\n  'url': 'Mary+Lattimore+-+Hello+From+the+Edge+of+the+Earth.mp3'\n}, {\n  'text': 'Mercury Rev - Opus 40',\n  'url': 'Mercury+Rev+-+Opus+40.mp3'\n}, {\n  'text': 'Pond - Paint Me Silver',\n  'url': 'Pond+-+Paint+Me+Silver.mp3'\n}, {\n  'text': 'Preoccupations - Zodiac',\n  'url': 'Preoccupations+-+Zodiac.mp3'\n}, {\n  'text': 'Sextile - Ripped',\n  'url': 'Sextile+-+Ripped.mp3'\n}, {\n  'text': 'Shannon _ The Clams - I Leave Again',\n  'url': 'Shannon+_+The+Clams+-+I+Leave+Again.mp3'\n}, {\n  'text': 'The Holydrug Couple - If I Could Find You (Eternity)',\n  'url': 'The+Holydrug+Couple+-+If+I+Could+Find+You+(Eternity).mp3'\n}, {\n  'text': 'Tropa Magica - LSD Roma',\n  'url': 'Tropa+Magica+-+LSD+Roma.mp3'\n}, {\n  'text': 'True Widow - Skull Eyes',\n  'url': 'True+Widow+-+Skull+Eyes.mp3'\n}, {\n  'text': 'Ty Segall -  Every 1_s a Winner',\n  'url': 'Ty+Segall+-++Every+1_s+a+Winner.mp3'\n}, {\n  'text': 'Ulrika Spacek - Ornament',\n  'url': 'Ulrika+Spacek+-+Ornament.mp3'\n}, {\n  'text': 'Warpaint - Above Control',\n  'url': 'Warpaint+-+Above+Control.mp3'\n}, {\n  'text': 'White Fence - To the Boy I Jumped in the Hemlock Alley',\n  'url': 'White+Fence+-+To+the+Boy+I+Jumped+in+the+Hemlock+Alley.mp3'\n}];\n\nexports.default = ddTracks;\n\n//# sourceURL=webpack:///./src/audio/playlist.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n__webpack_require__(/*! ./audio */ \"./src/audio/index.js\");\n\n__webpack_require__(/*! ./visual */ \"./src/visual/index.js\");\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar appState = {\n  audioKicking: null\n};\n\nexports.default = appState;\n\n//# sourceURL=webpack:///./src/state.js?");

/***/ }),

/***/ "./src/util/shuffleArray.js":
/*!**********************************!*\
  !*** ./src/util/shuffleArray.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar shuffleArray = function shuffleArray(array) {\n  var currentIndex = array.length,\n      temporaryValue,\n      randomIndex;\n  // While there remain elements to shuffle...\n  while (0 !== currentIndex) {\n\n    // Pick a remaining element...\n    randomIndex = Math.floor(Math.random() * currentIndex);\n    currentIndex -= 1;\n\n    // And swap it with the current element.\n    temporaryValue = array[currentIndex];\n    array[currentIndex] = array[randomIndex];\n    array[randomIndex] = temporaryValue;\n  }\n  return array;\n};\n\nexports.default = shuffleArray;\n\n//# sourceURL=webpack:///./src/util/shuffleArray.js?");

/***/ }),

/***/ "./src/visual/index.js":
/*!*****************************!*\
  !*** ./src/visual/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.swapTextures = exports.snakeIntro = undefined;\n\nvar _state = __webpack_require__(/*! ./../state.js */ \"./src/state.js\");\n\nvar _state2 = _interopRequireDefault(_state);\n\nvar _audio = __webpack_require__(/*! ./../audio */ \"./src/audio/index.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction mapRange(num, in_min, in_max, out_min, out_max) {\n    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;\n}\n\nvar count = 0;\nvar tickerText = '';\nvar snakeSegsReverse = void 0;\nvar snakesReady = false;\nvar videoSprite = void 0;\nvar snakeSegs = void 0;\nvar bgVidSprite = void 0;\nvar vidTex = void 0;\nvar vidTex2 = void 0;\nvar logo = void 0;\nvar bigRect = void 0;\n\nfunction nowPLayingTicker() {\n    TweenMax.to(tickerText, 30, { x: -2000, ease: Linear.easeNone, onComplete: function onComplete() {\n            tickerText.x = app.renderer.width;\n            nowPLayingTicker();\n        } });\n}\n\nvar snakeIntro = function snakeIntro() {\n    nowPLayingTicker();\n    TweenMax.to(logo, 5, { alpha: 1 });\n\n    var _loop = function _loop(i) {\n        TweenMax.to(snakeSegs[i], 10, { width: app.renderer.width * ((i + 1) / snakeSegs.length), height: app.renderer.height * ((i + 1) / snakeSegs.length), delay: i * 0.7,\n            onComplete: function onComplete() {\n                if (i + 1 == snakeSegs.length) {\n                    snakesReady = true;\n                }\n            }\n        });\n    };\n\n    for (var i = 0; i < snakeSegs.length; i++) {\n        _loop(i);\n    }\n};\n\nfunction snakeCenter() {\n    for (var i = 0; i < snakeSegs.length; i++) {\n        TweenMax.to(snakeSegs[i], .1, {\n            width: app.renderer.width * ((i + 1) / snakeSegs.length),\n            height: app.renderer.height * ((i + 1) / snakeSegs.length),\n            x: app.renderer.width / 2,\n            y: app.renderer.height / 2,\n            delay: i * 0.1\n        });\n    }\n}\n\nvar swapTextures = function swapTextures() {\n    videoSprite.setTexture(videoSprite.texture == vidTex ? vidTex2 : vidTex);\n\n    var _loop2 = function _loop2(i) {\n        setTimeout(function () {\n            snakeSegs[i].setTexture(snakeSegs[i].texture == vidTex ? vidTex2 : vidTex);\n            if (i + 1 == snakeSegs.length) {\n                setTimeout(function () {\n                    bgVidSprite.setTexture(bgVidSprite.texture == vidTex ? vidTex2 : vidTex);\n                }, 100);\n            }\n        }, 100 * i);\n    };\n\n    for (var i = 0; i < snakeSegs.length; i++) {\n        _loop2(i);\n    }\n};\n\nvar app = new PIXI.Application({\n    width: window.innerWidth,\n    height: window.innerHeight,\n    backgroundColor: 0xFFFFFF\n});\n\ndocument.body.appendChild(app.view);\n\nPIXI.loader.add('fun', 'img/logo.png').load(function (loader, resources) {\n\n    vidTex = new PIXI.Texture.fromVideo('vid/vid1-w.mp4');\n    //vidTex = new PIXI.Texture.fromImage('img/rg.jpg');    \n    vidTex.baseTexture.source.loop = true;\n    vidTex.baseTexture.source.muted = true;\n\n    vidTex2 = new PIXI.Texture.fromVideo('vid/froth-2.mp4');\n    //vidTex2 = new PIXI.Texture.fromImage('img/rg.jpg');\n    vidTex2.baseTexture.source.loop = true;\n    vidTex2.baseTexture.source.muted = true;\n\n    bigRect = new PIXI.Graphics();\n    bigRect.beginFill(0xffffff, 1);\n    bigRect.drawRect(0, 0, window.innerWidth, window.innerHeight);\n    bigRect.endFill();\n    bigRect.alpha = 0.0;\n    bigRect.interactive = true;\n\n    var ww = app.renderer.width;\n    var wh = app.renderer.height;\n    var wwH = ww / 2;\n    var whH = wh / 2;\n    var tunnelOffset = 170;\n    var logoOffset = 10;\n    bigRect.on('mousemove', function (event) {\n        var e = event;\n        //TweenMax.to(thing, 2, { x: e.data.global.x, y: e.data.global.y });\n        if (snakesReady) {\n            TweenMax.staggerTo(snakeSegsReverse, 10, { x: mapRange(e.data.global.x, 0, app.renderer.width, wwH - tunnelOffset, wwH + tunnelOffset), y: mapRange(e.data.global.y, 0, app.renderer.height, whH - tunnelOffset, whH + tunnelOffset) }, .15);\n        }\n\n        // const logoX = mapRange(e.data.global.x, 0, app.renderer.width, wwH+logoOffset, wwH-logoOffset);\n        // const logoY = mapRange(e.data.global.y, 0, app.renderer.height, whH+logoOffset, whH-logoOffset);\n        // TweenMax.to(logo, 2, {x:logoX, y:logoY});\n    });\n\n    bigRect.on('click', function (event) {\n        swapTextures();\n    });\n\n    bgVidSprite = new PIXI.Sprite(vidTex);\n    bgVidSprite.width = app.screen.width;\n    bgVidSprite.height = app.screen.height;\n    app.stage.addChild(bgVidSprite);\n\n    videoSprite = new PIXI.Sprite(vidTex2);\n    videoSprite.width = app.screen.width;\n    videoSprite.height = app.screen.height;\n\n    // var thing = new PIXI.Graphics();\n    // app.stage.addChild(thing);\n    // thing.position.x = app.screen.width / 2;\n    // thing.position.y = app.screen.height / 2;\n    // thing.lineStyle(0);    \n    // videoSprite.mask = thing;\n\n\n    var funCont = new PIXI.Sprite();\n    app.stage.addChild(funCont);\n\n    snakeSegs = [];\n    var snakeLength = 6;\n    for (var i = snakeLength; i > 0; i--) {\n        var fun = new PIXI.Sprite(vidTex);\n        var funmask = new PIXI.Graphics();\n        funmask.beginFill(0xFF3300);\n        funmask.drawCircle(0, 0, 100);\n        funmask.endFill();\n        // Setup the position of the fun\n        fun.x = app.renderer.width / 2;\n        fun.y = app.renderer.height / 2;\n        //  fun.x = i / snakeLength;\n        //  fun.y = i / snakeLength;\n        // Rotate around the center\n        fun.anchor.x = 0.5;\n        fun.anchor.y = 0.5;\n\n        fun.width = app.renderer.width;\n        fun.height = app.renderer.height;\n        fun.finalScale = 5 * (i / snakeLength);\n        fun.width = 0;\n        fun.height = 0;\n        // fun.scale.x = 0;\n        // fun.scale.y = 0;\n\n        fun.alpha = 0.9;\n        snakeSegs.push(fun);\n        //fun.addChild(funmask);\n        //fun.mask = funmask;\n        funCont.addChild(fun);\n    }\n\n    snakeSegsReverse = snakeSegs.reverse();\n\n    logo = new PIXI.Sprite(resources.fun.texture);\n    logo.x = app.renderer.width / 2;\n    logo.y = app.renderer.height / 2;\n    logo.scale.x = 0;\n    logo.scale.y = 0;\n    logo.anchor.x = 0.5;\n    logo.anchor.y = 0.5;\n    logo.alpha = 0;\n    app.stage.addChild(logo);\n\n    tickerText = new PIXI.Text('', { fontFamily: 'SerifGothicStd-Bold', fontSize: 36, fill: 0x666666, align: 'left' });\n    app.stage.addChild(tickerText);\n    tickerText.x = app.renderer.width / 2;\n    tickerText.y = app.renderer.height - 50;\n    tickerText.blendMode = PIXI.BLEND_MODES.ADD;\n    tickerText.x = app.renderer.width;\n\n    app.stage.addChild(videoSprite);\n\n    videoSprite.mask = logo;\n\n    // const analJamCont = new PIXI.Sprite();\n    // app.stage.addChild(analJamCont);\n    // // analJamCont.anchor.x = 0.5;\n    // // analJamCont.anchor.y = 0.5;\n    // analJamCont.x = 100;\n    // analJamCont.y = 100;\n    // const analShapes = [];\n    // for (let i = 0; i < 4; i++) {\n    //     for (let j = 0; j < 4; j++) {\n    //         const fun = new PIXI.Sprite();\n    //         fun.width = 40;\n    //         fun.height = 40;\n    //         const funmask = new PIXI.Graphics();\n    //         funmask.beginFill(0xffffff);\n    //         funmask.drawCircle(0,0,1);\n    //         funmask.endFill();\n    //         // Setup the position of the fun\n    //         fun.x = 100 * i;\n    //         fun.y = 100 * j;\n    //         fun.x = ww * i / 4;\n    //         fun.y = wh * j / 4;\n    //         fun.alpha = 0.7;        \n    //         analShapes.push(fun);\n    //         fun.addChild(funmask);\n    //         //fun.mask = funmask;\n    //         //analJamCont.addChild(fun);            \n\n    //     }        \n    // }\n\n\n    app.stage.addChild(bigRect);\n\n    app.ticker.add(function () {\n        count += 0.01;\n        // thing.clear();\n        // thing.beginFill(0x8bc5ff, 0.4);\n        //thing.drawCircle(0 + Math.cos(count)* 20, 0 + Math.sin(count)* 20, 440 + Math.sin(count)* 400);\n        //thing.drawCircle(200, 200, 200);\n\n\n        if (_state2.default.audioKicking) {\n            //thing.drawCircle(100, 100, dataArray[10]);\n\n            var r = mapRange(_audio.dataArray[10], 0, 255, 0.1, 0.3);\n\n            _audio.analyser.getByteFrequencyData(_audio.dataArray);\n            logo.scale.x = r;\n            logo.scale.y = r;\n            // for (let i = 0; i < analShapes.length; i++) {\n            //     const e = analShapes[i];\n            //     e.scale.x = dataArray[i];\n            //     e.scale.y = dataArray[i];                \n            // }\n        }\n    });\n});\n// var canvas = document.createElement('canvas');\n// var texture = PIXI.Texture.fromCanvas(canvas);\n// var spriteMask = new PIXI.Texture(texture);\n// mySprite.mask = spriteMask;\n\n\nfunction getWindowSize() {\n    var wWidth = window.innerWidth;\n    var wHeight = window.innerHeight;\n    var data = {\n        width: wWidth,\n        height: wHeight\n    };\n    return data;\n}\n\nfunction sizeIt() {\n    var size = getWindowSize();\n\n    var w = size.width;\n    var h = size.height;\n\n    app.renderer.view.style.width = w + \"px\";\n    app.renderer.view.style.height = h + \"px\";\n    app.renderer.resize(w, h);\n\n    // bigRect.width = w;\n    // bigRect.height = h;\n    bgVidSprite.width = w;\n    bgVidSprite.height = h;\n    videoSprite.width = w;\n    videoSprite.height = h;\n\n    logo.x = w / 2;\n    logo.y = h / 2;\n\n    tickerText.y = h - 50;\n\n    snakeCenter();\n    // gameContainer.x = ((renderer.width - cWidth)/2);\n    // gameContainer.y = (renderer.height - cHeight)/2;\n\n    // if (rewardOnScreen) {\t\t\n    // \tspiralContainer.x = (renderer.width/2);\n    // \tspiralContainer.y = (renderer.height/2);\n    // \tswampFrameSize();\n    // \tmirrorJamSize();\n    // \tcoverJamSize();\n    // }\n\n    // if (waterOnScreen) {\n    // \twaterSprite.height = renderer.height;\n    // \twaterSprite.width = renderer.width;\n    // \twaterSprite.x = renderer.width/2;\n    // \twaterSprite.y = renderer.height/2;\t\t\t\n    // }\t\n}\n\n//sizeIt();\n\n(function ($, sr) {\n\n    var debounce = function debounce(func, threshold, execAsap) {\n        var timeout;\n\n        return function debounced() {\n            var obj = this,\n                args = arguments;\n            function delayed() {\n                if (!execAsap) func.apply(obj, args);\n                timeout = null;\n            };\n\n            if (timeout) clearTimeout(timeout);else if (execAsap) func.apply(obj, args);\n\n            timeout = setTimeout(delayed, threshold || 50);\n        };\n    };\n    // smartresize \n    jQuery.fn[sr] = function (fn) {\n        return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);\n    };\n})(jQuery, 'smartresize');\n\njQuery(window).smartresize(function () {\n    sizeIt();\n});\n\nexports.snakeIntro = snakeIntro;\nexports.swapTextures = swapTextures;\n\n//# sourceURL=webpack:///./src/visual/index.js?");

/***/ })

/******/ });