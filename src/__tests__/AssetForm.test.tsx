import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AssetForm } from '@/components/tokenize/AssetForm'

describe('<AssetForm />', () => {
  it('does not call onSubmit when the textarea has fewer than 10 chars', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    render(<AssetForm onSubmit={onSubmit} />)

    const textarea = screen.getByLabelText(/describe your business/i)
    await user.type(textarea, 'too short')

    const submit = screen.getByRole('button', { name: /structure with ai/i })
    expect(submit).toBeDisabled()

    // Force-click via the form's submit path to be defensive.
    await user.click(submit)
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('calls onSubmit with the trimmed description when 10+ chars are entered', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    render(<AssetForm onSubmit={onSubmit} />)

    const textarea = screen.getByLabelText(/describe your business/i)
    const description = 'I run a coffee shop in Bangkok with daily revenue THB 12,000.'
    await user.type(textarea, description)

    const submit = screen.getByRole('button', { name: /structure with ai/i })
    expect(submit).toBeEnabled()
    await user.click(submit)

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith(description)
  })

  it('updates the character count as the user types', async () => {
    const user = userEvent.setup()
    render(<AssetForm onSubmit={() => {}} />)

    expect(screen.getByText(/0 characters \(min 10\)/i)).toBeInTheDocument()

    const textarea = screen.getByLabelText(/describe your business/i)
    await user.type(textarea, 'hello')
    expect(screen.getByText(/5 characters \(min 10\)/i)).toBeInTheDocument()

    await user.type(textarea, ' world')
    expect(screen.getByText(/11 characters \(min 10\)/i)).toBeInTheDocument()
  })
})
