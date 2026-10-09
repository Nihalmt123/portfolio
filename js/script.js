// ========================================================
// 1. MOBILE NAVBAR & ACTIVE LINK LOGIC
// ========================================================
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("is-open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("is-open"));
  });
}

const sections = document.querySelectorAll("section[id]");
const menuAnchors = document.querySelectorAll(".nav__links a");

window.addEventListener("scroll", () => {
  let activeId = "";
  const scrollPos = window.scrollY + 100;

  sections.forEach((sec) => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    if (scrollPos >= top && scrollPos < top + height) {
      activeId = sec.getAttribute("id");
    }
  });

  menuAnchors.forEach((a) => {
    a.classList.toggle("is-active", a.getAttribute("href") === `#${activeId}`);
  });
});

// ========================================================
// 2. INTERACTIVE CONSTELLATION PARTICLES (HERO BACKGROUND)
// ========================================================
const canvas = document.getElementById("particlesCanvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 22), 65);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 1.8 + 0.8
    });
  }

  function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(245, 185, 66, 0.4)";
    ctx.strokeStyle = "rgba(245, 185, 66, 0.08)";

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
}

// ========================================================
// 3. SKILLS STACK FILTER LOGIC (SMOOTH & ACTIVE)
// ========================================================
function filterSkills(category, btn) {
  document.querySelectorAll(".skills-filter-bar .stack-filter-chip").forEach((chip) => {
    chip.classList.remove("is-active");
  });
  if (btn) btn.classList.add("is-active");

  const cards = document.querySelectorAll("#skillsGrid .tool-card");
  cards.forEach((card) => {
    const cardCat = card.getAttribute("data-category") || "";
    if (category === "all" || cardCat === category) {
      card.style.display = "block";
      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "scale(1)";
      }, 10);
    } else {
      card.style.opacity = "0";
      card.style.transform = "scale(0.95)";
      setTimeout(() => {
        card.style.display = "none";
      }, 250);
    }
  });
}

// ========================================================
// 4. INTERACTIVE RECRUITER TERMINAL CONSOLE
// ========================================================
const terminalInput = document.getElementById("terminalInput");
const terminalLog = document.getElementById("terminalLog");

const termCommands = {
  help: () => `
    <span style="color:#f5b942;">Available Commands:</span><br/>
    &bull; <strong>skills</strong>     : Display verified technical competencies<br/>
    &bull; <strong>projects</strong>   : List core software projects with repository links<br/>
    &bull; <strong>experience</strong> : Show Luminar Technolab internship info<br/>
    &bull; <strong>education</strong>  : Amal College / Calicut University details<br/>
    &bull; <strong>contact</strong>    : Direct email and phone information<br/>
    &bull; <strong>github</strong>     : Open github.com/Nihalmt123<br/>
    &bull; <strong>linkedin</strong>   : Open verified LinkedIn profile<br/>
    &bull; <strong>clear</strong>      : Clear console output
  `,
  skills: () => `
    <span style="color:#10b981;">[Primary Stack]:</span> Python, Django, PHP, Java, SQL, MySQL, MongoDB<br/>
    <span style="color:#10b981;">[Frontend]:</span> HTML5, CSS3, JavaScript, Bootstrap, Responsive Layouts<br/>
    <span style="color:#10b981;">[Mobile & Tools]:</span> Android Studio, Git, GitHub, REST Architecture
  `,
  projects: () => `
    1. <a href="https://github.com/Nihalmt123/Travel-and-Tourism-System" target="_blank" style="color:#f5b942; text-decoration:underline;">Travel &amp; Tourism System</a> (Python / Django &bull; SQLite3)<br/>
    2. <a href="https://github.com/Nihalmt123/Student-Record-Management-System" target="_blank" style="color:#f5b942; text-decoration:underline;">Student Record System</a> (PHP 8.2 &bull; MySQL)<br/>
    3. <a href="https://github.com/Nihalmt123/Blood-Donation-Sysytem" target="_blank" style="color:#f5b942; text-decoration:underline;">Blood Donation Network</a> (PHP &bull; MySQL)
  `,
  experience: () => `
    <strong>Python Programming Intern</strong> @ Luminar Technolab, Calicut, Kerala<br/>
    &bull; Duration: June 2026 (1 Month)<br/>
    &bull; Developed full-stack Django projects, ORM schemas, and SQLite3 database models.
  `,
  education: () => `
    <strong>B.Voc in Mobile Application Development</strong> (Currently 3rd Year)<br/>
    &bull; Institution: Amal College of Advanced Studies<br/>
    &bull; University: University of Calicut
  `,
  contact: () => `
    &bull; Phone: +91 8129 58 7568<br/>
    &bull; Direct Email: nihalmt.dev@gmail.com<br/>
    &bull; Location: Manjeri, Malappuram, Kerala
  `,
  github: () => {
    window.open("https://github.com/Nihalmt123", "_blank");
    return "Opening https://github.com/Nihalmt123 in a new tab...";
  },
  linkedin: () => {
    window.open("https://www.linkedin.com/in/mohammed-nihal-mt-a9a15a426", "_blank");
    return "Opening LinkedIn profile in a new tab...";
  },
  clear: () => {
    terminalLog.innerHTML = "";
    return "";
  }
};

function executeTermCmd(cmd) {
  const cleanCmd = cmd.trim().toLowerCase();
  if (!cleanCmd) return;

  const cmdLine = document.createElement("div");
  cmdLine.className = "term-line cmd";
  cmdLine.innerHTML = `nihal@dev:~$ ${cleanCmd}`;
  terminalLog.appendChild(cmdLine);

  if (cleanCmd === "clear") {
    terminalLog.innerHTML = "";
    return;
  }

  const outputLine = document.createElement("div");
  outputLine.className = "term-line output";

  if (termCommands[cleanCmd]) {
    outputLine.innerHTML = termCommands[cleanCmd]();
  } else {
    outputLine.innerHTML = `<span style="color:#ef4444;">Command not recognized: '${cleanCmd}'. Type 'help' for available options.</span>`;
  }

  terminalLog.appendChild(outputLine);
  terminalLog.scrollTop = terminalLog.scrollHeight;
}

if (terminalInput) {
  terminalInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      executeTermCmd(terminalInput.value);
      terminalInput.value = "";
    }
  });
}

// ========================================================
// 5. COPY TO CLIPBOARD
// ========================================================
function copyToClipboard(text, alertMsg) {
  navigator.clipboard.writeText(text).then(() => {
    const toast = document.getElementById("toastNotice");
    if (toast) {
      toast.textContent = alertMsg || "Copied to clipboard!";
      toast.classList.add("is-visible");
      setTimeout(() => {
        toast.classList.remove("is-visible");
      }, 2500);
    }
  }).catch(() => {
    alert("Copied: " + text);
  });
}

function handleProfileFallback(img) {
  const fallbacks = [
    "profile.png.PNG",
    "images/profile.png",
    "profile.png",
    "images/IMG_7019.PNG",
    "IMG_7019.PNG"
  ];
  if (!img.fallbackIndex) img.fallbackIndex = 0;
  if (img.fallbackIndex < fallbacks.length) {
    img.src = fallbacks[img.fallbackIndex];
    img.fallbackIndex++;
  } else {
    img.style.display = "none";
    const vector = document.getElementById("profileVector");
    if (vector) vector.style.display = "flex";
  }
}

// Dynamic Footer Year
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}