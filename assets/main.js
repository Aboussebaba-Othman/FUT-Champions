let playerCounter = 1;
let currentEditPlayerId = null; 

function switchForm() {
    const position = document.getElementById('position').value;
    const playerFields = document.getElementById('player');
    const goalkeeperFields = document.getElementById('goalkeeper');

    document.querySelectorAll('.error-message').forEach(error => {
        error.textContent = '';
    });

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

    preview.innerHTML = file 
        ? `<img src="${URL.createObjectURL(file)}" alt="Preview" class="w-full h-full object-cover">`
        : '<span class="text-gray-500 text-sm">No Image</span>';
}

function validateForm(form) {
    const requiredFields = ['name', 'flag', 'photo', 'logo'];
    const numberFields = ['rating', 'pace', 'shooting', 'passing', 'dribbling', 'defending', 'physical', 'speed', 'diving', 'handling', 'kicking', 'reflexes', 'positioning', 'ratingGk'];

    let isValid = true;

    form.querySelectorAll('.error-message').forEach(error => {
        error.textContent = '';
    });

    
    requiredFields.forEach(field => {
        const input = form.querySelector(`[name="${field}"]`);
        if (input) {
            if (input.type === 'file') {
                if (!currentEditPlayerId && !input.files.length) { 
                    showError(input, `${(field)} is required.`);
                    isValid = false;
                }
            } else {
                if (!input.value.trim()) {
                    showError(input, `${(field)} is required.`);
                    isValid = false;
                }
            }
        }
    });

    numberFields.forEach(field => {
        const input = form.querySelector(`[name="${field}"]`);
        if (input && !input.closest('.hidden')) { 
            const value = input.value.trim();
            if (!value || isNaN(value) || value < 10 || value > 100) {
                showError(input, `${(field)} must be a number between 10 and 100.`);
                isValid = false;
            }
        }
    });

    return isValid;
}

function showError(input, message) {
    const errorElement = input.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = message;
    }
}
function addOrUpdatePlayer(form) {
    const formData = new FormData(form);
    const playerData = Object.fromEntries(formData.entries());

    let template;
    if (playerData.position === 'GK') {
        template = document.getElementById('goalkeeper-template');
    } else {
        template = document.getElementById('player-template');
    }

    let playerCard;
    if (currentEditPlayerId) {
        playerCard = document.getElementById(currentEditPlayerId);
        const oldPosition = playerCard.parentElement.id;
        if (oldPosition !== playerData.position) {
            const newPositionContainer = document.getElementById(playerData.position);
            newPositionContainer.appendChild(playerCard);
        }
    } else {
        playerCard = template.cloneNode(true);
        playerCard.classList.remove('hidden');
        playerCard.removeAttribute('id');

        const playerId = `player-${playerCounter++}`;
        playerCard.setAttribute('id', playerId);
    }

    playerCard.setAttribute('data-nationality', playerData.nationality);
    playerCard.setAttribute('data-club', playerData.club);

    playerCard.querySelector('.name').textContent = playerData.name;
    playerCard.querySelector('.position').textContent = playerData.position;

    if (playerData.position !== 'GK') {
        playerCard.querySelector('.rating').textContent = playerData.rating;
        playerCard.querySelector('.pace').textContent = playerData.pace;
        playerCard.querySelector('.shooting').textContent = playerData.shooting;
        playerCard.querySelector('.passing').textContent = playerData.passing;
        playerCard.querySelector('.dribbling').textContent = playerData.dribbling;
        playerCard.querySelector('.defending').textContent = playerData.defending;
        playerCard.querySelector('.physical').textContent = playerData.physical;
    } else {
        playerCard.querySelector('.ratingGk').textContent = playerData.ratingGk;
        playerCard.querySelector('.speed').textContent = playerData.speed;
        playerCard.querySelector('.diving').textContent = playerData.diving;
        playerCard.querySelector('.positioning').textContent = playerData.positioning;
        playerCard.querySelector('.handling').textContent = playerData.handling;
        playerCard.querySelector('.kicking').textContent = playerData.kicking;
        playerCard.querySelector('.reflexes').textContent = playerData.reflexes;
    }

    const photoFile = form.querySelector('[name="photo"]').files[0];
    const flagFile = form.querySelector('[name="flag"]').files[0];
    const logoFile = form.querySelector('[name="logo"]').files[0];

    if (flagFile) {
        const flagReader = new FileReader();
        flagReader.onload = function (e) {
            playerCard.querySelector('.flag').src = e.target.result;
        };
        flagReader.readAsDataURL(flagFile);
    }

    if (photoFile) {
        const photoReader = new FileReader();
        photoReader.onload = function (e) {
            playerCard.querySelector('.photo').src = e.target.result;
        };
        photoReader.readAsDataURL(photoFile);
    }

    if (logoFile) {
        const logoReader = new FileReader();
        logoReader.onload = function (e) {
            playerCard.querySelector('.logo').src = e.target.result;
        };
        logoReader.readAsDataURL(logoFile);
    }

    const positionContainer = document.getElementById(playerData.position);

    if (!currentEditPlayerId) {
        if (positionContainer.childElementCount > 0) {
            const substituteContainer = document.getElementById('substitute');
            substituteContainer.appendChild(playerCard);
        } else {
            positionContainer.appendChild(playerCard);
        }
    }

    resetForm(form);
    resetPreviews();
    currentEditPlayerId = null;

    form.querySelector('button[type="submit"]').textContent = 'Add Player';

    showSuccessMessage('Player added successfully!');
}



