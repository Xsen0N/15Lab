function addContact() {
    const name = document.getElementsByName('name')[0].value;
    const phone = document.getElementsByName('phone')[0].value;

    const phonePattern = /^[0-9]{8}$/;
    const isValidPhone = phonePattern.test(phone);

    if (!isValidPhone) {
        alert('Should be 8 numbers!!! Enter like this: XXXXXXXX, X - number');
        return
    }

    fetch('/add', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, phone})
    })
        .then(response => response.json())
        .then(() => window.location.href = '/');
}

async function editContact() {
    const id = document.querySelector('.form').getAttribute('data-key');
    const name = document.querySelector('input[name="name"]').value;
    const phone = document.querySelector('input[name="phone"]').value;


    const phonePattern = /^[0-9]{8}$/;
    const isValidPhone = phonePattern.test(phone);

    if (!isValidPhone) {
        alert('Should be 8 numbers!!! Enter like this: XXXXXXXX, X - number');
        return
    }

    try {
        await fetch(`/update?id=${id}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, phone})
        });
        window.location.href = '/'
    } catch (e) {
        console.log(e);
    }

}

async function deleteContact() {
    const id = document.querySelector('.form').getAttribute('data-key');

    try {
        await fetch(`/delete?id=${id}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        });
        window.location.href = '/';
    } catch (e) {
        console.log(e);
    }


}

function blockButton(name, phone) {
    const button = document.getElementById('delete-button');

    const nameInput = document.getElementsByName('name')[0];
    const phoneInput = document.getElementsByName('phone')[0];


    const phonePattern = /^[0-9]{8}$/;
    const isValidPhone = phonePattern.test(phoneInput.value);

    if (nameInput.value !== name || !isValidPhone) {
        button.disabled = true;
    } else {
        button.disabled = false;
    }

    if (document.getElementsByName('name').value !== name ||
        document.getElementsByName('phone').value !== phone) {
        button.setAttribute('disabled', 'true');
    } else {
        button.setAttribute('disabled', 'false');
    }
}


