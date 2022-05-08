import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
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

// Fog
const fog = new THREE.Fog('#262837', 1, 15)
scene.fog = fog

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

// Door textures
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load(
  '/textures/door/ambientOcclusion.jpg',
)
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

// Graves textures
const graveColorTexture = textureLoader.load('/textures/marble/color.jpg')
const graveRoughnessTexture = textureLoader.load('/textures/marble/roughness.jpg')
const graveNormalTexture = textureLoader.load('/textures/marble/normalDX.jpg')

// Wall textures
const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
const bricksColorAmbientOcclusionTexture = textureLoader.load(
  '/textures/bricks/ambientOcclusion.jpg',
)
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load(
  '/textures/bricks/roughness.jpg',
)

// Tower textures
const towerColorTexture = textureLoader.load('/textures/bricks/color.jpg')
const towerColorAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const towerNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const towerRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')

towerColorTexture.repeat.set(0.4,1.5)
towerColorAmbientOcclusionTexture.repeat.set(0.4,1.5)
towerNormalTexture.repeat.set(0.4,1.5)
towerRoughnessTexture.repeat.set(0.4,1.5)

towerColorTexture.wrapS = THREE.RepeatWrapping
towerColorAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
towerNormalTexture.wrapS = THREE.RepeatWrapping
towerRoughnessTexture.wrapS = THREE.RepeatWrapping

towerColorTexture.wrapT = THREE.RepeatWrapping
towerColorAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
towerNormalTexture.wrapT = THREE.RepeatWrapping
towerRoughnessTexture.wrapT = THREE.RepeatWrapping

// Grass textures
const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
const grassColorAmbientOcclusionTexture = textureLoader.load(
  '/textures/grass/ambientOcclusion.jpg',
)
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load(
  '/textures/grass/roughness.jpg',
)
grassColorTexture.repeat.set(8,8)
grassColorAmbientOcclusionTexture.repeat.set(8,8)
grassNormalTexture.repeat.set(8,8)
grassRoughnessTexture.repeat.set(8,8)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassColorAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassColorAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping

/**
 * House
 */

// Group
const house = new THREE.Group()
scene.add(house)

const church = new THREE.Group()
scene.add(church)

// Tower 
const tower = new THREE.Mesh(
    new THREE.BoxBufferGeometry(1,5,1),
    new THREE.MeshStandardMaterial({
    map: towerColorTexture,
    transparent: true,
    aoMap: towerColorAmbientOcclusionTexture,
    normalMap: towerNormalTexture,
    roughnessMap: towerRoughnessTexture,
    })
)
tower.geometry.setAttribute('uv2', 
new THREE.Float32BufferAttribute(tower.geometry.attributes.uv.array, 2)
)
tower.position.set(-2.5,2.5, -1)
church.add(tower)

// Tower Clock 
const towerClock = new THREE.Mesh(
    new THREE.CircleBufferGeometry(0.35, 32),
    new THREE.MeshStandardMaterial({color: "#BDBDAA", transparent:true})
)
towerClock.position.set(-2.5,4.5,-0.5+0.01)
church.add(towerClock)

// Clock needles

const needle1 = new THREE.Mesh(
    new THREE.BoxBufferGeometry(0.02,0.26, 0.02),
    new THREE.MeshStandardMaterial({ color: '#000000', transparent: true})
)
const needle2 = new THREE.Mesh(
    new THREE.BoxBufferGeometry(0.02,0.20, 0.02),
    new THREE.MeshStandardMaterial({ color: '#000000', transparent: true})
)
church.add(needle1, needle2)
needle1.position.set(-2.5,4.65,-0.5+0.02)
needle2.position.set(-2.4,4.57,-0.5+0.02)
needle2.rotation.z = -20

// Clock ring 

const ring = new THREE.Mesh( 
        new THREE.RingGeometry(0.34, 0.35, 30,1,0, 6.3), 
        new THREE.MeshStandardMaterial({ color: 0x000000})
)
church.add(ring)
ring.position.set(-2.5,4.5,-0.5+0.02)


// Roof Tower

const roofTower = new THREE.Mesh(
    new THREE.ConeBufferGeometry(1.2,0.8,4),
    new THREE.MeshStandardMaterial({color: '#b35f45'})
)
church.add(roofTower)

roofTower.position.set(-2.5, 5+0.4, -1)
roofTower.rotation.y = Math.PI * 0.25

// Walls
const walls = new THREE.Mesh(
  new THREE.BoxBufferGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    transparent: true,
    aoMap: bricksColorAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
  }),
)
walls.geometry.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2),
)
walls.position.y = 1.25
house.add(walls)

// Roof
const roof = new THREE.Mesh(
  new THREE.ConeBufferGeometry(3.5, 1, 4),
  new THREE.MeshStandardMaterial({ color: '#b35f45' }),
)
roof.rotation.y = Math.PI * 0.25
roof.position.y = 2.5 + 0.5
house.add(roof)

