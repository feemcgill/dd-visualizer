


const ddTracks = [
  {
    'url': 'White-Fence_To-the-Boy-I-Jumped-in-the-Hemlock-Alley.mp3',
    'text' : 'To the Boy I Jumped in the Hemlock Alley by White Fence'
  },
  {
    'url': 'Tame-Impala_Yes-Im-Changing.mp3',
    'text' : 'Yes I\'m Changing by Tame Impala'
    
  },
  {
    'url': 'Mercury-Rev_Opus-40.mp3',
    'text' : 'Opus 40 by Mercury Rev'
    
  }
]


const testTracks = [
  {
    'url': '1.mp3'
  },
  {
    'url': '2.mp3'
  },
  {
    'url': '3.mp3'
  }
]

let dbg = null;
$(document).ready(function(){
  dbg = $('.debug');
  dbg.text('ios6')
});

const tracks = testTracks;

let trackIndex = 0;
let audioKicking = false;
let autioInitiated = false;
let playCount = 0;

var audioContext = null, usingWebAudio = true;

try {
  if (typeof AudioContext !== 'undefined') {
      audioContext = new AudioContext();
  } else if (typeof webkitAudioContext !== 'undefined') {
      audioContext = new webkitAudioContext();
  } else {
      usingWebAudio = false;
  }
} catch(e) {
    usingWebAudio = false;
}



//const audioContext = new AudioContext();


const analyser = audioContext.createAnalyser();
analyser.connect(audioContext.destination);
analyser.fftSize = 32;
let bufferLength = analyser.frequencyBinCount; 
let dataArray = new Uint8Array(bufferLength);





let viZdata;

let trackBuffer;
let trackSource;

function nextTrack(){
  audioKicking = false;
  trackIndex = (trackIndex + 1) % tracks.length;
  const audioSrc = './audio/'+tracks[trackIndex].url;

  window.fetch(audioSrc)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {
      trackBuffer = audioBuffer;
      setTimeout(() => {
        tickerText.text =  'NOW PLAYING: ' + tracks[trackIndex].text;
        nowPLayingTicker();
      }, 3500);
      dbg.text('got the track should play');
      play(trackBuffer);
    });
}
  

function play(audioBuffer) {
  if (autioInitiated) {
    trackSource.buffer = null;
  }
  trackSource = audioContext.createBufferSource();
  trackSource.buffer = audioBuffer;
  //trackSource.connect(audioContext.destination);
  trackSource.connect(analyser);

  trackSource.onended = function(event) {
    nextTrack();
  }    
  trackSource.start();
  dbg.text('should start now');
  audioKicking = true;
  autioInitiated = true;
  if (playCount > 0) {
    swapTextures();
  } else {
    snakeIntro();    
  }
  playCount++;
}

nextTrack();




// context state at this time is `undefined` in iOS8 Safari
if (usingWebAudio && audioContext.state === 'suspended') {
  var resume = function () {
    audioContext.resume();

    setTimeout(function () {
      if (audioContext.state === 'running') {
        document.body.removeEventListener('touchend', resume, false);
      }
    }, 0);
  };

  document.body.addEventListener('touchend', resume, false);
}




let muted = false;
$('.mute-toggle').click(function(){
  if (muted) {
    trackSource.connect(analyser);
    $(this).text('mute');
  } else {
    trackSource.disconnect();
    $(this).text('unmute');
  }
  muted = !muted;
});

