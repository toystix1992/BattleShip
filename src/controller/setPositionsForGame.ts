import {
  setPropertyToStorage,
  getPropertyFromStorage,
} from '../controller/localStorage'

export const setPositionsForGame = (arr: NodeListOf<HTMLElement>): void => {
  const pos = getPropertyFromStorage('position1')
  const postions = {
    smal: [],
    medium: [],
    large: [],
  }
  arr.forEach((el: HTMLElement, i: number) => {
    if (el.classList.contains('shuffle-ship-large')) {
      postions.large.push(i)
    }
    if (el.classList.contains('shuffle-ship-medium')) {
      postions.medium.push(i)
    }
    if (el.classList.contains('shuffle-ship-small')) {
      postions.smal.push(i)
    }
  })
  console.log(pos)

  if (!pos) {
    setPropertyToStorage('position1', postions)
  } else if (pos) {
    setPropertyToStorage('position2', postions)
    if (getPropertyFromStorage('position2')) {
      window.location.hash = 'game'
    }
  }
}

export const toggleSetBtm = (el: HTMLElement): void => {
  if (
    !getPropertyFromStorage('smallShipPosition') ||
    !getPropertyFromStorage('mediumShipPosition') ||
    !getPropertyFromStorage('largeShipPosition')
  ) {
    el.style.display = 'none'
  } else {
    el.style.display = 'block'
  }
}
