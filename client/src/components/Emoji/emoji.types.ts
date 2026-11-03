export type EmojiCategory =
  | "frequent"
  | "smileys"
  | "people"
  | "animals"
  | "food"
  | "activities"
  | "travel"
  | "objects"
  | "symbols"
  | "flags";

export interface Emoji {
  id: string;
  native: string;
  name: string;
  category: EmojiCategory;
  keywords: string[];
  skins?: string[];
}

export interface EmojiPickerProps {
  onSelect: (emoji: Emoji) => void;
  onClose?: () => void;
  theme?: "light" | "dark";
  maxRecent?: number;
  style?: React.CSSProperties;
  className?: string;
}
