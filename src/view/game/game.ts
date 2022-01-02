import { getCell } from '../setting/setting'
import {
  getPropertyFromStorage,
  setPropertyToStorage,
  removePropertyFromStorage,
} from '../../controller/localStorage'

export const game = {
  render: async (): Promise<string> => {
    return `
      <div class="setting-wrapper main-wrapper">
      <div class="field-wrapper field-wrapper-first">
      <h1 class="field-title"> FIRST PLAYER </h1>
      <div class="field setting-field first-field">
          ${getCell('cell-first').repeat(25)}
      </div>
      </div>
      <div class="field-wrapper field-wrapper-second">
      <h1 class="field-title"> SECOND PLAYER </h1>
      <div class="field setting-field second-field">
          ${getCell('cell-second').repeat(25)}
      </div>
      </div>
      </div>
      `
  },
  after_render: async () => {
    const cellFirst: NodeListOf<HTMLElement> = document.querySelectorAll(
      '.cell-first'
    ) as NodeListOf<HTMLElement>
    const cellSecond: NodeListOf<HTMLElement> = document.querySelectorAll(
      '.cell-second'
    ) as NodeListOf<HTMLElement>
    const navBar: HTMLElement = document.querySelector(
      '.nav-bar'
    ) as HTMLElement
    const fieldWrapperFirst: HTMLElement = document.querySelector(
      '.field-wrapper-first'
    ) as HTMLElement
    const fieldWrapperSecond: HTMLElement = document.querySelector(
      '.field-wrapper-second'
    ) as HTMLElement
    let counter1 = 0
    let counter2 = 0
    fieldWrapperSecond.style.display = 'none'
    fieldWrapperFirst.style.display = 'block'
    navBar.style.display = 'flex'
    cellFirst.forEach((el, i) => {
      el.addEventListener('click', () => {
        const secondShips = getPropertyFromStorage('position2')
        if (fieldWrapperFirst.style.display === 'block') {
          if (
            secondShips.large.includes(i) ||
            secondShips.medium.includes(i) ||
            secondShips.smal.includes(i)
          ) {
            counter1++
            if (counter1 === 6) {
              alert('FIRST PLAYER WIN')
              window.location.hash = ''
              localStorage.clear()
            }
            alert('hit')
            el.classList.add('hit-shot')
          } else {
            alert('miss, move transition')
            el.classList.add('mised-shot')
            fieldWrapperSecond.style.display = 'block'
            fieldWrapperFirst.style.display = 'none'
          }
        }
      })
    })
    cellSecond.forEach((el, i) => {
      el.addEventListener('click', () => {
        const firstShips = getPropertyFromStorage('position1')
        if (fieldWrapperSecond.style.display === 'block') {
          if (
            firstShips.large.includes(i) ||
            firstShips.medium.includes(i) ||
            firstShips.smal.includes(i)
          ) {
            counter2++
            if (counter2 === 6) {
              alert('SECOND PLAYER WIN')
              window.location.hash = ''
              localStorage.clear()
            }
            alert('hit')
            el.classList.add('hit-shot')
          } else {
            alert('miss, move transition')
            el.classList.add('mised-shot')
            fieldWrapperSecond.style.display = 'none'
            fieldWrapperFirst.style.display = 'block'
          }
        }
      })
    })
  },
}
