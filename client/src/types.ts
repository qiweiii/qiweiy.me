export const AppTheme = {
  DARK: 'dark',
  LIGHT: 'light'
}

export type BlogContent = {
  title: string
  content: string
  author: string
  tags: string
  image?: string
}

export type Blog = {
  content: BlogContent
  noteId: string
  createdAt: string
  editedAt: string
}
