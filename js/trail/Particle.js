CPWL.Particle = function (ctx, start, size) {
    this.origin = start;
    this.position = start;
    this.size = size;
    this.ctx = ctx;
};

CPWL.Particle.prototype = {
    constructor:CPWL.Particle,
    draw: function () {
        this.ctx.fillStyle = "#ffffff";
        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.fill();
    }
};