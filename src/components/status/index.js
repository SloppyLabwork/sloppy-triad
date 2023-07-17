import { getPlayerDecks } from '../../services/game'

const getWaitingForSelection = (selectFor, isAwaitingConfirmation) => {
  const selectForDisplay = {
    ban: 'ban',
    safe: 'play',
  }[selectFor]
  return (
    <div className="alert alert-info text-center fs-4">
      Select a deck to <b>{selectForDisplay}</b>.
      <div style={{ fontSize: 'smaller' }}>
        {isAwaitingConfirmation
          ? 'Click again to lock in your selection. No take backs.'
          : 'Selectable decks are highlighted in gold'}
      </div>
    </div>
  )
}

function Status(props) {
  const { game } = props

  if (game.message) {
    return (
      <div className={`alert alert-${game.message.type} text-center fs-4`}>
        {game.message.text}
      </div>
    )
  }

  const myDecks = getPlayerDecks(game, 0)
  const theirDecks = getPlayerDecks(game, 1)
  const mySelectFor = myDecks.find((x) => x.selectFor)?.selectFor
  const theirSelectFor = theirDecks.find((x) => x.selectFor)?.selectFor
  const selectFor = mySelectFor || theirSelectFor

  if (!myDecks.length || !theirDecks.length) {
    return null
  }

  if (game.players?.[0]?.safe && game.players?.[1]?.safe) {
    return null
  }

  return (
    <div className="game-status">
      {game.message && (
        <div className={`alert alert-${game.message.type} text-center fs-4`}>
          {game.message.text}
        </div>
      )}
      {selectFor ? (
        getWaitingForSelection(selectFor, Boolean(game.selectionToConfirm))
      ) : (
        <div className="alert alert-info text-center fs-4">
          Waiting for opponent to make a selection.
        </div>
      )}
    </div>
  )
}

export default Status
