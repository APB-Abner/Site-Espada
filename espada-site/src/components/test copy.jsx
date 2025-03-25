import * as THREE from 'three';
// set the scene size     
const WIDTH = window.innerWidth, HEIGHT = window.innerHeight;

// set some camera attributes
const VIEW_ANGLE = 30, ASPECT = WIDTH / HEIGHT, NEAR = 1, FAR = 10000;

// get the DOM element to attach to

// create a WebGL renderer, camera, and a scene
const $container = document.querySelector('#container');
const renderer = new THREE.WebGLRenderer();
const scene = new THREE.Scene();
let clock = new THREE.Clock();
const camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
// the camera starts at 0,0,0 so pull it back, so we can see the axis helper etc.
// Removed unused variable 'clock'
// add the camera to the scene
scene.add(camera);

// set up the camera controls so the user can rotate the scene with their mouse.
const cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
cameraControls.autoRotate = false;

// start the renderer
renderer.setSize(WIDTH, HEIGHT);

// attach the render-supplied DOM element
$container.append(renderer.domElement);


// SCENE BACKGROUND
const starsloader = new THREE.TextureLoader();
starsloader.crossOrigin = '';
const starsjpg = starsloader.load('https://s3-us-west-2.amazonaws.com/sabrinamarkon-images/images/stars6.jpg', (texture) => {
        const img = texture.image;
        const bgHeight = img.height;
    });
scene.background = starsjpg;
// make sure the background image is resized to fill the scene.
starsjpg.wrapS = THREE.MirroredRepeatWrapping;
starsjpg.wrapT = THREE.MirroredRepeatWrapping;


// LIGHTING:

/* "a HemisphereLight takes a sky color and a ground color and just multplies
the material's color between those 2 colors" (ThreeJSFundamentals.org, n.d.) */
const hlightskyColor = 0xffffff;  // light color from above as it is drawn to the black hole.
const hlightgroundColor = 0xffffff;  // light color from below. Also bright as it is also drawn to the black hole.
const hlightintensity = 0.3;
const hemispherelight = new THREE.HemisphereLight(hlightskyColor, hlightgroundColor, hlightintensity);
scene.add(hemispherelight);


// a DirectionalLight light often represents the sun and we need it here to combine with the 
// hemisphere or ambient light to shade.
const dlightcolor = 0xFFFFFF;
const dlightintensity = 2;
const directionallight = new THREE.DirectionalLight(dlightcolor, dlightintensity);
directionallight.position.set(20, 10, 10);
directionallight.target.position.set(0, 0, 0); // light shines in direction of its target (deafults to origin)
directionallight.castShadow = true;
scene.add(directionallight);
// shows a plane, to represent the light, and a line from the light to the target (ThreeJSFundamentals.org, n.d.)
const dlighthelper = new THREE.DirectionalLightHelper(directionallight);
//scene.add(dlighthelper); 

// Removed unused variable 'dlighthelper'
// by the light's color times the intensity" (ThreeJSFundamentals.org, n.d.)
const ambientlight = new THREE.AmbientLight(0x222222);
scene.add(ambientlight);


// AXIS HELPER - shows the x,y,z axes at the origin.
const axes = new THREE.AxesHelper(200);
scene.add(axes);


// PLANE = BLACK HOLE - positioned to be oriented to z-axis so objects appear to be resting on it.
const blackhole = new THREE.Group();
const planeloader = new THREE.TextureLoader();
planeloader.crossOrigin = '';
const planejpg = planeloader.load('https://s3-us-west-2.amazonaws.com/sabrinamarkon-images/images/blackhole7.png');
const planeMaterial = new THREE.MeshPhongMaterial({ map: planejpg, side: THREE.DoubleSide });
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1300, 2000),
    planeMaterial);
// rotate the plane to be oriented with the z-axis.
plane.rotation.set(-Math.PI / 2, Math.PI / 2000, Math.PI);
plane.position.set(-92, -46, 0);
plane.receiveShadow = true;
blackhole.add(plane);


