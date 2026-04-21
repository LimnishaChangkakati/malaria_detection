const dropArea = document.getElementById("drop-area");
const input = document.getElementById("file-input");
const preview = document.getElementById("preview");

// Click upload
dropArea.addEventListener("click", () => input.click());

// File select
input.addEventListener("change", function () {
    const file = this.files[0];
    showPreview(file);
});

// Drag & Drop
dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.style.borderColor = "#22c55e";
});

dropArea.addEventListener("dragleave", () => {
    dropArea.style.borderColor = "#334155";
});

dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    input.files = e.dataTransfer.files;
    showPreview(e.dataTransfer.files[0]);
});

// Preview function
function showPreview(file) {
    const reader = new FileReader();

    reader.onload = function (e) {
        preview.src = e.target.result;
        preview.style.display = "block";
    };

    reader.readAsDataURL(file);
}