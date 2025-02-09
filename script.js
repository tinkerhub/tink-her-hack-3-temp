// Function to add items to the list
function addItem(section) {
    const input = document.getElementById(`${section}-input`);
    const list = document.getElementById(`${section}-list`);
    const value = input.value.trim();
    if (value) {
      const li = document.createElement("li");
      li.textContent = value;
      list.appendChild(li);
      input.value = "";
    }
  }
  
  document.getElementById("download-resume").addEventListener("click", async () => {
    const { jsPDF } = window.jspdf;
  
    // Gather input values
    const name = document.getElementById("name").value || "Your Name";
    const phone = document.getElementById("phone").value || "Your Phone";
    const email = document.getElementById("email").value || "Your Email";
    const address = document.getElementById("address").value || "Your Address";
    const birthday = document.getElementById("birthday").value || "Your Birthday";
  
    const objective = Array.from(document.querySelectorAll("#objective-list li")).map(li => li.textContent);
    const technicalSkills = Array.from(document.querySelectorAll("#technical-skills-list li")).map(li => li.textContent);
    const personalSkills = Array.from(document.querySelectorAll("#personal-skills-list li")).map(li => li.textContent);
    const education = Array.from(document.querySelectorAll("#education-list li")).map(li => li.textContent);
    const achievements = Array.from(document.querySelectorAll("#achievements-list li")).map(li => li.textContent);
    const experience = Array.from(document.querySelectorAll("#experience-list li")).map(li => li.textContent);
  
    const profileImage = document.getElementById("image-upload").files[0];
  
    // Initialize PDF
    const pdf = new jsPDF();
    let yPosition = 20;
  
    // Header Section
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(22);
    pdf.text(name, 105, yPosition, { align: "center" });
  
    // Add profile image
    if (profileImage) {
      const imageURL = URL.createObjectURL(profileImage);
      const img = new Image();
      img.src = imageURL;
      await new Promise(resolve => {
        img.onload = () => {
          pdf.addImage(img, "JPEG", 10, yPosition - 15, 30, 30); // Adjust position and size
          resolve();
        };
      });
    }
  
    // Add contact information
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");
    yPosition += 10;
    pdf.text(`Phone: ${phone} | Email: ${email}`, 105, yPosition + 5, { align: "center" });
    pdf.text(`Address: ${address} | Birthday: ${birthday}`, 105, yPosition + 15, { align: "center" });
  
    // Horizontal line
    yPosition += 25;
    pdf.setDrawColor(200, 200, 200); // Light gray line
    pdf.line(10, yPosition, 200, yPosition);
  
    // Function to add a section
    function addSection(title, items) {
      if (items.length === 0) return;
  
      yPosition += 10;
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(16);
      pdf.text(title, 10, yPosition);
  
      yPosition += 10;
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(12);
  
      items.forEach(item => {
        if (yPosition > 270) { // Avoid page overflow
          pdf.addPage();
          yPosition = 20;
        }
        pdf.text(`• ${item}`, 15, yPosition);
        yPosition += 8;
      });
  
      // Draw line below the section
      yPosition += 5;
      pdf.setDrawColor(200, 200, 200);
      pdf.line(10, yPosition, 200, yPosition);
    }
  
    // Add sections
    addSection("Career Objective", objective);
    addSection("Technical Skills", technicalSkills);
    addSection("Personal Skills", personalSkills);
    addSection("Education", education);
    addSection("Achievements", achievements);
    addSection("Professional Experience", experience);
  
    // Footer
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "italic");
    pdf.text("Generated using Resume Builder", 105, 290, { align: "center" });
  
    // Save the PDF
    pdf.save(`${name.replace(/\s/g, "_")}_Resume.pdf`);
  });