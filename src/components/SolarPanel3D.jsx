import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

const SolarPanel3D = () => {
  const containerRef = useRef(null)
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const rendererRef = useRef(null)
  const panelRef = useRef(null)
  const rotationSpeedRef = useRef({ x: 0.003, y: 0.005 })

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0b3d2e)
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, 3)
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.shadowMap.enabled = true
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const sunLight = new THREE.DirectionalLight(0xffd700, 1.2)
    sunLight.position.set(5, 5, 5)
    sunLight.castShadow = true
    sunLight.shadow.mapSize.width = 2048
    sunLight.shadow.mapSize.height = 2048
    scene.add(sunLight)

    const pointLight = new THREE.PointLight(0x2ecc71, 0.5)
    pointLight.position.set(-3, 2, 3)
    scene.add(pointLight)

    // Create solar panel group
    const panelGroup = new THREE.Group()
    panelRef.current = panelGroup
    scene.add(panelGroup)

    // Solar panel cells (blue-ish color mimicking silicon)
    const panelGeometry = new THREE.BoxGeometry(1.8, 1.2, 0.1)
    const panelMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a4a8a,
      metalness: 0.3,
      roughness: 0.4,
      emissive: 0x2ecc71,
      emissiveIntensity: 0.2
    })
    const panel = new THREE.Mesh(panelGeometry, panelMaterial)
    panel.castShadow = true
    panel.receiveShadow = true
    panelGroup.add(panel)

    // Grid pattern on panel
    const gridCanvas = document.createElement('canvas')
    gridCanvas.width = 512
    gridCanvas.height = 512
    const ctx = gridCanvas.getContext('2d')
    ctx.fillStyle = '#1a4a8a'
    ctx.fillRect(0, 0, 512, 512)
    ctx.strokeStyle = '#2ecc71'
    ctx.lineWidth = 2
    
    for (let i = 0; i <= 6; i++) {
      const pos = (i / 6) * 512
      ctx.beginPath()
      ctx.moveTo(pos, 0)
      ctx.lineTo(pos, 512)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, pos)
      ctx.lineTo(512, pos)
      ctx.stroke()
    }

    const gridTexture = new THREE.CanvasTexture(gridCanvas)
    const gridMaterial = new THREE.MeshStandardMaterial({
      map: gridTexture,
      metalness: 0.2,
      roughness: 0.5,
      emissive: 0x2ecc71,
      emissiveIntensity: 0.15
    })
    const gridPanel = new THREE.Mesh(panelGeometry, gridMaterial)
    gridPanel.position.z = 0.051
    panel.add(gridPanel)

    // Frame
    const frameGeometry = new THREE.BoxGeometry(1.95, 1.27, 0.05)
    const frameMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a2a2a,
      metalness: 0.8,
      roughness: 0.2
    })
    const frame = new THREE.Mesh(frameGeometry, frameMaterial)
    frame.position.z = -0.08
    panelGroup.add(frame)

    // Mounting bracket
    const bracketGeometry = new THREE.BoxGeometry(0.15, 0.3, 0.1)
    const bracketMaterial = new THREE.MeshStandardMaterial({
      color: 0x444444,
      metalness: 0.7,
      roughness: 0.3
    })
    const bracket1 = new THREE.Mesh(bracketGeometry, bracketMaterial)
    bracket1.position.set(-0.95, -0.65, 0)
    panelGroup.add(bracket1)

    const bracket2 = new THREE.Mesh(bracketGeometry, bracketMaterial)
    bracket2.position.set(0.95, -0.65, 0)
    panelGroup.add(bracket2)

    // Connection wires
    const wireGeometry = new THREE.BufferGeometry()
    const wirePositions = new Float32Array([
      -0.95, -0.5, 0,
      -0.95, 0.6, 0,
      0.95, 0.6, 0,
      0.95, -0.5, 0
    ])
    wireGeometry.setAttribute('position', new THREE.BufferAttribute(wirePositions, 3))
    const wireMaterial = new THREE.LineBasicMaterial({ color: 0xff6600, linewidth: 2 })
    const wireframe = new THREE.LineSegments(wireGeometry, wireMaterial)
    panelGroup.add(wireframe)

    // Energy particles (indicando energía generada)
    const particlesGeometry = new THREE.BufferGeometry()
    const particleCount = 50
    const particlePositions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 2
      particlePositions[i + 1] = (Math.random() - 0.5) * 1.5
      particlePositions[i + 2] = (Math.random() - 0.5) * 0.5
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x2ecc71,
      size: 0.05,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8
    })
    const particles = new THREE.Points(particlesGeometry, particleMaterial)
    panelGroup.add(particles)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      // Rotate solar panel
      panelGroup.rotation.x += rotationSpeedRef.current.x
      panelGroup.rotation.y += rotationSpeedRef.current.y

      // Animate particles
      const positions = particlesGeometry.attributes.position.array
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] -= 0.01
        if (positions[i + 1] < -0.75) {
          positions[i + 1] = 0.75
        }
      }
      particlesGeometry.attributes.position.needsUpdate = true

      renderer.render(scene, camera)
    }
    animate()

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    // Mouse controls for rotation speed
    const handleMouseMove = (e) => {
      if (!containerRef.current) return
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
      rotationSpeedRef.current.x = (y - 0.5) * 0.015
      rotationSpeedRef.current.y = (x - 0.5) * 0.015
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      containerRef.current?.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full h-96 bg-gradient-to-b from-[#0b3d2e] to-[#061e14] rounded-lg shadow-2xl"
      style={{ minHeight: '400px' }}
    />
  )
}

export default SolarPanel3D
