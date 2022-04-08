status = "";
input_text = "";

function setup(){
    canvas = createCanvas(450,350);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(450,350);
    video.hide();
}
function start(){
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    input_text = document.getElementById("input_id").value;
}
function modelLoaded(){
    console.log("Model_Loaded");
    status = true;
}
function draw(){
    image(video,0,0,450,350);
}