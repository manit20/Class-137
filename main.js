objects = [];
status1 = "";
video = "";

function preload(){
    video = createVideo("video.mp4");
    video.hide();
}

function setup(){
    canvas = createCanvas(400, 300);
    canvas.center();
}

function draw(){
    image(video, 0, 0, 400, 300);
    if(status1 != ""){
        objectDetector.detect(video, gotResult);
        r = random(100, 230);
        g = random(100, 230);
        b = random(100, 230);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected: " + objects.length;
            
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    status1 = true;
    video.play()
    video.speed(1);
    video.volume(0);
}

function pause(){
    video.pause();
    document.getElementById("status").innerHTML = "Status: Video Paused";

}

function stop(){
    video.stop()
    document.getElementById("status").innerHTML = "Status: Video Stopped";
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}