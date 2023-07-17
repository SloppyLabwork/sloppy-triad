const getIdFromUrl = (url) => {
  return new URL(url).pathname.split('/').filter(Boolean).pop()
}

const isValidId = (kfId) => {
  return /[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}/i.test(
    kfId
  )
}

const mvLinkFromId = (kfId) => {
  return `https://www.keyforgegame.com/deck-details/${kfId}`
}

const dokLinkFromId = (kfId) => {
  return `https://decksofkeyforge.com/decks/${kfId}`
}

export { getIdFromUrl, isValidId, mvLinkFromId, dokLinkFromId }
