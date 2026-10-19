
import "../../App.css";

const colorOf = (name = "") => {
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) % 360;
  return `hsl(${h} 55% 50%)`;
};

function Avatar({ name, size = 40, square }) {
  return (
    <div
      className={`avatar ${square ? "square" : ""}`}
      style={{ width: size, height: size, fontSize: size * 0.42, background: colorOf(name) }}
    >
      {name.trim().charAt(0).toUpperCase()}
    </div>
  );
}

export default Avatar;