import React from "react";
import { fmtTime } from "../../utils";
import "../../App.css";

// Components
import Avatar from "../Avatar";

/* ---------------- Một tin nhắn ---------------- */
const REACTIONS = ["👍", "❤️", "😆", "😮", "😭", "😡"];

function Message({ m, me, showHeader, onReact }) {
  const mine = m.author === me;
  const entries = Object.entries(m.reactions || {});
  const total = entries.reduce((sum, [, users]) => sum + users.length, 0);
  const myReaction = entries.find(([, users]) => users.includes(me))?.[0];
  const tooltip = entries.map(([e, users]) => `${e} ${users.join(", ")}`).join("\n");

  return (
    <div className={`row ${mine ? "mine" : ""} ${showHeader ? "first" : ""}`}>
      {!mine &&
        (showHeader ? <Avatar name={m.author} size={36} /> : <span className="avatar-gap" />)}

      <div className="bubble-wrap">
        <div className="bubble">
          {!mine && showHeader && <div className="author">{m.author}</div>}
          <div className="text">{m.text}</div>
          <div className="time">{fmtTime(m.time)}</div>

          {total > 0 && (
            <div className="chip" title={tooltip}>
              {entries.slice(0, 3).map(([e]) => (
                <span key={e}>{e}</span>
              ))}
              {total > 1 && <b>{total}</b>}
            </div>
          )}
        </div>

        {/* Nút thả cảm xúc: bấm = 👍 nhanh, rê chuột vào = hiện đủ 6 reaction */}
        <div className="react-zone">
          <div className="picker">
            {REACTIONS.map((e) => (
              <button
                key={e}
                className={e === myReaction ? "picked" : ""}
                onClick={() => onReact(m.id, e)}
              >
                {e}
              </button>
            ))}
          </div>
          <button
            className={`quick ${myReaction ? "active" : ""}`}
            aria-label="Thả cảm xúc"
            onClick={() => onReact(m.id, myReaction ?? "👍")}
          >
            {myReaction ?? "👍"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Message;