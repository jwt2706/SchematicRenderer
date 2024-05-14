import * as THREE from "three";

// Create a texture loader instance
const loader = new THREE.TextureLoader();

function createScene(data) {
  const scene = new THREE.Scene();

  // Load a texture
  const texture = loader.load("/textures/cobblestone.png"); // the backend assosiates a number to each block. we can use that number to fetch the appropriate texture

  // create each block
  data.Palette.value.forEach((block, index) => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(getPosition(index)); // TODO: implement getPosition function that returns position based on index
    scene.add(cube);
  });

  return scene;
}

function getPosition(index) {
  const sizeX = 16; // width of the world in blocks
  const sizeY = 16; // height of the world in blocks
  const sizeZ = 16; // depth of the world in blocks

  const x = index % sizeX;
  const y = Math.floor(index / sizeX) % sizeY;
  const z = Math.floor(index / (sizeX * sizeY)) % sizeZ;

  return new THREE.Vector3(x, y, z);
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
