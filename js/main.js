const header = document.querySelector("header");
const FEEDBACK_FORM = document.querySelector("#talk-form");
// const menu = document.querySelector(".menu");
// const toggleItem = document.querySelector(".burger-menu");
const getCvBtn = document.querySelectorAll(".getCvBtn");

/* Header change background color*/

window.addEventListener("scroll", function changeBgcolor() {
  if (this.scrollY > 100) {
    header.style.backgroundColor = "#1A191A";
    header.style.transitionDuration = "0.5s";
  } else {
    header.style.backgroundColor = "transparent";
  }
});

/* Overkin skills in HTML */

// progressbar

let skillsContainer = document.getElementById("skills");
let progressStarted = false;

let skills = [
  {
    skillName: "HTML5",
    skillValue: 85,
  },
  {
    skillName: "CSS3",
    skillValue: 75,
  },
  {
    skillName: "JavaScript",
    skillValue: 60,
  },
  {
    skillName: "SQL",
    skillValue: 70,
  },
  {
    skillName: "ReactJS",
    skillValue: 30,
  },
  {
    skillName: "Python",
    skillValue: 65,
  },
];

let speed = 40;

for (let i = 0; i < skills.length; i++) {
  let progressContainer = document.createElement("div");
  progressContainer.className = "progress-container";

  let circleProgress = document.createElement("div");
  circleProgress.className = "circle-progress";

  let progressValue = document.createElement("span");
  progressValue.className = "progress-value";
  progressValue.textContent = "0%";

  let skillText = document.createElement("span");
  skillText.className = "skill-text";
  skillText.textContent = skills[i].skillName;

  progressContainer.appendChild(circleProgress);
  progressContainer.appendChild(progressValue);
  progressContainer.appendChild(skillText);

  skillsContainer.appendChild(progressContainer);

  let progressStartValue = 0;
  let progressEndValue = skills[i].skillValue;

  let progress = setInterval(() => {
    progressStartValue++;
    progressValue.textContent = `${progressStartValue}%`;
    circleProgress.style.background = `conic-gradient(#ff6333 ${
      progressStartValue * 3.6
    }deg, #928A97 0deg)`;

    if (progressStartValue === progressEndValue) {
      clearInterval(progress);
    }
  }, speed);

  // Проверяем текущую позицию прокрутки страницы
  window.addEventListener("scroll", () => {
    let scrollPosition = this.scrollY;
    if (scrollPosition > 2450 && !progressStarted) {
      // Запускаем анимацию прогрессбара, если позиция прокрутки больше 2450 и прогрессбар еще не был запущен
      progressStartValue = 0;
      progressEndValue = skills[i].skillValue;
      progressValue.textContent = "0%";
      circleProgress.style.background = `conic-gradient(#928A97 0deg, #ff6333 0deg)`;
      clearInterval(progress);
      progress = setInterval(() => {
        progressStartValue++;
        progressValue.textContent = `${progressStartValue}%`;
        circleProgress.style.background = `conic-gradient(#ff6333 ${
          progressStartValue * 3.6
        }deg, #928A97 0deg)`;

        if (progressStartValue === progressEndValue) {
          clearInterval(progress);
        }
      }, speed);
      progressStarted = true;
    }
  });
}

// Sending contacts by email

function sendFeedback(feedback) {
  fetch("/api/feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(feedback),
    mode: "cors",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert("Успешно!");
    })
    .catch((error) => {
      console.error(error);
      alert("Ошибка");
    });
}

FEEDBACK_FORM.addEventListener("submit", (e) => {
  e.preventDefault();
  const feedbackFormData = new FormData(e.target);
  console.log("feedbackFormData", feedbackFormData);
  const feedback = Object.fromEntries(feedbackFormData);
  console.log("feedback", feedback);

  sendFeedback(feedback);
});

// ==========Burger menu========

// toggleItem.addEventListener("click", () => {
//   menu.style.display = "block";
//   menu.style.width = "100vw";
//   menu.style.height = "100vw";
//   menu.style.position = "absolute";
// });

// =========Download Cv===============

getCvBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const url = event.currentTarget.href;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(text);
        });
      }
      return response.blob();
    })
    .then((blob) => {
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = downloadUrl;
      a.download = "cv.jpg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(downloadUrl);
    })
    .catch((error) => alert(`Error: ${error.message}`));
});
