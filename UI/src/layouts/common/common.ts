export function handleContentCharNumber(content: string) {
  if (content.length > 100) {
    if (content.startsWith('#')) content.replace('#', '')
    return content.slice(1, 100) + '...'
  }
  return content
}
