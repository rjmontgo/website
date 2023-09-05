import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

THREE.ColorManagement.enabled = false;


/**
 * Scene / Camera
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

const scene = new THREE.Scene();
const canvas = document.querySelector('.webgl') as HTMLCanvasElement
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
camera.position.set(0, 3, 8)
camera.lookAt(new THREE.Vector3(0,0,0))
scene.add(camera)

/**
 * Objects
 */

const sunGeo = new THREE.SphereGeometry(1, 16, 16)
const sunMat = new THREE.MeshStandardMaterial({
  emissive: 0xffffff,
  emissiveIntensity: 1
})
const sun = new THREE.Mesh(sunGeo, sunMat)
scene.add(sun)


const sphereGeo = new THREE.SphereGeometry(.5, 16, 16)
const sphereMat = new THREE.MeshStandardMaterial({ color: 'red' })
const sphere = new THREE.Mesh(sphereGeo, sphereMat)
scene.add(sphere)

const orbitGeo = new THREE.SphereGeometry(.25, 16, 16)
const orbitMat = new THREE.MeshStandardMaterial({ color: 'blue'})
const orbit = new THREE.Mesh(orbitGeo, orbitMat)
orbit.position.set(1.5, 0, 0)
scene.add(orbit)

/**
 * Lights
 */
const pointLight = new THREE.PointLight(0xffffff, 1, 0, 0)
pointLight.position.set(0, 1, -1)
scene.add(pointLight)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

/**
 * Register event handler when user resizes, we need to update 
 * projection matrix
 */
window.addEventListener('resize', () => {
  sizes.height = window.innerHeight
  sizes.width = window.innerWidth

  camera.aspect = sizes.width / sizes.height

  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true
})

renderer.outputColorSpace = THREE.LinearSRGBColorSpace
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) 

const clock = new THREE.Clock()
function tick() {
  const elapsedTime = clock.getElapsedTime()

  orbit.position.set(
    Math.cos(elapsedTime) + Math.cos(elapsedTime/4) * 10, 
    orbit.position.y,
    Math.sin(elapsedTime) + Math.sin(elapsedTime/4) * 10,
  )
  sphere.position.set(
    Math.cos(elapsedTime/4) * 10,
    orbit.position.y,
    Math.sin(elapsedTime/4) * 10,
  )


  renderer.render(scene, camera)

  requestAnimationFrame(tick)
}

tick()

