
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
    const requiredFields = ['name', 'photo', 'flag', 'logo'];
    const numberFields = ['rating', 'pace', 'shooting', 'passing', 'dribbling', 'defending', 'physical'];

    let isValid = true;

    [...form.elements].forEach(input => {
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = '';
        }
    });

    requiredFields.forEach(field => {
        const input = form.querySelector(`[name="${field}"]`);
        if (!input || !input.value.trim()) {
            showError(input, `${field} is required.`);
            isValid = false;
        }
    });

   
    numberFields.forEach(field => {
        const input = form.querySelector(`[name="${field}"]`);
        const value = input ? input.value.trim() : null;
        if (!value || isNaN(value) || value < 10 || value > 100) {
            showError(input, `${field} not valid`);
            isValid = false;
        }
    });

   
    if (isValid) {
        const successMessage = document.getElementById('success-message');
        if (successMessage) {
            successMessage.textContent = 'Player added successfully!';
            successMessage.style.color = 'green';
        }
    } else {
        
        const successMessage = document.getElementById('success-message');
        if (successMessage) {
            successMessage.textContent = '';
        }
    }

    return isValid;
}

function showError(input, message) {
    if (!input) return; 
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
const cards = document.getElementsByClassName('.cards');
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function (e) {
        e.preventDefault(); 
        if (validateForm(this)) {
            console.log('Form is valid');
            
            cards.classList.remove('hidden');
            updateCard();
        }
    });
});



function updateCard() {
    // Get input values
    
    const playerName = document.getElementById("name").value;
    const position = document.getElementById("position").value;
    const playerRating = document.getElementById("rating").value;
    const playerPace = document.getElementById("pace").value;
    const playerShooting = document.getElementById("shooting").value;
    const playerPassing = document.getElementById("passing").value;
    const playerDribbling = document.getElementById("dribbling").value;
    const playerDefending = document.getElementById("defending").value;
    const playerPhysical = document.getElementById("physical").value;


    document.querySelector(".name").textContent = playerName;
    document.querySelector(".position").textContent = position;
    document.querySelector(".rating").textContent = playerRating;
    document.querySelector(".pace").textContent = playerPace;
    document.querySelector(".shooting").textContent = playerShooting;
    document.querySelector(".passing").textContent = playerPassing;
    document.querySelector(".dribbling").textContent = playerDribbling;
    document.querySelector(".defending").textContent = playerDefending;
    document.querySelector(".physical").textContent = playerPhysical;

    const playerPhoto = document.getElementById("photo").files[0];
    const playerFlag = document.getElementById("flag").files[0];
    const playerLogo = document.getElementById("logo").files[0];

    if (playerPhoto) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.querySelector(".photo").src = e.target.result;
        };
        reader.readAsDataURL(playerPhoto);
    }

    if (playerFlag) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.querySelector(".flag").src = e.target.result;
        };
        reader.readAsDataURL(playerFlag);
    }

    if (playerLogo) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.querySelector(".logo").src = e.target.result;
        };
        reader.readAsDataURL(playerLogo);
    }
}
function addPlayerToField(form) {
  
    const formData = new FormData(form);
    const playerData = Object.fromEntries(formData.entries());

   
    const template = document.getElementById('player-template');
    const playerCard = template.cloneNode(true);

   
    playerCard.id = '';
    template.classList.remove('hidden');

    const playerPhoto = document.getElementById("photo").files[0];
    const playerFlag = document.getElementById("flag").files[0];
    const playerLogo = document.getElementById("logo").files[0];

    const playerName = document.getElementById("name").value;
    const position = document.getElementById("position").value;
    const playerRating = document.getElementById("rating").value;
    const playerPace = document.getElementById("pace").value;
    const playerShooting = document.getElementById("shooting").value;
    const playerPassing = document.getElementById("passing").value;
    const playerDribbling = document.getElementById("dribbling").value;
    const playerDefending = document.getElementById("defending").value;
    const playerPhysical = document.getElementById("physical").value;


    playerCard.querySelector('.photo').src = playerPhoto;
    playerCard.querySelector('.rating').textContent = playerRating;
    playerCard.querySelector('.position').textContent = position;
    playerCard.querySelector('.name').textContent = playerName;
    playerCard.querySelector('.pace').textContent = playerPace;
    playerCard.querySelector('.shooting').textContent = playerShooting;
    playerCard.querySelector('.passing').textContent = playerPassing;
    playerCard.querySelector('.dribbling').textContent = playerDribbling;
    playerCard.querySelector('.defending').textContent = playerDefending;
    playerCard.querySelector('.physical').textContent = playerPhysical;
    playerCard.querySelector('.flag').src = playerFlag;
    playerCard.querySelector('.logo').src = playerLogo;

    if (playerPhoto) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.querySelector(".photo").src = e.target.result;
            
        };
        reader.readAsDataURL(playerPhoto);
    }

    if (playerFlag) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.querySelector(".flag").src = e.target.result;
        };
        reader.readAsDataURL(playerFlag);
    }

    if (playerLogo) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.querySelector(".logo").src = e.target.result;
        };
        reader.readAsDataURL(playerLogo);
    }

    const positionP = document.getElementById(`${playerData.position}`)

    positionP.appendChild(playerCard);
}

document.getElementById('player-form').addEventListener('submit', function (e) {
    e.preventDefault(); 
    addPlayerToField(this); 
    this.reset(); 
});

