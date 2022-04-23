// Create a new instance of an audio object and adjust some of its properties



var audio = new Audio();
audio.loop = true;
audio.volume = 0.2
var btn = document.getElementById("audio-btn");
var firstToggle = true
var buttonPress = false
var visualCount = 0
var audioCount = 1;

function togglePlay() {
  
  if (buttonPress == true) {
    audioCount++; console.log(audioCount)
  }

  if (audio.paused && !btn.classList.contains("pause") && firstToggle == true) {
    audio.src = `audio/${audioCount}.mp3`;
    console.log('first press')
    initMp3Player()
    btn.classList.toggle("pause")
    audio.play()
    firstToggle = false
  } else if (buttonPress == true) {
    buttonPress = false
    audio.src = `audio/${audioCount}.mp3`;
    console.log('pause on next question' + audioCount)

    if (audio.paused && btn.classList.contains("pause")) {
      btn.classList.toggle("pause")
      audio.pause()
      console.log(4)
    }

    initMp3Player()

  } else if (audio.paused && !btn.classList.contains("pause")) {
    audio.play()
    btn.classList.toggle("pause")
    console.log('start audio')
  } else {
    audio.pause()
    btn.classList.toggle("pause")
    console.log(6)
  }
}

// Establish all variables that your Analyser will use
var canvas = [], ctx = [], source = [], context = [], analyser = [], fbc_array, bars, bar_x, bar_width, bar_height;
// Initialize the MP3 player after the page loads all of its HTML into the window
//btn.addEventListener("click", initMp3Player, false);

function initMp3Player() {
  console.log('visualCount ' + visualCount)
  context[visualCount] = new AudioContext();
  document.getElementById('audio_container').appendChild(audio);
  analyser[visualCount] = context[visualCount].createAnalyser(); // AnalyserNode method
  canvas[visualCount] = document.getElementById('analyser-render');
  ctx[visualCount] = canvas[visualCount].getContext('2d');
  // Re-route audio playback into the processing graph of the AudioContext

  source[visualCount] = context[visualCount].createMediaElementSource(audio);
  source[visualCount].connect(analyser[visualCount]);
  analyser[visualCount].connect(context[visualCount].destination);
  visualCount++
  console.log('visualCount ' + visualCount)
  frameLooper();

}

// frameLooper() animates any style of graphics you wish to the audio frequency
// Looping at the default frame rate that the browser provides(approx. 60 FPS)
function frameLooper() {
  window.requestAnimationFrame(frameLooper);
  fbc_array = new Uint8Array(1024);
  analyser[visualCount - 1].getByteFrequencyData(fbc_array);
  ctx[visualCount - 1].clearRect(0, 0, canvas[visualCount - 1].width, canvas[visualCount - 1].height); // Clear the canvas
  ctx[visualCount - 1].fillStyle = '#fff'; // Color of the bars
  bars = 60;
  for (var i = 0; i < bars; i++) {
    bar_x = i * 5;
    bar_width = 3;
    bar_height = -(fbc_array[i] / 2);
    //  fillRect( x, y, width, height ) // Explanation of the parameters below
    ctx[visualCount - 1].fillRect(bar_x, canvas[visualCount - 1].height, bar_width, bar_height);
  }
}