function resetForm(form) {
    form.reset();
    switchForm(); 
    form.querySelectorAll('.error-message').forEach(error => {
        error.textContent = '';
    });
}

function resetPreviews() {
    resetPreview('photoPreview', 'No Photo');
    resetPreview('logoPreview', 'No Logo');
    resetPreview('flagPreview', 'No Flag');
}

function resetPreview(previewId, defaultText) {
    const previewElement = document.getElementById(previewId);
    previewElement.innerHTML = `<span class="text-gray-500 text-sm">No ${defaultText}</span>`;
}

function showSuccessMessage(message) {
    const successMessage = document.getElementById('success-message');
    successMessage.textContent = message;
    setTimeout(() => {
        successMessage.textContent = '';
    }, 3000);
}

document.getElementById('player-form').addEventListener('submit', function (e) {
    e.preventDefault();
    if (validateForm(this)) {
        addOrUpdatePlayer(this);
    } else {
        alert('Please fill all required fields and enter valid values.');
    }
});

function deletePlayer(element) {
    if (confirm('Are you sure you want to delete this player?')) {
        const playerCard = element.closest('.cards');
        playerCard.remove();

        showSuccessMessage('Player deleted successfully!');
    }
}

function editPlayer(element) {
    const playerCard = element.closest('.cards');
    currentEditPlayerId = playerCard.id;
    const form = document.getElementById('player-form');


    form.querySelector('[name="name"]').value = playerCard.querySelector('.name').textContent.trim();
    form.querySelector('[name="position"]').value = playerCard.querySelector('.position').textContent.trim();
    switchForm(); 

    const nationality = playerCard.getAttribute('data-nationality') || 'Maroc'; 
    const club = playerCard.getAttribute('data-club') || 'FC Barcelona'; 

    form.querySelector('[name="nationality"]').value = nationality;
    form.querySelector('[name="club"]').value = club;

    const flagImg = playerCard.querySelector('.flag').src;
    const photoImg = playerCard.querySelector('.photo').src;
    const logoImg = playerCard.querySelector('.logo').src;

    setPreviewImage('flagPreview', flagImg, 'Flag');
    setPreviewImage('photoPreview', photoImg, 'Photo');
    setPreviewImage('logoPreview', logoImg, 'Logo');

    if (playerCard.querySelector('.ratingGk')) {
        form.querySelector('[name="ratingGk"]').value = playerCard.querySelector('.ratingGk').textContent.trim();
        form.querySelector('[name="speed"]').value = playerCard.querySelector('.speed').textContent.trim();
        form.querySelector('[name="diving"]').value = playerCard.querySelector('.diving').textContent.trim();
        form.querySelector('[name="positioning"]').value = playerCard.querySelector('.positioning').textContent.trim();
        form.querySelector('[name="handling"]').value = playerCard.querySelector('.handling').textContent.trim();
        form.querySelector('[name="kicking"]').value = playerCard.querySelector('.kicking').textContent.trim();
        form.querySelector('[name="reflexes"]').value = playerCard.querySelector('.reflexes').textContent.trim();

        document.getElementById('player').classList.add('hidden');
        document.getElementById('goalkeeper').classList.remove('hidden');
    } else {
        form.querySelector('[name="rating"]').value = playerCard.querySelector('.rating').textContent.trim();
        form.querySelector('[name="pace"]').value = playerCard.querySelector('.pace').textContent.trim();
        form.querySelector('[name="shooting"]').value = playerCard.querySelector('.shooting').textContent.trim();
        form.querySelector('[name="passing"]').value = playerCard.querySelector('.passing').textContent.trim();
        form.querySelector('[name="dribbling"]').value = playerCard.querySelector('.dribbling').textContent.trim();
        form.querySelector('[name="defending"]').value = playerCard.querySelector('.defending').textContent.trim();
        form.querySelector('[name="physical"]').value = playerCard.querySelector('.physical').textContent.trim();

        document.getElementById('player').classList.remove('hidden');
        document.getElementById('goalkeeper').classList.add('hidden');
    }

    window.scrollTo({
        top: form.offsetTop - 20,
        behavior: 'smooth'
    });

    form.querySelector('button[type="submit"]').textContent = 'Update Player';
}

function setPreviewImage(previewId, imageSrc, defaultText) {
    const previewElement = document.getElementById(previewId);
    if (imageSrc && imageSrc !== '') {
        previewElement.innerHTML = '';
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = defaultText;
        img.classList.add('w-full', 'h-full', 'object-cover');
        previewElement.appendChild(img);
    } else {
        previewElement.innerHTML = `<span class="text-gray-500 text-sm">No ${defaultText}</span>`;
    }
}

