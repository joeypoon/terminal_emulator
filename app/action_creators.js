export function setInput(event) {
  return {
    type: 'SET_INPUT',
    event
  }
}

export function startNewLine() {
  return {
    type: 'START_NEW_LINE'
  }
}

export function updateLastLine() {
  return {
    type: 'UPDATE_LAST_LINE'
  }
}

export function addToQueue(lines) {
  return {
    type: 'ADD_TO_QUEUE',
    lines
  }
}

export function removeFromQueue() {
  return {
    type: 'REMOVE_FROM_QUEUE',
  }
}