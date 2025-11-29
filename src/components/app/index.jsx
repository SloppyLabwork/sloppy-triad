import { useEffect, useState } from 'react'
import Deck from '../deck'
import Status from '../status'
import PlayerNameAndDecksForm from '../name-and-decks-form'
import GameRecovery from '../game-recovery'
import Footer from '../footer'
import { getPlayerDecks } from '../../services/game'
import * as gameStates from '../../services/sample-states'
import './style.css'

const INITIAL_GAME_STATE = import.meta.env.VITE_GAME_STATE
  ? gameStates[import.meta.env.VITE_GAME_STATE]
  : gameStates.EMPTY

const submitNameAndDecks = (playerName, playerDecks) => {
  const url = new URL(window.location.href)
  window.SLOPPY_TRIAD_SOCKET.send(
    JSON.stringify({
      action: 'submit-name-and-decks',
      payload: {
        gameId: url.searchParams.get('game'),
        name: playerName,
        decks: playerDecks,
      },
    })
  )
}

const selectDeck = (gameId, selectFor, deckId) => {
  window.SLOPPY_TRIAD_SOCKET.send(
    JSON.stringify({
      action: 'select-deck',
      payload: {
        deck: deckId,
        gameId,
        selectFor,
      },
    })
  )
}

const getRecoveryKey = () => {
  const url = new URL(window.location.href)
  const queryParamRecoveryKey = url.searchParams.get('recoveryKey')
  if (queryParamRecoveryKey) {
    return queryParamRecoveryKey
  }

  const queryParamGameId = url.searchParams.get('game')
  const storageKeyPair = window.localStorage.getItem('recoveryKey')
  if (storageKeyPair?.length) {
    const [gameId, recoveryKey] = storageKeyPair.split('::')
    if (gameId === queryParamGameId && recoveryKey) {
      return recoveryKey
    }
  }

  return null
}

const recoverGameIfNeeded = (game) => {
  if (!game.recoveryKey) {
    const url = new URL(window.location.href)
    const gameId = url.searchParams.get('game')
    const recoveryKey = getRecoveryKey()
    if (gameId && recoveryKey) {
      window.SLOPPY_TRIAD_SOCKET.send(
        JSON.stringify({
          action: 'recover-game',
          payload: {
            gameId,
            recoveryKey,
          },
        })
      )
      return true
    }
  }
  return false
}

const getJoinLink = (game) => {
  const url = window.location.href.replace(/\?.*/, '')
  return `${url}?game=${game.id}`
}

function App() {
  const [game, setGame] = useState(INITIAL_GAME_STATE)

  useEffect(() => {
    const updateStateOnMessage = (event) => {
      const updateData = JSON.parse(event.data)
      const nextGameState = {
        ...game,
        ...updateData.game,
      }
      setGame(nextGameState)
      try {
        if (nextGameState.recoveryKey) {
          const gameId = nextGameState.id
          const recoveryKey = nextGameState.recoveryKey
          window.localStorage.setItem(
            `recoveryKey`,
            `${gameId}::${recoveryKey}`
          )
          window.history.pushState(null, null, `?game=${gameId}`)
        }
      } catch (err) {
        console.error('Failed to set a recovery key in storage')
        console.error(err)
      }
    }
    window.SLOPPY_TRIAD_SOCKET.addEventListener('message', updateStateOnMessage)
    return () => {
      window.SLOPPY_TRIAD_SOCKET.removeEventListener(
        'message',
        updateStateOnMessage
      )
    }
  })

  useEffect(() => {
    const heartbeatInterval = window.setInterval(() => {
      if (game.id && !game.isDisconnected) {
        window.SLOPPY_TRIAD_SOCKET.send(
          JSON.stringify({
            action: 'heartbeat',
            payload: {
              gameId: game.id,
            },
          })
        )
      }
    }, 15 * 1000)
    return () => {
      window.clearInterval(heartbeatInterval)
    }
  })

  useEffect(() => {
    const removeSelectionToConfirmOnClickOutsideDeck = (event) => {
      if (!game.selectionToConfirm) {
        return
      }
      try {
        const isClickInDeck = Boolean(event.target.closest('.deck.card'))
        if (!isClickInDeck) {
          setGame({
            ...game,
            selectionToConfirm: null,
          })
        }
      } catch (err) {
        console.error(err)
      }
    }
    document.addEventListener(
      'mousedown',
      removeSelectionToConfirmOnClickOutsideDeck
    )
    return () => {
      document.removeEventListener(
        'mousedown',
        removeSelectionToConfirmOnClickOutsideDeck
      )
    }
  })

  if (recoverGameIfNeeded(game)) {
    return 'Hang on... restarting the Nintendo...'
  }

  const myDecks = getPlayerDecks(game, 0)
  const theirDecks = getPlayerDecks(game, 1)

  const handleSelect = (selectFor, deckId) => {
    if (game.selectionToConfirm === deckId) {
      selectDeck(game.id, selectFor, deckId)
      const [me, them] = game.players
      setGame({
        ...game,
        selectionToConfirm: null,
        players: [
          {
            ...me,
            [selectFor]: deckId,
          },
          them,
        ],
      })
    } else {
      setGame({
        ...game,
        selectionToConfirm: deckId,
      })
    }
  }

  if (game.isDisconnected) {
    return (
      <div className="app h-100">
        <div className="container d-flex flex-column h-100">
          {game.isDisconnected && (
            <div className="alert alert-warning">
              <div className="fs-2">Welp...</div>
              <div>
                You've been disconnected. Use the recovery link below to get
                back into your game.
              </div>
            </div>
          )}
          <GameRecovery game={game} />
          <Footer></Footer>
        </div>
      </div>
    )
  }

  return (
    <div className="app h-100">
      <div className="container d-flex flex-column h-100">
        <Status game={game}></Status>

        {!game.players?.length && (
          <div className="row flex">
            <div className="col-lg-6 ms-auto me-auto">
              <PlayerNameAndDecksForm
                submitNameAndDecks={submitNameAndDecks}
              ></PlayerNameAndDecksForm>
            </div>
          </div>
        )}

        {game.players?.length === 1 && (
          <div className="alert alert-info text-center fs-4">
            <span className="alert-header">
              Welcome, {game.players[0].name}
            </span>
            <div>
              Check over your decks below, then send your opponent this link to
              join the game:
            </div>
            <a href={getJoinLink(game)}>{getJoinLink(game)}</a>
          </div>
        )}

        <div className="row mb-4">
          {myDecks?.length > 0 && (
            <div className="col">
              <div className="player-name">{game.players[0].name}</div>
              <ul className="my-decks-list decks-list">
                {myDecks.map((deck) => (
                  <li key={deck.id}>
                    <Deck details={deck} selectDeck={handleSelect}></Deck>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {theirDecks?.length > 0 && (
            <div className="col-lg">
              <div className="player-name">{game.players[1].name}</div>
              <ul className="their-decks-list decks-list">
                {theirDecks.map((deck) => (
                  <li key={deck.id}>
                    <Deck details={deck} selectDeck={handleSelect}></Deck>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <GameRecovery game={game} />
        <Footer />
      </div>
    </div>
  )
}

export default App
