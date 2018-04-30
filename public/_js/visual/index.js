

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
// function mapRange (value, a, b, c, d) {
//     value = (value - a) / (b - a);
//     return c + value * (d - c);
// }

function mapRange (num, in_min, in_max, out_min, out_max) {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

let count = 0;
let tickerText = '';
let snakeSegsReverse;
let snakesReady = false;
let videoSprite;
let snakeSegs;
let bgVidSprite;
let vidTex;
let vidTex2;

function nowPLayingTicker(){
    TweenMax.to(tickerText, 30, {x: -2000, ease:Linear.easeNone, onComplete: function(){
        tickerText.x = app.renderer.width;
        nowPLayingTicker();
    }} )
}



function swapTextures() {
    videoSprite.setTexture(videoSprite.texture == vidTex ? vidTex2 : vidTex);
    for (let i = 0; i < snakeSegs.length; i++) {
        setTimeout(() => {
            snakeSegs[i].setTexture(snakeSegs[i].texture == vidTex ? vidTex2 : vidTex);
            if (i+1 == snakeSegs.length) {
                setTimeout(() => {
                    bgVidSprite.setTexture(bgVidSprite.texture == vidTex ? vidTex2 : vidTex);
                }, 100);
            }
        }, 100 * i);
    }        
};


const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor : 0xFFFFFF
});

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);

