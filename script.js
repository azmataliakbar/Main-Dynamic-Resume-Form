// Initialize textareas with bullets
function initializeTextareasWithBullets() {
  const textareas = ["education", "skills", "workExperience"].map(id => document.getElementById(id));
  textareas.forEach(textarea => {
    textarea.value = generateBullets(4);
    textarea.addEventListener("input", handleBulletInput);
  });
}

function generateBullets(rows) {
  return Array(rows).fill("• ").join("\n");
}

function handleBulletInput(event) {
  const lines = event.target.value.split("\n");
  event.target.value = lines.map(line => line.startsWith("") ? line : `• ${line.trim()}`).join("\n");
}

// Handle image upload
document.getElementById("imageUpload").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.getElementById("displayImage");
      img.src = e.target.result;
      img.classList.remove("hidden");
    };
    reader.readAsDataURL(file);
  }
});

// Handle form submission
document.getElementById("resumeForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const education = document.getElementById("education").value.split("\n").map(line => `<li>${line}</li>`).join("");
  const skills = document.getElementById("skills").value.split("\n").map(line => `<li>${line}</li>`).join("");
  const workExperience = document.getElementById("workExperience").value.split("\n").map(line => `<li>${line}</li>`).join("");

  const resumeContent = `
  <h1 style="text-align: center;"><strong><u>My Resume</u></strong></h1>
  <img src="${document.getElementById("displayImage").src}" alt="Profile Image" class="resume-image">
  <div class="resume-content">
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <h3>Education:</h3>
    <ul>${education}</ul>
    <h3>Skills:</h3>
    <ul>${skills}</ul>
    <h3>Work Experience:</h3>
    <ul>${workExperience}</ul>
  </div>
`;

document.getElementById("resume").innerHTML = resumeContent;

});

// Initialize the page
window.onload = initializeTextareasWithBullets;
