// This can be used to set the Particles Effects.
let particlesInstance = null;

function initParticles() {
  if (particlesInstance) return; // Prevent multiple initializations
  
  particlesInstance = particleground(document.getElementById("particles"), {
    dotColor: "#5cbdaa",
    lineColor: "#5cbdaa",
    density: 6000,
    particleRadius: 2,
    proximity: 110,
    parallaxMultiplier: 5,
    curvedLines: false,
    minSpeedX: 0.1,
    minSpeedY: 0.1,
    maxSpeedX: 0.7,
    maxSpeedY: 0.7,
    directionX: "center",
    directionY: "center"
  });
}

// Wait for everything to load completely
window.addEventListener('load', function() {
  // Short delay to ensure DOM is fully processed
  setTimeout(initParticles, 200);
});

// Add to demo.js
window.addEventListener('load', function() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('fade-out');
  }
});

// Single clean implementation for particles
document.addEventListener('DOMContentLoaded', function() {
  // Wait a moment for layout calculations to complete
  setTimeout(function() {
    // Initialize particles only once
    var particlesEl = document.getElementById("particles");
    if (!particlesEl) return;
    
    // Remove any existing canvas to prevent duplicates
    var existingCanvas = particlesEl.querySelector('canvas');
    if (existingCanvas) existingCanvas.remove();
    
    particleground(particlesEl, {
      dotColor: "#5cbdaa",
      lineColor: "#5cbdaa",
      density: 5000,
      particleRadius: 3,
      proximity: 120,
      parallaxMultiplier: 8,
      curvedLines: false,
      minSpeedX: 0.1,
      minSpeedY: 0.1,
      maxSpeedX: 0.5,
      maxSpeedY: 0.5,
      directionX: "center",
      directionY: "center"
    });
    
    // Handle preloader fadeout
    var preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(function() {
        preloader.classList.add('fade-out');
        setTimeout(function() { 
          preloader.style.display = 'none';
        }, 800);
      }, 300);
    }
  }, 100);
});

document.addEventListener('mousemove', function(e) {
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  
  // Make particles slightly attracted to cursor
  if (window.pJSDom && window.pJSDom[0]) {
    // Add subtle attraction force
  }
});
