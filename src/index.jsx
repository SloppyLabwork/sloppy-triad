import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './components/app'

if (import.meta.env.VITE_WEBSOCKET_URL) {
  const socket = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL)
  socket.addEventListener('open', () => {
    const root = ReactDOM.createRoot(document.getElementById('root'))
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
  })
  window.SLOPPY_TRIAD_SOCKET = socket
} else {
  const root = ReactDOM.createRoot(document.getElementById('root'))
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
  const noop = () => {}
  const mockSocket = {
    addEventListener: noop,
    removeEventListener: noop,
    send: noop,
  }
  window.SLOPPY_TRIAD_SOCKET = mockSocket
}
