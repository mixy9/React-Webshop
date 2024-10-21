// useDebounce.test.ts
/* eslint-disable no-undef */
import { renderHook, act } from '@testing-library/react'
import useDebounce from '../hooks/useDebounce'

describe('useDebounce', () => {
  jest.useFakeTimers()

  it('should debounce value updates', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      }
    )

    rerender({ value: 'updated', delay: 500 })

    // value should still be the initial value since the delay hasn't passed yet
    expect(result.current).toBe('initial')

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(500)
    })

    // Value should now be updated
    expect(result.current).toBe('updated')
  })

  it('should reset debounce timer when value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      }
    )

    // Update the value before the delay finishes
    rerender({ value: 'updated1', delay: 500 })

    // Advance time by less than the delay
    act(() => {
      jest.advanceTimersByTime(300)
    })

    // Update the value again before the timer finishes
    rerender({ value: 'updated2', delay: 500 })

    // Advance time so that the first timer would have finished, but the second hasn't
    act(() => {
      jest.advanceTimersByTime(200)
    })

    // The value should still be the initial value because the debounce should have reset
    expect(result.current).toBe('initial')

    // Advance time to finish the second debounce delay
    act(() => {
      jest.advanceTimersByTime(300)
    })

    // The value should now be the latest updated value
    expect(result.current).toBe('updated2')
  })
})
/* eslint-enable no-undef */
