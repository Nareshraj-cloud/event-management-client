/* Reusable 3D scene: floating rotating cubes and rings
   drifting in perspective space behind auth forms. */

export default function Scene3D() {
  const shapes = [
    { type: "cube", top: "8%", left: "6%", size: 46, delay: 0 },
    { type: "ring", top: "18%", left: "82%", size: 60, delay: 1.5 },
    { type: "cube", top: "70%", left: "10%", size: 34, delay: 0.8 },
    { type: "ring", top: "76%", left: "78%", size: 40, delay: 2.2 },
    { type: "cube", top: "40%", left: "90%", size: 26, delay: 1.1 },
    { type: "ring", top: "50%", left: "3%", size: 30, delay: 0.4 },
  ];

  return (
    <div className="scene3d">
      {shapes.map((s, i) => (
        <div
          key={i}
          className={`shape3d shape3d-${s.type}`}
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
          }}
        >
          {s.type === "cube" ? (
            <>
              <div className="face front" />
              <div className="face back" />
              <div className="face left" />
              <div className="face right" />
              <div className="face top" />
              <div className="face bottom" />
            </>
          ) : (
            <div className="ring-band" />
          )}
        </div>
      ))}
    </div>
  );
}
