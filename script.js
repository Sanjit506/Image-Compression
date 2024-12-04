const upload = document.getElementById("upload");
const preview = document.getElementById("preview");
const compressButton = document.getElementById("compressButton");
const result = document.getElementById("result");
const qualityInput = document.getElementById("quality");
const qualityValue = document.getElementById("qualityValue");
let uploadedImage;

// Update quality display value
qualityInput.addEventListener("input", () => {
    const qualityPercentage = Math.round(qualityInput.value * 100);
    qualityValue.textContent = `${qualityPercentage}%`; // Update display as a percentage
});

// Preview uploaded image
upload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            uploadedImage = e.target.result;
            preview.innerHTML = `<img src="${uploadedImage}" alt="Uploaded Image">`;
        };
        reader.readAsDataURL(file);
    }
});

// Compress image
compressButton.addEventListener("click", () => {
    if (!uploadedImage) {
        alert("Please upload an image first!");
        return;
    }

    const compressionQuality = parseFloat(qualityInput.value); // Get the compression quality
    const canvas = document.createElement("canvas");
    const img = new Image();
    img.src = uploadedImage;

    img.onload = () => {
        const ratio = img.width / img.height;
        const maxWidth = 800; // Resize width
        const maxHeight = 600; // Resize height

        let width = img.width;
        let height = img.height;

        // Resize if larger than max dimensions
        if (width > maxWidth || height > maxHeight) {
            if (width / height > ratio) {
                width = maxWidth;
                height = maxWidth / ratio;
            } else {
                height = maxHeight;
                width = maxHeight * ratio;
            }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        // Compress image with chosen quality
        const compressedImage = canvas.toDataURL("image/jpeg", compressionQuality);

        result.innerHTML = `
            <h3>Compressed Image:</h3>
            <img src="${compressedImage}" alt="Compressed Image">
            <a href="${compressedImage}" download="compressed-image.jpg">
                <button>Download</button>
            </a>
        `;
    };
});

window.addEventListener('scroll', function () {
    console.log('User is scrolling!');
});
