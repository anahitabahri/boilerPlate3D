import {
    BoxGeometry,
    MeshBasicMaterial,
    MeshStandardMaterial,
    Mesh,
    TextureLoader,
    MeshPhysicalMaterial,
    SphereGeometry
} from 'three'

// define my texture loader
const loader = new TextureLoader()

// example function using textures and mesh physical material
export const addTexturedMesh = () => {
    // color
    // const color = loader.load('Ice_001_COLOR.jpg')
    const color = loader.load('Obsidian_002_basecolor.png')
    // const normal = loader.load('Ice_001_NRM.jpg')
    const normal = loader.load('Obsidian_002_normal.png')
    // const displace = loader.load('Ice_001_DISP.png')
    // const ao = loader.load('Ice_001_OCC.jpg')
    const ao = loader.load('Obsidian_002_ambientOcclusion.png')

    const sphere = new SphereGeometry(0.5, 100, 100)
    const sphereMaterial = new MeshPhysicalMaterial({
        map: color, 
        normalMap: normal,
        // displacementMap: displace,
        displacementScale: 0.3,
        aoMap: ao,
        metalness: 0.1,
        roughness: 0,
        transmission: 0.5,
        ior: 2.33,
    })
    const sphereMesh = new Mesh(sphere, sphereMaterial)
    return sphereMesh
}

export const addBoilerPlateMeshes = () => {
    const box = new BoxGeometry(1, 1, 1)
    const boxMaterial = new MeshBasicMaterial({color: 0xff0000})
    const boxMesh = new Mesh(box, boxMaterial)
    boxMesh.position.set(-2, 0, 0)
    return boxMesh
}

export const addStandardMesh = () => {
    const box = new BoxGeometry(1, 1, 1)
    const boxMaterial = new MeshStandardMaterial( {color: 0x00ff00} )
    const boxMesh = new Mesh(box, boxMaterial)
    boxMesh.position.set(2, 0, 0)
    return boxMesh
}