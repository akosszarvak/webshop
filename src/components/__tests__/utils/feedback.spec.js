import { ref } from 'vue'
import { describe, it, expect, vi } from 'vitest'
import { setFeedback } from '@/utils/feedback'

describe('createFeedback', () => {
  it('sets feedback and clears it after the duration', () => {
    const feedbackMessage = ref('')
    const feedbackType = ref('')

    vi.useFakeTimers()

    // Call createFeedback
    setFeedback(feedbackMessage, feedbackType, 'Test message', 'success', 100)

    // Assertions immediately after function call
    expect(feedbackMessage.value).toBe('Test message')
    expect(feedbackType.value).toBe('success')

    // Advance all timers
    vi.runAllTimers()

    // Assertions after timer is cleared
    expect(feedbackMessage.value).toBe('')
    expect(feedbackType.value).toBe('')
  })
})
