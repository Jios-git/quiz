(function () {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

function buttonClick(){
  var btn = document.getElementById("audio-btn");
  btn.classList.toggle("pause")
  btn.onclick = ''
}

/*function buttonClick(){
  var btn = document.getElementById("yes");
  var state;
  console.log(state)
  if (state == false) {
    btn.innerHTML = `<button id="audio-btn" class='audio-button' onclick="buttonClick();audioLoad();"></button>`
    state = true
    console.log('hi')
  } else {
    btn.innerHTML = `<button id="audio-btn" class='audio-button' onclick="buttonClick();"></button>`
    state = false
  }
  console.log(btn.innerHTML)
  console.log(state)
}*/

function audioLoad() {
  // Create a new `audioContext` and its `analyser`
  var audioCtx = new AudioContext()

  var analyser = audioCtx.createAnalyser()
  // If a sound is still playing, stop it.
  if (window.source)
    source.noteOff(0)
  // Decode the data in our array into an audio buffer
  var audioFile = fetch("audio/seraqueen.mp3").then(
    response => response.arrayweBuffer()).then(
      buffer => audioCtx.decodeAudioData(buffer)).then(buffer => {
        // Use the audio buffer with as our audio source
        window.source = audioCtx.createBufferSource()
        source.buffer = buffer
        // Connect to the analyser ...
        source.connect(analyser)
        // and back to the destination, to play the sound after the analysis.
        analyser.connect(audioCtx.destination)
        // Start playing the buffer.
        source.start(0)
        // Initialize a visualizer object
        var viz = new simpleViz()
        // Finally, initialize the visualizer.
        new visualizer(viz['update'], analyser)
      })
}

// The visualizer object. 
// Calls the `visualization` function every time a new frame
// is available.
// Is passed an `analyser` (audioContext analyser).
function visualizer(visualization, analyser) {
  var self = this
  this.visualization = visualization
  var last = Date.now()
  var loop = function () {
    var dt = Date.now() - last
    // we get the current byteFreq data from our analyser
    var byteFreq = new Uint8Array(analyser.frequencyBinCount)
    analyser.getByteFrequencyData(byteFreq)
    last = Date.now()
    // We might want to use a delta time (`dt`) too for our visualization.
    self.visualization(byteFreq, dt)
    requestAnimationFrame(loop)
  }
  requestAnimationFrame(loop)
}

// A simple visualization. Its update function illustrates how to use 
// the byte frequency data from an audioContext analyser.
function simpleViz(canvas) {
  var self = this
  this.canvas = document.getElementById('canvas')
  this.ctx = this.canvas.getContext("2d")
  this.ctx.fillStyle = '#fff'
  this.barWidth = 10
  this.barGap = 5
  //this.barHeight = 100
  // We get the total number of bars to display
  this.bars = Math.floor(this.canvas.width / (this.barWidth + this.barGap))
  // This function is launched for each frame, together with the byte frequency data.
  this.update = function (byteFreq) {
    self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height)
    // We take an element from the byteFreq array for each of the bars.
    // Let's pretend our byteFreq contains 20 elements, and we have five bars...
    var step = Math.floor(byteFreq.length / self.bars)
    // `||||||||||||||||||||` elements
    // `|   |   |   |   |   ` elements we'll use for our bars
    for (var i = 0; i < self.bars; i++) {
      // Draw each bar
      var barHeight = byteFreq[i * step]/2
      self.ctx.fillRect(
        i * (self.barWidth + self.barGap),
        self.canvas.height - barHeight,
        self.barWidth,
        barHeight)
    }
  }
}

//https://github.com/cbrandolino/local-audio-visualizer