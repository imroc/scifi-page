CPWL.Trail = function (ctx,site) {
    //Mouse related variables
    this.mouseX = 0;
    this.mouseY = 0;
    this.velX = 0;
    this.velY = 0;
    this.prevX = 0;
    this.prevY = 0;

    this.shouldAnimate = true;

    this.isStopped = true;

    this.ctx = ctx;

    this.LIFE = 50;
    this.particles = [];
    this.lineParticles = [];

    this.threshold = 100;
    if (H.isSafari) {
        this.threshold = 40;
    }

    this.lowAlpha = false;

    this.site = site;

    this.init();

};

CPWL.Trail.prototype = {
    constructor:CPWL.Trail,

    init: function () {
        var that = this;
        $(this.site.el).mousemove(function (e) {
            that.mouseX = e.clientX;
            that.mouseY = e.clientY;
            that.velX = e.clientX - that.prevX;
            that.velY = e.clientY - that.prevY;
            that.prevX = e.clientX;
            that.prevY = e.clientY;
            that.createParticle(e.clientX, e.clientY);
        });
        this.animate();

    },

    createParticle: function (pX, pY) {
        var that = this;
        if (Math.random() > 0.7 && !this.isStopped) {
            var particle = new CPWL.Particle(that.ctx, {x: pX, y: pY}, 2);
            particle.velocity = {
                x: (Math.random() - 0.5) * 3 + that.velX * 0.1,
                y: (Math.random() - 0.5) * 3 + that.velY * 0.1
            };
            particle.age = 0;

            that.particles.push(particle);
        }
    },

    addParticle: function (p) {
        p.velocity = {
            x: (Math.random() - 0.5) * 3 + site.velX * 0.1,
            y: (Math.random() - 0.5) * 3 + site.velY * 0.1
        };
        p.age = 0;
        p.size = 2;

        this.particles.push(p);

    },

    stopAnimate: function () {
        //this.shouldAnimate = false;
        //this.stop();
    },

    startAnimate: function () {
        //this.shouldAnimate = true;
        //this.start();
        //this.animate();
    },

    stop: function () {
        this.isStopped = true;
    },

    start: function () {
        this.isStopped = false;
    },

    animate: function () {
        var that = this,
            site = this.site;

        var lineCount = 0;

        this.ctx.clearRect(0, 0, G.screenWidth, G.screenHeight);

        for (var i = 0; i < this.particles.length; i++) {
            var p = that.particles[i];

            that.ctx.globalAlpha = 0.5;

            p.draw();


            for (var j = 0; j < that.particles.length; j++) {
                var p2 = that.particles[j];
                if (p != p2 && p.age < 60) {
                    var dist = H.distance(p.position, p2.position);
                    if (dist < that.threshold) {
                        that.ctx.globalAlpha = (1 - (dist / 100)) / 5;

                        that.ctx.strokeStyle = "#ffffff";
                        that.ctx.lineWidth = 0.2;
                        that.ctx.beginPath();
                        that.ctx.moveTo(p.position.x, p.position.y);
                        that.ctx.lineTo(p2.position.x, p2.position.y);
                        that.ctx.closePath();
                        that.ctx.stroke();
                    }
                }
            }


            //Update position
            p.position.x += p.velocity.x;
            p.position.y += p.velocity.y;

            p.age += 1;
            if (p.age >= 60) {
                that.particles.splice(i, 1);

                i--;
            }
        }

        //if(this.shouldAnimate){
        requestAnimationFrame($.proxy(this.animate, this));
        //}
    }
};