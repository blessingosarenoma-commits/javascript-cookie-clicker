let gameState = {
  cookies: 0,
  totalClicks: 0,
  cookiesPerSecond: 0,
  clickPower: 1,
  achievements: new Set(["welcome"]),
};
const cookie = document.getElementById("cookie");
const cookieCountEl = document.getElementById("cookieCount");
const cpsEl = document.getElementById("cps");
const totalClicksEl = document.getElementById("totalClicks");
const achievementsEl = document.getElementById("achievementsList");
const achievements = {
  welcome: {
    name: "Welcome!",
    desc: "Click your first cookie",
    unlocked: true,
  },
  baker: { name: "Baker", desc: "Bake 50 cookies", threshold: 50 },
  chef: { name: "Chef", desc: "Bake 5,000 cookies", threshold: 5000 },
  master: {
    name: "Cookie Master",
    desc: "Bake 100,000 cookies",
    threshold: 50000,
  },
  clicker: {
    name: "Dedicated Clicker",
    desc: "Click 50 times",
    clickThreshold: 50,
  },
  automation: {
    name: "Automation Expert",
    desc: "Own 10 buildings",
    buildingThreshold: 10,
  },
};
cookie.addEventListener("click", (e) => {
  const clickValue = gameState.clickPower;
  gameState.cookies += clickValue;
  gameState.totalClicks++;

  showFloatingNumber(e, `+${clickValue}`);

  cookie.style.transform = "scale(0.95)";
  setTimeout(() => {
    cookie.style.transform = "scale(1)";
  }, 100);

  updateDisplay();
  checkAchievements();
});
function showFloatingNumber(e, text) {
  const floatingEl = document.createElement("div");
  floatingEl.className = "floating-number";
  floatingEl.textContent = text;
  floatingEl.style.left = e.clientX + "px";
  floatingEl.style.top = e.clientY + "px";
  floatingEl.style.animation = "float 1s ease-out forwards";

  document.body.appendChild(floatingEl);

  setTimeout(() => {
    document.body.removeChild(floatingEl);
  }, 1000);
}
Object.keys(gameState.upgrades).forEach((upgradeType) => {
  const upgradeEl = document.getElementById(upgradeType);
  upgradeEl.addEventListener("click", () => purchaseUpgrade(upgradeType));
});

function purchaseUpgrade(type) {
  const upgrade = gameState.upgrades[type];

  if (gameState.cookies >= upgrade.cost) {
    gameState.cookies -= upgrade.cost;
    upgrade.count++;
    upgrade.cost = Math.ceil(upgrade.cost * 1.15);

    updateCookiesPerSecond();
    updateClickPower();
    updateDisplay();
    checkAchievements();
  }
}

function updateCookiesPerSecond() {
  gameState.cookiesPerSecond = 0;
  Object.values(gameState.upgrades).forEach((upgrade) => {
    gameState.cookiesPerSecond += upgrade.count * upgrade.cps;
  });
}

function updateClickPower() {
  gameState.clickPower = 1;
  Object.values(gameState.upgrades).forEach((upgrade) => {
    gameState.clickPower += upgrade.count * upgrade.clickBonus;
  });
}

function updateDisplay() {
  cookieCountEl.textContent = Math.floor(gameState.cookies).toLocaleString();
  cpsEl.textContent = gameState.cookiesPerSecond.toLocaleString();
  totalClicksEl.textContent = gameState.totalClicks.toLocaleString();

  Object.keys(gameState.upgrades).forEach((type) => {
    const upgrade = gameState.upgrades[type];
    const upgradeEl = document.getElementById(type);
    const costEl = document.getElementById(`${type}Cost`);
    const countEl = document.getElementById(`${type}Count`);

    costEl.textContent = upgrade.cost.toLocaleString();
    countEl.textContent = upgrade.count.toLocaleString();
    if (gameState.cookies < upgrade.cost) {
      upgradeEl.classList.add("disabled");
    } else {
      upgradeEl.classList.remove("disabled");
    }
  });
}
