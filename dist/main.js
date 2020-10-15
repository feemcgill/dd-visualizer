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

/***/ "./src/audio/audioInit.js":
/*!********************************!*\
  !*** ./src/audio/audioInit.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.dataArray = exports.analyser = exports.audioContext = exports.initAudio = undefined;\n\nvar _state = __webpack_require__(/*! ./../state.js */ \"./src/state.js\");\n\nvar _state2 = _interopRequireDefault(_state);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar audioContext = null;\nvar analyser = null;\nvar bufferLength = null;\nvar dataArray = null;\n\nvar initAudio = function initAudio(callback) {\n    try {\n        if (typeof AudioContext !== 'undefined') {\n            exports.audioContext = audioContext = new AudioContext();\n        } else if (typeof webkitAudioContext !== 'undefined') {\n            exports.audioContext = audioContext = new webkitAudioContext();\n        } else {\n            _state2.default.usingWebAudio = false;\n        }\n    } catch (e) {\n        _state2.default.usingWebAudio = false;\n    }\n    exports.analyser = analyser = audioContext.createAnalyser();\n    analyser.connect(audioContext.destination);\n    analyser.fftSize = 32;\n    bufferLength = analyser.frequencyBinCount;\n    exports.dataArray = dataArray = new Uint8Array(bufferLength);\n    callback();\n};\n\nexports.initAudio = initAudio;\nexports.audioContext = audioContext;\nexports.analyser = analyser;\nexports.dataArray = dataArray;\n\n//# sourceURL=webpack:///./src/audio/audioInit.js?");

/***/ }),

/***/ "./src/audio/index.js":
/*!****************************!*\
  !*** ./src/audio/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _audioInit = __webpack_require__(/*! ./audioInit */ \"./src/audio/audioInit.js\");\n\nvar _nextTrack = __webpack_require__(/*! ./nextTrack */ \"./src/audio/nextTrack.js\");\n\nvar _nextTrack2 = _interopRequireDefault(_nextTrack);\n\nvar _userControls = __webpack_require__(/*! ./userControls */ \"./src/audio/userControls.js\");\n\nvar _userControls2 = _interopRequireDefault(_userControls);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(0, _audioInit.initAudio)(_nextTrack2.default);\n(0, _userControls2.default)();\n\n//# sourceURL=webpack:///./src/audio/index.js?");

/***/ }),

/***/ "./src/audio/nextTrack.js":
/*!********************************!*\
  !*** ./src/audio/nextTrack.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _state = __webpack_require__(/*! ./../state.js */ \"./src/state.js\");\n\nvar _state2 = _interopRequireDefault(_state);\n\nvar _audioInit = __webpack_require__(/*! ./audioInit */ \"./src/audio/audioInit.js\");\n\nvar _playlist = __webpack_require__(/*! ./playlist */ \"./src/audio/playlist.js\");\n\nvar _playlist2 = _interopRequireDefault(_playlist);\n\nvar _debug = __webpack_require__(/*! ./../debug.js */ \"./src/debug.js\");\n\nvar _shuffleArray = __webpack_require__(/*! ./../util/shuffleArray */ \"./src/util/shuffleArray.js\");\n\nvar _shuffleArray2 = _interopRequireDefault(_shuffleArray);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar trackIndex = 0;\nvar tracks = (0, _shuffleArray2.default)(_playlist2.default);\n\nvar nextTrack = function nextTrack() {\n  var audioSrc = '//s3-us-west-2.amazonaws.com/ddaze-visualizer/dd18mix/' + tracks[trackIndex].url;\n\n  window.fetch(audioSrc).then(function (response) {\n    return response.arrayBuffer();\n  }).then(function (arrayBuffer) {\n    return _audioInit.audioContext.decodeAudioData(arrayBuffer, function (audioBuffer) {\n      tracks[trackIndex].buffer = audioBuffer;\n      _state2.default.nextTrack = tracks[trackIndex];\n    }, function (error) {\n      return console.error(error);\n    });\n  }).catch(function (exception) {\n    console.error('Fetch exception: ', exception);\n    _debug.dbg.append('<div>EXCEPTION</div>');\n    _debug.dbg.append(exception);\n  }).then(function () {\n    if (!_state2.default.audioKicking) {\n      _state2.default.audioKicking = true;\n      $('.loading').hide();\n      $('.play-it').show();\n    };\n    _debug.dbg.append('<div>Next Track Loaded</div>');\n    trackIndex = (trackIndex + 1) % tracks.length;\n  });\n};\n\nexports.default = nextTrack;\n\n//# sourceURL=webpack:///./src/audio/nextTrack.js?");

