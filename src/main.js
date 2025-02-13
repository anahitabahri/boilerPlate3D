import './style.css'
import * as THREE from 'three'
import { addBoilerPlateMeshes, addStandardMesh, addTexturedMesh } from './addDefaultMeshes'
import { addLight } from './addDefaultLights'
import Model from './Model'

const renderer = new THREE.WebGLRenderer({ antialias:true })

// add clock
const clock = new THREE.Clock()

const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  100
)

const mixers = []
const meshes = {}
const lights = {}

const scene = new THREE.Scene()

init()
function init(){
  // set up our renderer default settings, aka where we render our scene to on our website

  renderer.setSize(window.innerWidth, window.innerHeight)

  document.body.appendChild(renderer.domElement)

  // add lights to our lights object
  lights.default = addLight()

  //  add meshes to our meshes object
  meshes.default = addBoilerPlateMeshes()
  meshes.standard = addStandardMesh()
  meshes.physical = addTexturedMesh()

  // add meshes to our scene
  scene.add(lights.default)
  scene.add(meshes.default)
  scene.add(meshes.standard)
  scene.add(meshes.physical)
  // console.log(meshes.physical)
  meshes.physical.position.set(-2,2,0)

  camera.position.set(0, 0, 5)

  instances()
  resize()
  animate()
}

function instances() {
  const flower = new Model({
    name: 'flower',
    scene: scene,
    meshes: meshes,
    url: 'flowers.glb',
    scale: new THREE.Vector3(2,2,2),
    position: new THREE.Vector3(0,-0.8,3),
    replace: true,
    animationState: true,
    mixers: mixers
  })
  flower.init()
}

function resize(){
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
  })
}

function animate(){
  // const tick = clock.getElapsedTime()
  const delta = clock.getDelta()

  requestAnimationFrame(animate)

  // play our animation mixers
  for(const mixer of mixers){
    mixer.update(delta)
  }
  if (meshes.flower) {
    // console.log(meshes.flower)
    meshes.flower.rotation.y -= 0.01
  }

  // meshes.physical.rotation.y += 0.01
  // meshes.physical.material.displacementScale = Math.sin(tick)

  meshes.default.rotation.x += 0.01
  meshes.default.rotation.y -= 0.01
  meshes.default.rotation.z -= 0.02

  meshes.standard.rotation.x += 0.01
  meshes.standard.rotation.y -= 0.01
  meshes.standard.rotation.z -= 0.02

  renderer.render(scene, camera)
}