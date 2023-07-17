# Sloppy Triad

## Running the App

Install your node modules and then start:

```javascript
npm install
npm start
```

## Configuration

This app communicates via websocket with an external API. For a fully
integrated development environment, bug me to give you the URL of
our development server then add an appropriate entry in your `.env` file.

Contents of `./.env`:

```
REACT_APP_WEBSOCKET_URL=wss://foo.websocketthingy.com/gateway
```

Don't feel like it? Tweak the sample states in `./src/services/sample-states.js`
and update your env variables:

```
# REMOVE THIS ONE
#REACT_APP_WEBSOCKET_URL= ...

# Set this to your desired state :)
REACT_APP_GAME_STATE=BAN_SAFE
```

## Colophon

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).