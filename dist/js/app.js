(()=>{"use strict";var t={d:(e,i)=>{for(var s in i)t.o(i,s)&&!t.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:i[s]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)};t.d({},{H:()=>b});const e={dice:"dices_84x84px_mixed_frames.png",board:"board.svg",tokenPointerGreen:"token_pointer_green_160x160px.png",pointerPlayerH:"turn_bw_480x120px_32frames.png",pointerPlayerV:"turn_bw_120x480px_32frames.png",dicePointer:"dice_pointer_160x160px.png",tokenGreen:"token_green_128x128px.png",tokenYellow:"token_yellow_128x128px.png",tokenBlue:"token_blue_128x128px.png",tokenRed:"token_red_128x128px.png",tokenColor:"token_color_128x128px.png",tokenPurple:"token_purple_128x128px.png",tokenBlack:"token_black_128x128px.png"},i={dice:"se_dices.mp3",dice2:"se_dices2.mp3",startToken:"se_start_token.mp3",step0:"se_step_0.mp3",step1:"se_step_1.mp3",step2:"se_step_2.mp3",step3:"se_step_3.mp3",step4:"se_step_4.mp3",step5:"se_step_5.mp3",step6:"se_step_6.mp3"},s=120,r=20,a=2500,h=1e3,o=800,n=500;class c{static instance;constructor(){if(c.instance)return c.instance;this.canvas=document.getElementById("canvas"),this.width=this.canvas.width=15*s+2*r,this.height=this.canvas.height=15*s+2*r,this.sizeRate=1,this.offsetX=0,this.offsetY=0,this.x=Math.round(this.width/2),this.y=Math.round(this.height/2),this.context=this.canvas.getContext("2d"),this.layers=[],c.instance=this,this.resize()}resize(){let t=innerWidth>innerHeight?innerHeight:innerWidth;this.offsetX=Math.floor((innerWidth-t)/2),this.offsetY=Math.floor((innerHeight-t)/2),this.sizeRate=this.width/t}getLayer(t){return this.layers.find((e=>e.name===t))}}addEventListener("resize",(function(){c.instance&&c.instance.resize()}));const y=new c;let l=performance.now(),m=!0;addEventListener("blur",(function(){m=!1,console.log("stop render")})),addEventListener("focus",(function(){cancelAnimationFrame(p),m=!0,l=performance.now(),p=requestAnimationFrame(x),console.log("start render")}));let p=requestAnimationFrame(x);function x(t){const e=t-l;l=t,y.context.clearRect(0,0,y.width,y.height),y.layers.forEach((t=>t.update(e))),m&&(p=requestAnimationFrame(x))}const d=y,f=class{constructor(t,i){this.img=e.dice,this.x=t-42,this.y=i-42,this.frameSize=84,this.throwDuration=h,this.fps=30,this.frameDuration=Math.floor(1e3/this.fps),this.frameTimeout=this.frameDuration,this.framePathSize=Math.floor(this.throwDuration/this.frameDuration),this.framePath=[],this.framePoint={x:0,y:0},this.value=this.getNewValue(),this.pointer=new class{constructor(t){this.image=e.dicePointer,this.x=t.x+41,this.y=t.y+41,this.scaleDuration=o/2,this.maxSize=160,this.minSize=80,this.scaleRate=(this.maxSize-this.minSize)/this.scaleDuration,this.isScaleUp=!0,this.size=this.minSize,this.halfSize=this.size/2}setMinSize(){this.size=this.minSize,this.halfSize=this.size/2}update(t){this.isScaleUp?(this.size+=this.scaleRate*t,this.size>=this.maxSize&&(this.isScaleUp=!1)):(this.size-=this.scaleRate*t,this.size<=this.minSize&&(this.isScaleUp=!0)),this.halfSize=this.size/2,d.context.drawImage(this.image,this.x-this.halfSize,this.y-this.halfSize,this.size,this.size)}}(this),this.isActive=!1}getNewValue(){const t=Math.ceil(6*Math.random());switch(t){case 1:this.framePoint.x=0,this.framePoint.y=Math.random()<.5?4*this.frameSize:12*this.frameSize;break;case 2:this.framePoint.x=4*this.frameSize,this.framePoint.y=Math.random()<.5?4*this.frameSize:12*this.frameSize;break;case 5:this.framePoint.x=12*this.frameSize,this.framePoint.y=Math.random()<.5?4*this.frameSize:12*this.frameSize;break;case 6:this.framePoint.x=8*this.frameSize,this.framePoint.y=Math.random()<.5?4*this.frameSize:12*this.frameSize;break;case 3:this.framePoint.x=4*Math.floor(4*Math.random())*this.frameSize,this.framePoint.y=0;break;case 4:this.framePoint.x=4*Math.floor(4*Math.random())*this.frameSize,this.framePoint.y=8*this.frameSize;break;default:console.warn("error in dice value")}return t}throw(){if(this.framePath.length)return 0;let t="";for(;t.length<this.framePathSize;)t+=(""+Math.random()).slice(2);this.value=this.getNewValue(),this.framePath.push(this.framePoint);let e=Math.floor(8*Math.random()),{x:i,y:s}=this.framePoint;const r=15*this.frameSize;for(let a=0;a<this.framePathSize;a++)0!==e&&4!==e&&(i+=e<4?this.frameSize:-this.frameSize,i<0&&(i=r),i>r&&(i=0)),2!==e&&6!==e&&(s+=e>2&&e<6?this.frameSize:-this.frameSize,s<0&&(s=r),s>r&&(s=0)),this.framePath.push({x:i,y:s}),+t[a]<2&&(e--,e<0&&(e=7)),+t[a]>7&&(e++,e>7&&(e=0))}update(t){this.isActive&&this.pointer.update(t),this.framePath.length&&(this.frameTimeout-=t,this.frameTimeout<=0&&(this.frameTimeout+=this.frameDuration,this.framePoint=this.framePath.pop())),d.context.drawImage(this.img,this.framePoint.x,this.framePoint.y,this.frameSize,this.frameSize,this.x,this.y,this.frameSize,this.frameSize)}};let g=0;const u=class{constructor(t="",e=d.layers.length,i=[]){this.name=t||"layer"+g++,this.zIndex=e,this.objects=i,e===d.layers.length?d.layers.push(this):(d.layers.splice(e,0,this),d.layers.forEach(((t,e)=>t.zIndex=e)))}update(t){this.objects.forEach((e=>e.update(t)))}remove(t){this.objects=this.objects.filter((e=>e!==t))}add(t){this.objects.push(t)}moveUp(t){this.objects=this.objects.filter((e=>e!==t)),this.objects.push(t)}clear(){this.objects=[]}},Y=class{constructor(t,e){this.callback=t,this.milliseconds=e,d.layers[0].add(this)}update(t){this.milliseconds-=t,this.milliseconds<=0&&(setTimeout((()=>this.callback()),0),d.layers[0].remove(this))}},z=class{constructor(t,e,i){this.player=i,this.image=t,this.maxSize=128,this.minSize=96,this.size=this.minSize,this.halfSize=this.size/2,this.startPoint=e,this.reserve=b.board.reserves[e],this.home=b.board.homes[e],this.container=this.reserve,this.index=b.board.addToReserve(e),this.x=this.container[this.index].x,this.y=this.container[this.index].y,this.stepDuration=n,this.halfStepDuration=this.stepDuration/2,this.sizeRate=(this.maxSize-this.minSize)/this.halfStepDuration,this.stepTimeout=this.stepDuration,this.speed=0,this.steps=0,this.direction=0,this.target=null,this.isGoHome=!1,this.isOtherTokenAction=!1,this.isFromPort=!1,this.pointer=new class{constructor(t){this.scaleDuration=900,this.maxSize=144,this.minSize=120,this.size=this.minSize+(this.maxSize-this.minSize)/4*t,this.halfSize=this.size/2,this.scaleRate=(this.maxSize-this.minSize)/this.scaleDuration,this.direction=0,this.isScaleUp=!0}draw(t,e,i){this.isScaleUp?(this.size+=this.scaleRate*i,this.size>=this.maxSize&&(this.isScaleUp=!1)):(this.size-=this.scaleRate*i,this.size<=this.minSize&&(this.isScaleUp=!0)),this.halfSize=this.size/2,d.context.drawImage(t,e.x-this.halfSize,e.y-this.halfSize,this.size,this.size)}}(this.index),this.isAvailable=!1}checkUse(t){switch(this.container){case this.reserve:if(6!==t)return!1;if(this.checkCeil(b.board.ceils,this.reserve[0].target).startPoint===this.startPoint)return!1;break;case this.home:if(3===this.index)return!1;const e=3-this.index;if(t>e)return!1;for(let t=this.index;t<this.index+e;t++)if(!this.home[t+1].isEmpty)return!1;break;case b.board.toiletTop:case b.board.toiletRight:case b.board.toiletBottom:case b.board.toiletLeft:const i=this.container[2].target;let s=null;b.players.forEach((t=>{t.tokens.forEach((t=>{t.container===b.board.ceils&&t.index===i&&(s=t)}))}));const r=this.container[2].token,a=this.container[1].token;if(0===this.index){if(1!==t)return!1;if(a&&r&&s&&r.startPoint===s.startPoint)return!1}if(1===this.index){if(3!==t)return!1;if(r&&s&&r.startPoint===s.startPoint)return!1}if(2===this.index){if(6!==t)return!1;if(s&&s.startPoint===this.startPoint)return!1}break;default:let h=this.index,o=h===this.reserve[0].target;for(let e=t;e>0;e--){if(h=++h%b.board.ceils.length,o){if(console.log("ПРОВЕРКА ВХОДА ДОМОЙ step =",e,this.home),e>4)return!1;for(let t=0;t<e;t++)if(!1===this.home[t].isEmpty)return!1;return this.isAvailable=!0,!0}if(this.isGoHome&&(console.log("Проверить не пора ли заходить домой..."),h===this.reserve[0].target&&(o=!0,console.log("Я ПОДОШОЛ К ДОМУ"))),e>1){if(this.checkCeil(b.board.ceils,h))return!1}else{const t=this.checkCeil(b.board.ceils,h);if(t&&t.startPoint===this.startPoint)return!1;if("corner"===b.board.ceils[h].type&&t)return!1;if("port"===b.board.ceils[h].type){const e=b.board.ceils[h].target,i=b.board.ports[e].target,s=this.checkCeil(b.board.ceils,i);if(console.log("проверяем фишку с другого конца порта ->",s),s&&t.startPoint===this.startPoint)return!1}if("toilet"===b.board.ceils[h].type){const t=b.board.ceils[h].target,e=b.board.toilets[t],i=e[2].target;let s=null;b.players.forEach((t=>{t.tokens.forEach((t=>{t.container===b.board.ceils&&t.index===i&&(s=t)}))}));const r=e[2].token,a=e[1].token;if(e[0].token&&a&&r&&s&&r.startPoint===s.startPoint)return!1}}}}return this.isAvailable=!0,!0}checkCeil(t,e){for(let i=0;i<b.players.length;i++)for(let s=0;s<4;s++){const r=b.players[i].tokens[s];if(r.container===t&&r.index===e&&r!==this)return r}return!1}activation(){this.isAvailable&&(this.isOtherTokenAction=!1,this.player.tokens.forEach((t=>t.isAvailable=!1)),this.steps=this.player.dice.value,this.player.layer.moveUp(this),this.startStep())}startStep(){switch(this.container){case this.reserve:this.moveFromReserve();break;case this.home:this.moveInHome();break;case b.board.toiletTop:case b.board.toiletRight:case b.board.toiletBottom:case b.board.toiletLeft:this.moveInToilet();break;case b.board.ports:this.moveInPort();break;default:this.moveOnMain()}}moveFromReserve(){this.steps=1,this.reserve[this.index].isEmpty=!0,this.target={container:b.board.ceils,index:this.reserve[0].target,x:b.board.ceils[this.reserve[0].target].x,y:b.board.ceils[this.reserve[0].target].y},this.setDirection();const t=this.getDistance();this.speed=t/this.stepDuration,i.startToken.play()}moveInHome(){this.target={container:this.home,index:this.index+1,x:this.home[this.index+1].x,y:this.home[this.index+1].y},this.home[this.index].isEmpty=!0,this.home[this.index+1].isEmpty=!1,this.setDirection();const t=this.getDistance();this.speed=t/this.stepDuration}moveInPort(){if(this.container===b.board.ports){this.steps=1;const t=this.container[this.index].target;this.target={container:b.board.ceils,index:t,x:b.board.ceils[t].x,y:b.board.ceils[t].y};const e=this.target.container[this.target.index.token];e&&(e.isOtherTokenAction=!0,e.moveInToilet())}else{this.steps=2;const t=this.container[this.index].target;this.target={container:b.board.ports,index:t,x:b.board.ports[t].x,y:b.board.ports[t].y}}this.setDirection();const t=this.getDistance();this.speed=t/this.stepDuration}moveInToilet(){if(console.log("MOVE IN TOILET",{...this}),this.steps=1,this.index<2){this.target={container:this.container,index:this.index+1,x:this.container[this.index+1].x,y:this.container[this.index+1].y};const t=this.target.container[this.target.index].token;t&&(t.isOtherTokenAction=!0,t.moveInToilet()),this.container[this.target.index].token=this,this.container[this.index].token=null}else{const t=this.container[this.index].target;this.target={container:b.board.ceils,index:t,x:b.board.ceils[t].x,y:b.board.ceils[t].y},this.container[this.index].token=null}this.setDirection();const t=this.getDistance();this.speed=t/this.stepDuration}moveOnMain(){if(this.index===this.reserve[0].target&&this.isGoHome)console.log("Пора заходить домой!"),this.target={container:this.home,index:0,x:this.home[0].x,y:this.home[0].y};else{let t=(this.index+1)%b.board.ceils.length;this.target={container:b.board.ceils,index:t,x:b.board.ceils[t].x,y:b.board.ceils[t].y}}this.setDirection();const t=this.getDistance();this.speed=t/this.stepDuration}move(t){this.x+=Math.cos(this.direction)*t,this.y+=Math.sin(this.direction)*t}stepEnd(){let t=!1;3===this.target.container.length&&(t=!0),this.size=this.minSize,this.halfSize=this.size/2,this.stepTimeout=this.stepDuration,this.container=this.target.container,this.index=this.target.index,this.x=this.target.x,this.y=this.target.y,this.target=null,i["step"+Math.floor(7*Math.random())].play(),t&&console.log("ЗАВЕРШЕНИЕ ХОДА ПОСЛЕ ВХОДА В ТУАЛЕТ",{...this}),--this.steps>0?this.startStep():this.moveEnd()}moveEnd(){if(this.isOtherTokenAction)this.container===this.reserve&&(this.isGoHome=!1,this.isOtherTokenAction=!1,this.isFromPort=!1);else{if(this.isGoHome||this.container===b.board.ceils&&this.index===this.reserve[0].target||(this.isGoHome=!0,console.log("this.isGoHome",this.isGoHome)),this.container===this.home){let t=!0;if(this.home.forEach((e=>{e.isEmpty&&(t=!1)})),t)return void console.log("PLAYER",this.startPoint,"WIN")}if(this.container===b.board.ceils){const t=this.checkCeil(b.board.ceils,this.index);if(t&&t.destroy(),"corner"===this.container[this.index].type){let t=!0;for(let e=0;e<4;e++){const i=this.player.tokens[e];(i.container!==this.container||"corner"!==i.container[i.index].type)&&(t=!1)}t&&console.log("PLAYER",this.startPoint,"WIN")}if("port"===this.container[this.index].type){if(!1===this.isFromPort)return this.isFromPort=!0,this.moveInPort();this.isFromPort=!1}if("toilet"===this.container[this.index].type){this.steps=1;const t=this.container[this.index].target,e=b.board.toilets[t];this.target={container:e,index:0,x:e[0].x,y:e[0].y};const i=this.target.container[0].token;i&&(i.isOtherTokenAction=!0,i.moveInToilet()),this.target.container[0].token=this,console.log("ВОШОЛ В ТУАЛЕТ",{...this}),this.setDirection();const s=this.getDistance();return void(this.speed=s/this.stepDuration)}}new Y((()=>this.player.diceFinished()),1e3)}}setDirection(){this.direction=Math.atan2(this.target.y-this.y,this.target.x-this.x)}getDistance(){let t=this.target.x-this.x,e=this.target.y-this.y;return Math.sqrt(t*t+e*e)}destroy(){this.isOtherTokenAction=!0,this.steps=1;let t=b.board.addToReserve(this.startPoint);this.target={container:this.reserve,index:t,x:this.reserve[t].x,y:this.reserve[t].y},this.setDirection();const e=this.getDistance();this.speed=e/this.stepDuration}update(t){this.isAvailable&&this.pointer.draw(e.tokenPointerGreen,{x:this.x,y:this.y},t),this.target&&(this.stepTimeout-=t,this.stepTimeout>this.halfStepDuration?this.size+=this.sizeRate*t:this.size-=this.sizeRate*t,this.halfSize=this.size/2,this.stepTimeout>0?this.move(t*this.speed):this.stepEnd()),d.context.drawImage(this.image,this.x-this.halfSize,this.y-this.halfSize,this.size,this.size)}},X=class{constructor(t,i){this.getPointerPosition(i),this.image=i%2==0?e.pointerPlayerH:e.pointerPlayerV,this.frameWidth=i%2==0?480:120,this.frameHeight=i%2==0?120:480,this.frame=0,this.fps=20,this.frameDuration=Math.floor(1e3/this.fps),this.frameTimeout=this.frameDuration,this.frames=this.getFrames(),this.dices=[],this.dice=null,this.isGetDouble=!1,this.startPoint=i,this.tokens=this.generateTokens(t),this.layer=d.getLayer("players")}getPointerPosition(t){t%2==0?(this.x=r+5.5*s,this.y=0===t?r:r+14*s):(this.y=r+5.5*s,this.x=3===t?r:r+14*s)}getFrames(){const t=[];for(let e=0;e<this.image.height;e+=this.frameHeight)for(let i=0;i<this.image.width;i+=this.frameWidth)t.push({x:i,y:e});return t}generateTokens(t){const e=d.getLayer("tokens"),i=[];for(let s=0;s<4;s++){const s=new z(t,this.startPoint,this);i.push(s),e.add(s)}return i}startTurn(){this.layer.add(this),this.throwDices()}throwDices(){i.dice2.play(),b.dices.forEach((t=>t.throw())),this.isGetDouble=b.dices[0].value===b.dices[1].value,b.dices[0].value>=b.dices[1].value?this.dices=[1,0]:this.dices=[0,1],new Y((()=>this.useDice()),h)}useDice(){this.dice=b.dices[this.dices.pop()],this.dice.isActive=!0;const t=[];this.tokens.forEach((e=>{e.checkUse(this.dice.value)&&t.push(e)})),0!==t.length||new Y((()=>this.diceFinished()),o)}diceFinished(){this.dice.isActive=!1,this.dice.pointer.setMinSize(),this.dices.length?this.useDice():this.isGetDouble?this.throwDices():this.endTurn()}endTurn(){this.layer.remove(this),b.nextTurn()}update(t){this.frameTimeout-=t,this.frameTimeout<=0&&(this.frameTimeout+=this.frameDuration,this.frame++,this.frame===this.frames.length&&(this.frame=0)),d.context.drawImage(this.image,this.frames[this.frame].x,this.frames[this.frame].y,this.frameWidth,this.frameHeight,this.x,this.y,this.frameWidth,this.frameHeight)}};!function(t){let s=Object.keys(e).length+Object.keys(i).length;for(const t in e){const i=new Image;i.src="./src/images/"+e[t],i.onload=()=>{e[t]=i,r()}}for(const t in i){const e=new Audio("./src/sounds/"+i[t]);e.oncanplaythrough=s=>{s.target.oncanplaythrough=null,i[t]=e,r()}}function r(){s--,s||(b.isLoaded=!0)}}();const b={isLoaded:!1,isStart:!1,players:[],currentTurn:0,board:null,dices:[],nextTurn(){this.currentTurn++,this.currentTurn===this.players.length&&(this.currentTurn=0),this.players[this.currentTurn].startTurn()}};document.body.onclick=function(t){!b.isStart&&b.isLoaded&&function(){const t=document.querySelector(".first");document.querySelector(".second").innerHTML="VERSION: 0.0.3",b.isStart=!0,d.canvas.style.opacity=1,b.board=new class{constructor(){this.image=e.board,this.ceilSize=s,this.imageSize=13*this.ceilSize,this.imageOffset=r+s,this.reserveTop=[{isEmpty:!0,target:6,x:0,y:0,rateX:5.5,rateY:0},{isEmpty:!0,target:6,x:0,y:0,rateX:6.5,rateY:0},{isEmpty:!0,target:6,x:0,y:0,rateX:7.5,rateY:0},{isEmpty:!0,target:6,x:0,y:0,rateX:8.5,rateY:0}],this.reserveRight=[{isEmpty:!0,target:18,x:0,y:0,rateX:14,rateY:5.5},{isEmpty:!0,target:18,x:0,y:0,rateX:14,rateY:6.5},{isEmpty:!0,target:18,x:0,y:0,rateX:14,rateY:7.5},{isEmpty:!0,target:18,x:0,y:0,rateX:14,rateY:8.5}],this.reserveBottom=[{isEmpty:!0,target:30,x:0,y:0,rateX:5.5,rateY:14},{isEmpty:!0,target:30,x:0,y:0,rateX:6.5,rateY:14},{isEmpty:!0,target:30,x:0,y:0,rateX:7.5,rateY:14},{isEmpty:!0,target:30,x:0,y:0,rateX:8.5,rateY:14}],this.reserveLeft=[{isEmpty:!0,target:42,x:0,y:0,rateX:0,rateY:5.5},{isEmpty:!0,target:42,x:0,y:0,rateX:0,rateY:6.5},{isEmpty:!0,target:42,x:0,y:0,rateX:0,rateY:7.5},{isEmpty:!0,target:42,x:0,y:0,rateX:0,rateY:8.5}],this.reserves=[this.reserveTop,this.reserveRight,this.reserveBottom,this.reserveLeft],this.toiletTop=[{token:null,move:1,x:0,y:0,rateX:10,rateY:2},{token:null,move:3,x:0,y:0,rateX:11,rateY:2},{token:null,move:6,target:11,x:0,y:0,rateX:12,rateY:2}],this.toiletRight=[{token:null,move:1,x:0,y:0,rateX:12,rateY:10},{token:null,move:3,x:0,y:0,rateX:12,rateY:11},{token:null,move:6,target:23,x:0,y:0,rateX:12,rateY:12}],this.toiletBottom=[{token:null,move:1,x:0,y:0,rateX:4,rateY:12},{token:null,move:3,x:0,y:0,rateX:3,rateY:12},{token:null,move:6,target:35,x:0,y:0,rateX:2,rateY:12}],this.toiletLeft=[{token:null,move:1,x:0,y:0,rateX:2,rateY:4},{token:null,move:3,x:0,y:0,rateX:2,rateY:3},{token:null,move:6,target:47,x:0,y:0,rateX:2,rateY:2}],this.toilets=[this.toiletTop,this.toiletRight,this.toiletBottom,this.toiletLeft],this.homeTop=[{isEmpty:!0,x:0,y:0,rateX:7,rateY:2},{isEmpty:!0,x:0,y:0,rateX:7,rateY:3},{isEmpty:!0,x:0,y:0,rateX:7,rateY:4},{isEmpty:!0,x:0,y:0,rateX:7,rateY:5}],this.homeRight=[{isEmpty:!0,x:0,y:0,rateX:12,rateY:7},{isEmpty:!0,x:0,y:0,rateX:11,rateY:7},{isEmpty:!0,x:0,y:0,rateX:10,rateY:7},{isEmpty:!0,x:0,y:0,rateX:9,rateY:7}],this.homeBottom=[{isEmpty:!0,x:0,y:0,rateX:7,rateY:12},{isEmpty:!0,x:0,y:0,rateX:7,rateY:11},{isEmpty:!0,x:0,y:0,rateX:7,rateY:10},{isEmpty:!0,x:0,y:0,rateX:7,rateY:9}],this.homeLeft=[{isEmpty:!0,x:0,y:0,rateX:2,rateY:7},{isEmpty:!0,x:0,y:0,rateX:3,rateY:7},{isEmpty:!0,x:0,y:0,rateX:4,rateY:7},{isEmpty:!0,x:0,y:0,rateX:5,rateY:7}],this.homes=[this.homeTop,this.homeRight,this.homeBottom,this.homeLeft],this.ports=[{type:"topLeft",target:44,x:0,y:0,rateX:5,rateY:5},{type:"topRight",target:16,x:0,y:0,rateX:9,rateY:5},{type:"rightTop",target:8,x:0,y:0,rateX:9,rateY:5},{type:"rightBottom",target:28,x:0,y:0,rateX:9,rateY:9},{type:"bottomRight",target:20,x:0,y:0,rateX:9,rateY:9},{type:"bottomLeft",target:40,x:0,y:0,rateX:5,rateY:9},{type:"leftBottom",target:32,x:0,y:0,rateX:5,rateY:9},{type:"leftTop",target:4,x:0,y:0,rateX:5,rateY:5}],this.ceils=[{type:"corner",x:0,y:0,rateX:1,rateY:1},{type:"empty",x:0,y:0,rateX:2,rateY:1},{type:"empty",x:0,y:0,rateX:3,rateY:1},{type:"empty",x:0,y:0,rateX:4,rateY:1},{type:"port",target:0,x:0,y:0,rateX:5,rateY:1},{type:"empty",x:0,y:0,rateX:6,rateY:1},{type:"home",target:0,x:0,y:0,rateX:7,rateY:1},{type:"empty",x:0,y:0,rateX:8,rateY:1},{type:"port",target:1,x:0,y:0,rateX:9,rateY:1},{type:"toilet",target:0,x:0,y:0,rateX:10,rateY:1},{type:"empty",x:0,y:0,rateX:11,rateY:1},{type:"exit",x:0,y:0,rateX:12,rateY:1},{type:"corner",x:0,y:0,rateX:13,rateY:1},{type:"empty",x:0,y:0,rateX:13,rateY:2},{type:"empty",x:0,y:0,rateX:13,rateY:3},{type:"empty",x:0,y:0,rateX:13,rateY:4},{type:"port",target:2,x:0,y:0,rateX:13,rateY:5},{type:"empty",x:0,y:0,rateX:13,rateY:6},{type:"home",target:1,x:0,y:0,rateX:13,rateY:7},{type:"empty",x:0,y:0,rateX:13,rateY:8},{type:"port",target:3,x:0,y:0,rateX:13,rateY:9},{type:"toilet",target:1,x:0,y:0,rateX:13,rateY:10},{type:"empty",x:0,y:0,rateX:13,rateY:11},{type:"exit",x:0,y:0,rateX:13,rateY:12},{type:"corner",x:0,y:0,rateX:13,rateY:13},{type:"empty",x:0,y:0,rateX:12,rateY:13},{type:"empty",x:0,y:0,rateX:11,rateY:13},{type:"empty",x:0,y:0,rateX:10,rateY:13},{type:"port",target:4,x:0,y:0,rateX:9,rateY:13},{type:"empty",x:0,y:0,rateX:8,rateY:13},{type:"home",target:2,x:0,y:0,rateX:7,rateY:13},{type:"empty",x:0,y:0,rateX:6,rateY:13},{type:"port",target:5,x:0,y:0,rateX:5,rateY:13},{type:"toilet",target:2,x:0,y:0,rateX:4,rateY:13},{type:"empty",x:0,y:0,rateX:3,rateY:13},{type:"exit",x:0,y:0,rateX:2,rateY:13},{type:"corner",x:0,y:0,rateX:1,rateY:13},{type:"empty",x:0,y:0,rateX:1,rateY:12},{type:"empty",x:0,y:0,rateX:1,rateY:11},{type:"empty",x:0,y:0,rateX:1,rateY:10},{type:"port",target:6,x:0,y:0,rateX:1,rateY:9},{type:"empty",x:0,y:0,rateX:1,rateY:8},{type:"home",target:3,x:0,y:0,rateX:1,rateY:7},{type:"empty",x:0,y:0,rateX:1,rateY:6},{type:"port",target:7,x:0,y:0,rateX:1,rateY:5},{type:"toilet",target:3,x:0,y:0,rateX:1,rateY:4},{type:"empty",x:0,y:0,rateX:1,rateY:3},{type:"exit",x:0,y:0,rateX:1,rateY:2}],this.init()}init(){const t=.5*this.ceilSize+r;[...this.reserves,...this.toilets,...this.homes,this.ports,this.ceils].forEach((e=>{e.forEach((e=>{e.x=t+this.ceilSize*e.rateX,e.y=t+this.ceilSize*e.rateY}))}))}addToReserve(t){const e=this.reserves[t];for(let t=0;t<4;t++)if(e[t].isEmpty)return e[t].isEmpty=!1,t}removeFromReserve(t,e){this.reserves[t][e].isEmpty=!0}update(){d.context.drawImage(this.image,this.imageOffset,this.imageOffset,this.imageSize,this.imageSize)}},new u("board",0,[b.board]),b.dices.push(new f(d.x-63,d.y-63)),b.dices.push(new f(d.x+63,d.y+63)),new u("dices",1,b.dices),new u("players",2,[]),new u("tokens",3,[]),b.players.push(new X(e.tokenColor,0)),b.players.push(new X(e.tokenBlack,1)),b.players.push(new X(e.tokenYellow,2)),b.players.push(new X(e.tokenRed,3)),b.currentTurn=Math.floor(Math.random()*b.players.length),new Y((()=>b.nextTurn()),a),d.canvas.onclick=function(e){const i={client:{x:e.clientX,y:e.clientY},layer:{x:e.layerX,y:e.layerY},offset:{x:e.offsetX,y:e.offsetY},page:{x:e.pageX,y:e.pageY},screen:{x:e.screenX,y:e.screenY},coordinates:{x:e.x,y:e.y}};console.log(e),i={client:{x:e.clientX,y:e.clientY},layer:{x:e.layerX,y:e.layerY},offset:{x:e.offsetX,y:e.offsetY},page:{x:e.pageX,y:e.pageY},screen:{x:e.screenX,y:e.screenY},coordinates:{x:e.x,y:e.y}},t.innerHTML=`\n            client y: ${i.client.x.toFixed()}; y: ${i.client.y.toFixed()} <br>\n            layer  y: ${i.layer.x.toFixed()};  y: ${i.layer.y.toFixed()}  <br>\n            offset y: ${i.offset.x.toFixed()}; y: ${i.offset.y.toFixed()} <br>\n            page   y: ${i.page.x.toFixed()};   y: ${i.page.y.toFixed()}   <br>\n            screen y: ${i.screen.x.toFixed()}; y: ${i.screen.y.toFixed()} <br>\n            coords y: ${i.client.x.toFixed()}; y: ${i.client.y.toFixed()} <br>\n            `}}()}})();