function saveOptions(e) {
  chrome.storage.local.set({
    ip: document.querySelector("#ip").value
  });
  chrome.storage.local.set({
    port: document.querySelector("#port").value
  });
  chrome.storage.local.set({
    user: document.querySelector("#user").value
  });
  chrome.storage.local.set({
    password: document.querySelector("#password").value
  });
}

function restoreOptions() {
  chrome.storage.local.get("ip", (res) => {
    document.querySelector("#ip").value = res.ip || "127.0.0.1";
  });
  chrome.storage.local.get("port", (res) => {
    document.querySelector("#port").value = res.port || "9091";
  });
  chrome.storage.local.get("user", (res) => {
    document.querySelector("#user").value = res.user || "admin";
  });
  chrome.storage.local.get("password", (res) => {
    document.querySelector("#password").value = res.password || "";
  });
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