// load the texture we need
PIXI.loader.add('fun', 'img/logo.png').load((loader, resources) => {


    vidTex = new PIXI.Texture.fromVideo('vid/vid1-w.mp4');
    vidTex.baseTexture.source.loop = true;
    vidTex.baseTexture.source.muted = true;

    vidTex2 = new PIXI.Texture.fromVideo('vid/froth-2.mp4');
    vidTex2.baseTexture.source.loop = true;
    vidTex2.baseTexture.source.muted = true;


    const bigRect = new PIXI.Graphics();
    bigRect.beginFill(0xffffff, 1);
    bigRect.drawRect(0, 0, window.innerWidth, window.innerHeight);
    bigRect.endFill();
    bigRect.aplha = .4;
    bigRect.interactive = true;
    app.stage.addChild(bigRect);

    let ww = app.renderer.width;
    let wh = app.renderer.height;
    let wwH = ww/2;
    let whH = wh/2;
    let tunnelOffset = 170;
    let logoOffset = 10;
    bigRect.on('mousemove', function (event) {
        const e = event;
        //TweenMax.to(thing, 2, { x: e.data.global.x, y: e.data.global.y });
        if (snakesReady) {
            TweenMax.staggerTo(snakeSegsReverse, 10, { x: mapRange(e.data.global.x, 0, app.renderer.width, wwH-tunnelOffset, wwH+tunnelOffset), y: mapRange(e.data.global.y, 0, app.renderer.height, whH-tunnelOffset, whH+tunnelOffset) }, .15);            
        }

        const logoX = mapRange(e.data.global.x, 0, app.renderer.width, wwH+logoOffset, wwH-logoOffset);
        const logoY = mapRange(e.data.global.y, 0, app.renderer.height, whH+logoOffset, whH-logoOffset);
        TweenMax.to(logo, 2, {x:logoX, y:logoY});
    });



    bigRect.on('click', function (event) {
        swapTextures()
    });

    bgVidSprite = new PIXI.Sprite(vidTex);
    bgVidSprite.width = app.screen.width;
    bgVidSprite.height = app.screen.height;
    app.stage.addChild(bgVidSprite);


    videoSprite = new PIXI.Sprite(vidTex2);
    videoSprite.width = app.screen.width;
    videoSprite.height = app.screen.height;

    // var thing = new PIXI.Graphics();
    // app.stage.addChild(thing);
    // thing.position.x = app.screen.width / 2;
    // thing.position.y = app.screen.height / 2;
    // thing.lineStyle(0);    
    // videoSprite.mask = thing;



    const funCont = new PIXI.Sprite();
    app.stage.addChild(funCont);
  
     snakeSegs = [];
     const snakeLength = 6;
     for (let i = snakeLength; i > 0; i--) {
         const fun = new PIXI.Sprite(vidTex);
         const funmask = new PIXI.Graphics();
         funmask.beginFill(0xFF3300);
         funmask.drawCircle(0,0,100);
         funmask.endFill();
         // Setup the position of the fun
         fun.x = app.renderer.width / 2;
         fun.y = app.renderer.height / 2;
        //  fun.x = i / snakeLength;
        //  fun.y = i / snakeLength;
         // Rotate around the center
         fun.anchor.x = 0.5;
         fun.anchor.y = 0.5;
 
         fun.width = app.renderer.width;
         fun.height = app.renderer.height;
         fun.finalScale = 5*(i / snakeLength);
        fun.width = 0
        fun.height = 0;
        // fun.scale.x = 0;
        // fun.scale.y = 0;

         fun.alpha = 0.9;        
         snakeSegs.push(fun);
         //fun.addChild(funmask);
         //fun.mask = funmask;
         funCont.addChild(fun);
     }

   
     snakeSegsReverse = snakeSegs.reverse();

    function snakeIntro(){
        for (let i = 0; i < snakeSegs.length; i++) {
            TweenMax.to(snakeSegs[i], 10, {width: app.renderer.width * ((i + 1) / snakeLength), height: app.renderer.height * ((i + 1) / snakeLength), delay: i * 0.7, 
                onComplete: function(){
                    if (i+1 == snakeSegs.length) {
                        snakesReady = true;
                    }
                }
            })
        }
    }

    setTimeout(() => {
        snakeIntro();
    }, 6000);


    const logo = new PIXI.Sprite(resources.fun.texture);
    logo.x = app.renderer.width / 2;
    logo.y = app.renderer.height / 2;
    logo.scale.x = 0;
    logo.scale.y = 0;
    logo.anchor.x = 0.5;
    logo.anchor.y = 0.5;
    app.stage.addChild(logo);


    tickerText = new PIXI.Text('',{fontFamily : 'SerifGothicStd-Bold', fontSize: 36, fill : 0x666666, align : 'left'});
    app.stage.addChild(tickerText);
    tickerText.x = app.renderer.width / 2;
    tickerText.y = app.renderer.height - 50;
    tickerText.blendMode = PIXI.BLEND_MODES.ADD;
    tickerText.x = app.renderer.width;
   
    app.stage.addChild(videoSprite);

    videoSprite.mask = logo;
    







    const analJamCont = new PIXI.Sprite();
    app.stage.addChild(analJamCont);
    // analJamCont.anchor.x = 0.5;
    // analJamCont.anchor.y = 0.5;
    analJamCont.x = 100;
    analJamCont.y = 100;
    const analShapes = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const fun = new PIXI.Sprite();
            fun.width = 40;
            fun.height = 40;
            const funmask = new PIXI.Graphics();
            funmask.beginFill(0xffffff);
            funmask.drawCircle(0,0,1);
            funmask.endFill();
            // Setup the position of the fun
            fun.x = 100 * i;
            fun.y = 100 * j;
            fun.x = ww * i / 4;
            fun.y = wh * j / 4;
            fun.alpha = 0.7;        
            analShapes.push(fun);
            fun.addChild(funmask);
            //fun.mask = funmask;
            //analJamCont.addChild(fun);            
            
        }        
    }




    app.ticker.add(() => {
        count += 0.01;
        // thing.clear();
        // thing.beginFill(0x8bc5ff, 0.4);
        //thing.drawCircle(0 + Math.cos(count)* 20, 0 + Math.sin(count)* 20, 440 + Math.sin(count)* 400);
        //thing.drawCircle(200, 200, 200);
       

        if (audioKicking) {
            //thing.drawCircle(100, 100, dataArray[10]);

            let r = mapRange(dataArray[10], 0, 255, 0.1, 0.3);

            analyser.getByteFrequencyData(dataArray);            
            logo.scale.x = r;
            logo.scale.y = r;
            for (let i = 0; i < analShapes.length; i++) {
                const e = analShapes[i];
                e.scale.x = dataArray[i];
                e.scale.y = dataArray[i];                
            }
 
        }
    });
});
// var canvas = document.createElement('canvas');
// var texture = PIXI.Texture.fromCanvas(canvas);
// var spriteMask = new PIXI.Texture(texture);
// mySprite.mask = spriteMask;
