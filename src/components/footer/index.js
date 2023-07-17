const getNewGameLink = () => window.location.href.replace(/\?.*/, '')

function Footer() {
  return (
    <>
      <div>
        <span className="text-black-50">v{process.env.REACT_APP_VERSION}</span>{' '}
        -{' '}
        <a href={getNewGameLink()} className="link-primary">
          Start new game
        </a>
      </div>
      <div className="footer-wrapper flex-grow-1 d-flex">
        <ul className="footer col d-flex flex-column flex-md-row justify-content-between">
          <li>
            <a
              href="https://sloppylabwork.com/"
              className="link-info"
              target="_blank"
              rel="noreferrer"
            >
              Made with ❤️ by Sloppy Labwork
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Footer
