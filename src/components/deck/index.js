import HouseIcon from '../house-icon'

function Deck(props) {
  const {
    id,
    name,
    expansion,
    houses,
    isBanned,
    isSafe,
    isSelectionToConfirm,
    isSelectable,
    selectFor,
    isDeck1,
    isDeck2,
    isDeck3,
  } = props.details

  const status = (isBanned && 'ban') || (isSafe && 'safe') || ''

  const statusDisplay =
    {
      ban: 'banned',
      safe: 'playing',
    }[status] || null

  const gameSelectionDisplay =
    (isDeck1 && 'Game 1') ||
    (isDeck2 && 'Game 2') ||
    (isDeck3 && 'Game 3') ||
    null

  const className = [
    'deck',
    'card',
    status,
    isSelectionToConfirm && 'selection-to-confirm',
    isSelectable && 'selectable',
  ].join(' ')

  const handleSelect = (event) => {
    if (!isSelectable || event.target.tagName === 'A') {
      return
    }
    props.selectDeck(selectFor, id)
  }

  return (
    <div className={className} onClick={handleSelect}>
      <div className="row g-0">
        <div className="col-sm-2 deck-houses d-none d-md-flex">&nbsp;</div>
        <div className="card-body deck-details col-sm-8">
          <div className="card-title">{name}</div>
          <div className="card-subtitle text-muted">{expansion}</div>
          <ul className="deck-links">
            <li>
              <a
                className="link-info"
                href={`https://decksofkeyforge.com/decks/${id}`}
                target="_blank"
                rel="noreferrer"
              >
                Decks of KeyForge
              </a>
            </li>
            <li>
              <a
                className="link-info"
                href={`https://www.keyforgegame.com/deck-details/${id}`}
                target="_blank"
                rel="noreferrer"
              >
                Master Vault
              </a>
            </li>
          </ul>
        </div>
        <div className="deck-houses col-sm-2 d-none d-md-flex">
          {houses.map((houseId) => (
            <HouseIcon key={houseId} houseId={houseId} />
          ))}
        </div>
      </div>

      <div className="deck-status">
        {(statusDisplay || !gameSelectionDisplay) && (
          <span className="deck-status--label">
            &nbsp;{statusDisplay}&nbsp;
          </span>
        )}
        {gameSelectionDisplay && (
          <span className="deck-state--game-selection">
            {gameSelectionDisplay}
          </span>
        )}
      </div>
    </div>
  )
}

export default Deck
