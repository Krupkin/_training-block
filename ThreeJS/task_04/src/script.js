import './style.css';
import * as THREE from 'three';

const canvas = document.querySelector('.webgl');

const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({color: 0xff0000})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)


const sizes = {
    width: 800,
    heigth: 600
}
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.heigth, 0.1, 1000);
scene.add(camera)
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(window.innerWidth, window.innerHeight)


			const animate = function () {
				requestAnimationFrame( animate );

				mesh.rotation.x += 0.01;
				mesh.rotation.y += 0.01;

				renderer.render( scene, camera );
			};

animate();