/***/ }),

/***/ "./src/audio/playTrack.js":
/*!********************************!*\
  !*** ./src/audio/playTrack.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.playTrack = exports.trackSource = undefined;\n\nvar _state = __webpack_require__(/*! ./../state.js */ \"./src/state.js\");\n\nvar _state2 = _interopRequireDefault(_state);\n\nvar _visual = __webpack_require__(/*! ./../visual */ \"./src/visual/index.js\");\n\nvar _audioInit = __webpack_require__(/*! ./audioInit */ \"./src/audio/audioInit.js\");\n\nvar _debug = __webpack_require__(/*! ./../debug.js */ \"./src/debug.js\");\n\nvar _nextTrack = __webpack_require__(/*! ./nextTrack */ \"./src/audio/nextTrack.js\");\n\nvar _nextTrack2 = _interopRequireDefault(_nextTrack);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar trackSource = void 0;\nvar playCount = 0;\n\nvar playTrack = function playTrack(track) {\n  if (_state2.default.audioInitiated) {\n    trackSource.buffer = null;\n    (0, _visual.swapTextures)();\n  } else {\n    (0, _visual.snakeIntro)();\n  }\n  exports.trackSource = trackSource = _audioInit.audioContext.createBufferSource();\n  trackSource.buffer = track.buffer;\n  trackSource.connect(_audioInit.analyser);\n  trackSource.onended = function (event) {\n    playTrack(_state2.default.nextTrack);\n  };\n\n  trackSource.start();\n  _debug.dbg.append('<div>Playing New Track</div>');\n  _state2.default.audioInitiated = true;\n\n  if (_state2.default.currentTrack != _state2.default.nextTrack) {\n    (0, _visual.updateTicker)(track.text);\n    playCount++;\n    (0, _nextTrack2.default)();\n  }\n\n  _state2.default.currentTrack = track;\n};\n\nexports.trackSource = trackSource;\nexports.playTrack = playTrack;\n\n//# sourceURL=webpack:///./src/audio/playTrack.js?");

/***/ }),

