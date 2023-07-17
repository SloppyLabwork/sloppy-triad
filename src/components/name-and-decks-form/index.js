import { useState } from 'react'
import { isValidId, getIdFromUrl } from '../../services/kf-id'

const IS_JOIN = new URL(window.location.href).searchParams.has('game')

const validateDecks = (decksBlob) => {
  if (!decksBlob) {
    return false
  }
  const deckIds = decksBlob
    .split(/\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map(getIdFromUrl)
    .filter(isValidId)
  const uniqueDeckIds = Object.keys(
    deckIds.reduce((acc, deckId) => {
      acc[deckId] = 1
      return acc
    }, {})
  )
  return uniqueDeckIds.length === 3 && uniqueDeckIds
}

function NameAndDecksForm(props) {
  const { submitNameAndDecks } = props
  const [playerName, setPlayerName] = useState('')
  const [playerDecksBlob, setPlayerDecksBlob] = useState('')
  const handleSubmit = (event) => {
    event.preventDefault()
    const deckIds = validateDecks(playerDecksBlob)
    if (!playerName) {
      window.alert('Enter a name')
    } else if (!deckIds) {
      window.alert('Use three different decks, if you please')
    } else {
      submitNameAndDecks(playerName, deckIds)
    }
  }
  return (
    <>
      <div className="game-status">
        <div className="alert alert-info">
          <div className="fs-4 mb-2">
            {IS_JOIN ? (
              <span>
                You've been invited to a triad match. Use the form below to
                join.
              </span>
            ) : (
              <span>Use the form below to start a triad match.</span>
            )}
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Your name</label>
          <input
            type="text"
            className="form-control"
            value={playerName}
            onChange={(event) => setPlayerName(event.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Your decks</label>
          <textarea
            value={playerDecksBlob}
            onChange={(event) => setPlayerDecksBlob(event.target.value)}
            className="form-control deck-input-textarea"
            placeholder={
              'https://decksofkeyforge.com/decks/...\nhttps://decksofkeyforge.com/decks/...\nhttps://www.keyforgegame.com/deck-details/...'
            }
          />
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            {IS_JOIN ? 'Join game' : "Let's go"}
          </button>

          <button
            className="btn"
            type="button"
            onClick={() => {
              setPlayerName('')
              setPlayerDecksBlob('')
            }}
          >
            Clear
          </button>
        </div>
      </form>
    </>
  )
}

export default NameAndDecksForm
