import * as THREE from './three.module.js';
import { FontLoader } from './FontLoader.js';
import { TextGeometry } from './TextGeometry.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
const renderer = new THREE.WebGLRenderer();
const fontLoader = new FontLoader();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.setPixelRatio(window.devicePixelRatio);

scene.background = new THREE.Color(0xB9F3FC);

// ===== Resize Handling =====
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);

// ===== Floor =====
const floorGeometry = new THREE.BoxGeometry(12, 1, 10);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xDFD3C3 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.receiveShadow = true;
floor.castShadow = true;
scene.add(floor);
floor.position.y = -3.3;

// ===== Walls =====
const wallColor = 0xB5D5C5;

// Left wall
const leftWallGeometry = new THREE.BoxGeometry(1, 6, 10);
const leftWallMaterial = new THREE.MeshStandardMaterial({ color: wallColor });
const leftWall = new THREE.Mesh(leftWallGeometry, leftWallMaterial);
leftWall.receiveShadow = true;
leftWall.castShadow = true;
scene.add(leftWall);
leftWall.position.set(-6, 0, 0);

// Right wall pieces
const rightWallBottom = new THREE.Mesh(new THREE.BoxGeometry(0.5, 2, 10), new THREE.MeshStandardMaterial({ color: wallColor }));
scene.add(rightWallBottom);
rightWallBottom.position.set(6, -1.8, 0);

const rightWallTop = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1, 10), new THREE.MeshStandardMaterial({ color: wallColor }));
scene.add(rightWallTop);
rightWallTop.position.set(6, 2, 0);

const rightWallBack = new THREE.Mesh(new THREE.BoxGeometry(0.5, 3, 5), new THREE.MeshStandardMaterial({ color: wallColor }));
scene.add(rightWallBack);
rightWallBack.position.set(6, 0, -3);

const rightWallFront = new THREE.Mesh(new THREE.BoxGeometry(0.5, 3, 1), new THREE.MeshStandardMaterial({ color: wallColor }));
scene.add(rightWallFront);
rightWallFront.position.set(6, 0, 4.5);

// Window
const glass = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3, 6), new THREE.MeshStandardMaterial({ 
    color: 0xEDECE0,
    transparent: true,
    opacity: 0.5
}));
scene.add(glass);
glass.position.set(6, 0, 1.8);

// Back wall
const backWall = new THREE.Mesh(new THREE.BoxGeometry(12, 6, 1), new THREE.MeshStandardMaterial({ color: wallColor }));
scene.add(backWall);
backWall.position.set(0, 0, -5);

// Ceiling
const ceiling = new THREE.Mesh(new THREE.BoxGeometry(12, 1, 10), new THREE.MeshStandardMaterial({ color: 0xDFD3C3 }));
scene.add(ceiling);
ceiling.position.set(0, 3, 0);

// ===== Bed =====
const bedFrame = new THREE.Mesh(new THREE.BoxGeometry(9.5, 0.6, 4), new THREE.MeshStandardMaterial({ color: 0x56310F }));
scene.add(bedFrame);
bedFrame.position.set(1.5, -2, -2.5);

const mattress = new THREE.Mesh(new THREE.BoxGeometry(8.8, 0.5, 3.9), new THREE.MeshStandardMaterial({ color: 0x797878 }));
scene.add(mattress);
mattress.position.set(1.3, -1.6, -2.5);

const bedLeg1 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3.5, 0.3), new THREE.MeshStandardMaterial({ color: 0x56310F }));
scene.add(bedLeg1);
bedLeg1.position.set(5.6, -2, -4.4);

const bedLeg2 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3.5, 0.3), new THREE.MeshStandardMaterial({ color: 0x56310F }));
scene.add(bedLeg2);
bedLeg2.position.set(5.6, -2, -0.65);

const bedHeadboard = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1, 4), new THREE.MeshStandardMaterial({ color: 0x56310F }));
scene.add(bedHeadboard);
bedHeadboard.position.set(5.6, -1, -2.5);

const bedLeg3 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 2.5, 0.3), new THREE.MeshStandardMaterial({ color: 0x56310F }));
scene.add(bedLeg3);
bedLeg3.position.set(-3.1, -2, -4.35);

const bedLeg4 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 2.5, 0.3), new THREE.MeshStandardMaterial({ color: 0x56310F }));
scene.add(bedLeg4);
bedLeg4.position.set(-3.1, -2, -0.65);

const bedFootboard = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.4, 4), new THREE.MeshStandardMaterial({ color: 0x56310F }));
scene.add(bedFootboard);
bedFootboard.position.set(-3.1, -1.2, -2.5);

// ===== Table =====
const tableTop = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.2, 5), new THREE.MeshStandardMaterial({ color: 0xB9814C }));
scene.add(tableTop);
tableTop.position.set(-4.25, -1, 2);

