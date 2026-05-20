export const queryKeys = {
  assets: {
    all: () => ['assets'] as const,
    detail: (id: string) => ['assets', id] as const,
  },
} as const
