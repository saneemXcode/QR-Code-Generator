
    const qr_text = document.getElementById('qr-text');
    const sizes = document.getElementById('sizes');
    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const qrContainer = document.querySelector('.qr-body');
    let size = sizes.value;
    let qrCode = null;

    function updateSizeOptions() {
        // Check screen width
        const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const availableSizes = [100, 150, 200];

        // Limit available sizes to 100, 150, and 200 on smaller screens
        if (screenWidth <= 600) {
            sizes.innerHTML = ""; // Clear existing options
            for (const s of availableSizes) {
                const option = document.createElement('option');
                option.value = s;
                option.text = `${s}x${s}`;
                sizes.appendChild(option);
            }
        } else {
            // Restore all size options for larger screens
            sizes.innerHTML = ""; // Clear existing options
            for (const s of availableSizes) {
                const option = document.createElement('option');
                option.value = s;
                option.text = `${s}x${s}`;
                sizes.appendChild(option);
            }
            // Add other size options here for larger screens if needed
        }
    }

    // Call the function initially and on window resize
    updateSizeOptions();
    window.addEventListener('resize', updateSizeOptions);

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

    downloadBtn.addEventListener('click',()=>{
        const qrCodeCanvas=document.querySelector('canvas');
        if(qrCodeCanvas){
            const imgDataUrl=qrCodeCanvas.toDataURL('img/png');
            const a=document.createElement('a');
            a.href=imgDataUrl;
            a.download='QR_Code.png';
            a.click();
        }
        else{
            alert("No QR code available to download");
        }
    })

    function isEmptyInput() {
        if (qr_text.value.length === 0) {
            qrContainer.innerHTML = ""; // Clear the QR code container if input is empty
            qrContainer.style.display = "none"; // Hide the qr-body element
        } else {
            generateBtn(); // Show the qr-body element when there is input
        }
    }
    
    function generateQRCode() {
        qrContainer.innerHTML = ""; // Clear the QR code container
        qrContainer.style.display = "flex";
    
        if (qr_text.value.length > 0) {
            qrCode = new QRCode(qrContainer, {
                text: qr_text.value,
                height: size,
                width: size,
                colorLight: "#fff",
                colorDark: "#000",
            });
    
            // Set max-width and margin-left of qr-body based on the selected size
            let maxWidth = "100%"; // Default max-width for size 200x200
            let marginLeft = "0"; // Default margin-left for size 200x200
    
            if (size === "100") {
                maxWidth = "50%";
                marginLeft = "25%";
            } else if (size === "150") {
                maxWidth = "75%";
                marginLeft = "12.5%";
            }
    
            qrContainer.style.maxWidth = maxWidth;
            qrContainer.style.marginLeft = marginLeft;
    
            // Add border to the QR code image for all sizes
            const qrImage = qrContainer.querySelector('img');
            if (qrImage) {
                qrImage.style.border = "2px solid black";
            }
        } else {
            qrCode = null; // Clear the QR code instance if input is empty
        }
    }
    