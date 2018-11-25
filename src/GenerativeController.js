import { Scene, PerspectiveCamera, WebGLRenderer } from 'three'
import clearScene from 'utils/ClearScene'

import InfinityCycle from 'patterns/InfinityCycle'
import Roots from 'patterns/Roots'
import Chipboard from 'patterns/Chipboard'

export default class GenerativeController {
  constructor() {
    this.scene = new Scene()
    this.scene.autoUpdate = false
    this.camera = new PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    )
    this.renderer = new WebGLRenderer()
    this.renderer.sortObjects = false
    this.activePattern = null

    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor(0xf7f7e2, 1)
    this.camera.position.set(0, 0, 10)

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.render()
    }, false)

    this.render()
  }

  animateActivePattern = (time, delta, props) => {
    const { activePattern, render } = this
    if (activePattern && activePattern.animate) {
      return activePattern.animate(time, delta, props).then(() => {
        render()
      })
    }
    return Promise.reject()
  };

  callPatternAction = (callback) => {
    const { activePattern } = this
    if (activePattern && activePattern[callback]) {
      return activePattern[callback]()
    }
    return Promise.resolve()
  };

  setActivePattern = pattern => (
    clearScene(this.scene).then(() => {
      switch (pattern.name) {
        case 'Infinity Cycle':
          this.activePattern = {
            name: pattern.name,
            ...(new InfinityCycle(this.scene, pattern.props)),
          }
          break
        case 'Roots':
          this.activePattern = {
            name: pattern.name,
            ...(new Roots(this.scene, pattern.props)),
          }
          break
        case 'Chipboard':
          this.activePattern = {
            name: pattern.name,
            ...(new Chipboard(this.scene, pattern.props)),
          }
          break
        default:
          this.activePattern = null
          break
      }
    })
  );

  getActivePatternName = () => (this.activePattern ? this.activePattern.name : '');

  getDomElement = () => this.renderer.domElement;

  render = () => this.renderer.render(this.scene, this.camera);
}
