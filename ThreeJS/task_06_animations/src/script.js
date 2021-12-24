import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)


// let time = Date.now()

// const tick = () => {
//     const deltatime = Date.now();
//     const delta = deltatime - time;
//     time = deltatime

//     mesh.rotation.x += 0.001 * delta
//     renderer.render(scene, camera)
//     window.requestAnimationFrame(tick)
// }
// tick()


// const clock = new THREE.Clock()

// const tick = () => {

//     const elapsedTime = clock.getElapsedTime()
//     console.log(elapsedTime)

//     mesh.rotation.x = elapsedTime * Math.PI * 1.5
//     mesh.rotation.y = elapsedTime * Math.PI * 1.5
//     mesh.position.x = Math.sin(elapsedTime)
//     mesh.position.y = Math.cos(elapsedTime)
//     renderer.render(scene, camera)
//     window.requestAnimationFrame(tick)
// }
// tick()


gsap.to(mesh.position, {duration: 1, delat:1, x:2, })

const tick = () => {
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()