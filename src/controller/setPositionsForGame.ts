import {
  setPropertyToStorage,
  getPropertyFromStorage,
} from '../controller/localStorage'

export const setPositionsForGame = (arr: NodeListOf<HTMLElement>): void => {
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
  if (!getPropertyFromStorage('postions1')) {
    setPropertyToStorage('position1', postions)
  } else {
    setPropertyToStorage('position2', postions)
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
