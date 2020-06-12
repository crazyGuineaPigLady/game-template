"use strict";

// png images
//https://www.pngwave.com/png-clip-art-ntgbp

import * as PIXI from 'pixi.js';
import {Hero} from './Hero';
import {Tree, Fruit} from './Components';

const app = new PIXI.Application({
    width: window.innerWidth * 0.9,
    height: window.innerHeight * 0.9,
    backgroundColor: 0xAAAAAA,
    clearBeforeRender: true,
});


function getAnimationFrame(obj, animationSpeed) {
    let animationFrameCount = animationSpeed;
    return function(delta){
        if(animationFrameCount <= 0) {
            animationFrameCount = animationSpeed;
            obj.requestAnimationFrame();
        }
        animationFrameCount-=delta;
    }
}

function getVideoElement(className) {
    const videoContainer = document.getElementsByClassName(className)[0];
    const video = document.createElement(className);
    video.setAttribute("autoplay", "true");
    video.setAttribute("class", className);
    videoContainer.appendChild(video);
    return video;
}

async function MediaStart() {
    const constraints = window.constraints = {
        audio: false,
        video: true
    };
    navigator.mediaDevices.getUserMedia(constraints)
    .then(function(stream){ 
        const video = getVideoElement("video");
        let videoTracks = stream.getVideoTracks();
        console.log('Got stream with constraints:', constraints);
        console.log('Using video device: ' + videoTracks[0].label);
        stream.onremovetrack = function() {
          console.log('Stream ended');
        };
        video.srcObject = stream;
    })
    .catch(error => {
        if (error.name === 'ConstraintNotSatisfiedError') {
            console.error('The resolution ' + constraints.video.width.exact + 'x' +
                constraints.video.height.exact + ' px is not supported by your device.');
          } else if (error.name === 'PermissionDeniedError') {
            console.error('Permissions have not been granted to use your camera and ' +
              'microphone, you need to allow the page access to your devices in ' +
              'order for the demo to work.');
          }
          console.error('getUserMedia error: ' + error.name, error);
    })
}

const MAIN_AXIS = innerHeight/2;
window.onload = ()=> {
    console.info("Start new app");
    MediaStart();
    const tree1 = new Tree("tree1.png");
    const tree2 = new Tree("tree2.png");
    const apple = new Fruit("apple.png");
    const orange = new Fruit("orange.png");
    const plum = new Fruit("plum.png");
    const banana = new Fruit("banana.png");
    const peach = new Fruit("peach.png");
    const hero = new Hero();
    const ground = new PIXI.Graphics();
    ground.beginFill(0x615756);
    ground.drawRect(0,innerHeight/2,innerWidth,innerHeight/2);
    ground.endFill();
    app.stage.addChild(ground);
    tree1.download(app.stage, 75, MAIN_AXIS).then(
    tree2.download(app.stage, 350, MAIN_AXIS-Math.random()*100).then(
    tree1.download(app.stage, 560, MAIN_AXIS-Math.random()*100).then(
    tree2.download(app.stage, 820, MAIN_AXIS-Math.random()*100).then(
    tree2.download(app.stage, 1100, MAIN_AXIS-Math.random()*100).then(
    tree1.download(app.stage, 1398, MAIN_AXIS-Math.random()*100).then(
    tree1.download(app.stage, 1699, MAIN_AXIS-Math.random()*100).then(
    tree2.download(app.stage, 1889, MAIN_AXIS-Math.random()*100).then(
    apple.download(app.stage, Math.random()*2000, MAIN_AXIS-Math.random()*200).then(
    banana.download(app.stage, Math.random()*2000, MAIN_AXIS-Math.random()*200).then(
    orange.download(app.stage, Math.random()*2000, MAIN_AXIS-Math.random()*200).then(
    peach.download(app.stage, Math.random()*2000, MAIN_AXIS-Math.random()*200).then(
    plum.download(app.stage, Math.random()*2000, MAIN_AXIS-Math.random()*200).then(
    hero.download(app.stage, 300, MAIN_AXIS+150).then(()=>{
      document.getElementsByClassName("lds-facebook")[0].setAttribute("style", "display:none;");
      document.getElementById("gameContainer").appendChild(app.view);
      app.ticker.add(getAnimationFrame(hero, 6));
   }))))))))))))));
}