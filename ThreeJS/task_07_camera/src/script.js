import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const sizes = {
    width: 800,
    height: 600
}

const mousePosition = {
    x: 0,
    y: 0
};

window.addEventListener('mousemove', (evt) => {
    mousePosition.x = evt.x /sizes.width -0.5
    mousePosition.y = - (evt.y /sizes.height -0.5)
})
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes

const aspectRadio = sizes.width/sizes.height;


// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera
// ORTO
// const camera = new THREE.OrthographicCamera(
//     -1 * aspectRadio,
//     1 * aspectRadio,
//     1,
//     -1,
//     0.1,
//     100

// )

// Peresp
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 100)

camera.position.z = 2
camera.lookAt(mesh.position)
scene.add(camera)


const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true;


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // mesh.rotation.y = elapsedTime;

    // camera.position.x = Math.sin(mousePosition.x * Math.PI * 2) * 3
    // camera.position.z = Math.cos(mousePosition.x * Math.PI * 2) * 3
    // camera.position.y = mousePosition.y * 5
    // camera.lookAt(mesh.position)

    controls.update()
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()