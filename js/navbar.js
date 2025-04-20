if (typeof _ === "undefined") {
  console.error("Lodash is required for this script to work!");
}

// Smooth Scrolling Between Sections (Improved)
const smoothScroll = _.throttle(() => {
  const sections = [...document.querySelectorAll("section")];
  const currentIndex = sections.findIndex(
    (section) =>
      section.getBoundingClientRect().top >= -1 &&
      section.getBoundingClientRect().bottom > window.innerHeight / 2
  );

  // Automatically align the section when scrolling stops
  if (currentIndex !== -1) {
    sections[currentIndex].scrollIntoView({ behavior: "smooth", block: "center" });
  }
}, 300);

// Add event listener for scroll and throttle it
document.addEventListener("scroll", smoothScroll);

// Sticky Header Behavior
window.addEventListener("scroll", function () {
  const header = document.getElementById("mainHeader");

  if (window.scrollY > 50) {
    header.classList.add("fixed");
  } else {
    header.classList.remove("fixed");
  }
});

// Highlight Active Link on Scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("#navbar ul li a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100; // Adjust based on navbar height
    const sectionHeight = section.offsetHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Initialization Log
console.log("Smooth scrolling and sticky header functionalities are initialized!");