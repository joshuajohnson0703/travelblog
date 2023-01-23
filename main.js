import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import * as THREE from 'three'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import MouseMeshInteraction from './three_mmi.js'

import atmosphereVertexShader from './shaders/atmosphereVertex.glsl'
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl'
import { Float32BufferAttribute, MOUSE } from 'three'
gsap.registerPlugin(MotionPathPlugin);
const scene = new THREE.Scene()
const camera = new THREE.
PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
)


const renderer = new THREE.WebGLRenderer(
  {
    antialias: true
  }
)

renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)
// create sphere
const sphere = new THREE.Mesh(new THREE.SphereGeometry(5, 50, 50), new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
      globeTexture: {
          value: new THREE.TextureLoader().load('./img/globe.jpeg')
      }
  } 
}))

scene.add(sphere);


// Create a new object for the marker
const marker = new THREE.Object3D();
marker.name = 'marker_1';
// Position the marker at the desired coordinates
marker.position.set(0.5, 2.75, 4.15);

const marker_2 = new THREE.Object3D();
marker_2.name = 'marker_2';
marker_2.position.set(0.75, 2.8, 4.10);

// Create a new mesh for the marker using a geometry and a material
const markerGeometry = new THREE.BoxGeometry(.1, .1, .1);
const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const markerMesh = new THREE.Mesh(markerGeometry, markerMaterial);

// Add the marker mesh to the marker object
marker.add(markerMesh);
const markerGeometry2 = new THREE.BoxGeometry(.1, .1, .1);
const markerMaterial2 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const markerMesh2 = new THREE.Mesh(markerGeometry2, markerMaterial2);
marker_2.add(markerMesh2);

const marker_4 = new THREE.Object3D();
marker_4.name = 'marker_4';
marker_4.position.set(0.8, 3.2 , 3.8);
const markerGeometry4 = new THREE.BoxGeometry(.1, .1, .1);
const markerMaterial4 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const markerMesh4 = new THREE.Mesh(markerGeometry4, markerMaterial4);
marker_4.add(markerMesh4);

const marker_5 = new THREE.Object3D();
marker_5.name = 'marker_5';
marker_5.position.set(-1.5, 3 , 3.75);
const markerGeometry5 = new THREE.BoxGeometry(.1, .1, .1);
const markerMaterial5 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const markerMesh5 = new THREE.Mesh(markerGeometry5, markerMaterial5);
marker_5.add(markerMesh5);

const marker_6 = new THREE.Object3D();
marker_6.name = 'marker_6';
marker_6.position.set(1.2, 1 , -4.8);
const markerGeometry6 = new THREE.BoxGeometry(.1, .1, .1);
const markerMaterial6 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const markerMesh6 = new THREE.Mesh(markerGeometry6, markerMaterial6);
marker_6.add(markerMesh6);

const marker_7 = new THREE.Object3D();
marker_7.name = 'marker_7';
marker_7.position.set(2.75, 2 , -3.75);
const markerGeometry7 = new THREE.BoxGeometry(.1, .1, .1);
const markerMaterial7 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const markerMesh7 = new THREE.Mesh(markerGeometry7, markerMaterial7);
marker_7.add(markerMesh7);


const atmosphere = new THREE.Mesh(new THREE.
  SphereGeometry(5, 50, 50), new THREE. 
  ShaderMaterial({
    vertexShader : atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide
  })
)
const starGeometry = new THREE.
BufferGeometry()
const starMaterial = new THREE.
PointsMaterial({color: 0xffffff})
const stars = new THREE.Points(
  starGeometry, starMaterial)
scene.add(stars)

const starVertices = []
for (let i = 0; i < 10000; i++) {
  const x = (Math.random() - 0.5) * 2000
  const y = (Math.random() - 0.5) * 2000
  const z = -Math.random()* 1000
  starVertices.push(x,y,z)
}
starGeometry.setAttribute('position', 
new Float32BufferAttribute(starVertices, 3))
atmosphere.scale.set(1.1,1.1,1.1)

scene.add(atmosphere)

camera.position.z = 10;





const group = new THREE.Group();
const globe = new THREE.Object3D();
globe.add(marker);
globe.add(marker_2);
globe.add(marker_4);
globe.add(marker_5);
globe.add(marker_6);
globe.add(marker_7);

globe.add(sphere);
group.add(globe);
scene.add(group);

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
function onPointerMove( event ) {

	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components

	pointer.x = ( event.clientX / (window.innerWidth ) ) * 2 - 1;
	pointer.y = - ( event.clientY / (window.innerHeight) ) * 2 + 1;

}

// Add event listener for mouse clicks on the canvas
renderer.domElement.addEventListener('click', onClick, false);

function onClick(event) {
    // Update the pointer position
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the picking ray with the camera and pointer position
    raycaster.setFromCamera(pointer, camera);

    // Calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects([marker]);
    const intersects2 = raycaster.intersectObjects([marker_2]);
    const intersects3 = raycaster.intersectObjects([marker_4]);
    const intersects4 = raycaster.intersectObjects([marker_5]);
    const intersects5 = raycaster.intersectObjects([marker_6]);
    const intersects6 = raycaster.intersectObjects([marker_7]);
    
    // Check if marker is one of the intersected objects
    if (intersects.length > 0) {
      window.open("blog/newfile.html", "_blank");
    }
    if (intersects2.length > 0) {
      window.open("blog/myrtlebeach.html", "_blank");
    }
    if (intersects3.length > 0) {
      window.open("blog/philly.html", "_blank");
    }
    if (intersects4.length > 0) {
      window.open("blog/vegas.html", "_blank");
    }
    if (intersects5.length > 0) {
      window.open("blog/kerala.html", "_blank");
    }
    if (intersects6.length > 0) {
      window.open("blog/dubai.html", "_blank");
    }
}
const mouse = {
  x: undefined,
  y: undefined
}

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  globe.rotation.y += 0.005
  /*gsap.to(group.rotation, {
    x: -mouse.y * 0.3,
    y: mouse.x * 0.5,
    duration: 2
  })*/

}

animate()

addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / innerWidth) * 2 - 1
  mouse.y = -(event.clientY / innerHeight) * 2 + 1
})
window.addEventListener( 'pointermove', onPointerMove );