// Door
const door = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(2.2, 2.2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.1,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
  }),
)
door.geometry.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2),
)
door.position.z = 2 + 0.01
door.position.y = 1
house.add(door)

// Bushes
const bushGeometry = new THREE.SphereBufferGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' })

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(-0.8, 0.1, 2.2)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(-1, 0.05, 2.6)

const bush5 = new THREE.Mesh(bushGeometry, bushMaterial)
bush5.scale.set(0.5, 0.5, 0.5)
bush5.position.set(-2.4, 0.2, -0.3)

const bush6 = new THREE.Mesh(bushGeometry, bushMaterial)
bush6.scale.set(0.25, 0.25, 0.25)
bush6.position.set(-2.2, 0.1, 0.2)

house.add(bush1, bush2, bush3, bush4, bush5, bush6)

// Graves
const graves = new THREE.Group()
scene.add(graves)

const graveGeometry = new THREE.BoxBufferGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({ 
    map: graveColorTexture,
    transparent: true,
    normalMap: graveNormalTexture,
    roughness: graveRoughnessTexture
})


for (let i = 0; i < 50; i++) {
  const angle = Math.random() * Math.PI * 2
  const radius = 4 + Math.random() * 6
  const x = Math.sin(angle) * radius
  const z = Math.cos(angle) * radius

  // Create the mesh
  const grave = new THREE.Mesh(graveGeometry, graveMaterial)

  // Position
  grave.position.set(x, 0.3, z)

  // Rotation
  grave.rotation.z = (Math.random() - 0.5) * 0.4
  grave.rotation.y = (Math.random() - 0.5) * 0.4
  grave.castShadow = true

  grave.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(grave.geometry.attributes.uv.array, 2),
  )

  // Add the grave to the scene
  graves.add(grave)
}

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({ 
    map: grassColorTexture,
    transparent: true,
    aoMap: grassColorAmbientOcclusionTexture,
    normalMap: grassNormalTexture,
    // roughness: grassRoughnessTexture
  }),
)
floor.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2),
  )
floor.rotation.x = -Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
moonLight.position.set(4, 5, -2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(-5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(-5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(-5).max(5).step(0.001)
scene.add(moonLight)

// Door light
const doorlight = new THREE.PointLight('#ff7d46', 1, 7)
doorlight.position.set(0, 2.2, 2.7)
house.add(doorlight)

// Tower light
const towerLight = new THREE.PointLight('#ff7d46', 1, 2)
towerLight.position.set(-2.5, 5, -0.3)
church.add(towerLight)
const sphereSize= 1
const pointLightHelper = new THREE.PointLightHelper(towerLight)
//scene.add(pointLightHelper)

/**
 * Ghosts
 */

const ghost1 = new THREE.PointLight('#00ffff', 2, 3)
scene.add(ghost1)

const ghost2 = new THREE.PointLight('#01fffc', 2, 3)
scene.add(ghost2)

const ghost3 = new THREE.PointLight('#10fffe', 2, 3)
scene.add(ghost3)
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
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
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
)
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
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262837')


/**
 * Shadows
 */
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
moonLight.castShadow = true
doorlight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

towerClock.castShadow= true
needle1.castShadow=true
needle2.castShadow= true
tower.castShadow = true
walls.castShadow = true
bush1.castShadow = true
bush2.castShadow = true
bush3.castShadow = true
bush4.castShadow = true

floor.receiveShadow = true
towerClock.receiveShadow = true

doorlight.shadow.mapSize.width = 256
doorlight.shadow.mapSize.height = 256
doorlight.shadow.mapSize.far = 7

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.mapSize.far = 7

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.mapSize.far = 7

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.mapSize.far = 7

// needle1.shadow.mapSize.width = 256
// needle1.shadow.mapSize.height = 256
// needle1.shadow.mapSize.far =3


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Animate ghosts
  const ghost1Angle = elapsedTime * 0.5
  ghost1.position.x = Math.cos(ghost1Angle) * 1.5
  ghost1.position.z = Math.sin(ghost1Angle) * 4
  ghost1.position.y = Math.sin(elapsedTime * 3 ) 

  const ghost2Angle = - elapsedTime * 0.32
  ghost2.position.x = Math.cos(ghost2Angle) * 5
  ghost2.position.z = Math.sin(ghost2Angle) * 5
  ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

  const ghost3Angle = - elapsedTime * 0.18
  ghost3.position.x = Math.cos(ghost3Angle) * ( 7 + Math.sin(elapsedTime * 0.32))
  ghost3.position.z = Math.sin(ghost3Angle) * ( 7 + Math.sin(elapsedTime * 0.5))
  ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
