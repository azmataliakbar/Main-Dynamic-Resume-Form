// Helper function to assert the existence of an HTML element
function getElementById<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Element with id '${id}' not found.`);
  }
  return element as T;
}

// Initialize textareas with bullets
function initializeTextareasWithBullets(): void {
  const textareas = ["education", "skills", "workExperience"].map(id =>
    getElementById<HTMLTextAreaElement>(id)
  );

  textareas.forEach(textarea => {
    textarea.value = generateBullets(4);
    textarea.addEventListener("input", handleBulletInput);
  });
}

function generateBullets(rows: number): string {
  return Array(rows).fill("• ").join("\n");
}

function handleBulletInput(event: Event): void {
  const target = event.target as HTMLTextAreaElement;
  const lines = target.value.split("\n");
  target.value = lines
    .map(line => (line.startsWith("• ") ? line : `• ${line.trim()}`))
    .join("\n");
}

// Handle image upload
getElementById<HTMLInputElement>("imageUpload").addEventListener("change", function () {
  const file = this.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e: ProgressEvent<FileReader>) {
      const img = getElementById<HTMLImageElement>("displayImage");
      if (e.target?.result) {
        img.src = e.target.result as string;
        img.classList.remove("hidden");
      }
    };
    reader.readAsDataURL(file);
  }
});

// Handle form submission
getElementById<HTMLFormElement>("resumeForm").addEventListener("submit", function (event: Event) {
  event.preventDefault();

  const name = getElementById<HTMLInputElement>("name").value;
  const email = getElementById<HTMLInputElement>("email").value;
  const phone = getElementById<HTMLInputElement>("phone").value;
  const education = getElementById<HTMLTextAreaElement>("education").value
    .split("\n")
    .map(line => `<li>${line}</li>`)
    .join("");
  const skills = getElementById<HTMLTextAreaElement>("skills").value
    .split("\n")
    .map(line => `<li>${line}</li>`)
    .join("");
  const workExperience = getElementById<HTMLTextAreaElement>("workExperience").value
    .split("\n")
    .map(line => `<li>${line}</li>`)
    .join("");

  const resumeContent = `
    <h1 style="text-align: center;"><strong><u>My Resume</u></strong></h1>
    <img src="${getElementById<HTMLImageElement>("displayImage").src}" alt="Profile Image" class="resume-image">
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

  getElementById<HTMLDivElement>("resume").innerHTML = resumeContent;
});

// Initialize the page
window.onload = initializeTextareasWithBullets;
