/* AI-themed animated neural network background.
   Nodes pulse and connecting lines glow, evoking a neural net —
   fits an Artificial Intelligence department identity. */

export default function NeuralBackground() {
  const nodes = [
    { x: 8, y: 15 }, { x: 25, y: 8 }, { x: 42, y: 20 }, { x: 60, y: 10 },
    { x: 78, y: 22 }, { x: 92, y: 12 }, { x: 15, y: 38 }, { x: 35, y: 45 },
    { x: 55, y: 35 }, { x: 72, y: 48 }, { x: 88, y: 40 }, { x: 5, y: 65 },
    { x: 22, y: 72 }, { x: 40, y: 62 }, { x: 58, y: 75 }, { x: 76, y: 68 },
    { x: 95, y: 78 }, { x: 12, y: 92 }, { x: 48, y: 90 }, { x: 82, y: 92 },
  ];

  const links = [
    [0,1],[1,2],[2,3],[3,4],[4,5],[0,6],[1,6],[2,7],[2,8],[3,8],[4,9],[5,10],
    [6,7],[7,8],[8,9],[9,10],[6,11],[7,12],[8,13],[9,14],[10,15],[10,16],
    [11,12],[12,13],[13,14],[14,15],[15,16],[11,17],[13,18],[15,19],[18,19],
  ];

  return (
    <svg
      className="neural-bg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      {links.map(([a, b], i) => {
        const n1 = nodes[a];
        const n2 = nodes[b];
        return (
          <line
            key={`l-${i}`}
            x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y}
            className="neural-link"
            style={{ animationDelay: `${(i % 10) * 0.3}s` }}
          />
        );
      })}
      {nodes.map((n, i) => (
        <circle
          key={`n-${i}`}
          cx={n.x} cy={n.y} r={i % 3 === 0 ? 1.4 : 0.9}
          className="neural-node"
          style={{ animationDelay: `${(i % 7) * 0.4}s` }}
        />
      ))}
    </svg>
  );
}
