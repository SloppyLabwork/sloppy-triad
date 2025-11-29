import packageJson from '../../../package.json'

const getNewGameLink = () => window.location.href.replace(/\?.*/, '')

function Footer() {
  return (
    <>
      <div>
        <span className="text-black-50">v{packageJson.version}</span>{' '}
        -{' '}
        <a href={getNewGameLink()} className="link-primary">
          Start new game
        </a>
      </div>
      <div className="footer-wrapper flex-grow-1 d-flex">
        <ul className="footer col d-flex flex-column flex-md-row justify-content-between">
          <li>
            Made with ❤️ by&nbsp;
            <a
              href="https://sloppylabwork.com/"
              className="link-info"
              target="_blank"
              rel="noreferrer"
            >
              Sloppy Labwork
            </a>
            &nbsp; &times; &nbsp;
            <a
              href="https://www.thefinalswindle.com/p/home.html"
              className="link-info"
              target="_blank"
              rel="noreferrer"
            >
              The Final Swindle
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Footer
