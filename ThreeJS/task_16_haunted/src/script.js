import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { PointLight } from 'three'

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

const doorColor = textureLoader.load('textures/door/color.jpg')
const doorAlphaColor = textureLoader.load('textures/door/alpha.jpg')
const doorAmbientColor = textureLoader.load('textures/door/ambientOcclusion.jpg')
const doorHeightColor = textureLoader.load('textures/door/height.jpg')
const doorNormalColor = textureLoader.load('textures/door/normal.jpg')
const doorMetalColor = textureLoader.load('textures/door/metalness.jpg')
const doorRoughColor = textureLoader.load('textures/door/roughness.jpg')


const wallColor = textureLoader.load('textures/bricks/color.jpg')
const wallAmbientColor = textureLoader.load('textures/bricks/ambientOcclusion.jpg')
const wallNormalColor = textureLoader.load('textures/bricks/normal.jpg')
const wallRoughColor = textureLoader.load('textures/bricks/roughness.jpg')


const grassColor = textureLoader.load('textures/grass/color.jpg')
const grassAmbientColor = textureLoader.load('textures/grass/ambientOcclusion.jpg')
const grassNormalColor = textureLoader.load('textures/grass/normal.jpg')
const grassRoughColor = textureLoader.load('textures/grass/roughness.jpg')

grassColor.repeat.set(8, 8)
grassAmbientColor.repeat.set(8, 8)
grassNormalColor.repeat.set(8, 8)
grassRoughColor.repeat.set(8, 8)

grassColor.wrapS = THREE.RepeatWrapping
grassAmbientColor.wrapS = THREE.RepeatWrapping
grassNormalColor.wrapS = THREE.RepeatWrapping
grassRoughColor.wrapS = THREE.RepeatWrapping

grassColor.wrapT = THREE.RepeatWrapping
grassAmbientColor.wrapT = THREE.RepeatWrapping
grassNormalColor.wrapT = THREE.RepeatWrapping
grassRoughColor.wrapT = THREE.RepeatWrapping


//  * House
const house = new THREE.Group()
scene.add(house)

    const walls = new THREE.Mesh(
        new THREE.BoxBufferGeometry(3, 2, 3, 2),
        new THREE.MeshStandardMaterial({
            map: wallColor,
            transparent: true,
            aoMap: wallAmbientColor,
            normalMap: wallNormalColor,
            roughnessMap: wallRoughColor
        })
    )
    walls.geometry.setAttribute(
        'uv2',
        new THREE.Float16BufferAttribute(walls.geometry.attributes.uv.array, 2)
    )
    walls.position.y = 1;
    house.add(walls)

    const roof = new THREE.Mesh(
        new THREE.CylinderGeometry( 0, 2.3, 1, 4 ),
        new THREE.MeshStandardMaterial( {color: '#8f82ac'} )
    )
    roof.position.y = 2.5
    roof.rotation.y = Math.PI * 0.25
    house.add(roof)


    const doors = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(1.6, 1.8, 1),
        new THREE.MeshStandardMaterial({ 
            map: doorColor,
            transparent: true,
            alphaMap: doorAlphaColor,
            aoMap: doorAmbientColor,
            displacementMap: doorHeightColor,
            displacementScale: 0.1,
            normalMap: doorNormalColor,
            metalnessMap: doorMetalColor,
            roughnessMap: doorRoughColor
        })
    )
    doors.geometry.setAttribute(
        'uv2',
        new THREE.Float16BufferAttribute(doors.geometry.attributes.uv.array, 2)
    )
    doors.position.z = 1.5 + 0.01
    doors.position.y = 0.8
    house.add(doors)



const bushesGroup = new THREE.Group()

    const bushOne = new THREE.Mesh(
        new THREE.SphereBufferGeometry(0.4,16,16),
        new THREE.MeshStandardMaterial({color: '#2fb567'})
    )
    bushOne.position.set(1.2,0.3,1.9)
    bushesGroup.add(bushOne)

    const bushTwo = new THREE.Mesh(
        new THREE.SphereBufferGeometry(0.4,16,16),
        new THREE.MeshStandardMaterial({color: '#2fb567'})
    )
    bushTwo.position.set(0.7,0.1,1.9)
    bushTwo.scale.set(0.5,0.5,0.5)
    bushesGroup.add(bushTwo)

    const bushThree = new THREE.Mesh(
        new THREE.SphereBufferGeometry(0.4,16,16),
        new THREE.MeshStandardMaterial({color: '#2fb567'})
    )
    bushThree.position.set(-0.7,0.1,1.9)
    bushThree.scale.set(0.7,0.7,0.7)
    bushesGroup.add(bushThree)

    const bushFour = new THREE.Mesh(
        new THREE.SphereBufferGeometry(0.4,16,16),
        new THREE.MeshStandardMaterial({color: '#2fb567'})
    )
    bushFour.position.set(-1.1,0.2,2)
    bushFour.scale.set(0.9,0.9,0.9)
    bushesGroup.add(bushFour)

scene.add(bushesGroup)



for(let i = 0; i < 70; i++){
    const angle = Math.random() * Math.PI * 2
    const radius = 3 + Math.random() * 6
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius
    const graveGeometry = new THREE.Mesh(
        new THREE.BoxBufferGeometry(0.4,0.6,0.1),
        new THREE.MeshStandardMaterial({color: '#9c9c9c'})
    )
    graveGeometry.position.set(x, 0.3, z)
    graveGeometry.rotation.y = (Math.random() - 0.5) * 0.4
    scene.add(graveGeometry)
}


// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(20, 20),
    new THREE.MeshStandardMaterial({
            map:grassColor,
            transparent: true,
            displacementScale: 0.1,
            aoMap: grassAmbientColor,
            normalMap: grassNormalColor,
            roughnessMap: grassRoughColor
    })
)
floor.geometry.setAttribute(
        'uv2',
        new THREE.Float16BufferAttribute(floor.geometry.attributes.uv.array, 2)
    )
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)


/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#ffffff', 0.12)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

// Door lights
const doorsLight = new THREE.PointLight('#edd609', 1, 7)
const doorsLightHelper = new THREE.PointLightHelper(doorsLight)
doorsLight.position.set(0, 2, 2)
house.add(doorsLight, doorsLightHelper)


// FOG
const fog = new THREE.Fog('#1d5234', 0.3, 15)
scene.fog = fog


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
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
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
renderer.setClearColor('#1d5234')

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update() 

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()