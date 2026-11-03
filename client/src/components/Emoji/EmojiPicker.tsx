import React, { useEffect, useMemo, useState } from "react";

import { EMOJIS } from "./emoji.data";
import type { Emoji, EmojiCategory, EmojiPickerProps } from "./emoji.types";

import "./emoji_picker.css";

const CATEGORIES: {
  id: EmojiCategory;
  label: string;
  icon: string;
}[] = [
  { id: "frequent", label: "Frequently used", icon: "🕘" },
  { id: "smileys", label: "Smileys", icon: "😀" },
  { id: "people", label: "People", icon: "👋" },
  { id: "animals", label: "Animals", icon: "🐱" },
  { id: "food", label: "Food", icon: "🍕" },
  { id: "activities", label: "Activities", icon: "⚽" },
  { id: "travel", label: "Travel", icon: "🚗" },
  { id: "objects", label: "Objects", icon: "💡" },
  { id: "symbols", label: "Symbols", icon: "❤️" },
  { id: "flags", label: "Flags", icon: "🏳️" },
];

const STORAGE_KEY = "chat-emoji-recent";

const EmojiPicker: React.FC<EmojiPickerProps> = ({
  onSelect,
  onClose,
  maxRecent = 30,
  style,
  className,
}) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<EmojiCategory>("frequent");

  const [recentIds, setRecentIds] = useState<string[]>([]);
  const [preview, setPreview] = useState<Emoji | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setRecentIds(JSON.parse(stored));
      }
    } catch {
      setRecentIds([]);
    }
  }, []);

  const filteredEmojis = useMemo(() => {
    const query = search.trim().toLowerCase();

    let result = EMOJIS;

    if (query) {
      result = EMOJIS.filter((emoji) => {
        return (
          emoji.name.toLowerCase().includes(query) ||
          emoji.id.toLowerCase().includes(query) ||
          emoji.keywords.some((keyword) =>
            keyword.toLowerCase().includes(query),
          )
        );
      });
    } else if (category === "frequent") {
      result = recentIds
        .map((id) => EMOJIS.find((emoji) => emoji.id === id))
        .filter((emoji): emoji is Emoji => Boolean(emoji));
    } else {
      result = EMOJIS.filter((emoji) => emoji.category === category);
    }

    return result;
  }, [search, category, recentIds]);

  const handleSelect = (emoji: Emoji) => {
    const updated = [
      emoji.id,
      ...recentIds.filter((id) => id !== emoji.id),
    ].slice(0, maxRecent);

    setRecentIds(updated);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Storage unavailable; selection still works.
    }

    onSelect(emoji);
  };

  return (
    <div className={`emoji-picker ${className}`} style={style}>
      <div className="emoji-picker-header">
        <div className="emoji-search">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search emoji..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>

        {onClose && (
          <button
            className="emoji-close"
            onClick={onClose}
            aria-label="Close emoji picker"
          >
            ×
          </button>
        )}
      </div>

      <div className="emoji-category-bar">
        {CATEGORIES.map((item) => (
          <button
            key={item.id}
            className={category === item.id && !search ? "active" : ""}
            title={item.label}
            onClick={() => {
              setSearch("");
              setCategory(item.id);
            }}
          >
            {item.icon}
          </button>
        ))}
      </div>

      <div className="emoji-content">
        <div className="emoji-section-title">
          {search
            ? "Search results"
            : CATEGORIES.find((item) => item.id === category)?.label}
        </div>

        <div className="emoji-grid">
          {filteredEmojis.map((emoji) => (
            <button
              key={emoji.id}
              className="emoji-item"
              title={emoji.name}
              onMouseEnter={() => setPreview(emoji)}
              onMouseLeave={() => setPreview(null)}
              onClick={() => handleSelect(emoji)}
              aria-label={emoji.name}
            >
              {emoji.native}
            </button>
          ))}
        </div>

        {filteredEmojis.length === 0 && (
          <div className="emoji-empty">No emoji found</div>
        )}
      </div>

      <div className="emoji-preview">
        {preview ? (
          <>
            <span className="preview-icon">{preview.native}</span>
            <span>{preview.name}</span>
          </>
        ) : (
          <span>Select an emoji</span>
        )}
      </div>
    </div>
  );
};

export default EmojiPicker;
