'use client'

import { useMutation } from '@tanstack/react-query'
import { askCopilot, type AskCopilotInput } from '../api/ask-copilot'

export function useCopilot() {
  return useMutation({
    mutationFn: (input: AskCopilotInput) => askCopilot(input),
  })
}
