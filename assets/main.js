
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
// fetch('./players.json')
// .then(response => response.json())
// .then(data =>>)
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

    // إزالة رسائل الخطأ السابقة
    [...form.elements].forEach(input => {
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = '';
        }
    });

    // التحقق من الحقول المطلوبة
    requiredFields.forEach(field => {
        const input = form.querySelector(`[name="${field}"]`);
        if (!input || !input.value.trim()) {
            showError(input, `${field} is required.`);
            isValid = false;
        }
    });

    // التحقق من الحقول العددية
    numberFields.forEach(field => {
        const input = form.querySelector(`[name="${field}"]`);
        const value = input ? input.value.trim() : null;
        if (!value || isNaN(value) || value < 10 || value > 100) {
            showError(input, `${field} not valid`);
            isValid = false;
        }
    });

    // عرض رسالة نجاح إذا كان التحقق صحيحاً
    if (isValid) {
        const successMessage = document.getElementById('success-message');
        if (successMessage) {
            successMessage.textContent = 'Player added successfully!';
            successMessage.style.color = 'green';
        }
    } else {
        // إزالة أي رسالة نجاح إذا كان هناك خطأ
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
        e.preventDefault(); // منع الإرسال الافتراضي للنموذج

        // التحقق من صحة الحقول
        if (validateForm(this)) {
            console.log('Form is valid');
            
            cards.classList.remove('hidden');
            updateCard();
        } else {
            console.log('Form is invalid. Fix errors before submission.');
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

