export interface PageProps {
  title?: string
  description?: string
}

export type BrutalVariant = 'primary' | 'ghost'

export interface Link {
  label: string
  href: string
}
