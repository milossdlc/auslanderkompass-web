export type IconName =
  | "compass"
  | "check"
  | "calendar"
  | "book"
  | "coin"
  | "house"
  | "heart"
  | "link"
  | "close"
  | "external"
  | "lock"
  | "chevron"
  | "passport"
  | "building"
  | "flag";

const PATHS: Record<IconName, string> = {
  compass:
    '<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M15 7L11 11L9 17L13 13L15 7Z" fill="currentColor"/>',
  check:
    '<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M8 12.5L10.5 15L16 9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
  calendar:
    '<rect x="3" y="5" width="18" height="16" rx="2.5" stroke="currentColor" stroke-width="1.6"/><line x1="3" y1="9.5" x2="21" y2="9.5" stroke="currentColor" stroke-width="1.6"/><line x1="7.5" y1="3.5" x2="7.5" y2="6.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><line x1="16.5" y1="3.5" x2="16.5" y2="6.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
  book:
    '<path d="M4 5.5C4 5.5 7.2 4.3 12 5.3C16.8 4.3 20 5.5 20 5.5V18.5C20 18.5 16.8 17.3 12 18.3C7.2 17.3 4 18.5 4 18.5V5.5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><line x1="12" y1="5.3" x2="12" y2="18.3" stroke="currentColor" stroke-width="1.6"/>',
  coin:
    '<circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.6"/><line x1="9" y1="12" x2="15" y2="12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
  house:
    '<path d="M4 11L12 4L20 11V19C20 19.55 19.55 20 19 20H14V14H10V20H5C4.45 20 4 19.55 4 19V11Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
  heart:
    '<path d="M12 19C12 19 4 14 4 8.5C4 6 6 4 8.5 4C10 4 11.2 4.8 12 6C12.8 4.8 14 4 15.5 4C18 4 20 6 20 8.5C20 14 12 19 12 19Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
  link:
    '<circle cx="8" cy="12" r="4" stroke="currentColor" stroke-width="1.6"/><circle cx="16" cy="12" r="4" stroke="currentColor" stroke-width="1.6"/>',
  close:
    '<path d="M6 6L18 18M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  external:
    '<path d="M14 5H19V10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 5L10 14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 5H7C5.9 5 5 5.9 5 7V17C5 18.1 5.9 19 7 19H17C18.1 19 19 18.1 19 17V12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
  lock:
    '<rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M8 10V7C8 4.8 9.8 3 12 3C14.2 3 16 4.8 16 7V10" stroke="currentColor" stroke-width="1.6"/>',
  chevron:
    '<path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
  passport:
    '<rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="9.5" r="2.6" stroke="currentColor" stroke-width="1.4"/><line x1="8" y1="16" x2="16" y2="16" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
  building:
    '<rect x="5" y="4" width="14" height="16" rx="1.5" stroke="currentColor" stroke-width="1.6"/><line x1="8.5" y1="8" x2="8.5" y2="8.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="12" y1="8" x2="12" y2="8.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="15.5" y1="8" x2="15.5" y2="8.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="8.5" y1="11.5" x2="8.5" y2="11.51" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="12" y1="11.5" x2="12" y2="11.51" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="15.5" y1="11.5" x2="15.5" y2="11.51" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="9.5" y1="20" x2="9.5" y2="15.5" stroke="currentColor" stroke-width="1.6"/><line x1="14.5" y1="20" x2="14.5" y2="15.5" stroke="currentColor" stroke-width="1.6"/>',
  flag:
    '<line x1="5" y1="3" x2="5" y2="21" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M5 4C5 4 8 3 11 4C14 5 17 3 19 4V13C17 12 14 14 11 13C8 12 5 13 5 13V4Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
};

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: PATHS[name] }}
    />
  );
}
