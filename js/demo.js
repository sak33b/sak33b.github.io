const initApp = () => {
    if (document.body.classList.contains('initialized')) return;
    document.body.classList.add('initialized');

    const particlesContainer = document.getElementById("particles");
    
    if (particlesContainer) {
        initParticles(particlesContainer);
    }

    const tl = gsap.timeline({ 
        defaults: { ease: "power3.out" },
        onComplete: () => {
             // Init Tilt only AFTER entrance animation prevents "Jitter" conflict
            VanillaTilt.init(document.querySelector("#intro"), {
                max: 5,
                speed: 1000,
                perspective: 1200,
                glare: true,
                "max-glare": 0.15,
                scale: 1.02
            });
        }
    });

    tl.to("#preloader", {
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        onComplete: () => {
            document.getElementById("preloader").style.display = "none";
        }
    })
    
    .set("#intro-wrapper", { autoAlpha: 1 })

    .fromTo("#intro", 
        { 
            scale: 0.8, 
            opacity: 0, 
            rotationX: 10,
            y: 50 
        },
        { 
            scale: 1, 
            opacity: 1, 
            rotationX: 0, 
            y: 0, 
            duration: 1.2, 
            ease: "elastic.out(1, 0.75)" 
        },
        "-=0.2"
    )

    .fromTo(".name-title", 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8 }, 
        "-=0.8"
    )
    .fromTo(".role-container", 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8 }, 
        "-=0.6"
    )
    
    .fromTo(".social-dock", 
        { autoAlpha: 0, scale: 0.5 }, 
        { 
            autoAlpha: 1, 
            scale: 1, 
            duration: 1, 
            ease: "elastic.out(1, 0.75)" 
        }, 
        "-=0.4"
    )
    .fromTo(".dock-item", 
        { y: 10, autoAlpha: 0 }, 
        { 
            y: 0, 
            autoAlpha: 1, 
            stagger: 0.1, 
            duration: 0.5, 
            ease: "back.out(1.7)" 
        }, 
        "-=0.7"
    );
};

function initParticles(container) {
    const canvas = document.createElement('canvas');
    canvas.className = 'pg-canvas';
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    
    let width, height;
    function resize() {
        // High-DPI Display Support (Fixes blurry particles on mobile)
        const dpr = window.devicePixelRatio || 1;
        width = container.offsetWidth;
        height = container.offsetHeight;
        
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        
        ctx.scale(dpr, dpr); 
    }
    window.addEventListener('resize', resize);
    resize();

    const particleCount = window.innerWidth < 600 ? 60 : 120; 
    const connectionDist = 140;
    const baseColor = { r: 255, g: 255, b: 255 }; 

    const particles = [];

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5; 
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1.5;
            this.alpha = Math.random() * 0.4 + 0.3;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${this.alpha})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectionDist) {
                    ctx.beginPath();
                    const alpha = (1 - dist / connectionDist) * 0.25; 
                    ctx.lineWidth = 0.8;
                    ctx.strokeStyle = `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${alpha})`;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
}

if (document.readyState === 'complete') {
    initApp();
} else {
    window.addEventListener('load', initApp);
}
