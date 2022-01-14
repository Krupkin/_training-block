import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

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
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load('/textures/particles/2.png')


// const particleGeometry = new THREE.SphereBufferGeometry(1.2,32,32)
// const particleMaterial = new THREE.PointsMaterial()
// particleMaterial.size = 0.02
// particleMaterial.sizeAttenuation = true

// const particles = new THREE.Points(particleGeometry, particleMaterial)

// const particleGeometryE = new THREE.SphereBufferGeometry(1,32,32)


// const particlesE = new THREE.Points(particleGeometryE, particleMaterial)

// scene.add(particles, particlesE)


const particlesGeometry = new THREE.BufferGeometry()
const count = 5000

const positions = new Float32Array(count* 3)
const colors = new Float32Array(count* 3)



for(let i = 0; i < count * 3; i++){
    positions[i] = (Math.random() - 0.5) * 10
    colors[i] = Math.random()
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

const particleMaterial = new THREE.PointsMaterial()
particleMaterial.size = 0.2
particleMaterial.sizeAttenuation = true
// particleMaterial.color = new THREE.Color('#ff88cc')
particleMaterial.transparent = true
particleMaterial.alphaMap = particleTexture
// particleMaterial.alphaTest = 0.001
// particleMaterial.depthTest = false
particleMaterial.depthWrite = false
particleMaterial.blending = THREE.AdditiveBlending


particleMaterial.vertexColors =true


const particles = new THREE.Points(particlesGeometry, particleMaterial)

const newCoub = new THREE.Mesh(
    new THREE.BoxBufferGeometry(),
    new THREE.MeshBasicMaterial()
)


scene.add(particles, newCoub)






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

     console.log(particleMaterial.color)


const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    for(let i = 0; i < count; i++){

        const i3 = i * 3
        const x = particlesGeometry.attributes.position.array[i3]
        particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x)

    }

    particlesGeometry.attributes.position.needsUpdate = true
        
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()