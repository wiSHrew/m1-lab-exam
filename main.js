import * as THREE from './three.module.js';
import { OrbitControls } from './OrbitControls.js';
import { FontLoader } from './FontLoader.js';
import { TextGeometry } from './TextGeometry.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 5000);
const renderer = new THREE.WebGLRenderer();
const loader = new FontLoader();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.setPixelRatio(window.devicePixelRatio);

scene.background = new THREE.Color(0xB9F3FC);

// OrbitControls setup
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enablePan = true;
controls.enableZoom = true;
controls.target.set(0, 0, 0);
controls.update();

// Resize handling
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);

let colorvar = 0x000000;

// ===== FLOOR =====
const floorG = new THREE.BoxGeometry(12, 1, 10);
const floorM = new THREE.MeshStandardMaterial({ color: 0xDFD3C3 });
const floor = new THREE.Mesh(floorG, floorM);
floor.receiveShadow = true;
floor.castShadow = true;
scene.add(floor);
floor.position.y = -3.3;

// ===== WALLS =====
let wallcolor = 0xB5D5C5;

// left wall
const LWallG = new THREE.BoxGeometry(1, 6, 10);
const LWallM = new THREE.MeshStandardMaterial({ color: wallcolor });
const LWall = new THREE.Mesh(LWallG, LWallM);
LWall.receiveShadow = true;
LWall.castShadow = true;
scene.add(LWall);
LWall.position.set(-6, 0, 0);

// right wall pieces
const RWall1 = new THREE.Mesh(new THREE.BoxGeometry(.5, 2, 10), new THREE.MeshStandardMaterial({ color: wallcolor }));
scene.add(RWall1);
RWall1.position.set(6, -1.8, 0);

const RWall2 = new THREE.Mesh(new THREE.BoxGeometry(.5, 1, 10), new THREE.MeshStandardMaterial({ color: wallcolor }));
scene.add(RWall2);
RWall2.position.set(6, 2, 0);

const RWall3 = new THREE.Mesh(new THREE.BoxGeometry(.5, 3, 5), new THREE.MeshStandardMaterial({ color: wallcolor }));
scene.add(RWall3);
RWall3.position.set(6, 0, -3);

const RWall4 = new THREE.Mesh(new THREE.BoxGeometry(.5, 3, 1), new THREE.MeshStandardMaterial({ color: wallcolor }));
scene.add(RWall4);
RWall4.position.set(6, 0, 4.5);

// window
colorvar = 0xEDECE0;
const glass = new THREE.Mesh(new THREE.BoxGeometry(.3, 3, 6), new THREE.MeshStandardMaterial({ 
    color: colorvar,
    transparent: true,
    opacity: .5
}));
scene.add(glass);
glass.position.set(6, 0, 1.8);

// back wall
const BWall1 = new THREE.Mesh(new THREE.BoxGeometry(12, 6, 1), new THREE.MeshStandardMaterial({ color: wallcolor }));
scene.add(BWall1);
BWall1.position.set(0, 0, -5);

// ceiling
const Ceil = new THREE.Mesh(new THREE.BoxGeometry(12, 1, 10), new THREE.MeshStandardMaterial({ color: 0xDFD3C3 }));
scene.add(Ceil);
Ceil.position.set(0, 3, 0);

// Bed
colorvar = 0x56310F;
const bed1 = new THREE.Mesh(new THREE.BoxGeometry(9.5, .6, 4), new THREE.MeshStandardMaterial({ color: colorvar }));
scene.add(bed1);
bed1.position.set(1.5, -2, -2.5);

const bed2 = new THREE.Mesh(new THREE.BoxGeometry(8.8, .5, 3.9), new THREE.MeshStandardMaterial({ color: 0x797878}));
scene.add(bed2);
bed2.position.set(1.3, -1.6, -2.5);

const bedleg1 = new THREE.Mesh(new THREE.BoxGeometry(.3, 3.5, .3), new THREE.MeshStandardMaterial({ color: colorvar }));
scene.add(bedleg1);
bedleg1.position.set(5.6, -2, -4.4);

const bedleg2 = new THREE.Mesh(new THREE.BoxGeometry(.3, 3.5, .3), new THREE.MeshStandardMaterial({ color: colorvar }));
scene.add(bedleg2);
bedleg2.position.set(5.6, -2, -0.65);

const bedHead = new THREE.Mesh(new THREE.BoxGeometry(.1, 1, 4), new THREE.MeshStandardMaterial({ color: colorvar }));
scene.add(bedHead);
bedHead.position.set(5.6, -1, -2.5);

const bedleg3 = new THREE.Mesh(new THREE.BoxGeometry(.3, 2.5, .3), new THREE.MeshStandardMaterial({ color: colorvar }));
scene.add(bedleg3);
bedleg3.position.set(1.5-4.6, -2, -4.35);

const bedleg4 = new THREE.Mesh(new THREE.BoxGeometry(.3, 2.5, .3), new THREE.MeshStandardMaterial({ color: colorvar }));
scene.add(bedleg4);
bedleg4.position.set(1.5-4.6, -2, -0.65);

const bedFoot = new THREE.Mesh(new THREE.BoxGeometry(.1, .4, 4), new THREE.MeshStandardMaterial({ color: colorvar }));
scene.add(bedFoot);
bedFoot.position.set(1.5-4.6, -1.2, -2.5);

// Table
colorvar = 0xB9814C;
const table = new THREE.Mesh(new THREE.BoxGeometry(2.5, .2, 5), new THREE.MeshStandardMaterial({ color: colorvar }));
scene.add(table);
table.position.set(-4.25, -.5-.5, 2);

