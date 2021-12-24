import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */

const group = new THREE.Group();
scene.add(group)


const coubeOne = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.2, 0.2),
    new THREE.MeshBasicMaterial({ color: 0xff33ff })
)
const coubeTwo= new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.3, 0.3),
    new THREE.MeshBasicMaterial({ color: 0xff3333 })
)
const coubeTree = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.1, 0.1), 
    new THREE.MeshBasicMaterial({ color: 0xffff33 })
)
coubeOne.position.x = 0.3;
coubeTwo.position.x = -0.4;
group.add(coubeOne, coubeTwo, coubeTree)

// mesh.position.set(a,b,c)
// mesh.position.normalize(

const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
camera.position.y = 1
camera.position.x = 1
scene.add(camera)

camera.lookAt(group.position)
console.log(group.position.distanceTo(camera.position))

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)



			const animate = function () {
				requestAnimationFrame( animate );

				group.rotation.y += 0.1

				renderer.render( scene, camera );
			};

			animate();