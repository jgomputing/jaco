export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

export function createMetaTitle(title: string): string {
  return `${title} | ${process.env.NEXT_PUBLIC_SITE_NAME || 'JACO MUSICAL'}`
} 