const tableLeg1 = new THREE.Mesh(new THREE.BoxGeometry(.3, 3, .3), new THREE.MeshStandardMaterial({ color: colorvar }));
scene.add(tableLeg1);
tableLeg1.position.set(-4.25+1, -1.9-.5, 2+2.3);

const tableLeg2 = new THREE.Mesh(new THREE.BoxGeometry(.3, 3, .3), new THREE.MeshStandardMaterial({ color: colorvar }));
scene.add(tableLeg2);
tableLeg2.position.set(-4.25+1, -1.9-.5, 2-2.3);

const tableLeg3 = new THREE.Mesh(new THREE.BoxGeometry(.3, 3, .3), new THREE.MeshStandardMaterial({ color: colorvar }));
scene.add(tableLeg3);
tableLeg3.position.set(-4.25-1, -1.9-.5, 2+2.3);

const tableLeg4 = new THREE.Mesh(new THREE.BoxGeometry(.3, 3, .3), new THREE.MeshStandardMaterial({ color: colorvar }));
scene.add(tableLeg4);
tableLeg4.position.set(-4.25-1, -1.9-.5, 2-2.3);

// chair
colorvar = 0xE5E5E5;
const chair = new THREE.Mesh(new THREE.CylinderGeometry( 1, 1, .2, 325), new THREE.MeshStandardMaterial({ color: colorvar }));
scene.add(chair);
chair.position.set(-2, -1.7, 2);

const chairLeg1 = new THREE.Mesh(new THREE.BoxGeometry(.3, 2, .3), new THREE.MeshStandardMaterial({ color: colorvar }));
scene.add(chairLeg1);
chairLeg1.position.set(-2+.5, -1.7-1, 2+.5);

const chairLeg2 = new THREE.Mesh(new THREE.BoxGeometry(.3, 2, .3), new THREE.MeshStandardMaterial({ color: colorvar }));
scene.add(chairLeg2);
chairLeg2.position.set(-2+.5, -1.7-1, 2-.5);

const chairLeg3 = new THREE.Mesh(new THREE.BoxGeometry(.3, 2, .3), new THREE.MeshStandardMaterial({ color: colorvar }));
scene.add(chairLeg3);
chairLeg3.position.set(-2-.5, -1.7-1, 2-.5);

const chairLeg4 = new THREE.Mesh(new THREE.BoxGeometry(.3, 2, .3), new THREE.MeshStandardMaterial({ color: colorvar }));
scene.add(chairLeg4);
chairLeg4.position.set(-2-.5, -1.7-1, 2+.5);

// Laptop
colorvar = 0x3D3D3D;
const laptopB = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.1, 2), new THREE.MeshStandardMaterial({ color: colorvar }));
scene.add(laptopB);
laptopB.position.set(-3.9, -.35-.5, 2);

const laptopH = new THREE.Mesh(new THREE.BoxGeometry(.05, 1.5, 2), new THREE.MeshStandardMaterial({ color: colorvar }));
scene.add(laptopH);
laptopH.position.set(-4.7, .4-.5, 2);
laptopH.rotation.set(0, 0, -3);

colorvar = 0x5C5C5C;
const keyboard = new THREE.Mesh(new THREE.BoxGeometry(.8, 0.1, 1.8), new THREE.MeshStandardMaterial({ color: colorvar }));
scene.add(keyboard);
keyboard.position.set(-4, -.34-.5, 2);

const trackpad = new THREE.Mesh(new THREE.BoxGeometry(.3, 0.1, .5), new THREE.MeshStandardMaterial({ color: colorvar }));
scene.add(trackpad);
trackpad.position.set(-3.37, -.34-.5, 2);

const screen = new THREE.Mesh(new THREE.BoxGeometry(.05, 1.3, 1.8), new THREE.MeshStandardMaterial({ color: colorvar }));
scene.add(screen);
screen.position.set(-4.699, .4-.5, 2);
screen.rotation.set(0, 0, -3);


// ===== LIGHTBULB =====
let lightbulbposX = 0;
let lightbulbposY = 2.35;
let lightbulbposZ = 3;

const lightbulb = new THREE.Mesh(new THREE.SphereGeometry(0.1, 64, 32), new THREE.MeshBasicMaterial({ color: 0xF5EA5A }));
scene.add(lightbulb);
lightbulb.position.set(lightbulbposX, lightbulbposY, lightbulbposZ);

const lightbulbBase = new THREE.Mesh(new THREE.CylinderGeometry(.15, .15, .01, 64), new THREE.MeshStandardMaterial({ color: 0xDDDDDD }));
scene.add(lightbulbBase);
lightbulbBase.position.set(lightbulbposX, lightbulbposY + .15, lightbulbposZ);

const lightbulbOutlet = new THREE.Mesh(new THREE.CylinderGeometry(.05, .05, .1), new THREE.MeshStandardMaterial({ color: 0xDDDDDD }));
scene.add(lightbulbOutlet);
lightbulbOutlet.position.set(lightbulbposX, lightbulbposY + .1, lightbulbposZ);


// ===== LIGHTS =====
scene.add(new THREE.AmbientLight(0x404040, .3));
scene.add(new THREE.HemisphereLight(0x404040, 0x404040, 1));

const LightBulbLight = new THREE.PointLight(0xffffff, .6, 100);
LightBulbLight.castShadow = true;
LightBulbLight.position.set(lightbulbposX, lightbulbposY + .05, lightbulbposZ);
scene.add(LightBulbLight);

// ===== CAMERA =====
camera.position.z = 8;

// ===== ANIMATE =====
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
