
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

    preview.innerHTML = file 
        ? `<img src="${URL.createObjectURL(file)}" alt="Preview" class="w-full h-full object-cover">`
        : '<span class="text-gray-500 text-sm">No Image</span>';
}


function validateForm(form) {
    const requiredFields = ['name', 'photo', 'flag', 'logo'];
    const numberFields = ['rating', 'pace', 'shooting', 'passing', 'dribbling', 'defending', 'physical'];
    const numberGaol = ['ratingGoal','diving','handling','kicking','reflexes','speed','positioning'];

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
    numberGaol.forEach(field => {
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
        }
    });
});


function addPlayerToField(form) {

    // if (!validateForm(form)){
    //     return;
    // };
    const formData = new FormData(form);
    const playerData = Object.fromEntries(formData.entries());

    const template = document.getElementById('player-template');

    const playerCard = template.cloneNode(true);
    playerCard.id = ''; 
    playerCard.classList.remove('hidden');

    playerCard.querySelector('.rating').textContent = playerData.rating;
    playerCard.querySelector('.position').textContent = playerData.position;
    playerCard.querySelector('.name').textContent = playerData.name;
    playerCard.querySelector('.pace').textContent = playerData.pace;
    playerCard.querySelector('.shooting').textContent = playerData.shooting;
    playerCard.querySelector('.passing').textContent = playerData.passing;
    playerCard.querySelector('.dribbling').textContent = playerData.dribbling;
    playerCard.querySelector('.defending').textContent = playerData.defending;
    playerCard.querySelector('.physical').textContent = playerData.physical;

    const photoInput = form.querySelector('[name="photo"]');
    if (photoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            playerCard.querySelector('.photo').src = e.target.result;
        };
        reader.readAsDataURL(photoInput.files[0]);
    }

    const flagInput = form.querySelector('[name="flag"]');
    if (flagInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            playerCard.querySelector('.flag').src = e.target.result;
        };
        reader.readAsDataURL(flagInput.files[0]);
    }

    const logoInput = form.querySelector('[name="logo"]');
    if (logoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            playerCard.querySelector('.logo').src = e.target.result;
        };
        reader.readAsDataURL(logoInput.files[0]);
    }

    const positionElement = document.getElementById(playerData.position);
    if (positionElement) {
        positionElement.innerHTML = ''; 
        positionElement.appendChild(playerCard);
    } else {
        console.error(`Position element with ID "${playerData.position}" not found.`);
    }
    // const positionElement = document.getElementById(playerData.position);
    // if (positionElement && positionElement.children.length === 0) {
    //     positionElement.appendChild(playerCard);
    // } else {
    //     const reserveList = document.getElementById('reserve-list');
    //     reserveList.appendChild(playerCard);
    // }
    
}


document.getElementById('player-form').addEventListener('submit', function (e) {
    e.preventDefault();

    addPlayerToField(this);

    this.reset();

    const photoInput = this.querySelector('[name="photo"]');
    const flagInput = this.querySelector('[name="flag"]');
    const logoInput = this.querySelector('[name="logo"]');
    if (photoInput) photoInput.value = '';
    if (flagInput) flagInput.value = '';
    if (logoInput) logoInput.value = '';
});

function delet(playerCard) {
    playerCard.querySelector('.rating').textContent = '--';
    playerCard.querySelector('.position').textContent = '--';
    playerCard.querySelector('.name').textContent = '------';
    playerCard.querySelector('.pace').textContent = '--';
    playerCard.querySelector('.shooting').textContent = '--';
    playerCard.querySelector('.passing').textContent = '--';
    playerCard.querySelector('.dribbling').textContent = '--';
    playerCard.querySelector('.defending').textContent = '--';
    playerCard.querySelector('.physical').textContent = '--';

    playerCard.querySelector('.photo').src = '';
    playerCard.querySelector('.flag').src = '';
    playerCard.querySelector('.logo').src = '';

    
}
function handleDelete(event) {
    const playerCard = event.target.closest('.cards');
    delet(playerCard);
}


