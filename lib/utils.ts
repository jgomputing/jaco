export function formatDate(date: string | Date): string {
  try {
    const parsedDate = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(parsedDate.getTime())) {
      return 'Invalid Date';
    }
    
    return parsedDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
} 