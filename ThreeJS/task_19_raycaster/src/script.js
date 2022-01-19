import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { Raycaster } from 'three'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const object1 = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object1.position.x = - 2

const object2 = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)

const object3 = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object3.position.x = 2

scene.add(object1, object2, object3)


const rayCaster = new THREE.Raycaster()

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const mouse = new THREE.Vector2()

window.addEventListener('mousemove', (evt) => {
    mouse.x = evt.clientX / sizes.width * 2 -1 
    mouse.y = - (evt.clientY / sizes.height) * 2 + 1

})


window.addEventListener('click', (evt) => {
    if(currentInterSrct){
        switch(currentInterSrct.object){
            case object1:
                console.log('object1')
                break
            case object2:
                console.log('object2')
                break
            case object3:
                console.log('object3')
                break
        }
    }
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

let currentInterSrct = null

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    object1.position.y = Math.sin(elapsedTime * 0.4) * 1.5
    object2.position.y = Math.sin(elapsedTime * 0.8) * 1.5
    object3.position.y = Math.sin(elapsedTime * 1.5) * 1.5

    rayCaster.setFromCamera(mouse, camera)

    // const rayOrgin = new THREE.Vector3(-3, 0, 0)
    // const rayDirection = new THREE.Vector3(10, 0, 0)

    // rayDirection.normalize()

    // rayCaster.set(rayOrgin, rayDirection)

    const objectsToTest = [object1, object2, object3]
    const interSects = rayCaster.intersectObjects(objectsToTest)

    // for(const val of objectsToTest){
    //     val.material.color.set('#00ffff')
        
    // }

    // for(const val of interSects){
    //     val.object.material.color.set('#0000ff')

    // }


    if(interSects.length){
        if(currentInterSrct === null){
            console.log('mouse enter')
        }

        currentInterSrct = interSects[0]

    } 
    else{
        if(currentInterSrct){
            console.log('mouse leave')
        }
        currentInterSrct = null
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()