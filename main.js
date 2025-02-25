// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gameCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);

// Simple spaceship (a cube for now)
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const ship = new THREE.Mesh(geometry, material);
scene.add(ship);

// Space background (stars)
const starGeometry = new THREE.BufferGeometry();
const starCount = 10000;
const positions = new Float32Array(starCount * 3);
for (let i = 0; i < starCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 2000; // x
    positions[i * 3 + 1] = (Math.random() - 0.5) * 2000; // y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2000; // z
}
starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 2 });
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Camera position
camera.position.z = 5;

// Movement controls
let speed = 0.1;
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp': ship.position.y += speed; break;
        case 'ArrowDown': ship.position.y -= speed; break;
        case 'ArrowLeft': ship.position.x -= speed; break;
        case 'ArrowRight': ship.position.x += speed; break;
        case 'w': ship.position.z -= speed; break;
        case 's': ship.position.z += speed; break;
    }
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    ship.rotation.x += 0.01; // Spin for fun
    ship.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();
