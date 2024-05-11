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
        var view = document.getElementById("viewer");
        view.innerText = JSON.stringify(data, null, 2);

        console.log(data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
