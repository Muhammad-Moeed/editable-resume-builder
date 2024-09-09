"use strict";

document.getElementById("resumeForm")?.addEventListener('submit', function (event) {
    event.preventDefault();
    // Get Reference to form elements using their IDs
    const profilePictureInput = document.getElementById('profilePicture');
    const nameElement = document.getElementById('name');
    const emailElement = document.getElementById('email');
    const phoneElement = document.getElementById('phone');
    const educationElement = document.getElementById('education');
    const experienceElement = document.getElementById('experience');
    const skillsElement = document.getElementById('skills'); // Make sure the ID matches
    if (profilePictureInput && nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement) {
        const name = nameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skills = skillsElement.value;
        // Picture Element 
        const profilePictureFile = profilePictureInput.files?.[0];
        const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : '';
        // Create Resume Output
        const resumeOutput = `
            <h2>Resume</h2>
            ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture" style="width: 150px; height: 150px;">` : ''}
            <p><strong>Name:</strong><span id="edit-name" class="editable"> ${name}</span></p>
            <p><strong>Email:</strong><span id="edit-edit" class="editable"> ${email}</span></p>
            <p><strong>Phone:</strong><span id="edit-phone" class="editable"> ${phone}</span></p>

            <h3>Education:</h3>
            <p id="edit-education" class="editable">${education}</p>

            <h3>Experience:</h3>
            <p id="edit-experience" class="editable">${experience}</p>

            <h3>Skills:</h3>
            <p id="edit-skills" class="editable">${skills}</p>
        `;
        // Insert generated resume into HTML
        const resumeOutputElement = document.getElementById('resumeOutput');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
            makeEditable();
        }
    }
    else {
        console.error('One or more form elements are missing.');
    }
});
function makeEditable() {
    const editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(element => {
        element.addEventListener('click', function () {
            const currentElement = element;
            const currentValue = currentElement.textContent || "";
            //Replace Content
            if (currentElement.tagName === "p" || currentElement.tagName === 'SPAN') {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = currentValue;
                input.classList.add('editing-input');
                input.addEventListener('blur', function () {
                    currentElement.textContent = input.value;
                    currentElement.style.display = 'inline';
                    input.remove();
                });
                currentElement.style.display = 'none';
                currentElement.parentNode?.insertBefore(input, currentElement);
                input.focus();
            }
        });
    });
}
