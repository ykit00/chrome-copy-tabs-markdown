const copyButton = document.getElementById("copy");
const statusEl = document.getElementById("status");

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.style.color = isError ? "#b00020" : "#555";
}

function formatMarkdownList(tabs) {
  return tabs
    .map((tab) => {
      const title = tab.title || "";
      const url = tab.url || "";
      return `- [${title}](${url})`;
    })
    .join("\n");
}

copyButton.addEventListener("click", async () => {
  setStatus("Copying...");

  try {
    const tabs = await chrome.tabs.query({ currentWindow: true });
    const text = formatMarkdownList(tabs) + "\n";
    await navigator.clipboard.writeText(text);
    setStatus("Copied to clipboard.");
  } catch (error) {
    setStatus("Failed to copy.", true);
  }
});
