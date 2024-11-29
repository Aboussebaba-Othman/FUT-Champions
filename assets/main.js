
function switchForm() {
    const position = document.getElementById('position').value;
    const playerFields = document.getElementById('player'); 
    const goalkeeperFields = document.getElementById('goalkeeper'); 
    
    if (position === 'GK') {
        playerFields.classList.add('hidden'); 
        goalkeeperFields.classList.remove('hidden'); 
    } else {
        playerFields.classList.remove('hidden'); 
        goalkeeperFields.classList.add('hidden'); 
    }
    
}
function previewPhoto(event, previewId) {
    const file = event.target.files[0]; 
    const preview = document.getElementById(previewId); 
    const reader = new FileReader();

    if (file) {
       
        reader.onload = function () {
            preview.innerHTML = ''; 
            const img = document.createElement('img'); 
            img.src = reader.result; 
            img.alt = "Preview"; 
            img.classList.add('w-full', 'h-full', 'object-cover'); 
            preview.appendChild(img);
        };
        reader.readAsDataURL(file); 
    } else {
        preview.innerHTML = '<span class="text-gray-500 text-sm">No Image</span>';
    }
}


function validateForm(form) {
    const requiredFields = ['name', 'photo', 'flag'];
    const numberFields = ['rating', 'pace', 'shooting', 'passing', 'dribbling', 'defending', 'physical'];

    let isValid = true;

    [...form.elements].forEach(input => {
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = '';
        }
    });

    // Validate required fields
    requiredFields.forEach(field => {
        const input = form[field];
        if (!input.value.trim()) {
            showError(input, `${field} is required.`);
            isValid = false;
        }
    });

    // Validate number fields
    numberFields.forEach(field => {
        const input = form[field];
        const value = input.value.trim();
        if (!value || isNaN(value) || value < 0 || value > 100) {
            showError(input, `${field} must be a number between 0 and 100.`);
            isValid = false;
        }
    });

    if (isValid) {
        const successMessage = document.getElementById('success-message');
        successMessage.textContent = 'Player added successfully!';
        successMessage.style.color = 'green';
    }

    return isValid;
}

function showError(input, message) {
    let errorElement = input.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = document.createElement('span');
        errorElement.classList.add('error-message');
        errorElement.style.color = 'red';
        errorElement.style.fontSize = '12px';
        input.parentNode.insertBefore(errorElement, input.nextSibling);
    }
    errorElement.textContent = message;
}

document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (validateForm(this)) {
            this.submit();
        }
    });
});


function addPlayer() {
    const name = document.getElementsByClassName("name").value.trim();
    const position = document.getElementById("playerPosition").value;
    const pace = document.getElementById("pace").value;
    const shooting = document.getElementById("shooting").value;
    const imageInput = document.getElementById("uploadImage");
    const imageFile = imageInput.files[0];

   
    if (!name || !position || !pace || !shooting || !imageFile) {
        alert("Please fill out all fields!");
        return;
    }
    const playersList = document.getElementById("playersList");
    const playerCard = document.createElement("div");
    playerCard.className =
        "bg-gray-800 p-4 rounded-md shadow-md flex items-center gap-4";

  
    const reader = new FileReader();
    reader.onload = function (event) {
        const playerImage = document.createElement("img");
        playerImage.src = event.target.result;
        playerImage.alt = name;
        playerImage.className = "w-16 h-16 rounded-md";
        playerCard.appendChild(playerImage);
    };
    reader.readAsDataURL(imageFile);
    const playerInfo = document.createElement("div");
    playerInfo.className = "text-white";
    playerInfo.innerHTML = `
        <h3 class="font-bold">${name}</h3>
        <p>Position: ${position}</p>
        <p>Pace: ${pace}</p>
        <p>Shooting: ${shooting}</p>
    `;
    playerCard.appendChild(playerInfo);
    playersList.appendChild(playerCard);
    document.getElementById("playerForm").reset();
}