function editCard(event) {
    // العثور على البطاقة المستهدفة
    const playerCard = event.target.closest('.cards');

    // تحديد النموذج
    const form = document.getElementById('player-form');

    // تعبئة الحقول داخل النموذج بالقيم الموجودة في البطاقة
    form.querySelector('[name="name"]').value = playerCard.querySelector('.name').textContent;
    form.querySelector('[name="rating"]').value = playerCard.querySelector('.rating').textContent;
    form.querySelector('[name="position"]').value = playerCard.querySelector('.position').textContent;
    form.querySelector('[name="pace"]').value = playerCard.querySelector('.pace').textContent;
    form.querySelector('[name="shooting"]').value = playerCard.querySelector('.shooting').textContent;
    form.querySelector('[name="passing"]').value = playerCard.querySelector('.passing').textContent;
    form.querySelector('[name="dribbling"]').value = playerCard.querySelector('.dribbling').textContent;
    form.querySelector('[name="defending"]').value = playerCard.querySelector('.defending').textContent;
    form.querySelector('[name="physical"]').value = playerCard.querySelector('.physical').textContent;

    // الصور (تحتاج إلى أن تكون موجودة على هيئة ملفات إذا أردت عرضها مرة أخرى)
    const photoPreview = document.getElementById('photo-preview'); 
    const flagPreview = document.getElementById('flag-preview'); 
    const logoPreview = document.getElementById('logo-preview'); 

    photoPreview.innerHTML = playerCard.querySelector('.photo').outerHTML;
    flagPreview.innerHTML = playerCard.querySelector('.flag').outerHTML;
    logoPreview.innerHTML = playerCard.querySelector('.logo').outerHTML;

    // إضافة مؤشر لتحديد البطاقة التي يتم تعديلها
    form.dataset.editingCard = playerCard.dataset.id;
}

document.getElementById('player-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const form = e.target;
    const editingCardId = form.dataset.editingCard;

    if (editingCardId) {
        const playerCard = document.querySelector(`.cards[data-id="${editingCardId}"]`);

        playerCard.querySelector('.name').textContent = form.querySelector('[name="name"]').value;
        playerCard.querySelector('.rating').textContent = form.querySelector('[name="rating"]').value;
        playerCard.querySelector('.position').textContent = form.querySelector('[name="position"]').value;
        playerCard.querySelector('.pace').textContent = form.querySelector('[name="pace"]').value;
        playerCard.querySelector('.shooting').textContent = form.querySelector('[name="shooting"]').value;
        playerCard.querySelector('.passing').textContent = form.querySelector('[name="passing"]').value;
        playerCard.querySelector('.dribbling').textContent = form.querySelector('[name="dribbling"]').value;
        playerCard.querySelector('.defending').textContent = form.querySelector('[name="defending"]').value;
        playerCard.querySelector('.physical').textContent = form.querySelector('[name="physical"]').value;

        const photoInput = form.querySelector('[name="photo"]').files[0];
        const flagInput = form.querySelector('[name="flag"]').files[0];
        const logoInput = form.querySelector('[name="logo"]').files[0];

        if (photoInput) {
            const reader = new FileReader();
            reader.onload = function (e) {
                playerCard.querySelector('.photo').src = e.target.result;
            };
            reader.readAsDataURL(photoInput);
        }

        if (flagInput) {
            const reader = new FileReader();
            reader.onload = function (e) {
                playerCard.querySelector('.flag').src = e.target.result;
            };
            reader.readAsDataURL(flagInput);
        }

        if (logoInput) {
            const reader = new FileReader();
            reader.onload = function (e) {
                playerCard.querySelector('.logo').src = e.target.result;
            };
            reader.readAsDataURL(logoInput);
        }

        delete form.dataset.editingCard;

    } else {
        addPlayerToField(form);
    }

    form.reset(); 
});


