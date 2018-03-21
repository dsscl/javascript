// 辅助构造器Point
function Point(x, y) {
  this.x = x;
  this.y = y;
}

// 辅助构造器Line
function Line(p1, p2) {
  this.p1 = p1;
  this.p2 = p2;
  this.length = Math.sqrt(
    Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
  );
}

// 构造器Shape
function Shape() {
  this.points = [];
  this.lines = [];
  this.init();
}

// 关键：Shape.prototype
Shape.prototype = {
  // reset pointer to constructor
  constructor: Shape,
  // initialization, sets this.context to pointer
  // to the context if the canvas object
  init: function() {
    if(this.context === undefined) {
      var canvas = document.getElementById('canvas');
      Shape.prototype.context = canvas.getContext('2d');
    }
  },
  // method that draws a shape by looping through this.points
  draw: function() {
    var i, ctx = this.context;
    ctx.strokeStyle = this.getColor();
    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y);
    for(i=1; i<this.points.length; i++) {
      ctx.lineTo(this.points[i].x, this.points[i].y)
    }
    ctx.closePath();
    ctx.stroke();
  },
  // method that generates a random color
  getColor: function() {
    var i, rgb = [];
    for(i=0; i<3; i++) {
      rgb[i] = Math.round(255 * Math.random())
    }
    return 'rgb(' + rgb.join(',') + ')';
  },
  // method that loops through the points array,
  // creates Line instances and adds them to this.lines
  getLines: function() {
    if(this.lines.length > 0) {
      return this.lines;
    }
    var i, lines = [];
    for(i=0; i<this.points.length; i++) {
      lines[i] = new Line(this.points[i], this.points[i+1] || this.points[0]);
    }
    this.lines = lines;
    return lines;
  },
  // shell method, to be implemented by children
  getArea: function() {},
  // sums the lengths of all lines
  getPerimeter: function() {
    var i, perim = 0, lines = this.getLines();
    for(i=0; i<lines.length; i++) {
      perim += lines[i].length;
    }
    return perim;
  }
};

// 子对象构造器，从Triangle开始（海伦公式：通过三角形三条边计算面积）
function Triangle(a, b, c) {
  this.points = [a, b, c];
  this.getArea = function() {
    var p = this.getPerimeter();
    s = p / 2;   // s为半周长
    return Math.sqrt(
      s * (s - this.lines[0].length) * (s - this.lines[1].length) * (s - this.lines[2].length)
    );
  };
}

// 子对象构造器，Rectangle
function Rectangle(p, side_a, side_b) {
  this.points = [
    p,
    new Point(p.x + side_a, p.y),            // top right
    new Point(p.x + side_a, p.y + side_b),   // bottom right
    new Point(p.x, p.y + side_b)             // bottom left
  ];
  this.getArea = function() {
    return side_a * side_b;
  };
}

// 子对象构造器Square（是Rectangle的一种特例，可重用）
function Square(p, side) {
  Rectangle.call(this, p, side, side);
}

// 构造器已完成，下面处理他们的继承关系，几乎所有的仿传统模式（即工作方式是基于构造器而非对象的模式）都符合我们的需求。
// 下面，我们来试着将其修改为原型链模式，并提供一个简化版本。在该模式中，我们需要新建一个父对象实体，然后直接将其设置为子对象的原型。
// 这样一来，我们就没有必要为每个子对象的原型创建新的实体了 —— 因为他们可以通过原型实现完全共享。
(function() {
  var s = new Shape();
  Triangle.prototype = s;
  Rectangle.prototype = s;
  Square.prototype = s;
})();

// 测试，绘制一个三角形
var p1 = new Point(100, 100);
var p2 = new Point(300, 100);
var p3 = new Point(200, 0);
var t = new Triangle(p1, p2, p3);
t.draw()
console.log(t.getPerimeter())
console.log(t.getArea())

// Rectangle实例化
var r = new Rectangle(new Point(200, 200), 50, 100);
r.draw()
console.log(r.getPerimeter())
console.log(r.getArea())

// Square实例化
var s = new Square(new Point(130, 130), 50);
s.draw()
console.log(s.getPerimeter())
console.log(s.getArea())

// 绘制Square偷个懒，重用Triangle的point
new Square(p1, 200).draw()