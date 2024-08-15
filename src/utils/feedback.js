export function setFeedback(feedbackMessage, feedbackType, message, type, duration = 3500) {
  feedbackMessage.value = message
  feedbackType.value = type

  setTimeout(() => {
    feedbackMessage.value = ''
    feedbackType.value = ''
  }, duration)
}
