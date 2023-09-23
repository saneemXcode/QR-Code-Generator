
const qr_text = document.getElementById('qr-text');
const sizes = document.getElementById('sizes');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const qrContainer = document.querySelector('.qr-body');
let size = sizes.value;
let qrCode = null;

generateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (qr_text.value.length > 0) {
        generateQRCode();
    } else {
         alert("Enter the text or URL to Generate your QR Code");
    }
});

qr_text.addEventListener('input', () => {
    isEmptyInput();
});

sizes.addEventListener('change', (e) => {
    size = e.target.value;
    if (qr_text.value.length > 0) {
        generateQRCode();
    }
});

downloadBtn.addEventListener('click', () => {
    let img = document.querySelector('.qr-body img');
            if (img !== null) {
                let imgAttribute = img.getAttribute('src');
                downloadBtn.setAttribute("href", imgAttribute);
                downloadBtn.setAttribute("download", "downloaded_image.jpg");
//         console.log('Image:', img);
// console.log('Image Attribute:', imgAttribute);

    } else {
        downloadBtn.setAttribute("href", `${document.querySelector('canvas').toDataURL()}`);
    }
});
function isEmptyInput() {
    if (qr_text.value.length === 0) {
        qrContainer.innerHTML = ""; // Clear the QR code container if input is empty
    }
}

function generateQRCode() {
    qrContainer.innerHTML = ""; // Clear the QR code container

    if (qr_text.value.length > 0) {
        qrCode = new QRCode(qrContainer, {
            text: qr_text.value,
            height: size,
            width: size,
            colorLight: "#fff",
            colorDark: "#000",
        });
    } else {
        qrCode = null; // Clear the QR code instance if input is empty
    }
}
