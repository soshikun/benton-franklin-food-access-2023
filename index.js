function closeModal(popup) {
    document.getElementById(popup).classList.add('hidden');
    document.getElementById(popup).style.backgroundColor = '#152E53';
}

function openModal(popup) {
    document.getElementById(popup).classList.remove('hidden');
    document.getElementById(popup).style.backgroundColor = '#FFFAFA';
}

function makeActive() {
    this.classList.add('active');
}