import { useState } from 'react'

const getRecoveryLink = (game) => {
  const url = window.location.href.replace(/\?.*/, '')
  return `${url}?game=${game.id}&recoveryKey=${game.recoveryKey}`
}

function GameRecovery(props) {
  const [isRecoveryLinkVisible, setIsRecoveryLinkVisible] = useState(false)
  const { game } = props
  return (
    game.recoveryKey && (
      <div className="alert alert-secondary">
        <span className="fs-4 d-block">Game Recovery Link</span>
        <span className="d-block">
          Need to come back later? Use the link below to resume this game. We
          suggest saving this link somewhere safe right now, just in case an
          evil Urchin sneaks up behind you and refreshes your browser. Keep in
          mind that anyone can use this link to resume your session.
        </span>
        {isRecoveryLinkVisible ? (
          <>
            <button
              className="mt-3 d-block btn btn-light"
              onClick={() => setIsRecoveryLinkVisible(false)}
            >
              Hide recovery link
            </button>
            <code className="mt-3 d-block user-select-all">
              {getRecoveryLink(game)}
            </code>
          </>
        ) : (
          <button
            className="mt-3 d-block btn btn-light"
            onClick={() => setIsRecoveryLinkVisible(true)}
          >
            Show recovery link
          </button>
        )}
      </div>
    )
  )
}

export default GameRecovery
