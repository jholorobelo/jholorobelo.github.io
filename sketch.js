
let video;
let label = "checking";
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/O1-x4aBdy/';

var capture;
let switchFlag = false;
let switchBtn;

var options = {
     video: {
        
         facingMode: {
          exact: "user"
        }
     }
   };

// STEP 1: Load the model!
function preload() {
  classifier = ml5.imageClassifier(modelURL+ 'model.json');
}

function setup() {
  // size of vid
  var canvas = createCanvas(500, 400);
   canvas.parent('canvasDiv');
  
   capture = createCapture(options);
  switchBtn = createButton('Switch Camera');
  switchBtn.position(19, 19);
  switchBtn.mousePressed(switchCamera);
  // Create the video
  video = createCapture(VIDEO);
  video.hide();

  // STEP 2: Start classifying
  classifyVideo();
}
// STEP 2 classify the videeo!
function classifyVideo() {
  classifier.classify(video, gotResults);
}

function draw() {
  background(0);

  
  image(video, 0, 0);

  
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, width / 2, height - 16);

 
}
// STEP 3: Get the classification!
function gotResults(error, results) {
  
  if (error) {
    console.error(error);
    return;
  }
  // Storing the label and classifying again!
  label = results[0].label;
  classifyVideo();
}

function switchCamera()
{
  switchFlag = !switchFlag;
  stopCapture();
  if(switchFlag==true)
  {
   capture.remove();
   options = {
     video: {
         facingMode: {
          exact: "environment"
        }
     }
   };

  }
  else
  {
   capture.remove();
   options = {
     video: {
         facingMode: {
          exact: "user"
        }
     }
   };
  }
  capture = createCapture(options);
}

function stopCapture() {
  let stream = capture.elt.srcObject;
  let tracks = stream.getTracks();

  tracks.forEach(function(track) {
    track.stop();
  });

  capture.elt.srcObject = null;
}