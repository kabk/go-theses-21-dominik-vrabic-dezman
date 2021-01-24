window.addEventListener("DOMContentLoaded", (event) => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // TODO: play around with the numbers to get a good-looking result
  (() => {
    document.querySelector(".slide.cover").style.background = `radial-gradient(
    circle at ${20 + Math.random() * 80}%,
    rgb(6, 9, 97),
    #000a30 ${20 + Math.random() * 50}%,
    #0719a2 ${20 + Math.random() * 50}%,
    #000a30 ${20 + Math.random() * 50}%`;
  })();

  document.querySelector("nav").addEventListener("click", function () {
    this.classList.toggle("active");
  });

  const image = document.querySelectorAll("figure img");

  const darkSelector = document.querySelectorAll(".mode--dark");

  const body = document.querySelector("body");

  const thesisTitle = document.querySelector(".thesis-title");

  const windowHeight = window.innerHeight;

  // TODO: remove it jittery from the cover page
  const tocButton = document.querySelector(".TOC-button");
  tocButton.classList.add("no-box");

  const abstractDistanceFromTop = document
    .querySelector("#section-abstract")
    .getBoundingClientRect().top;

  tocButton.addEventListener("click", () => {
    body.classList.remove("dark-mood");
  });

  const thesisWords = thesisTitle.innerHTML.split(" ");

  const fontChoices = [
    "Redaction 10",
    "Redaction 20",
    "Redaction 35",
    "Redaction 50",
    "Redaction 70",
    "Redaction 100",
  ];

  window.addEventListener("scroll", () => {
    const currentScroll = document.documentElement.scrollTop;

    let allSectionHeaders = document.querySelectorAll("section");

    const tocOffsetTop =
      window.pageYOffset +
      document.querySelector(".table-of-contents").getBoundingClientRect().top;

    for (i = 0; i < allSectionHeaders.length; i++) {
      let viewportOffset = allSectionHeaders[i].getBoundingClientRect();
      let top = viewportOffset.top;
      let bottom = viewportOffset.bottom;

      let elDistanceToTop =
        window.pageYOffset + allSectionHeaders[i].getBoundingClientRect().top;

      let elDistanceToBottom =
        window.pageYOffset +
        allSectionHeaders[i].getBoundingClientRect().bottom;

      if (currentScroll < abstractDistanceFromTop + windowHeight) {
        console.log(windowHeight);
        tocButton.classList.add("no-box");
        body.classList.remove("dark-mood");
      } else {
        tocButton.classList.remove("no-box");
      }

      if (
        currentScroll > elDistanceToTop &&
        currentScroll < elDistanceToBottom
      ) {
        let scrolltoTop = elDistanceToBottom - currentScroll;

        let distanceToTravel = elDistanceToBottom - elDistanceToTop;

        document.querySelector(".progress-shape").style.width = `${
          (scrolltoTop / distanceToTravel) * 100
        }%`;

        document.querySelector(".TOC-button p").innerHTML = allSectionHeaders[
          i
        ].querySelector("h2, h3")?.innerHTML;
      } else if (currentScroll < tocOffsetTop) {
        document.querySelector(".TOC-button p").innerHTML = "";
      }

      // if (top > 0 && top < 20) {
      //   document.querySelector(".TOC-button p").innerHTML = allSectionHeaders[
      //     i
      //   ].querySelector("h2, h3")?.innerHTML;
      // } else if (top < 0 && top > -20) {
      //   document.querySelector(".TOC-button p").innerHTML = allSectionHeaders[
      //     i
      //   ].querySelector("h2, h3")?.innerHTML;
      // }
    }

    // console.log(elDistanceToTop);

    // if ((currentScroll) => elDistanceToTop && currentScroll <= bottom) {
    //   document.querySelector(".TOC-button p").innerHTML = header.innerHTML;
    // }

    darkSelector.forEach((chapter) => {
      let viewportOffset = chapter.getBoundingClientRect();

      let top = viewportOffset.top;
      let bottom = viewportOffset.bottom;

      if (top % 20 > 1 && top % 20 < 2) {
        let newWordsHtml = thesisWords.map(
          (word) =>
            `<span style="font-family:'${
              fontChoices[Math.floor(Math.random() * fontChoices.length)]
            }'">${word}</span>`
        );

        thesisTitle.innerHTML = newWordsHtml.join(" ");
      }

      // different character style each time

      if (top <= windowHeight * 0.3 && top > 0) {
        body.classList.add("dark-mood");
        tocButton.classList.add("no-shadow");
      } else if (top >= windowHeight * 0.3 && top < windowHeight && top > 0) {
        body.classList.remove("dark-mood");
        tocButton.classList.remove("no-shadow");
      } else if (bottom <= windowHeight * 0.3 && bottom >= 0) {
        body.classList.remove("dark-mood");
        tocButton.classList.remove("no-shadow");
      } else if (bottom >= windowHeight * 0.3 && bottom < windowHeight) {
        body.classList.add("dark-mood");
        tocButton.classList.add("no-shadow");
      }
    });

    image.forEach((item) => {
      let viewportOffset = item.getBoundingClientRect();
      // these are relative to the viewport, i.e. the window
      let top = viewportOffset.top;
      let bottom = viewportOffset.bottom;
      let left = viewportOffset.left;

      if (top <= windowHeight * 0.7) {
        item.classList.add("unblur");
      } else if (top >= windowHeight / 2) {
        item.classList.remove("unblur");
      }

      if (bottom <= windowHeight * 0.3) {
        item.classList.remove("unblur");
      }
    });
  });

  // only unblur the images in the viewport

  // add progress indicator for the reading
});
