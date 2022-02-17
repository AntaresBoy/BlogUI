export interface UpdateBlogType {
  contentId: string
  title: string | undefined
  content: string | undefined
  tags: Array<string>
}

export interface NewBlogType {
  content: string | ''
  title: string
  tags: Array<string>
}
