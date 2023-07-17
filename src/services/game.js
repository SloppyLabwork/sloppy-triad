const getPlayerDecks = (game, ixPlayer) => {
  if (!game?.players) {
    return []
  }

  const player = game.players[ixPlayer]
  if (!player) {
    return []
  }
  const opponent = game.players[1 - ixPlayer]

  let playerDecks = player.decks

  playerDecks.sort((a, b) => {
    if (opponent?.ban === a) {
      return 1
    }
    if (opponent?.ban === b) {
      return -1
    }
    return 0
  })

  const selectFor =
    (ixPlayer === 1 && !opponent.ban && 'ban') ||
    (ixPlayer === 0 && opponent?.ban && !player.safe && 'safe')

  return playerDecks.map((deckId) => {
    const isSelectionToConfirm = deckId === game.selectionToConfirm
    const isBanned = opponent?.ban === deckId
    const isSafe = player.safe === deckId

    let isSelectable = false

    if (ixPlayer === 0 && !isBanned && selectFor === 'safe') {
      isSelectable = true
    }

    if (ixPlayer === 1 && selectFor === 'ban') {
      isSelectable = true
    }
    return {
      ...game.decks[deckId],
      selectFor,
      isSelectable,
      isSelectionToConfirm,
      isBanned,
      isSafe,
    }
  })
}

export { getPlayerDecks }
