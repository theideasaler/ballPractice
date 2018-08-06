import './index.scss';

let canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const c = canvas.getContext('2d');

// c.fillStyle = "rgba(255, 0, 0, 0.5)";
// c.fillRect(100, 100, 100, 100);

// c.fillStyle = "rgba(100, 200, 0, 0.5)";
// c.fillRect(300, 400, 100, 100);

// c.beginPath();
// c.moveTo(200, 300);
// c.strokeStyle = "#fa34a3";
// c.stroke();

// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = "blue";
// c.stroke();

// for (let i = 0 ; i < 100 ; i++) {
//     let x = Math.random() * windowWidth;
//     let y = Math.random() * windowHeight;
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2, false);
//     c.strokeStyle = "blue";
//     c.stroke();
// }

// let x = Math.random() * windowWidth;
// let y = Math.random() * windowHeight;
// let dx = (Math.random() - 0.5) * 8;
// let dy = (Math.random() - 0.5) * 8;
// let radius = 30;

let mouse = {
    x: undefined,
    y: undefined
};

window.addEventListener('resize', () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    init();
});

let circleArray = [];
let colorArray = [
    '#133046',
    '#15959F',
    '#F1E4B3',
    '#F4A090',
    '#F26144'
];
let circleNum = 800;
let maxRadius = 50;
let hoverArea = 70;
let basicVelocity = 3;

window.addEventListener('mousemove', event => {
    mouse.x = event.x;
    mouse.y = event.y;
});

class Circle {
    constructor(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
        this.minRadius = radius;
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = "blue";
        c.fillStyle = this.color;
        c.fill();
    };

    update() {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        //interact with the mouse

        if(mouse.x - this.x < hoverArea && 
            mouse.x - this.x > -hoverArea && 
            mouse.y - this.y < hoverArea && 
            mouse.y - this.y > -hoverArea
        ) {
            if(this.radius < maxRadius){
                this.radius += 2;
            }
        }else if(this.radius > this.minRadius){
            this.radius -= 2;
        }
        
        this.draw();
    };
}

let getRange = (min, max) => min + (max -min) * Math.random();



let init = () => {
    circleArray = [];
    for (let i = 0; i < circleNum; i++) {

        let radius = Math.random() * 5 + 2;
        let x = getRange(radius, canvas.width - radius);
        let y = getRange(radius, canvas.height - radius);
        let dx = (Math.random() - 0.5) * basicVelocity;
        let dy = (Math.random() - 0.5) * basicVelocity;
    
        let circle = new Circle(x, y, dx, dy, radius);
        circleArray.push(circle);
    }
};

let animate = () => {// this will create an automatic loop
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }

}
init();
animate();