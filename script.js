// Function to update horoscope section dynamically
function updateHoroscope(zodiacs) {
  zodiacs.forEach((zodiac) => {
    let zodiacDiv = document.getElementById(zodiac.id);
    if (zodiacDiv) {
      zodiacDiv.querySelector("p").textContent = zodiac.prediction;
    }
  });
}

// Theme toggle function
function toggleTheme() {
  document.documentElement.classList.toggle("dark-theme");
  localStorage.setItem("theme", document.documentElement.classList.contains("dark-theme") ? "dark" : "light");
}

// Function to capture and download the horoscope as an image
function downloadHoroscope() {
  const container = document.getElementById("horoscope-container");

  html2canvas(container, {
    scale: 2, // Increase scale factor (3x resolution for sharpness)
    // useCORS: true, // Handle cross-origin images if needed
  }).then((canvas) => {
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "horoscope.png";
    link.click();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Load and apply saved theme
  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark-theme");
  }

  // Fetch zodiac data
  fetch("zodiac.json")
    .then((response) => response.json())
    .then((data) => updateHoroscope(data.zodiacs))
    .catch((error) => console.error("Error loading zodiac data:", error));

  //Update Date
  const dateElement = document.querySelector(".date");
  if (dateElement) {
    const today = new Date();
    const formattedDate =
      today.getDate().toString().padStart(2, "0") + "/" + (today.getMonth() + 1).toString().padStart(2, "0") + "/" + today.getFullYear().toString().slice(-2);
    dateElement.textContent = `ההורוסקופ של:  ${formattedDate}`;
  }
});

// Attach event to theme toggle button
document.getElementById("theme-toggle").addEventListener("click", toggleTheme);

// Attach event listener to the button
document.getElementById("download-horoscope").addEventListener("click", downloadHoroscope);
