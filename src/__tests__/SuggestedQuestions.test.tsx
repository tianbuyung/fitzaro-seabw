import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SuggestedQuestions } from '@/components/assets/SuggestedQuestions'

describe('<SuggestedQuestions />', () => {
  it('renders three suggestion buttons', () => {
    render(<SuggestedQuestions onSelect={() => {}} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(3)
  })

  it('calls onSelect with the exact question string when a button is clicked', async () => {
    const onSelect = vi.fn()
    const user = userEvent.setup()
    render(<SuggestedQuestions onSelect={onSelect} />)

    const target = "What's the risk profile of this asset?"
    await user.click(screen.getByRole('button', { name: target }))

    expect(onSelect).toHaveBeenCalledTimes(1)
    expect(onSelect).toHaveBeenCalledWith(target)
  })

  it('calls onSelect with the yield-generation question text', async () => {
    const onSelect = vi.fn()
    const user = userEvent.setup()
    render(<SuggestedQuestions onSelect={onSelect} />)

    const target = 'How is the yield generated?'
    await user.click(screen.getByRole('button', { name: target }))

    expect(onSelect).toHaveBeenCalledWith(target)
  })
})
