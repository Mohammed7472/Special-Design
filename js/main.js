let colorsLi = document.querySelectorAll(".settings-box .colors-list li");
if (localStorage.getItem("color-option")) {
  colorsLi.forEach((li) => {
    li.classList.remove("active");
    li.getAttribute("data-color") === localStorage.getItem("color-option")
      ? li.classList.add("active")
      : "";
  });
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color-option")
  );
}

let landing = document.querySelector(".landing-page");
let imgs = [
  "imgs/[01].jpg",
  "imgs/[02].jpg",
  "imgs/[03].jpg",
  "imgs/[04].jpg",
  "imgs/[05].jpg",
  "imgs/[06].jpg",
];

let bgsBox = document.querySelector(".option-box .backgrounds-box");
let imgsBox = document.querySelectorAll(".option-box .backgrounds-box img");
let randomOption = true;

if (localStorage.getItem("background-option")) {
  document
    .querySelectorAll(".random-background .options span")
    .forEach((span) => {
      span.classList.remove("active");
      if (localStorage.getItem("background-option") === "true") {
        document.querySelector("[data-option = 'yes']").classList.add("active");
        randomOption = true;
        bgsBox.classList.remove("show");
      } else {
        document.querySelector("[data-option = 'no']").classList.add("active");
        randomOption = false;
        bgsBox.classList.add("show");
      }
    });
}

if (localStorage.getItem("currentBackground")) {
  removeActive(imgsBox);
  imgsBox.forEach((img) => {
    if (img.src === localStorage.getItem("currentBackground")) {
      img.classList.add("active");
    }
  });
  landing.style.backgroundImage = `url(${localStorage.getItem(
    "currentBackground"
  )})`;
}

// Settings Box Interactive
document.querySelector(".settings-box .toggle-box i").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("show");
};

colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    handleActive(e);
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.getAttribute("data-color")
    );
    localStorage.setItem("color-option", e.target.getAttribute("data-color"));
  });
});

// Nav Bullets Interactive
let navBullets = document.createElement("div");
navBullets.className = "nav-bullets";
let allSections = document.querySelectorAll("[data = 'section']");
allSections.forEach((section) => {
  let bullet = document.createElement("div");
  bullet.className = "bullet";
  bullet.setAttribute("data-section", section.className);
  let tooltip = document.createElement("div");
  tooltip.className = "tooltip";
  tooltip.append(
    document.createTextNode(
      section.className[0].toUpperCase() + section.className.slice(1)
    )
  );
  bullet.appendChild(tooltip);
  navBullets.appendChild(bullet);
});
document.body.appendChild(navBullets);

let bulletsSapn = document.querySelectorAll(".show-bullets .options span");

if (localStorage.getItem("bullets-option")) {
  removeActive(bulletsSapn);
  bulletsSapn.forEach((span) => {
    span.getAttribute("data-display") === localStorage.getItem("bullets-option")
      ? span.classList.add("active")
      : "";
  });
  if (localStorage.getItem("bullets-option") === "show") {
    navBullets.style.display = "block";
  } else {
    navBullets.style.display = "none";
  }
}

bulletsSapn.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);
    if (span.getAttribute("data-display") === "show") {
      navBullets.style.display = "block";
    } else {
      navBullets.style.display = "none";
    }
    localStorage.setItem(
      "bullets-option",
      e.target.getAttribute("data-display")
    );
  });
});

scrollToSelectedSection(document.querySelectorAll(".nav-bullets .bullet"));

// Landing Page Interactive
let intervalControl;
document
  .querySelectorAll(".random-background .options span")
  .forEach((span) => {
    span.addEventListener("click", (e) => {
      handleActive(e);
      if (e.target.getAttribute("data-option") === "yes") {
        randomOption = true;
        randomize();
        localStorage.setItem("background-option", randomOption);
        bgsBox.classList.remove("show");
      } else {
        randomOption = false;
        clearInterval(intervalControl);
        localStorage.setItem("background-option", randomOption);
        bgsBox.classList.add("show");
        activeImg = document.querySelector(".backgrounds-box img.active");
        landing.style.backgroundImage = `url(${activeImg.src})`;
      }
    });
  });

randomize();

imgsBox.forEach((img) =>
  img.addEventListener("click", (e) => {
    landing.style.backgroundImage = `url(${e.target.src})`;
    handleActive(e);
    localStorage.setItem("currentBackground", e.target.src);
  })
);

let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  if (window.scrollY >= ourSkills.offsetTop - 200) {
    ourSkills.querySelectorAll(".progress span").forEach((span) => {
      span.style.width = span.getAttribute("data-width");
    });
  }
};

scrollToSelectedSection(document.querySelectorAll("header .links a"));

// Toggle-Menu Interactive
let toggleBtn = document.querySelector(".toggle-menu");
let headerLinks = document.querySelector("header .links");

toggleBtn.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("clicked");
  headerLinks.classList.toggle("show");
};

document.addEventListener("click", (e) => {
  if (e.target != toggleBtn && e.target != headerLinks) {
    if (headerLinks.classList.contains("show")) {
      toggleBtn.classList.remove("clicked");
      headerLinks.classList.remove("show");
    }
  }
});

// Gallery Section Interactive
let ourGallery = document.querySelector(".gallery");
let imgHolders = document.querySelectorAll(".gallery .image");

imgHolders.forEach((holder) => {
  holder.addEventListener("click", () => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";

    if (holder.firstElementChild.alt.length) {
      let imgHeading = document.createElement("h3");
      imgHeading.append(document.createTextNode(holder.firstElementChild.alt));
      popupBox.appendChild(imgHeading);
    }
    let popupImg = document.createElement("img");
    popupImg.src = holder.firstElementChild.src;

    let closeBtn = document.createElement("span");
    closeBtn.className = "close-btn";
    closeBtn.append(document.createTextNode("X"));
    popupBox.appendChild(closeBtn);

    popupBox.appendChild(popupImg);
    document.body.appendChild(popupBox);
  });
});

document.addEventListener("click", (e) => {
  if (e.target.className === "close-btn") {
    e.target.parentElement.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

// Reset All Options
let allOptions = [
  "color-option",
  "background-option",
  "currentBackground",
  "bullets-option",
];
document.querySelector(".reset").onclick = function () {
  allOptions.forEach((option) => {
    localStorage.removeItem(option);
  });
  window.location.reload();
};

// Created Functions
function randomize() {
  if (randomOption) {
    intervalControl = setInterval(() => {
      let randmoNumber = Math.floor(Math.random() * imgs.length);
      landing.style.backgroundImage = `url(${imgs[randmoNumber]})`;
    }, 8000);
  }
}

function removeActive(list) {
  list.forEach((item) => item.classList.remove("active"));
}

function handleActive(e) {
  e.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  e.target.classList.add("active");
}

function scrollToSelectedSection(links) {
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .querySelector(`.${e.target.getAttribute("data-section")}`)
        .scrollIntoView({
          behavior: "smooth",
        });
    });
  });
}
