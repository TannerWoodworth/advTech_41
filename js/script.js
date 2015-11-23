// JavaScript document
var myCanvas = document.getElementById("myCanvas");
// make an object for it's context
var ctx = myCanvas.getContext("2d");
// cover canvas w/ black square
ctx.fillStyle = 'rgba(0,0,0,1)';
ctx.fillRect(0,0,500,500);
//draw a particle 
var stageW = 500;
var stageH = 500;
setInterval(drawParticle, 1000/30);
// make an array to store all particles
var particles = [];
    for(var i=0; i<50; i++){
        particles.push(new Particle());
    } // closes for loop
/**
 * this method sets up a new particle
 * with its own random position, velocity, color, size
 */
function Particle(){
    this.x = Math.random()*stageW;
    this.y = Math.random()*stageH;
    //velocity
    this.vx = Math.random()*20-10;
    this.vy = Math.random()*20-10;
    //size
    this.radius = Math.random()*20+20;
    var r = Math.random()*255>>0;
    var g = Math.random()*255>>0;
    var b = Math.random()*255>>0;
    var a = Math.random()*1;
    this.color = 'rgba('+r+','+g+','+b+','+a+')';
} // closes function particle
/**
 * this method redraws the background
 * then redraws all the particles
 */
function drawParticle(){
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect(0,0,500,500);
    ctx.globalCompositeOperation = "lighter";
    for(var t=0; t<particles.length; t++){
        // draw a circle
        ctx.beginPath();
        //build a gradient fill
        var gradient = ctx.createRadialGradient(
            particles[t].x,
            particles[t].y,
            0,
            particles[t].x,
            particles[t].y,
            particles[t].radius)
        gradient.addColorStop(0, "white");
        gradient.addColorStop(.4, "white");
        gradient.addColorStop(.4, particles[t].color);
        gradient.addColorStop(1, "black");
        //specify a fill
        ctx.fillStyle=gradient;
        ctx.arc(particles[t].x,particles[t].y,particles[t].radius,Math.PI*2,false);
        ctx.fill();
        //move the particle's position a little for next time
        particles[t].y+=particles[t].vy;
        particles[t].x+=particles[t].vx;
        //if particle exits left edge
        if(particles[t].x< -50) particles[t].x=550;
        //if particle exits right edge
        if(particles[t].x> 550) particles[t].x= -50;
        //if particle exits top
        if(particles[t].y< -50) particles[t].y=550;
        //if particle exits bottom
        if(particles[t].y> 550) particles[t].y= -50;
    } //end for loop
}; // end function drawParticle