/***/ "./src/audio/playlist.js":
/*!*******************************!*\
  !*** ./src/audio/playlist.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar ddTracks = [{\n  'text': 'A Place To Bury Strangers - Never Coming Back',\n  'url': 'A+Place+To+Bury+Strangers+-+Never+Coming+Back.mp3'\n}, {\n  'text': 'All Them Witches - Alabaster',\n  'url': 'All+Them+Witches+-+Alabaster.mp3'\n}, {\n  'text': 'CHELSEA WOLFE - Offering',\n  'url': 'CHELSEA+WOLFE+-+Offering.mp3'\n}, {\n  'text': 'Can -  Little Star of Bethlehem',\n  'url': 'Can+-++Little+Star+of+Bethlehem.mp3'\n}, {\n  'text': 'Connan Mockasin - It_s Choade My Dear',\n  'url': 'Connan+Mockasin+-+It_s+Choade+My+Dear.mp3'\n}, {\n  'text': 'Cut Worms - Cash for Gold',\n  'url': 'Cut+Worms+-+Cash+for+Gold.mp3'\n}, {\n  'text': 'DakhaBrakha - Kolyskova',\n  'url': 'DakhaBrakha+-+Kolyskova.mp3'\n}, {\n  'text': 'Death Grips - Eh',\n  'url': 'Death+Grips+-+Eh.mp3'\n}, {\n  'text': 'Ex-Cult - New Face On',\n  'url': 'Ex-Cult+-+New+Face+On.mp3'\n}, {\n  'text': 'Gladys Lazer - SW Georgia',\n  'url': 'Gladys+Lazer+-+SW+Georgia.mp3'\n}, {\n  'text': 'Here Lies Man - I stand Alone',\n  'url': 'Here+Lies+Man+-+I+stand+Alone.mp3'\n}, {\n  'text': 'Kevin Morby - Tin Can',\n  'url': 'Kevin+Morby+-+Tin+Can.mp3'\n}, {\n  'text': 'Kikagaku Moyo - Green Sugar',\n  'url': 'Kikagaku+Moyo+-+Green+Sugar.mp3'\n}, {\n  'text': 'King Khan _ The Shrines - I Wanna Be a Girl',\n  'url': 'King+Khan+_+The+Shrines+-+I+Wanna+Be+a+Girl.mp3'\n}, {\n  'text': 'Mary Lattimore - Hello From the Edge of the Earth',\n  'url': 'Mary+Lattimore+-+Hello+From+the+Edge+of+the+Earth.mp3'\n}, {\n  'text': 'Mercury Rev - Opus 40',\n  'url': 'Mercury+Rev+-+Opus+40.mp3'\n}, {\n  'text': 'Pond - Paint Me Silver',\n  'url': 'Pond+-+Paint+Me+Silver.mp3'\n}, {\n  'text': 'Preoccupations - Zodiac',\n  'url': 'Preoccupations+-+Zodiac.mp3'\n}, {\n  'text': 'Sextile - Ripped',\n  'url': 'Sextile+-+Ripped.mp3'\n}, {\n  'text': 'Shannon _ The Clams - I Leave Again',\n  'url': 'Shannon+_+The+Clams+-+I+Leave+Again.mp3'\n}, {\n  'text': 'The Holydrug Couple - If I Could Find You (Eternity)',\n  'url': 'The+Holydrug+Couple+-+If+I+Could+Find+You+(Eternity).mp3'\n}, {\n  'text': 'Tropa Magica - LSD Roma',\n  'url': 'Tropa+Magica+-+LSD+Roma.mp3'\n}, {\n  'text': 'True Widow - Skull Eyes',\n  'url': 'True+Widow+-+Skull+Eyes.mp3'\n}, {\n  'text': 'Ty Segall -  Every 1_s a Winner',\n  'url': 'Ty+Segall+-++Every+1_s+a+Winner.mp3'\n}, {\n  'text': 'Ulrika Spacek - Ornament',\n  'url': 'Ulrika+Spacek+-+Ornament.mp3'\n}, {\n  'text': 'Warpaint - Above Control',\n  'url': 'Warpaint+-+Above+Control.mp3'\n}, {\n  'text': 'White Fence - To the Boy I Jumped in the Hemlock Alley',\n  'url': 'White+Fence+-+To+the+Boy+I+Jumped+in+the+Hemlock+Alley.mp3'\n},\n/* STEREOLAB STUFF */\n{\n  'text': 'Stereolab - Brakhage',\n  'url': 'sl/Dots+and+Loops/01.+Brakhage.mp3'\n}, {\n  'text': 'Stereolab - Miss Modular',\n  'url': 'sl/Dots+and+Loops/02.+Miss+Modular.mp3'\n}, {\n  'text': 'Stereolab - The Flower Called Nowhere',\n  'url': 'sl/Dots+and+Loops/03.+The+Flower+Called+Nowhere.mp3'\n}, {\n  'text': 'Stereolab - Diagonals',\n  'url': 'sl/Dots+and+Loops/04.+Diagonals.mp3'\n}, {\n  'text': 'Stereolab - Prisoner of Mars',\n  'url': 'sl/Dots+and+Loops/05.+Prisoner+of+Mars.mp3'\n}, {\n  'text': 'Stereolab - Rainbo Conversation',\n  'url': 'sl/Dots+and+Loops/06.+Rainbo+Conversation.mp3'\n}, {\n  'text': 'Stereolab - Refractions in the Plastic Pulse',\n  'url': 'sl/Dots+and+Loops/07.+Refractions+in+the+Plastic+Pulse.mp3'\n}, {\n  'text': 'Stereolab - Parsec',\n  'url': 'sl/Dots+and+Loops/08.+Parsec.mp3'\n}, {\n  'text': 'Stereolab - Ticker-Tape of the Unconscious',\n  'url': 'sl/Dots+and+Loops/09.+Ticker-Tape+of+the+Unconscious.mp3'\n}, {\n  'text': 'Stereolab - Contronatura',\n  'url': 'sl/Dots+and+Loops/10.+Contronatura.mp3'\n}, {\n  'text': 'Stereolab - Metronomic Underground',\n  'url': 'sl/Emperor+Tomato+Ketchup/01.+Metronomic+Underground.mp3'\n}, {\n  'text': 'Stereolab - Cybele_s Reverie',\n  'url': 'sl/Emperor+Tomato+Ketchup/02.+Cybele_s+Reverie.mp3'\n}, {\n  'text': 'Stereolab - Percolator',\n  'url': 'sl/Emperor+Tomato+Ketchup/03.+Percolator.mp3'\n}, {\n  'text': 'Stereolab - Les Yper-Sound',\n  'url': 'sl/Emperor+Tomato+Ketchup/04.+Les+Yper-Sound.mp3'\n}, {\n  'text': 'Stereolab - Spark Plug',\n  'url': 'sl/Emperor+Tomato+Ketchup/05.+Spark+Plug.mp3'\n}, {\n  'text': 'Stereolab - Olv 26',\n  'url': 'sl/Emperor+Tomato+Ketchup/06.+Olv+26.mp3'\n}, {\n  'text': 'Stereolab - The Noise Of Carpet',\n  'url': 'sl/Emperor+Tomato+Ketchup/07.+The+Noise+Of+Carpet.mp3'\n}, {\n  'text': 'Stereolab - Tomorrow Is Already Here',\n  'url': 'sl/Emperor+Tomato+Ketchup/08.+Tomorrow+Is+Already+Here.mp3'\n}, {\n  'text': 'Stereolab - Emperor Tomato Ketchup',\n  'url': 'sl/Emperor+Tomato+Ketchup/09.+Emperor+Tomato+Ketchup.mp3'\n}, {\n  'text': 'Stereolab - Monstre Sacre',\n  'url': 'sl/Emperor+Tomato+Ketchup/10.+Monstre+Sacre.mp3'\n}, {\n  'text': 'Stereolab - Motoroller Scalatron',\n  'url': 'sl/Emperor+Tomato+Ketchup/11.+Motoroller+Scalatron.mp3'\n}, {\n  'text': 'Stereolab - Slow Fast Hazel',\n  'url': 'sl/Emperor+Tomato+Ketchup/12.+Slow+Fast+Hazel.mp3'\n}, {\n  'text': 'Stereolab - Anonymous Collective',\n  'url': 'sl/Emperor+Tomato+Ketchup/13.+Anonymous+Collective.mp3'\n}];\n\nexports.default = ddTracks;\n\n//# sourceURL=webpack:///./src/audio/playlist.js?");

