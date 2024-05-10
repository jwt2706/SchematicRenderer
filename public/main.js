document
  .getElementById("upload-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var file = document.getElementById("schematic-file").files[0];
    var formData = new FormData();
    formData.append("file", file);
    fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
