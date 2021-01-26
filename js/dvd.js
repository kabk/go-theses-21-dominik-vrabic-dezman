window.addEventListener("DOMContentLoaded", (event) => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  (() => {
    document.querySelector(".slide.cover").style.background = `radial-gradient(
    circle at ${20 + Math.random() * 80}%,
    rgb(6, 9, 97),
    #000a30 ${20 + Math.random() * 50}%,
    #0719a2 ${20 + Math.random() * 50}%,
    #000a30 ${20 + Math.random() * 50}%`;
  })();

  const image = document.querySelectorAll("figure img");

  const darkSelector = document.querySelectorAll(".mode--dark");

  const body = document.querySelector("body");

  const thesisTitle = document.querySelector(".thesis-title");

  const windowHeight = window.innerHeight;

  const tocButton = document.querySelector(".TOC-button");

  const abstractDistanceFromTop =
    window.pageYOffset +
    document.querySelector("#section-abstract").getBoundingClientRect().top;

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

  let userIsScrolling;

  let lastScroll = 0;

  let timeoutActive = 0;

  const simulateClick = (elem) => {
    // Create our event (with options)
    const evt = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    });

    elem.dispatchEvent(evt);

    // If cancelled, don't dispatch our event
    let canceled = !elem.dispatchEvent(evt);
  };

  tocButton.addEventListener("click", () => {
    simulateClick(body);
  });

  window.addEventListener("scroll", () => {
    window.clearTimeout(userIsScrolling);

    const tocWrapper = document.querySelector(".toc-wrapper");

    const currentScroll = document.documentElement.scrollTop;

    const tocOffsetTop =
      window.pageYOffset +
      document.querySelector(".table-of-contents").getBoundingClientRect().top;

    let st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"

    // Scrolling indicator
    userIsScrolling = setTimeout(() => {
      tocButton.classList.remove("hidden");
    }, 5000);

    if (
      currentScroll > abstractDistanceFromTop - 200 &&
      currentScroll < abstractDistanceFromTop
    ) {
      tocButton.classList.remove("hidden");
    }

    // Scrolling direction indicator
    if (st > lastScroll) {
      // scrolling down

      if (currentScroll > abstractDistanceFromTop + 200) {
        tocButton.classList.add("hidden");
      }
    } else {
      // scrolling up

      if (currentScroll > abstractDistanceFromTop) {
        tocButton.classList.remove("hidden");
      }
    }

    if (currentScroll < abstractDistanceFromTop - 200) {
      tocButton.classList.add("hidden");
    }

    lastScroll = st <= 0 ? 0 : st;

    let allSections = document.querySelectorAll("section");

    for (i = 0; i < allSections.length; i++) {
      let viewportOffset = allSections[i].getBoundingClientRect();
      let top = viewportOffset.top;
      let bottom = viewportOffset.bottom;

      let elDistanceToTop =
        window.pageYOffset + allSections[i].getBoundingClientRect().top;

      let elDistanceToBottom =
        window.pageYOffset + allSections[i].getBoundingClientRect().bottom;

      // add -5 here for TOC button switch
      if (
        currentScroll > elDistanceToTop - 5 &&
        currentScroll < elDistanceToBottom
      ) {
        let scrolltoTop = elDistanceToBottom - currentScroll;

        if (allSections[i].classList.contains("mode--dark")) {
          body.classList.add("dark-mood");
        } else {
          body.classList.remove("dark-mood");
        }

        let distanceToTravel = elDistanceToBottom - elDistanceToTop;

        document.querySelector(".progress-shape").style.width = `${
          (scrolltoTop / distanceToTravel) * 100
        }%`;

        let currentHeaderHTML = allSections[i].querySelector("h2")?.innerHTML;

        if (currentHeaderHTML != undefined) {
          document.querySelector(".TOC-button p").innerHTML = currentHeaderHTML;
        }
      } else if (currentScroll < tocOffsetTop) {
        document.querySelector(".TOC-button p").innerHTML = "";
      }
    }

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
});
