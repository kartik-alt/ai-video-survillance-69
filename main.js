status="";
objects=[]; 

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video.hide();

}


function preload(){
video=createVideo("video.mp4");

}

function start(){
    Objectdetector=ml5.objectDetector("cocossd", modelLoaded );
    document.getElementById("status").innerHTML="status : detecting objects";
}

function modelLoaded(){

    console.log("modelloaded!");
    status=true;
    video.loop();
    
}

function draw(){

    image (video,0,0,600,500);
    if(status !=""){

        Objectdetector.detect(video,gotResult);
      
        for (i = 0 ; i<objects.length; i++ ){

          document.getElementById("status").innerHTML= "status : object detected";
          document.getElementById("number").innerHTML ="number :  "+objects.length;



          fill("red");
         
          percent= floor(objects[i].confidence * 100);
          text(objects[i].label + " "+ percent+ " % ", objects[i].x, objects[i].y);
          noFill();

          stroke("red");

          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height + 15);
        }














    }
}

function gotResult(error,results){

if (error){

    console.log(error);
}
else{

    console.log(results);
    objects=results;
}
}