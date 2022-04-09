status = "";
input_text = "";
objects = [];

function setup(){
    canvas = createCanvas(450,350);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(450,350);
    video.hide();
}
function start(){
    object_Detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    input_text = document.getElementById("input_id").value;
}
function modelLoaded(){
    console.log("Model_Loaded");
    status = true;
}
function gotResult(error, results){
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(video,0,0,450,350);
    if(status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);

        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            //document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+objects.length;
            
            fill(r,g,b);
            percent = floor(objects[i].confidence *100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y - 5);
            noFill(); 
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == input_text){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("object_found").innerHTML = input_text+ "Found";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(input_text + "Found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("object_found").innerHTML = input_text+ " Not Found";
            }
        }
    }
}