module.exports = {
  nets: {
    net: undefined,
  },
  params: {
    class: "TRACE",
    side: "F",
    points: [
      [0, 0],
      [10, 10],
    ],
    width: 0.2,
  },
  body: (p) =>
    p.param.points
      .map((point, index) => {
        const toPoint = p.param.points?.[index + 1];

        if (!point || !toPoint) {
          return;
        }

        return `
        (segment
        (start ${p.xy(point[0], point[1])})
        (end ${p.xy(toPoint[0], toPoint[1])})
        (width ${p.param.width})
        (layer "${p.param.side}.Cu")
        (net ${p.net.net.index})
        (tstamp ergogen-trace)
      )
    `;
      })
      .join("\n"),
};
