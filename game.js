// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gameCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Simple "plane" (a cone)
const geometry = new THREE.ConeGeometry(0.5, 2, 32);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

// Ground plane
const groundGeometry = new THREE.PlaneGeometry(100, 100);
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x555555, side: THREE.DoubleSide });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = Math.PI / 2;
ground.position.y = -5;
scene.add(ground);

// Camera setup
camera.position.set(0, 2, 5);
camera.lookAt(plane.position);

// Flight controls
let speed = 0.1;
let pitch = 0;
let yaw = 0;

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp': pitch = 0.05; break;
        case 'ArrowDown': pitch = -0.05; break;
        case 'ArrowLeft': yaw = 0.05; break;
        case 'ArrowRight': yaw = -0.05; break;
        case 'w': speed = 0.2; break;
        case 's': speed = 0.05; break;
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

    // Rotate plane
    plane.rotation.x += pitch;
    plane.rotation.z += yaw;

    // Camera follows
    camera.position.set(
        plane.position.x,
        plane.position.y + 2,
        plane.position.z + 5
    );
    camera.lookAt(plane.position);

    renderer.render(scene, camera);
}
animate();
