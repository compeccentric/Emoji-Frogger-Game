document.addEventListener('DOMContentLoaded', () =>{
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const stdWidth = 40;
    const stdHeight = 40;
    let dblWidth = 80;
    const xlWidth = 240;
    let movement = true;
    let lives = 3;
    let startTime = 320;
    let time = startTime;
    let timing = true;
    let gameStarted = false;

    let smiley = new Image();
    smiley.src = "https://upload.wikimedia.org/wikipedia/commons/7/79/Face-smile.svg";

    let life = new Image();
    life.src = "https://upload.wikimedia.org/wikipedia/commons/7/79/Face-smile.svg";

    let sad = new Image();
    sad.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Smile-sad.svg/240px-Smile-sad.svg.png";

    let tears = new Image();
    tears.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Smile_with_tears.png/240px-Smile_with_tears.png";

    let poop = new Image();
    poop.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Poop_Emoji_Icon.png/240px-Poop_Emoji_Icon.png";
    
    let ghost = new Image();
    ghost.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Emoji_u1f47b.svg/240px-Emoji_u1f47b.svg.png";
    
    let bomb = new Image();
    bomb.src ="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Noto_Emoji_Oreo_1f4a3.svg/128px-Noto_Emoji_Oreo_1f4a3.svg.png";
    
    let spider = new Image();
    spider.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Emojione_1F577.svg/240px-Emojione_1F577.svg.png";

    let devil = new Image();
    devil.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Noto_Emoji_Oreo_1f608.svg/128px-Noto_Emoji_Oreo_1f608.svg.png";

    let lightning = new Image();
    lightning.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Emoji_u26c8.svg/128px-Emoji_u26c8.svg.png";
    
    let cloud = new Image();
    cloud.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Emoji_u2601.svg/128px-Emoji_u2601.svg.png";

    let sunny = new Image();
    sunny.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Emoji_u1f324.svg/128px-Emoji_u1f324.svg.png";

    let rainbow = new Image();
    rainbow.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Twemoji2_1f3f3-fe0f-200d-1f308.svg/240px-Twemoji2_1f3f3-fe0f-200d-1f308.svg.png";

    let storm = new Image();
    storm.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Emoji_u2601.svg/128px-Emoji_u2601.svg.png";

    // Create main smiley character
    let character = {
        img: smiley,
        width: stdWidth,
        height: stdHeight,
        x: (canvas.width-stdWidth) / 2,
        y: (canvas.height-stdHeight)-40,
    }
    
    // Function constructor for lives
    function Life(img,width,height,x,y){
        this.img = img;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
    }
    // Create all the lives
    const lifeOne = new Life(life,30,30,0,565);
    const lifeTwo = new Life(life,30,30,30,565);
    const lifeThree = new Life(life,30,30,60,565);
    
    // Create arraw with all the lives
    let lifeArr = [lifeOne,lifeTwo,lifeThree];
    
    // Function constructor for backgrounds
    function Background(width,height,x,y,color){
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.color = color;
    }

    //Create all the backgrounds
    const bottom = new Background(canvas.width,character.height,0,canvas.height - character.height,"black");
    const safeOne = new Background(canvas.width, stdHeight,0,canvas.height-(2*stdHeight),"purple");
    const obsOne = new Background(canvas.width + stdWidth, 5*stdHeight,0,canvas.height - (7*stdHeight),"black");
    const safeTwo = new Background(canvas.width,stdHeight,0,canvas.height - (8*stdHeight),"purple");
    const obsTwo = new Background(canvas.width,5*stdHeight,0,canvas.height - (13*stdHeight),"blue");
    const safeThree = new Background(canvas.width,stdHeight,0,stdHeight,"green");
    const top = new Background(canvas.width,stdHeight,0,0,"black");

    // Create array with all the backgrounds
    let backgroundArr = [bottom,safeOne,obsOne,safeTwo,obsTwo,safeThree,top];

    // Function constructor for bottom characters
    function BotChar(img, width, height,x,y){
        this.img = img;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y
    }
    
    // Create all the bottom characters
    const poopChar = new BotChar(poop,stdWidth,stdHeight,200,(canvas.height-(3*stdHeight)));
    const ghostChar = new BotChar(ghost,stdWidth,stdHeight,(canvas.width-stdWidth) / 2,(canvas.height-(4*stdHeight)));
    const bombChar = new BotChar(bomb,stdWidth,stdHeight,(canvas.width-stdHeight -100),(canvas.height-(5*stdHeight)));
    const spiderOneChar = new BotChar(spider,stdWidth,stdHeight,(canvas.width-stdHeight) / 2,(canvas.height-(6*stdHeight)));
    const spiderTwoChar = new BotChar(spider,stdWidth,stdHeight,((canvas.width-stdHeight) / 2)+140,(canvas.height-(6*stdHeight)));
    const devilChar = new BotChar(devil,stdWidth,stdHeight,((canvas.width-stdHeight) / 2)+240,(canvas.height-(7*stdHeight)));

    // Create array with all the bottom characters
    let botChars = [poopChar,ghostChar,bombChar,spiderOneChar,spiderTwoChar,devilChar];

    // Function constructor for top characaters
    function TopChar(img,width,height,x,y,speed,direction){
        this.img = img;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.direction = direction;
    }

    // Create all the top characters
    const stormOne = new TopChar(storm,stdWidth,stdHeight,((canvas.width-stdWidth) / 2)+80,(canvas.height-(9*stdHeight)),.5,"left");
    const stormTwo = new TopChar(storm,stdWidth,stdHeight,((canvas.width-stdWidth) / 2)+40,(canvas.height-(9*stdHeight)),.5,"left");
    const stormThree = new TopChar(storm,stdWidth,stdHeight,((canvas.width-stdWidth) / 2),(canvas.height-(9*stdHeight)),.5,"left");
    const cloudOne = new TopChar(cloud,stdWidth,stdHeight,((canvas.width-stdWidth) / 2)-80,(canvas.height-(9*stdHeight)),.5,"left");
    const cloudTwo = new TopChar(cloud,stdWidth,stdHeight,((canvas.width-stdWidth) / 2)-120,(canvas.height-(9*stdHeight)),.5,"left");
    const cloudThree = new TopChar(cloud,stdWidth,stdHeight,((canvas.width-stdWidth) / 2)-160,(canvas.height-(9*stdHeight)),.5,"left");
    const rainbowOne = new TopChar(rainbow,xlWidth,stdHeight,((canvas.width-xlWidth) / 2)-80,(canvas.height-(10*stdHeight)),.25,"right");
    const rainbowTwo = new TopChar(rainbow,stdWidth,stdHeight,((canvas.width-stdWidth) / 2),(canvas.height-(11*stdHeight)),.5,"right");
    const rainbowThree = new TopChar(rainbow,stdWidth,stdHeight,((canvas.width-stdWidth) / 2)+80,(canvas.height-(11*stdHeight)),.5,"right");
    const rainbowFour = new TopChar(rainbow,stdWidth,stdHeight,((canvas.width-stdWidth) / 2)-80,(canvas.height-(11*stdHeight)),.5,"right");
    const cloudFour = new TopChar(cloud,stdWidth,stdHeight,((canvas.width-stdWidth) / 2)-160,(canvas.height-(12*stdHeight)),.15,"left");
    const cloudFive = new TopChar(cloud,stdWidth,stdHeight,((canvas.width-stdWidth) / 2)-120,(canvas.height-(12*stdHeight)),.15,"left");
    const stormFour = new TopChar(storm,stdWidth,stdHeight,((canvas.width-stdWidth) / 2),(canvas.height-(12*stdHeight)),.15,"left");
    const stormFive = new TopChar(storm,stdWidth,stdHeight,((canvas.width-stdWidth) / 2)+40,(canvas.height-(12*stdHeight)),.15,"left");
    const cloudSix = new TopChar(cloud,stdWidth,stdHeight,((canvas.width-stdWidth) / 2)+160,(canvas.height-(12*stdHeight)),.15,"left");
    const cloudSeven = new TopChar(cloud,stdWidth,stdHeight,((canvas.width-stdWidth) / 2)+200,(canvas.height-(12*stdHeight)),.15,"left");
    const rainbowFive = new TopChar(rainbow,dblWidth,stdHeight,((canvas.width-stdWidth) / 2)+80,(canvas.height-(13*stdHeight)),.15,"right");
    const rainbowSix = new TopChar(rainbow,dblWidth,stdHeight,((canvas.width-stdWidth) / 2)-80,(canvas.height-(13*stdHeight)),.15,"right");

    // Create array with all the top characters
    let topChars = [stormOne,stormTwo,stormThree,cloudOne,cloudTwo,cloudThree,rainbowOne,rainbowTwo,rainbowThree,rainbowFour,cloudFour,cloudFive,stormFour,stormFive,cloudSix,cloudSeven,rainbowFive,rainbowSix]

    // Create arrays for smiley character turn animations
    loseTurnArr = [
        "https://upload.wikimedia.org/wikipedia/commons/7/79/Face-smile.svg", "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Smile-sad.svg/240px-Smile-sad.svg.png","https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Noto_Emoji_Oreo_2620.svg/128px-Noto_Emoji_Oreo_2620.svg.png"
    ]

    startTurnArr = [
        "https://upload.wikimedia.org/wikipedia/commons/7/79/Face-smile.svg"
    ]

    completeTurnArr = ["https://upload.wikimedia.org/wikipedia/commons/7/79/Face-smile.svg","https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Smile_with_tears.png/240px-Smile_with_tears.png"
    ]

    // Create array for storm animation
    stormArr = ["https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Emoji_u2601.svg/128px-Emoji_u2601.svg.png","https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Emoji_u26c8.svg/128px-Emoji_u26c8.svg.png","https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Emoji_u1f324.svg/128px-Emoji_u1f324.svg.png"]
    
   

    // Create enter key to start game and up/down/left/right arrow keys to move smiley character
    window.addEventListener("keydown", function(event) {
        if (gameStarted===false && event.keyCode === 13) {
            start_game();
          }
        if (movement===true && event.keyCode === 38) {
          move_up();
        }
        if (movement===true && event.keyCode === 40) {
          move_down();
        }
        if (movement===true && event.keyCode === 37) {
          move_left();
        }
        if (movement===true && event.keyCode === 39) {
          move_right();
        }
       
      })
    // Functions that move smiley character
    function move_up(){
        character.y-=40;
    }
    function move_down(){
        character.y+=40;
    }
    function move_left(){
        character.x-=40;
    }
    function move_right(){
        character.x+=40;
    }

    function draw_background(){
        for(let i = 0; i <=5; i++){
            ctx.beginPath();
            ctx.rect(backgroundArr[i].x, backgroundArr[i].y, backgroundArr[i].width, backgroundArr[i].height);
            ctx.fillStyle = backgroundArr[i].color;
            ctx.fill();
        }
    }

    function draw_lives(lives){
       for(let i = 0; i < lives; i++){
            ctx.drawImage(lifeArr[i].img,lifeArr[i].x, lifeArr[i].y, lifeArr[i].width, lifeArr[i].height);
       }
    }

    function draw_character(){
        ctx.drawImage(character.img,character.x,character.y,character.width,character.height);
    }
    // Keep smiley character on board    
    function on_board(){
        if(character.x > canvas.width-character.width && character.y > (6*stdHeight)){
            character.x = canvas.width - character.width;
        }
        if(character.x < 0 && character.y > (6*stdHeight)){
            character.x = 0;
        }
        if(character.y > canvas.height - character.height-40){
            character.y = canvas.height - character.height-40;
        }
        if(character.y < character.height){
            character.y = 0; 
        }
    }
    
    // Place bottom characters on board and check for collision
    function drawBotChars(){
        for(let i = 0; i <botChars.length; i++){
            ctx.drawImage(botChars[i].img,botChars[i].x, botChars[i].y, botChars[i].width, botChars[i].height);
            if(character.x + character.width > botChars[i].x && character.x < botChars[i].x + botChars[i].width && character.y > botChars[i].y - botChars[i].height && character.y < botChars[i].y + botChars[i].height ){
                loseTurn();
            }
        }
    }
    
    // Create animation for storms
    setInterval(async() => {
        storm.src = stormArr[0];
        await timer(1000);
        storm.src = stormArr[1];
        await timer(1000);
        storm.src = stormArr[2];
        await timer(1000);
        for(let i = 0; i < 3; i++){
            topChars[i].width = 0;
            topChars[i].height = 0;
        }
        for(let i = 12; i < 14; i++){
            topChars[i].width = 0;
            topChars[i].height = 0;
        }
        await timer(2000);
        for(let i = 0; i < 6; i++){
            topChars[i].width = 40;
            topChars[i].height = 40;
        }
        for(let i = 12; i < 14; i++){
            topChars[i].width = 40;
            topChars[i].height = 40;
        }
        
    }, 5000); 
 
    // Place top characters on board and check if main character is on them or if character is off board
    function drawTopChars(){
        for(let i = 0; i < topChars.length; i++){
            ctx.drawImage(topChars[i].img,topChars[i].x, topChars[i].y, topChars[i].width, topChars[i].height);
            }
        if(character.x > canvas.width -character.width && character.y > (stdHeight) && character.y < (7*stdHeight)){
                character.x = canvas.width - character.width;
                loseTurn();
        }else if(character.x < 0 && character.y > (stdHeight) && character.y < (7*stdHeight)){
                character.x = 0;
                loseTurn();
        }else if(character.x > topChars[0].x - (character.width/2) && character.x < topChars[0].x +topChars[0].width - (character.width/2)   && character.y > topChars[0].y -topChars[0].height && character.y < topChars[0].y + topChars[0].height ){
            if (topChars[0].direction === "right"){
                character.x+=topChars[0].speed;
            }else{  
                character.x-=topChars[0].speed;
        }
        }else if(character.x > topChars[1].x - (character.width/2) && character.x < topChars[1].x +topChars[1].width - (character.width/2)  && character.y > topChars[1].y -topChars[1].height && character.y < topChars[1].y + topChars[1].height ){
            if (topChars[1].direction === "right"){
                character.x+=topChars[1].speed;
            }else{  
                character.x-=topChars[1].speed;
            }
        }else if(character.x > topChars[2].x -(character.width/2) && character.x < topChars[2].x +topChars[2].width - (character.width/2)   && character.y > topChars[2].y -topChars[2].height && character.y < topChars[2].y + topChars[2].height ){
            if (topChars[2].direction === "right"){
                character.x+=topChars[2].speed;
            }else{  
                character.x-=topChars[2].speed;
            }
        }else if(character.x > topChars[3].x -(character.width/2) && character.x < topChars[3].x +topChars[3].width - (character.width/2)  && character.y > topChars[3].y -topChars[3].height && character.y < topChars[3].y + topChars[3].height ){
            if (topChars[3].direction === "right"){
                character.x+=topChars[3].speed;
            }else{  
                character.x-=topChars[3].speed;
            }
        }else if(character.x > topChars[4].x - (character.width/2) && character.x < topChars[4].x +topChars[4].width - (character.width/2)  && character.y > topChars[4].y -topChars[4].height && character.y < topChars[4].y + topChars[4].height ){
            if (topChars[4].direction === "right"){
                character.x+=topChars[4].speed;
            }else{  
                character.x-=topChars[4].speed;
            }
        }else if(character.x > topChars[5].x -(character.width/2) && character.x < topChars[5].x +topChars[5].width - (character.width/2)  && character.y > topChars[5].y -topChars[5].height && character.y < topChars[5].y + topChars[5].height ){
            if (topChars[5].direction === "right"){
                character.x+=topChars[5].speed;
            }else{  
                character.x-=topChars[5].speed;
            }    
        }else if(character.x > topChars[6].x - (character.width/2)&& character.x < topChars[6].x +topChars[6].width - (character.width/2) && character.y > topChars[6].y -topChars[6].height && character.y < topChars[6].y + topChars[6].height ){
            if (topChars[6].direction === "right"){
                character.x+=topChars[6].speed;
            }else{  
                character.x-=topChars[6].speed;
            }
        }else if(character.x > topChars[7].x - (character.width/2) && character.x < topChars[7].x +topChars[7].width - (character.width/2) && character.y > topChars[7].y -topChars[7].height && character.y < topChars[7].y + topChars[7].height ){
            if (topChars[7].direction === "right"){
                character.x+=topChars[7].speed;
            }else{  
                character.x-=topChars[7].speed;
            }
        }else if(character.x > topChars[8].x - (character.width/2) && character.x < topChars[8].x +topChars[8].width - (character.width/2) && character.y > topChars[8].y -topChars[8].height && character.y < topChars[8].y + topChars[8].height ){
                if (topChars[8].direction === "right"){
                    character.x+=topChars[8].speed;
                }else{  
                    character.x-=topChars[8].speed;
                }
        }else if(character.x > topChars[9].x - (character.width/2) && character.x < topChars[9].x +topChars[9].width - (character.width/2) && character.y > topChars[9].y -topChars[9].height && character.y < topChars[9].y + topChars[9].height ){
            if (topChars[9].direction === "right"){
                character.x+=topChars[9].speed;
            }else{  
                character.x-=topChars[9].speed;
            }
        }else if(character.x > topChars[10].x - (character.width/2)&& character.x < topChars[10].x +topChars[10].width - (character.width/2) && character.y > topChars[10].y -topChars[10].height && character.y < topChars[10].y + topChars[10].height ){
            if (topChars[10].direction === "right"){
                character.x+=topChars[10].speed;
            }else{  
                character.x-=topChars[10].speed;
            }
        }else if(character.x > topChars[11].x - (character.width/2)&& character.x < topChars[11].x +topChars[11].width - (character.width/2)&& character.y > topChars[11].y -topChars[11].height && character.y < topChars[11].y + topChars[11].height ){
            if (topChars[11].direction === "right"){
                character.x+=topChars[11].speed;
            }else{  
                character.x-=topChars[11].speed;
            }
        }else if(character.x > topChars[12].x - (character.width/2)&& character.x < topChars[12].x +topChars[12].width - (character.width/2)&& character.y > topChars[12].y -topChars[12].height && character.y < topChars[12].y + topChars[3].height ){
            if (topChars[12].direction === "right"){
                character.x+=topChars[12].speed;
            }else{  
                character.x-=topChars[12].speed;
            }
        }else if(character.x > topChars[13].x - (character.width/2)&& character.x < topChars[13].x +topChars[13].width - (character.width/2)&& character.y > topChars[13].y -topChars[13].height && character.y < topChars[13].y + topChars[13].height ){
            if (topChars[13].direction === "right"){
                character.x+=topChars[13].speed;
            }else{  
                character.x-=topChars[13].speed;
            }
        }else if(character.x > topChars[14].x - (character.width/2)&& character.x < topChars[14].x +topChars[14].width - (character.width/2)&& character.y > topChars[14].y -topChars[14].height && character.y < topChars[14].y + topChars[14].height ){
            if (topChars[14].direction === "right"){
                character.x+=topChars[14].speed;
            }else{  
                character.x-=topChars[14].speed;
            }

        }else if(character.x > topChars[15].x - (character.width/2)&& character.x < topChars[15].x +topChars[15].width - (character.width/2)&& character.y > topChars[15].y -topChars[15].height && character.y < topChars[15].y + topChars[15].height ){
            if (topChars[15].direction === "right"){
                character.x+=topChars[15].speed;
            }else{  
                character.x-=topChars[15].speed;
            }
        }else if(character.x > topChars[16].x - (character.width/2)&& character.x < topChars[16].x +topChars[16].width - (character.width/2)&& character.y > topChars[16].y -topChars[16].height && character.y < topChars[16].y + topChars[16].height ){
            if (topChars[16].direction === "right"){
                character.x+=topChars[16].speed;
            }else{  
                character.x-=topChars[16].speed;
            }
        }else if(character.x > topChars[17].x - (character.width/2) && character.x < topChars[17].x +topChars[17].width - (character.width/2) && character.y > topChars[17].y -topChars[17].height && character.y < topChars[17].y + topChars[17].height ){
            if (topChars[17].direction === "right"){
                character.x+=topChars[17].speed;
            }else{  
                character.x-=topChars[17].speed;
            }
        }else if(character.y > (stdHeight) && character.y < (7*stdHeight)){
            loseTurn();
        }
}

    function move_chars(){
        // Set movement speed and direction of bottom characters
        botChars[0].x+=.2;
        if(botChars[0].x > canvas.width ){
            botChars[0].x = -40;
        }
        botChars[1].x-=.2;
        if(botChars[1].x < -40){
            botChars[1].x = canvas.width;
        }
        botChars[2].x+=.75;
        if(botChars[2].x > canvas.width ){
            botChars[2].x = -40;
        }
        botChars[3].x-=.5;
        if(botChars[3].x < -40){
            botChars[3].x = canvas.width;
        }
        botChars[4].x-=.5;
        if(botChars[4].x < -40){
            botChars[4].x = canvas.width;
        }
        botChars[5].x+=1;
        if(botChars[5].x > canvas.width){
            botChars[5].x = -40;
        }

        // Set movement speed and direction of top characters
        topChars[0].x-=topChars[0].speed;
        if(topChars[0].x < -40){
            topChars[0].x = canvas.width;
        }
        topChars[1].x-=topChars[1].speed;
        if(topChars[1].x < -40){
            topChars[1].x = canvas.width;
        }
        topChars[2].x-=topChars[2].speed;
        if(topChars[2].x < -40){
            topChars[2].x = canvas.width;
        }
        topChars[3].x-=topChars[3].speed;
        if(topChars[3].x < -40){
            topChars[3].x = canvas.width;
        }
        topChars[4].x-=topChars[4].speed;
        if(topChars[4].x < -40){
            topChars[4].x = canvas.width;
        }
        topChars[5].x-=topChars[5].speed;
        if(topChars[5].x < -40){
            topChars[5].x = canvas.width;
        }
        topChars[6].x+= topChars[6].speed;
        if(topChars[6].x > canvas.width){
            topChars[6].x = -240;
        }
        topChars[7].x+=topChars[7].speed;
        if(topChars[7].x > canvas.width){
            topChars[7].x = -40;
        }
        topChars[8].x+=topChars[8].speed;
        if(topChars[8].x > canvas.width){
            topChars[8].x = -40;
        }
        topChars[9].x+=topChars[9].speed;
        if(topChars[9].x > canvas.width){
            topChars[9].x = -40;
        }
        topChars[10].x-=topChars[10].speed;
        if(topChars[10].x < -40){
            topChars[10].x = canvas.width;
        }
        topChars[11].x-=topChars[11].speed;
        if(topChars[11].x < -40){
            topChars[11].x = canvas.width;
        }
        topChars[12].x-=topChars[12].speed;
        if(topChars[12].x < -40){
            topChars[12].x = canvas.width;
        }
        topChars[13].x-=topChars[13].speed;
        if(topChars[13].x < -40){
            topChars[13].x = canvas.width;
        }
        topChars[14].x-=topChars[14].speed;
        if(topChars[14].x < -40){
            topChars[14].x = canvas.width;
        }
        topChars[15].x-=topChars[15].speed;
        if(topChars[15].x < -40){
            topChars[15].x = canvas.width;
        }
        topChars[16].x+=topChars[16].speed;
        if(topChars[16].x > canvas.width){
            topChars[16].x = -80;
        }
        topChars[17].x+=topChars[17].speed;
        if(topChars[17].x > canvas.width){
            topChars[17].x = -80;
        }
    }
    
    async function loseTurn(){
        if(movement===true){
            timing=false;
            movement = false;
            for(let i = 1; i < 3; i++ ){
                smiley.src = loseTurnArr[i];
                await timer(350);
            }
            smiley.src = startTurnArr[0];
            character.x = (canvas.width-character.width) / 2;
            character.y = (canvas.height-character.height-40);
            movement = true;
            lives-=1;
            draw_lives(lives);
            time=startTime;
            timing=true;
            
        }
    }
    async function completeTurn(){
        if(movement===true){
            timing=false;
            movement = false;
            smiley.src = tears.src;
            await timer(350);
                  
            smiley.src = startTurnArr[0];
            character.x = (canvas.width-character.width) / 2;
            character.y = (canvas.height-character.height-40);
            movement = true;
            time=startTime;
            timing=true;
        }
    }
    
    function timer(ms) {
        return new Promise(res => setTimeout(res, ms));
    }

    function lilly(){
        if(character.y < (2*stdHeight)){
            completeTurn();
        }
    }
    function game_over(){
        movement=false;
        character.width = 0;
        character.height = 0;
        timing =false;
        gameStarted = false;
    }

    function draw_timer(){
            if(timing===true){
                time-=.1;
                ctx.beginPath();
                ctx.rect(canvas.width - time, 565, time, 30);
                ctx.fillStyle ="green";
                ctx.fill();
            }
    }

    function start_game(){
        gameStarted = true;
        console.log("get this game started!");
        lives=3;
        character.height = 40;
        character.width = 40;
        movement = true;
        timing = true;
    }
    function games_started(){
        if(gameStarted===false){
            ctx.font = "30px Comic Sans MS";
            ctx.fillStyle = "red";
            ctx.textAlign = "center";
            ctx.fillText("Press ENTER to start game!", canvas.width/2, canvas.height/2+10);
        }
        if(gameStarted === true){
            draw_character();
            draw_lives(lives);
            draw_timer();
        }
    }
    function time_over(){
        if(time<=0){
            loseTurn();      
        } 
    }
    function lives_out(){
        if (lives===0){
            game_over();
        }
    }
    function draw(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw background and obstacles before smiley character so smiley character is visible on top of them
        draw_background();
        drawBotChars();
        drawTopChars();
        move_chars();
        games_started();
        time_over();
        lives_out();
        on_board();
        lilly();
    }
    
    
    setInterval(draw, 10);
    })