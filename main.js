// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gameCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Simple "plane" (a triangle for now)
const geometry = new THREE.ConeGeometry(0.5, 2, 32); // Cone looks vaguely plane-like
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

// Ground plane to orient yourself
const groundGeometry = new THREE.PlaneGeometry(100, 100);
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x555555, side: THREE.DoubleSide });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = Math.PI / 2; // Flat on the "ground"
ground.position.y = -5;
scene.add(ground);

// Camera behind the plane
camera.position.set(0, 2, 5);
camera.lookAt(plane.position);

// Flight controls
let speed = 0.1;
let pitch = 0;
let yaw = 0;

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp': pitch = 0.05; break;    // Pitch up
        case 'ArrowDown': pitch = -0.05; break; // Pitch down
        case 'ArrowLeft': yaw = 0.05; break;    // Turn left
        case 'ArrowRight': yaw = -0.05; break;  // Turn right
        case 'w': speed = 0.2; break;           // Speed up
        case 's': speed = 0.05; break;          // Slow down
    }
});

document.addEventListener('keyup', (event) => {
    if (['ArrowUp', 'ArrowDown'].includes(event.key)) pitch = 0;
    if (['ArrowLeft', 'ArrowRight'].includes(event.key)) yaw = 0;
    if (['w', 's'].includes(event.key)) speed = 0.1;
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Move forward
    plane.translateZ(-speed);

    // Rotate plane (pitch and yaw)
    plane.rotation.x += pitch;
    plane.rotation.z += yaw;

    // Camera follows plane
    camera.position.set(
        plane.position.x,
        plane.position.y + 2,
        plane.position.z + 5
    );
    camera.lookAt(plane.position);

    renderer.render(scene, camera);
}
animate();