// MOVING STAR FIELD - Orange
const starsGeometry = new THREE.Geometry();
for (let i = 0; i < 2000; i++) {
    let star = new THREE.Vector3();
    star.x = THREE.Math.randFloatSpread(2000);
    star.y = THREE.Math.randFloatSpread(2000);
    star.z = THREE.Math.randFloatSpread(2000);
    starsGeometry.vertices.push(star);
}
const starsMaterial = new THREE.PointsMaterial({ color: 'orange' });
const sparklestars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(sparklestars); // (Three.js, n.d.)

// MOVING STAR FIELD - Yellow
const starsGeometry2 = new THREE.Geometry();
for (let i = 0; i < 2000; i++) {
    let star = new THREE.Vector3();
    star.x = THREE.Math.randFloatSpread(2000);
    star.y = THREE.Math.randFloatSpread(2000);
    star.z = THREE.Math.randFloatSpread(2000);
    starsGeometry2.vertices.push(star);
}
const starsMaterial2 = new THREE.PointsMaterial({ color: 'yellow' });
const sparklestars2 = new THREE.Points(starsGeometry2, starsMaterial2);
scene.add(sparklestars2); // (Three.js, n.d.)

// THIRD layer of stars (orange)
scene.add(sparklestars);


// GEOMETRY - The space junk floating around about to be sucked into a black hole is the
// GRAPH OF THE FUNCTION. The black hole is the SOLID PLANE (with a texture map on it)
const parametricFunction = function (a, b, target) {
    const x = -5 + 70 * a;
    const y = (Math.sin(a * Math.PI) + Math.sin(b * Math.PI)) * -7 + 90;
    const z = -5 + 70 * b;
    target.set(x, y, z);
}
const parametricGeometry = new THREE.ParametricGeometry(parametricFunction, 64, 64);
const spacejunkloader = new THREE.TextureLoader();
spacejunkloader.crossOrigin = '';
const spacejunkjpg = spacejunkloader.load('https://s3-us-west-2.amazonaws.com/sabrinamarkon-images/images/spacejunk1.jpg');
const spacejunk = new THREE.Mesh(parametricGeometry, paraMaterial);
spacejunk.position.set(150, 50, 200);

spacejunk.castShadow = true;
blackhole.add(spacejunk);
const conegeometry = new THREE.CylinderGeometry(0, 30, 70, 200, 80, false);
const spacejunkjpg2 = spacejunkloader.load('https://s3-us-west-2.amazonaws.com/sabrinamarkon-images/images/spacejunk2.jpg');
const cone = new THREE.Mesh(conegeometry, conematerial);
cone.position.set(150, 50, 200);
const conematerial = new THREE.MeshPhongMaterial({ map: spacejunkjpg2, side: THREE.DoubleSide, specular: 0xffffff, shininess: 5 });

// add the spacejunk (which is the graphed function/cone) combined with the blackhole.
scene.add(blackhole);


// ANIMATION:

function animate() {
    requestAnimationFrame(animate);

    sparklestars.rotation.y += 0.001; // orange "star" particles.
    sparklestars.rotation.x += 0.0001;
    sparklestars.rotation.z += 0.0005;
    sparklestars2.rotation.y -= 0.001; // yellow "star" particles.
    sparklestars2.rotation.x -= 0.0001;
    blackhole.rotation.y -= 0.001; // rotate the blackhole and stuff slowly.
    spacejunk.rotation.x -= 0.003; // tumble the function.
    cone.rotation.x -= 0.005; // tumble the cone.

    render();
}


// RENDERING:

function render() {
    //cameraControls.update();
    renderer.render(scene, camera);
}
export default animate();


/*

References

Cunningham, S. (2003). Computer Graphics: Programming, Problem Solving, and Visual Communication. Retrieved from https://my.uopeople.edu/pluginfile.php/389065/mod_resource/content/4/ComputerGraphics-SteveCunningham.pdf

Dirksen, J. (2015). Three.js Cookbook. Retrieved from https://learning.oreilly.com/library/view/threejs-cookbook/9781783981182/index.html

Dirksen, J. (2018, August). Learn Three.js - Third Edition. Retrieved from https://subscription.packtpub.com/book/web_development/9781788833288

Three.js (n.d.). Three.js Docs. Retrieved from https://threejs.org/docs/#api/en/materials/PointsMaterial

ThreeJSFundamentals.org (n.d.). Three.js Lights. Retrieved from https://threejsfundamentals.org/threejs/lessons/threejs-lights.html
  
*/
