var scene, camera, renderer, mesh;
/*
- scene è il mondo del gioco
- camera sono i tuoi occhi
- renderer è disegna la "scene" vista da "camera"
*/ 

var keyboard = {};

var player = { height: 1.8, speed: 0.2, turnSpeed: Math.PI * 0.02 };
/* creo un un oggetto "player" che conterrà i dettagli del giocatore
come l'altezza la velocità dei movimenti*/

var meshFloor;
//creo un pavimento

function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, 
        window.innerWidth/window.innerHeight, 
        0.1, 
        1000
    );

    mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1), 
        new THREE.MeshBasicMaterial({color: 0xff9999, wireframe: true})
    );
    //scene.add(mesh);

    /*
    - mesh è un oggetto nella "scene"
    - questo è dotato di una geometria e di un materiale
    - infine ha una posizione ed una rotazione all'interno del mondo
    */

    meshFloor = new THREE.Mesh(
        new THREE.PlaneGeometry(50,50,50,50), 
        /*qui più numeri assegno, maggiore sarà la superficie con i dettagli*/
        new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true})
    );
    meshFloor.rotation.x -= Math.PI / 2; 
    scene.add(meshFloor);

    camera.position.set(0, player.height, -5);
    camera.lookAt(new THREE.Vector3(0, player.height, 0));
    //camera.position.z = 3

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //animate();
}


function animate(){
    requestAnimationFrame(animate);

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    //Creo i tasti direzionali WASD
    if(keyboard[87]){ // W key
		camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
		camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
	}
	if(keyboard[83]){ // S key
		camera.position.x += Math.sin(camera.rotation.y) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
	}
	if(keyboard[65]){ // A key
		// Redirect motion by 90 degrees
		camera.position.x += Math.sin(camera.rotation.y + Math.PI/2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y + Math.PI/2) * player.speed;
	}
	if(keyboard[68]){ // D key
		camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y - Math.PI/2) * player.speed;
	}

    /*Gira la "camera" sull'asse Y quando i tasti direzionali sinistra
    o destra vengono premuti*/

    if(keyboard[37]){ // left arrow key
		camera.rotation.y -= player.turnSpeed;
	}
	if(keyboard[39]){ // right arrow key
		camera.rotation.y += player.turnSpeed;
	}
    renderer.render(scene, camera);
}


//window.onload = init;

function keyDown(event){ keyboard[event.keyCode] = true; }

function keyUp(event){ keyboard[event.keyCode] = false; }

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);


//Per far sì che lo scenario si adatti al ridimensionamento della finestra...
function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);
init();
animate();