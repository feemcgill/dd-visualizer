

const debug = true;

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
  dbg.text('ios8');
  if (debug) {
    dbg.show();
  }
});

const tracks = ddTracks;

let trackIndex = 0;
let audioKicking = false;
let autioInitiated = false;
let playCount = 0;

var audioContext = null, usingWebAudio = true;





//const audioContext = new AudioContext();


let analyser = null;
let bufferLength = null;
let dataArray = null;






let viZdata;

let trackBuffer;
let trackSource;

function nextTrack(){
  audioKicking = false;
  const audioSrc = './audio/'+tracks[trackIndex].url;
  trackIndex = (trackIndex + 1) % tracks.length;

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

    
    window.fetch(audioSrc)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer, 
      audioBuffer => {
        trackBuffer = audioBuffer;
      }, 
      error => 
        console.error(error)
      )
    )
    .catch((exception) => {
      console.error('oh noes!', exception)
      dbg.append('<div>EXCEPTION</div>');
      dbg.append(exception);
    })    
    .then(function(){
      play(trackBuffer);      
    });
}
  

function play(audioBuffer) {
  if (autioInitiated) {
    trackSource.buffer = null;
  }
  trackSource = audioContext.createBufferSource();
  trackSource.buffer = audioBuffer;
  trackSource.connect(audioContext.destination);
  //trackSource.connect(analyser);

  trackSource.onended = function(event) {
    nextTrack();
  }    
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



function initAudio(){
  console.log('init audio');
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

  analyser = audioContext.createAnalyser();
  analyser.connect(audioContext.destination);
  analyser.fftSize = 32;
  bufferLength = analyser.frequencyBinCount; 
  dataArray = new Uint8Array(bufferLength);

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
    
  nextTrack();
}


``






let muted = false;
$('.play-it').click(function(){
  initAudio();
});

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