/***/ }),

/***/ "./src/audio/userControls.js":
/*!***********************************!*\
  !*** ./src/audio/userControls.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function () {\n  var muted = false;\n  $('.play-it').click(function (e) {\n    if (_state2.default.usingWebAudio && _audioInit.audioContext.state === 'suspended') {\n      _audioInit.audioContext.resume();\n    }\n    e.preventDefault();\n    (0, _playTrack.playTrack)(_state2.default.nextTrack);\n    TweenMax.to($('.credits'), 1, { opacity: 0, delay: 5, onComplete: function onComplete() {\n        $('.credits').remove();\n      } });\n    if (!_debug.debug) {\n      $('.loading-screen').remove();\n    }\n  });\n\n  $('.mute-toggle').click(function () {\n    if (muted) {\n      _playTrack.trackSource.connect(_audioInit.analyser);\n      $(this).text('mute');\n    } else {\n      _playTrack.trackSource.disconnect();\n      $(this).text('unmute');\n    }\n    muted = !muted;\n  });\n};\n\nvar _state = __webpack_require__(/*! ./../state.js */ \"./src/state.js\");\n\nvar _state2 = _interopRequireDefault(_state);\n\nvar _audioInit = __webpack_require__(/*! ./audioInit */ \"./src/audio/audioInit.js\");\n\nvar _playTrack = __webpack_require__(/*! ./playTrack.js */ \"./src/audio/playTrack.js\");\n\nvar _debug = __webpack_require__(/*! ./../debug.js */ \"./src/debug.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n//# sourceURL=webpack:///./src/audio/userControls.js?");

/***/ }),

/***/ "./src/debug.js":
/*!**********************!*\
  !*** ./src/debug.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar debug = false;\nvar dbg = $('.debug');\ndbg.text('debugger');\nif (debug) {\n  dbg.show();\n}\nexports.dbg = dbg;\nexports.debug = debug;\n\n//# sourceURL=webpack:///./src/debug.js?");

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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar appState = {\n  audioInitiated: null,\n  audioKicking: null,\n  tickerText: null,\n  currentTrack: null,\n  nextTrack: null,\n  usingWebAudio: null\n};\n\nexports.default = appState;\n\n//# sourceURL=webpack:///./src/state.js?");

/***/ }),

