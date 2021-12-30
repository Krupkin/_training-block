import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { ImageLoader, Light, SpriteMaterial } from 'three'
import * as dat from 'dat.gui'

/**
 * Base
 */
const gui = new dat.GUI()





// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


const mousePosition = {
    x: 0,
    y: 0
};

window.addEventListener('mousemove', (evt) => {
    mousePosition.x = evt.x /sizes.width -0.5
    mousePosition.y = - (evt.y /sizes.height -0.5)
})
// FIRST MATERIAL
const imageLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()
// const texture = imageLoader.load('/textures/door/color.jpg')
// const alpha = imageLoader.load('/textures/door/alpha.jpg')
// const height = imageLoader.load('/textures/door/height.jpg')
// const normal = imageLoader.load('/textures/door/normal.jpg')
// const ambient = imageLoader.load('/textures/door/ambientOcclusion.jpg')
// const metalness = imageLoader.load('/textures/door/metalness.jpg')
// const roughness = imageLoader.load('/textures/door/roughness.jpg')
// // const matcap = imageLoader.load('/textures/matcaps/1.png')
// const gradient = imageLoader.load('/textures/gradients/3.jpg')


// const material = new THREE.MeshBasicMaterial()
// material.map = texture

// SECOND MATERIAL
// const material = new THREE.MeshNormalMaterial()
// material.wireframe = true
// material.flatShading = true

// THREED MATERIAL
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcap

// FOURTH MATERIAL
// const material = new THREE.MeshDepthMaterial()

// FIFTH MATERIAL
// const material = new THREE.MeshLambertMaterial()
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 1000
// material.specular = new THREE.Color(0x00ff00)

// SIXTH MATERIAL
// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradient


// const material = new THREE.MeshStandardMaterial()
// material.metalness = 0
// material.roughness = 0.65
// material.map = texture
// material.aoMap = ambient
// material.aoMapIntensity = 1
// material.displacementMap = height
// material.displacementScale = 0.04
// material.metalnessMap = metalness
// material.roughness = roughness
// material.normalMap = normal
// material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = alpha

scene.background = new THREE.CubeTextureLoader().setPath('/textures/environmentMaps/0/')
.load([
    'px.jpg',
    'nx.jpg',
    'py.jpg',
    'ny.jpg',
    'pz.jpg',
    'nz.jpg'

])


const env = new THREE.CubeTextureLoader().setPath('/textures/environmentMaps/0/')
.load([
    'px.jpg',
    'nx.jpg',
    'py.jpg',
    'ny.jpg',
    'pz.jpg',
    'nz.jpg'

])


const material = new THREE.MeshStandardMaterial()

material.envMap = env

console.log(material.envMap)

gui.add(material, 'metalness').min(0).max(1).step(0.01)


const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
const pointLight = new THREE.PointLight(0xffffff, 0.5)



const sphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5,64,64),
    material
)
sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2))


const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1, 1, 100, 100),
    material
)
plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2))


const tour = new THREE.Mesh(
    new THREE.TorusBufferGeometry(0.4, 0.1, 10, 32),
    material
)
tour.geometry.setAttribute('uv2', new THREE.BufferAttribute(tour.geometry.attributes.uv.array, 2))


sphere.position.x = 1.2
tour.position.x = -1.2

pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4



scene.add(sphere, plane, tour)
scene.add(pointLight)
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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
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

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    sphere.rotation.x = 0.1 * elapsedTime;
    tour.rotation.x = 0.1 * elapsedTime;
    plane.rotation.x = 0.1 * elapsedTime;

    sphere.rotation.y = 0.15 * elapsedTime;
    tour.rotation.y = 0.15 * elapsedTime;
    plane.rotation.y = 0.15 * elapsedTime;

    // pointLight.position.x = Math.sin(mousePosition.x * Math.PI * 2) * 3
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()