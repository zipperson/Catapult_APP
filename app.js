const tabs = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".tab-content");
const privacyOverlay = document.getElementById("privacyOverlay");
const agreePrivacy = document.getElementById("agreePrivacy");
const creditsDrawer = document.getElementById("creditsDrawer");
const openCredits = document.getElementById("openCredits");
const closeCredits = document.getElementById("closeCredits");
const bluetoothButton = document.getElementById("bluetoothButton");
const cadenceSelect = document.getElementById("cadenceSelect");
const basicSchedule = document.getElementById("basicSchedule");
const customSchedule = document.getElementById("customSchedule");

const activateTab = (targetId) => {
  tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === targetId);
  });
  tabContents.forEach((content) => {
    content.classList.toggle("active", content.id === targetId);
  });
};

tabs.forEach((tab) => {
  tab.addEventListener("click", () => activateTab(tab.dataset.tab));
});

const showPrivacy = () => {
  if (!localStorage.getItem("catapultPrivacyAccepted")) {
    privacyOverlay.classList.add("active");
    privacyOverlay.setAttribute("aria-hidden", "false");
  }
};

agreePrivacy.addEventListener("click", () => {
  localStorage.setItem("catapultPrivacyAccepted", "true");
  privacyOverlay.classList.remove("active");
  privacyOverlay.setAttribute("aria-hidden", "true");
});

openCredits.addEventListener("click", () => {
  creditsDrawer.classList.add("active");
  creditsDrawer.setAttribute("aria-hidden", "false");
});

closeCredits.addEventListener("click", () => {
  creditsDrawer.classList.remove("active");
  creditsDrawer.setAttribute("aria-hidden", "true");
});

bluetoothButton.addEventListener("click", () => {
  bluetoothButton.textContent = "Scanning for devices...";
  setTimeout(() => {
    bluetoothButton.textContent = "Bluetooth Ready";
  }, 1200);
});

const updateCadenceView = () => {
  if (!cadenceSelect || !basicSchedule || !customSchedule) {
    return;
  }
  const isCustom = cadenceSelect.value === "custom";
  basicSchedule.classList.toggle("hidden", isCustom);
  customSchedule.classList.toggle("hidden", !isCustom);
};

if (cadenceSelect) {
  cadenceSelect.addEventListener("change", updateCadenceView);
  updateCadenceView();
}

showPrivacy();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js");
  });
}