/***/ "./src/util/mapRange.js":
/*!******************************!*\
  !*** ./src/util/mapRange.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function (num, in_min, in_max, out_min, out_max) {\n  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;\n};\n\n//# sourceURL=webpack:///./src/util/mapRange.js?");

/***/ }),

/***/ "./src/util/randomInt.js":
/*!*******************************!*\
  !*** ./src/util/randomInt.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function (min, max) {\n  return Math.floor(Math.random() * (max - min + 1)) + min;\n};\n\n//# sourceURL=webpack:///./src/util/randomInt.js?");

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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.updateTicker = exports.swapTextures = exports.snakeIntro = undefined;\n\nvar _state = __webpack_require__(/*! ./../state.js */ \"./src/state.js\");\n\nvar _state2 = _interopRequireDefault(_state);\n\nvar _audioInit = __webpack_require__(/*! ./../audio/audioInit.js */ \"./src/audio/audioInit.js\");\n\nvar _mapRange = __webpack_require__(/*! ./../util/mapRange.js */ \"./src/util/mapRange.js\");\n\nvar _mapRange2 = _interopRequireDefault(_mapRange);\n\nvar _randomInt = __webpack_require__(/*! ./../util/randomInt.js */ \"./src/util/randomInt.js\");\n\nvar _randomInt2 = _interopRequireDefault(_randomInt);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar count = 0;\nvar tickerText = null;\nvar snakeSegsReverse = void 0;\nvar snakesReady = false;\nvar videoSprite = void 0;\nvar snakeSegs = void 0;\nvar bgVidSprite = void 0;\nvar vidTex = void 0;\nvar vidTex2 = void 0;\nvar logo = void 0;\nvar bigRect = void 0;\nvar mouseTimeout = null;\nvar mouseInterval = null;\nvar wwH = void 0;\nvar whH = void 0;\nvar tunnelOffset = 170;\nvar logoOffset = 10;\nfunction autoAnimate() {\n    var x = (0, _randomInt2.default)(0, app.screen.width);\n    var y = (0, _randomInt2.default)(0, app.screen.height);\n    if (snakesReady) {\n        TweenMax.staggerTo(snakeSegsReverse, 10, { x: (0, _mapRange2.default)(x, 0, app.renderer.width, wwH - tunnelOffset, wwH + tunnelOffset), y: (0, _mapRange2.default)(y, 0, app.renderer.height, whH - tunnelOffset, whH + tunnelOffset) }, .15);\n    }\n}\n\nfunction setMouseInterval() {\n    mouseInterval = setInterval(autoAnimate, 10000);\n}\n\nfunction nowPLayingTicker() {\n    TweenMax.to(tickerText, 30, { x: -2000, ease: Linear.easeNone, onComplete: function onComplete() {\n            tickerText.x = app.renderer.width;\n            nowPLayingTicker();\n        } });\n}\n\nvar snakeIntro = function snakeIntro() {\n    nowPLayingTicker();\n    TweenMax.to(logo, 5, { alpha: 1 });\n\n    var _loop = function _loop(i) {\n        TweenMax.to(snakeSegs[i], 10, { width: app.renderer.width * ((i + 1) / snakeSegs.length), height: app.renderer.height * ((i + 1) / snakeSegs.length), delay: i * 0.7,\n            onComplete: function onComplete() {\n                if (i + 1 == snakeSegs.length) {\n                    snakesReady = true;\n                    mouseTimeout = setTimeout(setMouseInterval, 2000);\n                }\n            }\n        });\n    };\n\n    for (var i = 0; i < snakeSegs.length; i++) {\n        _loop(i);\n    }\n};\n\nfunction snakeCenter() {\n    for (var i = 0; i < snakeSegs.length; i++) {\n        TweenMax.to(snakeSegs[i], .1, {\n            width: app.renderer.width * ((i + 1) / snakeSegs.length),\n            height: app.renderer.height * ((i + 1) / snakeSegs.length),\n            x: app.renderer.width / 2,\n            y: app.renderer.height / 2,\n            delay: i * 0.1\n        });\n    }\n}\n\nvar swapTextures = function swapTextures() {\n    videoSprite.texture = videoSprite.texture == vidTex ? vidTex2 : vidTex;\n\n    var _loop2 = function _loop2(i) {\n        setTimeout(function () {\n            snakeSegs[i].texture = snakeSegs[i].texture == vidTex ? vidTex2 : vidTex;\n            if (i + 1 == snakeSegs.length) {\n                setTimeout(function () {\n                    bgVidSprite.texture = bgVidSprite.texture == vidTex ? vidTex2 : vidTex;\n                }, 100);\n            }\n        }, 100 * i);\n    };\n\n    for (var i = 0; i < snakeSegs.length; i++) {\n        _loop2(i);\n    }\n};\n\nvar updateTicker = function updateTicker(text) {\n    tickerText.text = 'NOW PLAYING: ' + text;\n};\n\nvar app = new PIXI.Application({\n    width: window.innerWidth,\n    height: window.innerHeight,\n    backgroundColor: 0xFFFFFF\n});\n\ndocument.body.appendChild(app.view);\n\nPIXI.Loader.shared.add('fun', 'img/logo.png').load(function (loader, resources) {\n\n    vidTex = new PIXI.Texture.from('vid/vid1-w.mp4');\n    //vidTex = new PIXI.Texture.fromImage('img/rg.jpg');    \n    vidTex.baseTexture.resource.source.loop = true;\n    vidTex.baseTexture.resource.source.muted = true;\n\n    vidTex2 = new PIXI.Texture.from('vid/froth-2.mp4');\n    //vidTex2 = new PIXI.Texture.fromImage('img/rg.jpg');\n    vidTex2.baseTexture.resource.source.loop = true;\n    vidTex2.baseTexture.resource.source.muted = true;\n\n    bigRect = new PIXI.Graphics();\n    bigRect.beginFill(0xffffff, 1);\n    bigRect.drawRect(0, 0, window.innerWidth, window.innerHeight);\n    bigRect.endFill();\n    bigRect.alpha = 0.0;\n    bigRect.interactive = true;\n\n    var ww = app.renderer.width;\n    var wh = app.renderer.height;\n    wwH = ww / 2;\n    whH = wh / 2;\n\n    bigRect.on('mousemove', function (event) {\n        var e = event;\n        if (snakesReady) {\n            if (mouseTimeout) {\n                clearInterval(mouseInterval);\n                clearTimeout(mouseTimeout);\n            }\n            TweenMax.staggerTo(snakeSegsReverse, 10, { x: (0, _mapRange2.default)(e.data.global.x, 0, app.renderer.width, wwH - tunnelOffset, wwH + tunnelOffset), y: (0, _mapRange2.default)(e.data.global.y, 0, app.renderer.height, whH - tunnelOffset, whH + tunnelOffset) }, .15);\n            mouseTimeout = setTimeout(setMouseInterval, 1000);\n        }\n    });\n\n    bigRect.on('click', function (event) {\n        swapTextures();\n    });\n\n    bgVidSprite = new PIXI.Sprite(vidTex);\n    bgVidSprite.width = app.screen.width;\n    bgVidSprite.height = app.screen.height;\n    app.stage.addChild(bgVidSprite);\n\n    videoSprite = new PIXI.Sprite(vidTex2);\n    videoSprite.width = app.screen.width;\n    videoSprite.height = app.screen.height;\n\n    // var thing = new PIXI.Graphics();\n    // app.stage.addChild(thing);\n    // thing.position.x = app.screen.width / 2;\n    // thing.position.y = app.screen.height / 2;\n    // thing.lineStyle(0);    \n    // videoSprite.mask = thing;\n\n\n    var funCont = new PIXI.Sprite();\n    app.stage.addChild(funCont);\n\n    snakeSegs = [];\n    var snakeLength = 6;\n    for (var i = snakeLength; i > 0; i--) {\n        var fun = new PIXI.Sprite(vidTex);\n        var funmask = new PIXI.Graphics();\n        funmask.beginFill(0xFF3300);\n        funmask.drawCircle(0, 0, 100);\n        funmask.endFill();\n        // Setup the position of the fun\n        fun.x = app.renderer.width / 2;\n        fun.y = app.renderer.height / 2;\n        //  fun.x = i / snakeLength;\n        //  fun.y = i / snakeLength;\n        // Rotate around the center\n        fun.anchor.x = 0.5;\n        fun.anchor.y = 0.5;\n\n        fun.width = app.renderer.width;\n        fun.height = app.renderer.height;\n        fun.finalScale = 5 * (i / snakeLength);\n        fun.width = 0;\n        fun.height = 0;\n        // fun.scale.x = 0;\n        // fun.scale.y = 0;\n\n        fun.alpha = 0.9;\n        snakeSegs.push(fun);\n        //fun.addChild(funmask);\n        //fun.mask = funmask;\n        funCont.addChild(fun);\n    }\n\n    snakeSegsReverse = snakeSegs.reverse();\n\n    logo = new PIXI.Sprite(resources.fun.texture);\n    logo.x = app.renderer.width / 2;\n    logo.y = app.renderer.height / 2;\n    logo.scale.x = 0;\n    logo.scale.y = 0;\n    logo.anchor.x = 0.5;\n    logo.anchor.y = 0.5;\n    logo.alpha = 0;\n    app.stage.addChild(logo);\n\n    tickerText = new PIXI.Text('', { fontFamily: 'SerifGothicStd-Bold', fontSize: 36, fill: 0x666666, align: 'left' });\n    app.stage.addChild(tickerText);\n    tickerText.x = app.renderer.width / 2;\n    tickerText.y = app.renderer.height - 50;\n    tickerText.blendMode = PIXI.BLEND_MODES.ADD;\n    tickerText.x = app.renderer.width;\n\n    app.stage.addChild(videoSprite);\n\n    videoSprite.mask = logo;\n\n    app.stage.addChild(bigRect);\n\n    app.ticker.add(function () {\n        count += 0.01;\n\n        if (_state2.default.audioKicking) {\n\n            var r = (0, _mapRange2.default)(_audioInit.dataArray[10], 0, 255, 0.1, 0.3);\n\n            _audioInit.analyser.getByteFrequencyData(_audioInit.dataArray);\n            logo.scale.x = r;\n            logo.scale.y = r;\n        }\n    });\n});\n\nfunction getWindowSize() {\n    var wWidth = window.innerWidth;\n    var wHeight = window.innerHeight;\n    var data = {\n        width: wWidth,\n        height: wHeight\n    };\n    return data;\n}\n\nfunction sizeIt() {\n    var size = getWindowSize();\n\n    var w = size.width;\n    var h = size.height;\n\n    app.renderer.view.style.width = w + \"px\";\n    app.renderer.view.style.height = h + \"px\";\n    app.renderer.resize(w, h);\n\n    // bigRect.width = w;\n    // bigRect.height = h;\n    bgVidSprite.width = w;\n    bgVidSprite.height = h;\n    videoSprite.width = w;\n    videoSprite.height = h;\n\n    logo.x = w / 2;\n    logo.y = h / 2;\n\n    tickerText.y = h - 50;\n\n    snakeCenter();\n    // gameContainer.x = ((renderer.width - cWidth)/2);\n    // gameContainer.y = (renderer.height - cHeight)/2;\n\n    // if (rewardOnScreen) {\t\t\n    // \tspiralContainer.x = (renderer.width/2);\n    // \tspiralContainer.y = (renderer.height/2);\n    // \tswampFrameSize();\n    // \tmirrorJamSize();\n    // \tcoverJamSize();\n    // }\n\n    // if (waterOnScreen) {\n    // \twaterSprite.height = renderer.height;\n    // \twaterSprite.width = renderer.width;\n    // \twaterSprite.x = renderer.width/2;\n    // \twaterSprite.y = renderer.height/2;\t\t\t\n    // }\t\n}\n\n//sizeIt();\n\n(function ($, sr) {\n\n    var debounce = function debounce(func, threshold, execAsap) {\n        var timeout;\n\n        return function debounced() {\n            var obj = this,\n                args = arguments;\n            function delayed() {\n                if (!execAsap) func.apply(obj, args);\n                timeout = null;\n            };\n\n            if (timeout) clearTimeout(timeout);else if (execAsap) func.apply(obj, args);\n\n            timeout = setTimeout(delayed, threshold || 50);\n        };\n    };\n    // smartresize \n    jQuery.fn[sr] = function (fn) {\n        return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);\n    };\n})(jQuery, 'smartresize');\n\njQuery(window).smartresize(function () {\n    sizeIt();\n});\n\nexports.snakeIntro = snakeIntro;\nexports.swapTextures = swapTextures;\nexports.updateTicker = updateTicker;\n\n//# sourceURL=webpack:///./src/visual/index.js?");

/***/ })

/******/ });