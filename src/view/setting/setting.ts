import {
  getPropertyFromStorage,
  setPropertyToStorage,
  removePropertyFromStorage,
} from '../../controller/localStorage'
import {
  setPositionsForGame,
  toggleSetBtm,
} from '../../controller/setPositionsForGame'

export const getCell = (clas: string =''): string => {
  return `
        <div class="cell ${clas}"> </div>
    `
}

export const setting = {
  render: async (): Promise<string> => {
    return `
      <div class="setting-wrapper main-wrapper">
        <div class="field-wrapper">
            <h1 class="field-title"> Battle field FIRST PLAYER </h1>
            <div class="field setting-field">
                ${getCell().repeat(25)}
            </div>
        </div>
        <div class="ship-wrapper">
            <h1 class="ship-title"> choose ship </h1>
            <div class="ship-one ship"></div>
            <div class="ship-two ship"></div>
            <div class="ship-three ship"></div>
            <button class="btn set-ship"> set ships </button>
        </div>
        <div class="rules">
            <p> First choose a ship, then choose a place for it on the BATTLEFIELD.</p>
            <p>Сlick on the ship to turn it over</p>
            <p>Сlick on the SET BUTTON to save ships position</p>
        </div>
      </div>
      `
  },
  after_render: async () => {
    const navBar: HTMLElement = document.querySelector(
      '.nav-bar'
    ) as HTMLElement
    const fieldTitle: HTMLElement = document.querySelector(
      '.field-title'
    ) as HTMLElement
    const settingField: HTMLElement = document.querySelector(
      '.setting-field'
    ) as HTMLElement
    const setShip: HTMLElement = document.querySelector(
      '.set-ship'
    ) as HTMLElement
    const shipWrapper: HTMLElement = document.querySelector(
      '.ship-wrapper'
    ) as HTMLElement
    const cell: NodeListOf<HTMLElement> = document.querySelectorAll(
      '.cell'
    ) as NodeListOf<HTMLElement>
    const ship: NodeListOf<HTMLElement> = document.querySelectorAll(
      '.ship'
    ) as NodeListOf<HTMLElement>
    const getPosition = (arr: NodeListOf<HTMLElement>, cssClass: string) => {
      const smallShipPosition: Array<number> = []
      const mediumShipPosition: Array<number> = []
      const largeShipPosition: Array<number> = []
      Array.from(arr).filter(function (item, index) {
        if (item.classList.contains(cssClass)) {
          if (cssClass === 'shuffle-ship-medium') {
            mediumShipPosition.push(index)
            setPropertyToStorage('mediumShipPosition', mediumShipPosition)
          }
          if (cssClass === 'shuffle-ship-small') {
            smallShipPosition.push(index)
            setPropertyToStorage('smallShipPosition', smallShipPosition)
          }
          if (cssClass === 'shuffle-ship-large') {
            largeShipPosition.push(index)
            setPropertyToStorage('largeShipPosition', largeShipPosition)
          }
        }
      })
    }
    const chooseShip = (e): void => {
      if (!getPropertyFromStorage('choosen-ship')) {
        if (e.target.classList.contains('ship-one')) {
          e.target.classList.add('choosen-ship')
          setPropertyToStorage('choosen-ship', 'ship-one')
        }
        if (e.target.classList.contains('ship-two')) {
          e.target.classList.add('choosen-ship')
          setPropertyToStorage('choosen-ship', 'ship-two')
        }
        if (e.target.classList.contains('ship-three')) {
          e.target.classList.add('choosen-ship')
          setPropertyToStorage('choosen-ship', 'ship-three')
        }
      }
    }
    cell.forEach((el, i, arr) =>
      el.addEventListener('click', (): void => {
        const choosenShip = getPropertyFromStorage('choosen-ship')
        if (choosenShip) {
          if (choosenShip === 'ship-one') {
            if (el.classList.contains('shuffle-ship')) {
              alert('Please select another cell')
              return
            }
            el.classList.add('shuffle-ship')
            el.classList.add('shuffle-ship-small')
            getPosition(arr, 'shuffle-ship-small')
            removePropertyFromStorage('choosen-ship')
          }
          if (choosenShip === 'ship-two') {
            setPropertyToStorage('turn', true)
            if (i === 4 || i === 9 || i === 14 || i === 19) {
              if (
                el.classList.contains('shuffle-ship') ||
                arr[i + 5].classList.contains('shuffle-ship')
              ) {
                alert('Please select another cell')
                return
              }
              el.classList.add('shuffle-ship')
              el.classList.add('shuffle-ship-medium')
              arr[i + 5].classList.add('shuffle-ship')
              arr[i + 5].classList.add('shuffle-ship-medium')
              removePropertyFromStorage('choosen-ship')
              getPosition(arr, 'shuffle-ship-medium')
              return
            }
            if (i === 24) {
              if (
                el.classList.contains('shuffle-ship') ||
                arr[i - 1].classList.contains('shuffle-ship')
              ) {
                alert('Please select another cell')
                return
              }
              el.classList.add('shuffle-ship')
              el.classList.add('shuffle-ship-medium')
              arr[i - 1].classList.add('shuffle-ship')
              arr[i - 1].classList.add('shuffle-ship-medium')
              removePropertyFromStorage('choosen-ship')
              getPosition(arr, 'shuffle-ship-medium')
              return
            } else {
              if (
                el.classList.contains('shuffle-ship') ||
                arr[i + 1].classList.contains('shuffle-ship')
              ) {
                alert('Please select another cell')
                return
              }
              el.classList.add('shuffle-ship')
              el.classList.add('shuffle-ship-medium')
              arr[i + 1].classList.add('shuffle-ship')
              arr[i + 1].classList.add('shuffle-ship-medium')
              removePropertyFromStorage('choosen-ship')
              getPosition(arr, 'shuffle-ship-medium')
              return
            }
          }
          if (choosenShip === 'ship-three') {
            setPropertyToStorage('turn', true)
            if (
              i === 4 ||
              i === 9 ||
              i === 14 ||
              i === 3 ||
              i === 8 ||
              i === 13
            ) {
              if (
                el.classList.contains('shuffle-ship') ||
                arr[i + 5].classList.contains('shuffle-ship') ||
                arr[i + 10].classList.contains('shuffle-ship')
              ) {
                alert('Please select another cell')
                return
              }
              el.classList.add('shuffle-ship')
              el.classList.add('shuffle-ship-large')
              arr[i + 5].classList.add('shuffle-ship')
              arr[i + 5].classList.add('shuffle-ship-large')
              arr[i + 10].classList.add('shuffle-ship')
              arr[i + 10].classList.add('shuffle-ship-large')
              removePropertyFromStorage('choosen-ship')
              getPosition(arr, 'shuffle-ship-large')
              return
            }
            if (i === 19 || i === 24 || i === 23 || i === 18) {
              if (
                el.classList.contains('shuffle-ship') ||
                arr[i - 1].classList.contains('shuffle-ship') ||
                arr[i - 2].classList.contains('shuffle-ship')
              ) {
                alert('Please select another cell')
                return
              }
              el.classList.add('shuffle-ship')
              el.classList.add('shuffle-ship-large')
              arr[i - 1].classList.add('shuffle-ship')
              arr[i - 1].classList.add('shuffle-ship-large')
              arr[i - 2].classList.add('shuffle-ship')
              arr[i - 2].classList.add('shuffle-ship-large')
              removePropertyFromStorage('choosen-ship')
              getPosition(arr, 'shuffle-ship-large')
              return
            } else {
              if (
                el.classList.contains('shuffle-ship') ||
                arr[i + 1].classList.contains('shuffle-ship') ||
                arr[i + 2].classList.contains('shuffle-ship')
              ) {
                alert('Please select another cell')
                return
              }
              el.classList.add('shuffle-ship')
              el.classList.add('shuffle-ship-large')
              arr[i + 1].classList.add('shuffle-ship')
              arr[i + 1].classList.add('shuffle-ship-large')
              arr[i + 2].classList.add('shuffle-ship')
              arr[i + 2].classList.add('shuffle-ship-large')
              removePropertyFromStorage('choosen-ship')
              getPosition(arr, 'shuffle-ship-large')
              return
            }
          }
        }
        if (el.classList.contains('shuffle-ship-medium')) {
          const shipPosition: Array<number> =
            getPropertyFromStorage('mediumShipPosition')
          const strShipPos = shipPosition.join()
          console.log(shipPosition.join())
          if (
            strShipPos === '0,1' ||
            strShipPos === '1,2' ||
            strShipPos === '2,3' ||
            strShipPos === '3,4' ||
            strShipPos === '5,6' ||
            strShipPos === '6,7' ||
            strShipPos === '7,8' ||
            strShipPos === '8,9' ||
            strShipPos === '10,11' ||
            strShipPos === '11,12' ||
            strShipPos === '12,13' ||
            strShipPos === '13,14' ||
            strShipPos === '15,16' ||
            strShipPos === '16,17' ||
            strShipPos === '17,18' ||
            strShipPos === '18,19'
          ) {
            if (
              arr[shipPosition[1] + 4].classList.contains(
                'shuffle-ship-large'
              ) ||
              arr[shipPosition[1] + 4].classList.contains('shuffle-ship-small')
            ) {
              alert('you cant turn around, another ship is bothering you')
              return
            }
            if (getPropertyFromStorage('turn')) {
              arr[shipPosition[1]].classList.remove('shuffle-ship')
              arr[shipPosition[1]].classList.remove('shuffle-ship-medium')
              arr[shipPosition[1] + 4].classList.add('shuffle-ship')
              arr[shipPosition[1] + 4].classList.add('shuffle-ship-medium')
              setPropertyToStorage('turn', false)
              return
            }
            if (!getPropertyFromStorage('turn')) {
              arr[shipPosition[1] + 4].classList.remove('shuffle-ship')
              arr[shipPosition[1] + 4].classList.remove('shuffle-ship-medium')
              arr[shipPosition[1]].classList.add('shuffle-ship')
              arr[shipPosition[1]].classList.add('shuffle-ship-medium')
              setPropertyToStorage('turn', true)
              return
            }
          }
          if (
            strShipPos === '4,9' ||
            strShipPos === '9,14' ||
            strShipPos === '14,19' ||
            strShipPos === '19,24' ||
            strShipPos === '23,24'
          ) {
            if (
              arr[shipPosition[1] - 6].classList.contains(
                'shuffle-ship-large'
              ) ||
              arr[shipPosition[1] - 6].classList.contains('shuffle-ship-small')
            ) {
              alert('you cant turn around, another ship is bothering you')
              return
            }
            if (getPropertyFromStorage('turn')) {
              arr[shipPosition[1]].classList.remove('shuffle-ship')
              arr[shipPosition[1]].classList.remove('shuffle-ship-medium')
              arr[shipPosition[1] - 6].classList.add('shuffle-ship')
              arr[shipPosition[1] - 6].classList.add('shuffle-ship-medium')
              setPropertyToStorage('turn', false)
              return
            }
            if (!getPropertyFromStorage('turn')) {
              arr[shipPosition[1] - 6].classList.remove('shuffle-ship')
              arr[shipPosition[1] - 6].classList.remove('shuffle-ship-medium')
              arr[shipPosition[1]].classList.add('shuffle-ship')
              arr[shipPosition[1]].classList.add('shuffle-ship-medium')
              setPropertyToStorage('turn', true)
              return
            }
          }
        }
        if (el.classList.contains('shuffle-ship-large')) {
          const shipPosition: Array<number> =
            getPropertyFromStorage('largeShipPosition')
          const strShipPos = shipPosition.join()
          if (
            strShipPos === '0,1,2' ||
            strShipPos === '1,2,3' ||
            strShipPos === '2,3,4' ||
            strShipPos === '20,21,22' ||
            strShipPos === '21,22,23' ||
            strShipPos === '22,23.24' ||
            strShipPos === '4,9,14' ||
            strShipPos === '9,14,19' ||
            strShipPos === '14,19,24' ||
            strShipPos === '3,8,13' ||
            strShipPos === '8,13,18' ||
            strShipPos === '13,18,23'
          ) {
            alert('little space to turn the ship')
          } else {
            arr.forEach((el) => {
              el.classList.remove('shuffle-ship')
              el.classList.remove('shuffle-ship-large')
            })
            if (getPropertyFromStorage('turn')) {
              arr[shipPosition[0] - 4].classList.add('shuffle-ship')
              arr[shipPosition[0] - 4].classList.add('shuffle-ship-large')
              arr[shipPosition[1]].classList.add('shuffle-ship')
              arr[shipPosition[1]].classList.add('shuffle-ship-large')
              arr[shipPosition[2] + 4].classList.add('shuffle-ship')
              arr[shipPosition[2] + 4].classList.add('shuffle-ship-large')
              setPropertyToStorage('turn', false)
              return
            }
            if (!getPropertyFromStorage('turn')) {
              arr[shipPosition[0]].classList.add('shuffle-ship')
              arr[shipPosition[0]].classList.add('shuffle-ship-large')
              arr[shipPosition[1]].classList.add('shuffle-ship')
              arr[shipPosition[1]].classList.add('shuffle-ship-large')
              arr[shipPosition[2]].classList.add('shuffle-ship')
              arr[shipPosition[2]].classList.add('shuffle-ship-large')
              setPropertyToStorage('turn', true)
              return
            }
          }
        }
      })
    )
    const onSettingField = () => {
      toggleSetBtm(setShip)
    }
    const onSetShipBtn = async () => {
      removePropertyFromStorage('turn')
      removePropertyFromStorage('mediumShipPosition')
      removePropertyFromStorage('largeShipPosition')
      removePropertyFromStorage('smallShipPosition')
      setPositionsForGame(cell)
      fieldTitle.textContent = 'Battle field SECOND PLAYER'
      cell.forEach((el) => {
        el.className = 'cell'
      })
      ship.forEach((el) => {
        el.classList.remove('choosen-ship')
      })
    }
    toggleSetBtm(setShip)
    shipWrapper.addEventListener('click', chooseShip)
    setShip.addEventListener('click', onSetShipBtn)
    settingField.addEventListener('click', onSettingField)
  },
}
