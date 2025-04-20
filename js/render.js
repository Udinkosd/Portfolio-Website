document.addEventListener("DOMContentLoaded", () => {
  // Initialize the Three.js scene
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

  // Configure renderer and attach it to the DOM
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  const backgroundElement = document.getElementById('background');
  if (backgroundElement) {
    backgroundElement.appendChild(renderer.domElement);
  } else {
    console.error("The #background element does not exist in the DOM.");
    return; // Exit the script if the element does not exist
  }

  // Set a scene background color
  scene.background = 0xffffff; // Light blue background

  // Add Ambient Light (soft lighting)
  const ambientLight = new THREE.AmbientLight(0xfffffff, 15); // Increase intensity to 1.5
  scene.add(ambientLight);

  // Add Directional Light (strong directional lighting)
  const directionalLight = new THREE.DirectionalLight(0xffffff, 2); // Increase intensity to 2
  directionalLight.position.set(20, 20, 10); // Position the light
  scene.add(directionalLight);

  // Add Hemisphere Light (natural sky effect)
  const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0xffdbb9 , 10); // Sky and ground light
  scene.add(hemisphereLight);

  // Use GLTFLoader to load the 3D model
  const loader = new THREE.GLTFLoader();
  loader.setPath('/PraktekHTML%203/assets/'); // Adjusted path

  loader.load(
    'scene.gltf', // Model file
    (gltf) => {
      // Access the loaded model
      const model = gltf.scene;

      // Set the position and scale of the model
      model.scale.set(2, 2, 2); // Scale down the model
      scene.add(model);

      // Change the color of the model
      model.traverse((child) => {
        if (child.isMesh) {
          child.material.color.set(0xffe1c5 ); // Set the color
          // child.material = new THREE.MeshStandardMaterial({ color: 0xffdc6d }); // Optional: Use Standard Material
        }
      });

      // Optional: Animate the model
      animateModel(model);
    },
    undefined,
    (error) => {
      console.error('An error occurred while loading the .gltf file:', error);
    }
  );

  // Set the camera position
  camera.position.set(0, 0, 5); // Adjust the camera position

  // Animate the scene
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();

  // Function to animate the loaded model
  function animateModel(model) {
    function rotate() {
      requestAnimationFrame(rotate);
      model.rotation.y += 0.002; // Rotate the model on the Y-axis
    }
    rotate();
  }

  // Handle window resize
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
});

console.log("Three.js scene and model loading are initialized!");