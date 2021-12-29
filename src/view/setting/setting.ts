import {
  getPropertyFromStorage,
  setPropertyToStorage,
} from '../../controller/localStorage'

const getCell = (): string => {
  return `
        <div class="cell"> </div>
    `
}

export const setting = {
  render: async (): Promise<string> => {
    return `
      <div class="setting-wrapper main-wrapper">
        <div class="field-wrapper">
            <h1 class="field-title"> Battle field </h1>
            <div class="field setting-field">
                ${getCell().repeat(25)}
            </div>
        </div>
        <div class="ship-wrapper">
            <h1 class="ship-title"> choose ship </h1>
            <div class="ship-one ship"></div>
            <div class="ship-two ship"></div>
            <div class="ship-three ship"></div>
            <button class="btn set-ship"> set the ship </button>
        </div>
        <div class="rules">
            <p> First choose a ship, then choose a place for it on the BATTLEFIELD.</p>
            <p>Сlick on the ship to turn it over</p>
            <p>Сlick on the SET BUTTON to set ship position</p>
        </div>
      </div>
      `
  },
  after_render: async () => {
    const navBar: HTMLElement = document.querySelector(
      '.nav-bar'
    ) as HTMLElement
    const shipWrapper: HTMLElement = document.querySelector(
      '.ship-wrapper'
    ) as HTMLElement
    const cell: NodeListOf<HTMLElement> = document.querySelectorAll(
      '.cell'
    ) as NodeListOf<HTMLElement>
    navBar.style.display = 'flex'
    const chooseShip = (e): void => {
      if (!getPropertyFromStorage('choosen-ship')) {
        if (e.target.classList.contains('ship-one')) {
          e.target.classList.add('choosen-ship')
          setPropertyToStorage('choosen-ship', 'ship-one')
        }
        if (e.target.classList.contains('ship-two')) {
          e.target.classList.add('choosen-ship')
          setPropertyToStorage('choosen-ship', 'ship-one')
        }
        if (e.target.classList.contains('ship-three')) {
          e.target.classList.add('choosen-ship')
          setPropertyToStorage('choosen-ship', 'ship-one')
        }
      }
    }
    const getShipToField = (): void => {
      const choosenShip = getPropertyFromStorage('choosen-ship')
      if (choosenShip) {
          
      }
    }
    shipWrapper.addEventListener('click', chooseShip)
    cell.forEach((el) => el.addEventListener('click', getShipToField))
  },
}
