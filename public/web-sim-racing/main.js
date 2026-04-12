import * as THREE from './build/three.module.js';
import { GLTFLoader } from './GLTFLoader.js';
import { Car } from './car.js';



var frustumSize = 200;
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000 );
var scene = new THREE.Scene();


var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
renderer.gammaOutput = true
renderer.gammaFactor = 2.2
document.body.appendChild( renderer.domElement );

// background and light
scene.background = new THREE.Color( 0xa0a0a0 );
scene.fog = new THREE.Fog( 0xcce0ff, 500, 10000 );

scene.add( new THREE.AmbientLight( 0x666666 ) );

var light = new THREE.DirectionalLight( 0xdfebff, 1.1 );
light.position.set( 500, 500, 300 );
light.position.multiplyScalar( 1.3 );
light.castShadow = true;
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;
var d = 300;
light.shadow.camera.left = - d;
light.shadow.camera.right = d;
light.shadow.camera.top = d;
light.shadow.camera.bottom = - d;
light.shadow.camera.far = 5000;
scene.add( light );

// car
var car = new Car(scene);

// load model
var loader = new GLTFLoader();
var trees = []
const NUM_TREES = 4
loader.load( './models/tree.gltf', function ( gltf ) {
    const newPosition = new THREE.Vector3(50,0,50)
    const scale = 0.04

    // model
    gltf.scene.scale.set(scale, scale, scale)
    gltf.scene.traverse( function( node ) {
        if ( node.isMesh ) { node.castShadow = true; } // to allow shadow casting on to the scene
    } );
    gltf.scene.position.copy( newPosition )

    // collision box
    var geometry = new THREE.BoxGeometry( 4, 30, 4 );
    var material = new THREE.MeshLambertMaterial( { color: 0xFD0EFE } );
    var collisionBox = new THREE.Mesh( geometry, material )     
    collisionBox.position.copy( newPosition )

    trees.push( {
        mesh: gltf.scene,
        box: collisionBox
    })

    scene.add( trees[trees.length - 1].mesh );
    // scene.add( trees[trees.length - 1].box );   
}, undefined, function ( error ) {
	console.error( 'model loading error', error );
} );


// draw plane
var geometry = new THREE.BoxBufferGeometry( 200, 1, 200 );
var material = new THREE.MeshPhongMaterial( { color: 0xD6DBDF } );
var plane = new THREE.Mesh (geometry, material)
plane.receiveShadow = true;
scene.add( plane )

// camera
camera.position.set( -100, 100, 100 );
camera.lookAt(0,0,0)

// keyboard event
var keymap = {}; // You could also use an array
document.addEventListener("keydown", onkeydown, false);
document.addEventListener("keyup", onkeyup, false);
onkeydown = onkeyup = function(e){
    e = e || event; // to deal with IE
    keymap[e.keyCode] = e.type == 'keydown';
    /* insert conditional here */
}

function animate() {
    requestAnimationFrame( animate );
    let pedal = 0, steer = 0
    if (keymap[87]) { // w
        pedal = 1
    } else if (keymap[83]) { // s
        pedal = -1
    }

    if (keymap[65]) { // a
        steer = -1
    } else if (keymap[68]) { // d
        steer = 1
    }
    
    let currentCarPosition = new THREE.Vector3(0,0,0)
    currentCarPosition.copy(car.position)

    car.updateControl(pedal, steer)

    // collision detection
    let collide = false
    for (var i=0; i<trees.length; ++i){
        if (detectCollisionCubes(car.carMesh, trees[i].box)) {
            console.log('collided with tree no.', i)
            collide = true
            break
        }
    }
    if (collide) {
        car.position.copy(currentCarPosition)
    }
    
    


    renderer.render( scene, camera );
}

animate();


function detectCollisionCubes(object1, object2){
    object1.geometry.computeBoundingBox(); //not needed if its already calculated
    object2.geometry.computeBoundingBox();
    object1.updateMatrixWorld();
    object2.updateMatrixWorld();
    
    var box1 = object1.geometry.boundingBox.clone();
    box1.applyMatrix4(object1.matrixWorld);
  
    var box2 = object2.geometry.boundingBox.clone();
    box2.applyMatrix4(object2.matrixWorld);
  
    return box1.intersectsBox(box2);
}

// document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    event.preventDefault();
    var keyCode = event.which;
    if (keyCode == 37) {
        // left
        moveCamera(1,0)
    } else if (keyCode == 38) {
        // up
        moveCamera(0,1)
    } else if (keyCode == 39) {
        // right
        moveCamera(-1,0)
    } else if (keyCode == 40) {
        // down
        moveCamera(0,-1)
    } 
    if (keyCode == 87) { //W
        car.position.z -= 1
    } else if (keyCode == 83) { //S
        car.position.z += 1
    } 
    
    if (keyCode == 65) { //A
        car.position.x -= 1
    } else if (keyCode == 68) { //D
        car.position.x += 1
    }
};

function moveCamera( angleX, angleY ) {

    camera.position.x += angleX
    camera.position.y += angleY
    camera.updateMatrix();


}