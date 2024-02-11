
var gamePattern =[];
var buttonColours = ["red","blue","green","yellow"];
var started = false;
var level = 0;
var currentLevel = 0;


$(".btn").click(function (){
    var userChosenColour = $(this).attr("id");
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userChosenColour)

    

    
})

$(document).keydown(()=>{
    if(!started)  {
        $("#level-title").text( "Level " + level);
        nextSequence();
        started = true;
    }
})


function nextSequence(){
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}


function playSound(name){
    
    var audio = new Audio("sounds/"+name+'.mp3');
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(()=>{
        $("#"+currentColour).removeClass("pressed")
    },100);
}



function checkAnswer(color){
    
    if(currentLevel < level){
        if(gamePattern[currentLevel] == color){
            //console.log("success");
            currentLevel++;
            if(currentLevel == level){
                currentLevel = 0;
                setTimeout(nextSequence,1000);
            }
        }
        else {
            //console.log("wrong");
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(()=>{
            $("body").removeClass("game-over");
            },200)
            $("#level-title").text("Game Over, Press Any Key to Restart")
            startOver();
        }
    }

    
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
    currentLevel = 0;
}
