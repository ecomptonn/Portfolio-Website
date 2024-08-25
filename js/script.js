document.addEventListener("scroll", () => {
    const header = document.querySelector("#header");
    const sections = document.querySelectorAll("main section");
    const navLinks = document.querySelectorAll(".nav-right-a");

    if (window.scrollY > 0) {
        header.classList.add("fixed-header");
        header.classList.remove("transparent-header");
        document.querySelectorAll(".nav-right-a").forEach((element) => {
            element.style.marginTop = "22px";
            element.style.marginBottom = "22px";
        });
    } else {
        header.classList.remove("fixed-header");
        header.classList.add("transparent-header");
        document.querySelectorAll(".nav-right-a").forEach((element) => {
            element.style.marginTop = "50px";
            element.style.marginBottom = "50px";
        });
    }

    let currentSection = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (
            pageYOffset >= sectionTop - sectionHeight / 3 &&
            pageYOffset < sectionTop + sectionHeight - sectionHeight / 3
        ) {
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
