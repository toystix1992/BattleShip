export const home = {
  render: async (): Promise<string> => {
    return `
    <div class="home-wrapper main-wrapper">
        <a href="#setting" class="switch-start-page">Start Game</a>
    </div>
    `
  },
  after_render: async () => {
    const navBar: HTMLElement = document.querySelector(
      '.nav-bar'
    ) as HTMLElement
    navBar.style.display = 'none'
  },
}
