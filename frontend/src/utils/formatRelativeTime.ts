export const formatRelativeTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 86400)}d ago`;

  return date.toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'short'
  });
};
