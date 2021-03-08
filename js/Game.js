class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(100, 200, 50, 50)
    car2 = createSprite(300, 200, 50, 50)
    car3 = createSprite(500, 200, 50, 50)
    car4 = createSprite(700, 200, 50, 50)

    cars = [car1, car2, car3, car4]


  }

  play(){
    form.hide();
   // textSize(30);
    //text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      // index of the cars array is = to zero
      var index = 0
      
      // x and y positions of the car
      var x = 0, y
     // var display_position = 130;
      for(var plr in allPlayers){
        
        //adding one to the index for every loop
        index = index + 1;
        // the position of the cars, little distance seperation, in the x axis
        x = x + 200;

        // use data from the database to display cars in the y-axis
        y = displayHeight - allPlayers[plr].distance

        // assigning x and y to the cars array
        cars[index - 1].x = x

        cars[index - 1].y = y
        if (index === player.index)
          cars[index-1].shapeColor="red"
       // else
         // cars[index-1]("black");

        //display_position+=20;
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }
      
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    drawSprites();
  }
}
