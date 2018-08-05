import './index.scss';

const canvas = document.querySelector('canvas');
const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;

canvas.height = windowHeight;
canvas.width = windowWidth;

const c = canvas.getContext('2d');

c.fillStyle = "rgba(255, 0, 0, 0.5)";
c.fillRect(100, 100, 100, 100);

c.fillStyle = "rgba(100, 200, 0, 0.5)";
c.fillRect(300, 400, 100, 100);

c.beginPath();
c.moveTo(200, 300);
c.lineTo(300, 340);
c.lineTo(400, 700);
c.strokeStyle = "#fa34a3";
c.stroke();