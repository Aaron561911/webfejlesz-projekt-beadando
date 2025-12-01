document.addEventListener("DOMContentLoaded", function() {


    const form = document.getElementById('contactForm');
    const messageBox = document.getElementById('formMessage');


    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const ageInput = document.getElementById('age');
    const topicSelect = document.getElementById('topic');
    const msgInput = document.getElementById('message');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        let errors = [];
        let isValid = true;

        resetStyles([nameInput, emailInput, phoneInput, ageInput, topicSelect, msgInput]);
        messageBox.innerText = "";
        messageBox.style.color = "black";


        if (nameInput.value.trim().length < 3) {
            setError(nameInput);
            errors.push("A névnek legalább 3 karakter hosszúnak kell lennie.");
            isValid = false;
        }

        const emailVal = emailInput.value;
        if (!emailVal.includes('@') || !emailVal.includes('.')) {
            setError(emailInput);
            errors.push("Kérlek érvényes e-mail címet adj meg.");
            isValid = false;
        }

        if (phoneInput.value.length < 7 || isNaN(phoneInput.value)) {
        setError(phoneInput);
        errors.push("A telefonszám hibás (csak számokat adj meg).");
        isValid = false;
        }

        const ageVal = parseInt(ageInput.value);
        if (isNaN(ageVal) || ageVal < 15 || ageVal > 90) {
            setError(ageInput);
            errors.push("Az életkornak 15 és 90 év közöttinek kell lennie.");
            isValid = false;
        }

        if (topicSelect.value === "") {
            setError(topicSelect);
            errors.push("Kérlek válassz egy témakört a listából.");
            isValid = false;
        }

        if (msgInput.value.trim() === "") {
            setError(msgInput);
            errors.push("Az üzenet mezőt nem hagyhatod üresen.");
            isValid = false;
        }

        if (!isValid) {
            messageBox.style.color = "red";
            messageBox.innerHTML = errors.join("<br>");
        } else {
            messageBox.style.color = "green";
            messageBox.innerText = "Köszönjük! Hamarosan keresünk " + nameInput.value + ".";
            
            form.reset();
            
            alert("Köszönjük a megkeresést, munkatársaink hamarosan keresnek!");
        }
    });


    function setError(element) {
        element.style.border = "2px solid red";
        element.style.backgroundColor = "#ffe6e6";
    }


    function resetStyles(elements) {
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.border = "1px solid #ccc";
            elements[i].style.backgroundColor = "white";
        }
    }

});