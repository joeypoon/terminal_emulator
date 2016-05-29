export function updateHistory(line) {
  return {
    type: 'UPDATE_HISTORY',
    line
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