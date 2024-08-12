//SCROLL
// document.addEventListener("DOMContentLoaded", reveal);
window.addEventListener("scroll", reveal);

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function reveal() {
  const reveals = document.querySelectorAll(".subcontainer, .h2");
  const highlights = document.querySelectorAll(".highlight");
  // console.log("highlights: ", highlights);
  const windowHeight = window.innerHeight;
  // const revealPoint = 20;

  reveals.forEach((reveal) => {
    const revealTop = reveal.getBoundingClientRect().top;
    reveal.classList.toggle("shown", revealTop < windowHeight);
  });
  highlights.forEach((highlight, index) => {
    if (isInViewport(highlight)) {
      highlight.classList.add("shown");
    } else {
      highlight.classList.remove("shown");
    }
  });
}

// SMOOTH SCROLLING
const ease = (t, b, c, d) => {
  t /= d / 2;
  if (t < 1) return (c / 2) * t ** 4 + b;
  t -= 2;
  return (-c / 2) * (t ** 4 - 2) + b;
};

function smoothScroll(target, duration) {
  navMenu.checked = false;
  target = document.querySelector(target);
  let targetPosition = target.getBoundingClientRect().top;
  let startPosition = window.scrollY;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    let timeElapsed = currentTime - startTime;

    let run = ease(timeElapsed, startPosition, targetPosition, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  requestAnimationFrame(animation);
}

const navItems = [
  { selector: ".left", target: ".scroll-top", duration: 2000 },
  {
    selector: ".nav-context",
    target: ".scroll-context",
    duration: 1500,
  },
  {
    selector: ".nav-research",
    target: ".scroll-research",
    duration: 1500,
  },
  {
    selector: ".nav-design-process",
    target: ".scroll-design-process",
    duration: 1500,
  },
  {
    selector: ".nav-tech-process",
    target: ".scroll-tech-process",
    duration: 1500,
  },
  {
    selector: ".nav-final",
    target: ".scroll-final",
    duration: 1500,
  },
  {
    selector: ".nav-impact",
    customHandler: function () {
      let impact = document.querySelector(".impact");
      let nav = document.querySelector(".nav");
      //computed style of the nav elem
      let navStyle = getComputedStyle(nav);
      console.log("navStyle: ", navStyle);
      // The height of the navigation element minus top padding
      let navHeight = nav.offsetHeight - parseFloat(navStyle.paddingTop);
      // Total height of the impact section plus the nav height
      let impactHeight = impact.offsetHeight + navHeight;
      //viewport height
      let viewportHeight = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      );

      console.log("Viewport height:", viewportHeight);

      if (impactHeight >= viewportHeight - 100) {
        smoothScroll(".scroll-impact", 1500);
      } else {
        smoothScroll(".scroll-bottom", 1500);
      }
    },
  },
  {
    selector: ".button",
    target: ".scroll-context",
    duration: 1500,
  },
];

navItems.forEach((item) => {
  const navElement = document.querySelector(item.selector);
  if (navElement) {
    if (item.customHandler) {
      navElement.addEventListener("click", item.customHandler);
    } else {
      navElement.addEventListener("click", function () {
        smoothScroll(item.target, item.duration);
      });
    }
  }
});
//HEADER
var navMenu = document.getElementById("nav-menu");

window.addEventListener("scroll", function () {
  var navBar = document.getElementById("nav");
  navBar.classList.toggle("sticky", window.scrollY > 0);
});

document.addEventListener("click", function () {
  const navLinkItems = document.querySelectorAll(".nav-links li a");

  navLinkItems.forEach((link, index) => {
    const delay = (index + 1) * 0.1; // Calculate delay based on the index
    link.style.transitionProperty = "transform, opacity, background";
    link.style.transitionDelay = `${delay}s, ${delay}s, 0s`;
  });
});