const tableLeg1 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3, 0.3), new THREE.MeshStandardMaterial({ color: 0xB9814C }));
scene.add(tableLeg1);
tableLeg1.position.set(-3.25, -2.4, 4.3);

const tableLeg2 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3, 0.3), new THREE.MeshStandardMaterial({ color: 0xB9814C }));
scene.add(tableLeg2);
tableLeg2.position.set(-3.25, -2.4, -0.3);

const tableLeg3 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3, 0.3), new THREE.MeshStandardMaterial({ color: 0xB9814C }));
scene.add(tableLeg3);
tableLeg3.position.set(-5.25, -2.4, 4.3);

const tableLeg4 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3, 0.3), new THREE.MeshStandardMaterial({ color: 0xB9814C }));
scene.add(tableLeg4);
tableLeg4.position.set(-5.25, -2.4, -0.3);

// ===== Chair =====
const chairSeat = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 0.2, 32), new THREE.MeshStandardMaterial({ color: 0xE5E5E5 }));
scene.add(chairSeat);
chairSeat.position.set(-2, -1.7, 2);

const chairLegA = new THREE.Mesh(new THREE.BoxGeometry(0.3, 2, 0.3), new THREE.MeshStandardMaterial({ color: 0xE5E5E5 }));
scene.add(chairLegA);
chairLegA.position.set(-1.5, -2.7, 2.5);

const chairLegB = new THREE.Mesh(new THREE.BoxGeometry(0.3, 2, 0.3), new THREE.MeshStandardMaterial({ color: 0xE5E5E5 }));
scene.add(chairLegB);
chairLegB.position.set(-1.5, -2.7, 1.5);

const chairLegC = new THREE.Mesh(new THREE.BoxGeometry(0.3, 2, 0.3), new THREE.MeshStandardMaterial({ color: 0xE5E5E5 }));
scene.add(chairLegC);
chairLegC.position.set(-2.5, -2.7, 1.5);

const chairLegD = new THREE.Mesh(new THREE.BoxGeometry(0.3, 2, 0.3), new THREE.MeshStandardMaterial({ color: 0xE5E5E5 }));
scene.add(chairLegD);
chairLegD.position.set(-2.5, -2.7, 2.5);

// ===== Laptop =====
const laptopBase = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.1, 2), new THREE.MeshStandardMaterial({ color: 0x3D3D3D }));
scene.add(laptopBase);
laptopBase.position.set(-3.9, -0.85, 2);

const laptopHinge = new THREE.Mesh(new THREE.BoxGeometry(0.05, 1.5, 2), new THREE.MeshStandardMaterial({ color: 0x3D3D3D }));
scene.add(laptopHinge);
laptopHinge.position.set(-4.7, -0.1, 2);
laptopHinge.rotation.set(0, 0, -3);

const laptopKeyboard = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.1, 1.8), new THREE.MeshStandardMaterial({ color: 0x5C5C5C }));
scene.add(laptopKeyboard);
laptopKeyboard.position.set(-4, -0.84, 2);

const laptopTrackpad = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.1, 0.5), new THREE.MeshStandardMaterial({ color: 0x5C5C5C }));
scene.add(laptopTrackpad);
laptopTrackpad.position.set(-3.37, -0.84, 2);

const laptopScreen = new THREE.Mesh(new THREE.BoxGeometry(0.05, 1.3, 1.8), new THREE.MeshStandardMaterial({ color: 0x5C5C5C }));
scene.add(laptopScreen);
laptopScreen.position.set(-4.699, -0.1, 2);
laptopScreen.rotation.set(0, 0, -3);

// ===== Lightbulb =====
const lightbulbPos = { x: 0, y: 2.35, z: 3 };

const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.1, 64, 32), new THREE.MeshBasicMaterial({ color: 0xF5EA5A }));
scene.add(bulb);
bulb.position.set(lightbulbPos.x, lightbulbPos.y, lightbulbPos.z);

const bulbBase = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.01, 64), new THREE.MeshStandardMaterial({ color: 0xDDDDDD }));
scene.add(bulbBase);
bulbBase.position.set(lightbulbPos.x, lightbulbPos.y + 0.15, lightbulbPos.z);

const bulbOutlet = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.1), new THREE.MeshStandardMaterial({ color: 0xDDDDDD }));
scene.add(bulbOutlet);
bulbOutlet.position.set(lightbulbPos.x, lightbulbPos.y + 0.1, lightbulbPos.z);

// ===== Lights =====
scene.add(new THREE.AmbientLight(0x404040, 0.3));
scene.add(new THREE.HemisphereLight(0x404040, 0x404040, 1));

const bulbLight = new THREE.PointLight(0xffffff, 0.6, 100);
bulbLight.castShadow = true;
bulbLight.position.set(lightbulbPos.x, lightbulbPos.y + 0.05, lightbulbPos.z);
scene.add(bulbLight);

// ===== Camera =====
camera.position.z = 8;

// ===== Animate =====
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
