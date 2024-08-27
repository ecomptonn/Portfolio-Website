document.addEventListener("scroll", () => {
    const header = document.querySelector("#header");
    const sections = document.querySelectorAll("main section");
    const navLinks = document.querySelectorAll(".nav-right-a");

    if (window.scrollY > 0) {
        header.classList.add("fixed-header");
        header.classList.remove("transparent-header");
        navLinks.forEach((element) => {
            element.style.marginTop = "22px";
            element.style.marginBottom = "22px";
        });
    } else {
        header.classList.remove("fixed-header");
        header.classList.add("transparent-header");
        navLinks.forEach((element) => {
            element.style.marginTop = "50px";
            element.style.marginBottom = "50px";
        });
    }

    let currentSection = "";
    const viewportCenter = window.innerHeight / 2 + window.scrollY;

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionCenter = sectionTop + sectionHeight / 2;

        if (Math.abs(viewportCenter - sectionCenter) < sectionHeight / 2) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(currentSection)) {
            link.classList.add("active");
        }
    });
});

/*----------------
 TYPER & CURSOR
 -----------------*/

const Cursor = function (element) {
    this.element = element;
    this.cursorDisplay =
        element.dataset.cursordisplay || element.dataset.cursorDisplay || "_";
    element.innerHTML = this.cursorDisplay;
    this.on = true;
    element.style.transition = "all 0.1s";
    this.interval = setInterval(() => this.updateBlinkState(), 400);
};

Cursor.prototype.updateBlinkState = function () {
    if (this.on) {
        this.element.style.opacity = "0";
        this.on = false;
    } else {
        this.element.style.opacity = "1";
        this.on = true;
    }
};

Cursor.prototype.startBlinking = function () {
    if (!this.interval) {
        this.interval = setInterval(() => this.updateBlinkState(), 400);
    }
};

Cursor.prototype.stopBlinking = function () {
    if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
        this.element.style.opacity = "1";
    }
};

document.addEventListener("DOMContentLoaded", function () {
    const phrases = [
        "Web Developer",
        "Full-Stack Engineer",
        "Open Source Contributor",
        "Software Engineer",
    ];
    const typerElement = document.getElementById("typer");
    const cursorElement = document.getElementById("cursor");
    let phraseIndex = 0;
    let letterIndex = 0;
    const typingSpeed = 100; // milliseconds per letter
    const erasingSpeed = 50; // milliseconds per letter
    const delayBetweenPhrases = 2000; // milliseconds

    const cursor = new Cursor(cursorElement);

    function type() {
        cursor.stopBlinking();
        if (letterIndex < phrases[phraseIndex].length) {
            typerElement.textContent +=
                phrases[phraseIndex].charAt(letterIndex);
            letterIndex++;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(erase, delayBetweenPhrases);
        }
        cursor.startBlinking();
    }

    function erase() {
        cursor.stopBlinking();
        if (letterIndex > 0) {
            typerElement.textContent = phrases[phraseIndex].substring(
                0,
                letterIndex - 1
            );
            letterIndex--;
            setTimeout(erase, erasingSpeed);
        } else {
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(type, typingSpeed);
        }
    }

    type();
});
