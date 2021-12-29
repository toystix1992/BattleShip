import './main.css'
import { home } from './view/home/home'
import { setting } from './view/setting/setting'

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
  '/': home,
  '/setting': setting,
  // '/game': game,
}

// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
export const router = async () => {
  const content = null || document.getElementById('root')
  const parsedURL = window.location.hash
    ? window.location.hash.replace('#', '/')
    : '/'

  const page = routes[parsedURL] ? routes[parsedURL] : console.log('ERRROR')

  content.innerHTML = await page.render()
  await page.after_render()
}

const onLoadInvokedFunc = () => {
  router()
}

window.addEventListener('hashchange', router)
window.addEventListener('load', onLoadInvokedFunc)
