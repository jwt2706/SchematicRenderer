import * as THREE from "three";

function createScene(data) {
  const scene = new THREE.Scene();

  // create each block
  data.Palette.value.forEach((block, index) => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: getColor(block.Name.value),
    }); // TODO: implement getColor function that returns color based on block name
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(getPosition(index)); // TODO: implement getPosition function that returns position based on index
    scene.add(cube);
  });

  return scene;
}

function animate(renderer, scene, camera) {
  function loop() {
    requestAnimationFrame(loop);
    renderer.render(scene, camera);
  }
  loop();
}

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
        const scene = createScene(data);

        const camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("viewer").appendChild(renderer.domElement);

        animate(renderer, scene, camera);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
