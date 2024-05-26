var tabLinks = document.getElementsByClassName("tab-links");
var tabContents = document.getElementsByClassName("tab-contents");

function openTab(tabname) {
    for (tabLink of tabLinks) {
        tabLink.classList.remove("active-link");
    }

    for (tabContent of tabContents) {
        tabContent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                showMessageModal('Thank you for your message!', 'success');
                form.reset();
            } else {
                response.json().then(data => {
                    if (data.errors) {
                        showMessageModal(data.errors.map(error => error.message).join(', '), 'error');
                    } else {
                        showMessageModal('Oops! There was a problem submitting your form', 'error');
                    }
                });
            }
        }).catch(error => {
            showMessageModal('Oops! There was a problem submitting your form', 'error');
        });
    });
});

function showMessageModal(message, type) {
    const messageModal = document.getElementById('messageModal');
    const messageText = document.getElementById('messageText');
    messageText.textContent = message;

    if (type === 'success') {
        messageText.style.color = 'green';
    } else {
        messageText.style.color = 'red';
    }

    messageModal.style.display = 'block';
}

function closeMessageModal() {
    const messageModal = document.getElementById('messageModal');
    messageModal.style.display = 'none';
}

function showImage(src) {
    const modal = document.getElementById('imageModal');
    const fullImage = document.getElementById('fullImage');

    fullImage.src = src;
    modal.style.display = 'block';
}

function closeImage() {
    document.getElementById('imageModal').style.display = 'none';
}
