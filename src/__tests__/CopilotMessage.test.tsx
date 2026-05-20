import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CopilotMessage } from '@/components/assets/CopilotMessage'

describe('<CopilotMessage />', () => {
  it('renders a user message with the "You" label and the text', () => {
    render(<CopilotMessage role="user" text="Hello from the investor" />)
    expect(screen.getByText('You')).toBeInTheDocument()
    expect(screen.getByText('Hello from the investor')).toBeInTheDocument()
  })

  it('renders an assistant message with the "Fitzaro AI" label and the text', () => {
    render(
      <CopilotMessage role="assistant" text="Here is the risk breakdown" />,
    )
    expect(screen.getByText('Fitzaro AI')).toBeInTheDocument()
    expect(screen.getByText('Here is the risk breakdown')).toBeInTheDocument()
  })
})
