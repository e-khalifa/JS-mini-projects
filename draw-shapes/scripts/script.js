class Polygon {
    constructor(name, width, height) {
        this.name = name;
        this.width = width;
        this.height = height;
    }
    getArea() {
        return this.width * this.height;
    }
    toString() {
        return `${this.name} width: ${this.width}, ${this.name} height: ${this.height}, ${this.name} area: ${this.getArea()}`
    }
}
class Rectangle extends Polygon {
    constructor(width, height) {
        super("Rectangle", width, height);
    }
}
class Square extends Polygon {
    constructor(width, height = width) {
        super("Square", width, height);
    }
    toString() {
        return `Square side length: ${this.width}, Square area: ${this.getArea()}`
    }
}
class Circle extends Polygon {
    constructor(radius) {
        super("Circle");
        this.radius = radius;
    }
    getArea() {
        return (Math.PI * this.radius ** 2).toFixed(2);
    }
    toString() {
        return `Circle Radius: ${this.radius}, Circle area: ${this.getArea()}`
    }
}
class Triangle extends Polygon {
    constructor(width, height) {
        super("Triangle", width, height);
    }
    getArea() {
        return 0.5 * this.width * this.height;
    }
}

let shape = document.getElementById("shape");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

shape.addEventListener("change", function () {
    let shapeVal = shape.value;
    let width = document.getElementById("width");
    let height = document.getElementById("height");
    let radius = document.getElementById("radius");
    if (shapeVal === "circ") {
        width.disabled = true;
        height.disabled = true;
        radius.disabled = false;
        radius.required = true;
    } else if (shapeVal === "sqr") {
        width.disabled = false;
        height.disabled = true;
        radius.disabled = true;
        width.required = true;
    } else {
        width.disabled = false;
        height.disabled = false;
        radius.disabled = true;
        width.required = true;
        height.required = true;
    }
})

myBtn = document.getElementById("submitBtn");
var red = document.getElementById("red");
var green = document.getElementById("green");
var blue = document.getElementById("blue");
red.addEventListener("input", function () {
    updateColor();
});
green.addEventListener("input", function () {
    updateColor();
});
blue.addEventListener("input", function () {
    updateColor();
});
function updateColor() {
    myBtn.style.backgroundColor = `rgb(${red.value}, ${green.value}, ${blue.value})`;
}

myBtn.addEventListener("click", function (e) {
    e.preventDefault();
    let shapeVal = shape.value;
    let width = parseFloat(document.getElementById("width").value);
    let height = parseFloat(document.getElementById("height").value);
    let radius = parseFloat(document.getElementById("radius").value);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = `rgb(${red.value}, ${green.value}, ${blue.value})`;
    let obj;

    let maxWidth = canvas.width;
    let maxHeight = canvas.height;

    if (width > maxWidth) width = maxWidth;
    if (height > maxHeight) height = maxHeight;
    if (radius > Math.min(maxWidth, maxHeight) / 2) radius = Math.min(maxWidth, maxHeight) / 2;

    switch (shapeVal) {
        case "rect":
            obj = new Rectangle(width, height);
            ctx.fillRect(canvas.width / 2, canvas.height / 2, width, height);
            break;
        case "sqr":
            obj = new Square(width);
            ctx.fillRect(canvas.width / 2, canvas.height / 2, width, width);
            break;
        case "circ":
            obj = new Circle(radius);
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, 2 * Math.PI);
            ctx.fill();
            break;
        case "tri":
            obj = new Triangle(width, height);
            ctx.beginPath();
            ctx.moveTo(canvas.height / 2, canvas.height / 2);
            ctx.lineTo(canvas.height / 2 + width, canvas.width / 2);
            ctx.lineTo(canvas.width / 2 + width / 2, canvas.height / 2 + height);
            ctx.closePath();
            ctx.fill();
            break;
    }
    console.log(obj.toString());
})


