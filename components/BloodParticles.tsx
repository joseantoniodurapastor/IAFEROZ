import React, { useEffect } from 'react';

declare global {
  interface Window {
    particlesJS: any;
  }
}

const BloodParticles: React.FC = () => {
  useEffect(() => {
    if (window.particlesJS) {
      window.particlesJS('particles-js', {
        particles: {
          number: {
            value: 60,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: "#DC2626" 
          },
          shape: {
            type: "circle", 
            stroke: {
              width: 0,
              color: "#000000"
            },
          },
          opacity: {
            value: 0.5,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 4,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#DC2626", 
            opacity: 0.2, 
            width: 1
          },
          move: {
            enable: true,
            speed: 2, 
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "grab" 
            },
            onclick: {
              enable: true,
              mode: "push"
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 0.8
              }
            },
            push: {
              particles_nb: 4
            }
          }
        },
        retina_detect: true
      });
    }
  }, []);

  return (
    <div 
      id="particles-js" 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 mix-blend-screen"
      style={{ background: '#000000' }} 
    />
  );
};

export default BloodParticles;