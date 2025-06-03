"use strict";
// Inspired By
// https://codepen.io/abeatrize/pen/LJqYey
var _a, _b;
// Bongo Cat originally created by @StrayRogue and @DitzyFlama
const ID = "bongo-cat";
const s = (selector) => `#${ID} ${selector}`;
const notes = document.querySelectorAll(".note");
for (let note of notes) {
    (_a = note === null || note === void 0 ? void 0 : note.parentElement) === null || _a === void 0 ? void 0 : _a.appendChild(note.cloneNode(true));
    (_b = note === null || note === void 0 ? void 0 : note.parentElement) === null || _b === void 0 ? void 0 : _b.appendChild(note.cloneNode(true));
}
const music = { note: s(".music .note") };
const cat = {
    pawRight: {
        up: s(".paw-right .up"),
        down: s(".paw-right .down"),
    },
    pawLeft: {
        up: s(".paw-left .up"),
        down: s(".paw-left .down"),
    },
};
const style = getComputedStyle(document.documentElement);
const green = style.getPropertyValue("--green");
const pink = style.getPropertyValue("--pink");
const blue = style.getPropertyValue("--blue");
const orange = style.getPropertyValue("--orange");
const cyan = style.getPropertyValue("--cyan");
gsap.set(music.note, { scale: 0, autoAlpha: 1 });
const animatePawState = (selector) => gsap.fromTo(selector, { autoAlpha: 0 }, {
    autoAlpha: 1,
    duration: 0.01,
    repeatDelay: 0.19,
    yoyo: true,
    repeat: -1,
});
const tl = gsap.timeline();
tl.add(animatePawState(cat.pawLeft.up), "start")
    .add(animatePawState(cat.pawRight.down), "start")
    .add(animatePawState(cat.pawLeft.down), "start+=0.19")
    .add(animatePawState(cat.pawRight.up), "start+=0.19")
    .timeScale(1.6);
gsap.from(".terminal-code line", {
    opacity: 0,
    duration: 0.1,
    stagger: 0.1,
    ease: "none",
    repeat: -1,
    yoyo: true
});
// typing for pipe function doesn't seem to be working for usage when partially applied?
const noteElFn = gsap.utils.pipe(gsap.utils.toArray, gsap.utils.shuffle);
const noteEls = noteElFn(music.note);
const numNotes = noteEls.length / 3;
const notesG1 = noteEls.splice(0, numNotes);
const notesG2 = noteEls.splice(0, numNotes);
const notesG3 = noteEls;
const colorizer = gsap.utils.random([green, pink, blue, orange, cyan, "#a3a4ec", "#67b5c0", "#fd7c6e"], true);
const rotator = gsap.utils.random(-50, 50, 1, true);
const dir = (amt) => `${gsap.utils.random(["-", "+"])}=${amt}`;
const animateNotes = (els) => {
    els.forEach((el) => {
        gsap.set(el, {
            stroke: colorizer(),
            rotation: rotator(),
            x: gsap.utils.random(-25, 25, 1),
        });
    });
    return gsap.fromTo(els, {
        autoAlpha: 1,
        y: 0,
        scale: 0,
    }, {
        duration: 2,
        autoAlpha: 0,
        scale: 1,
        ease: "none",
        stagger: {
            from: "random",
            each: 0.5,
        },
        rotation: dir(gsap.utils.random(20, 30, 1)),
        x: dir(gsap.utils.random(40, 60, 1)),
        y: gsap.utils.random(-200, -220, 1),
        onComplete: () => animateNotes(els),
    });
};
tl.add(animateNotes(notesG1)).add(animateNotes(notesG2), ">0.05").add(animateNotes(notesG3), ">0.25");

document.addEventListener('DOMContentLoaded', () => {
  const loadingProgress = document.querySelector('.loading-progress');
  const loadingPercentage = document.querySelector('.loading-percentage');
  let progress = 0;

  // Function to measure internet speed
  async function measureSpeed() {
    const startTime = performance.now();
    const response = await fetch('https://www.google.com/favicon.ico');
    const endTime = performance.now();
    const duration = endTime - startTime;
    return duration;
  }

  // Function to update loading bar
  function updateLoadingBar(value) {
    progress = value;
    loadingProgress.style.width = `${value}%`;
    loadingPercentage.textContent = `${Math.round(value)}%`;
  }

  // Function to create and show transition overlay
  function showTransition() {
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    document.body.appendChild(transition);
    
    setTimeout(() => {
      transition.classList.add('active');
    }, 100);
    
    setTimeout(() => {
      window.location.href = 'home.html';
    }, 500);
  }

  // Main loading process
  async function startLoading() {
    try {
      // Measure initial speed
      const initialSpeed = await measureSpeed();
      
      // Calculate loading duration based on speed
      // Faster internet = shorter loading time
      const loadingDuration = Math.min(Math.max(initialSpeed * 10, 2000), 5000);
      const steps = 100;
      const stepDuration = loadingDuration / steps;
      
      // Simulate loading progress
      for (let i = 0; i <= steps; i++) {
        await new Promise(resolve => setTimeout(resolve, stepDuration));
        updateLoadingBar(i);
      }
      
      // Show transition and redirect
      showTransition();
    } catch (error) {
      console.error('Error during loading:', error);
      // If there's an error, still redirect after a reasonable time
      setTimeout(() => {
        updateLoadingBar(100);
        showTransition();
      }, 3000);
    }
  }

  // Start the loading process
  startLoading();
});