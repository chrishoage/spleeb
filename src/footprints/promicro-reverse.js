// Arduino ProMicro atmega32u4au
// Params
//  orientation: default is down
//    if down, power led will face the pcb
//    if up, power led will face away from pcb
//  side: default is front
//    if front, mcu is placed on the side with the switches
//    if back, mcu is placed on the opposed side of the switches
//  mask: default is both
//    if both, thru hole pads can be soldered on either side
//    if single, thru hole pads can only be soldered on the opposite `side`
//  names: default is on
//    if on, pins have pin name in silk screen
//    if off, pins have no silkscreen
//  marker: default is raw
//    if raw, raw pin has square around it
//    if column, column has square around it
//    if off, marker is turned off
const pitch = 2.54;
const row_spacing = 6 * pitch;
const pad_size = 1.7526;

const pins = [
  // left
  ["RAW", {}],
  ["GND", {}],
  ["RST", {}],
  ["VCC", {}],
  ["P21", {}],
  ["P20", {}],
  ["P19", {}],
  ["P18", {}],
  ["P15", {}],
  ["P14", {}],
  ["P16", {}],
  ["P10", {}],

  // right
  ["P1", { silk: "P01" }],
  ["P0", { silk: "P00" }],
  ["GND", {}],
  ["GND", {}],
  ["P2", { silk: "P02" }],
  ["P3", { silk: "P03" }],
  ["P4", { silk: "P04" }],
  ["P5", { silk: "P05" }],
  ["P6", { silk: "P06" }],
  ["P7", { silk: "P07" }],
  ["P8", { silk: "P08" }],
  ["P9", { silk: "P09" }],
];

const pins_per_side = Math.ceil(pins.length / 2);

module.exports = {
  nets: Object.fromEntries(pins.map(([name, _]) => [name, name])),
  params: {
    class: "MCU",
    orientation: "down",
    side: "front",
    reverse: false,
    mask: "both",
  },
  body: (p) => {
    const standard = `
      (module ProMicro (layer ${
        p.param.side === "front" ? "F" : "B"
      }.Cu) (tedit 5B307E4C)
      ${p.at /* parametric position */}

      ${"" /* footprint reference */}
      (fp_text reference "${p.ref}" (at 0 0 ${p.rot}) (layer F.SilkS) ${
      p.ref_hide
    } (effects (font (size 1.27 1.27) (thickness 0.15))))
      (fp_text value "" (at 0 0) (layer F.SilkS) hide (effects (font (size 1.27 1.27) (thickness 0.15))))

      ${"" /* illustration of the (possible) USB port overhang */}
      (fp_line (start -19.304 -3.81) (end -14.224 -3.81) (layer Dwgs.User) (width 0.15))
      (fp_line (start -19.304 3.81) (end -19.304 -3.81) (layer Dwgs.User) (width 0.15))
      (fp_line (start -14.224 3.81) (end -19.304 3.81) (layer Dwgs.User) (width 0.15))
      (fp_line (start -14.224 -3.81) (end -14.224 3.81) (layer Dwgs.User) (width 0.15))
      `;

    const orientation =
      (p.param.orientation == "down" ? 1 : -1) *
      (p.param.side == "front" ? 1 : -1);

    function position(pin, row_distance, x_offset = 0, y_offset = 0) {
      const row = pin % pins_per_side;
      const side = Math.floor(pin / pins_per_side) ? -1 : 1;
      return {
        x: (row + 0.5 - pins_per_side / 2) * pitch + x_offset,
        y: (orientation * side * row_distance) / 2 + y_offset,
      };
    }

    function line(start, end, side = "F") {
      return `(fp_line (start ${start.x.toFixed(2)} ${start.y.toFixed(
        2
      )}) (end ${end.x.toFixed(2)} ${end.y.toFixed(
        2
      )}) (layer ${side}.SilkS) (width 0.15))`;
    }

    function pin_silk(pin) {
      return `(fp_text user ${pin.silk} (at ${pin.x.toFixed(2)} ${pin.y.toFixed(
        2
      )} ${p.rot + 90}) (layer ${
        pin.side
      }.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15)) (justify${
        pin.mirror ? " mirror" : ""
      })))`;
    }

    function thru_hole_pad(pad) {
      return `(pad ${pad.number} thru_hole ${pad.shape} (at ${pad.x} ${pad.y} ${pad.angle}) (size ${pad_size} ${pad_size}) (drill 1.0922) (layers *.Cu ${pad.mask}.Mask) ${pad.net})`;
    }

    function center_rect(center, x, y, side) {
      const dX = x / 2;
      const dY = y / 2;
      const top_left = {
        x: center.x - orientation * dX,
        y: center.y - orientation * dY,
      };
      const bottom_right = {
        x: center.x + orientation * dX,
        y: center.y + orientation * dY,
      };
      const top_right = {
        x: bottom_right.x,
        y: top_left.y,
      };
      const bottom_left = {
        x: top_left.x,
        y: bottom_right.y,
      };
      return [
        line(top_left, top_right, side),
        line(top_left, bottom_left, side),
        line(top_right, bottom_right, side),
        line(bottom_left, bottom_right, side),
      ];
    }

    function square(center, width, side) {
      return center_rect(center, width, width, side);
    }

    function marker(position, side) {
      if (p.param.marker === "raw") {
        return square(position, pitch, side);
      } else if (p.param.marker === "column") {
        const { x, y } = position;
        return center_rect(
          { x: x + pitch * (pins_per_side / 2) - pitch / 2, y },
          pitch * (pins.length / 2),
          pitch,
          side
        );
      }

      return [];
    }

    const parts = [standard];

    parts.push(
      marker(
        position(0, row_spacing),
        p.param.side === "front" ? "F" : "B"
      ).join("\n")
    );

    const silk = pins.map(([name, overrides], n) =>
      pin_silk(
        Object.assign(
          {
            silk: name,
            side: p.param.side === "front" ? "F" : "B",
            mirror: p.param.side !== "front",
          },
          position(n, 9.6),
          overrides
        )
      )
    );

    const pads = pins.map(([name, overrides], n) =>
      thru_hole_pad(
        Object.assign(
          {
            number: n + 1,
            shape: "circle",
            angle: 0,
            net: p.net[name].str,
            mask:
              p.param.mask === "both"
                ? "*"
                : p.param.side === "front"
                ? "B"
                : "F",
          },
          position(n, row_spacing),
          overrides
        )
      )
    );

    if (p.param.names !== "off") {
      silk.join("\n");
    }

    parts.push(pads.join("\n"));

    if (p.param.reverse) {
      const silk = pins.map(([name, overrides], n) =>
        pin_silk(
          Object.assign(
            {
              silk: name,
              side: p.param.side === "front" ? "B" : "F",
              mirror: p.param.side === "front",
            },
            position(n, 9.6 * orientation, 1.27, pad_size),
            overrides
          )
        )
      );

      const pads = pins.map(([name, overrides], n) =>
        thru_hole_pad(
          Object.assign(
            {
              number: n + 1,
              shape: "circle",
              angle: 0,
              net: p.net[name].str,
              mask:
                p.param.mask === "both"
                  ? "*"
                  : p.param.side === "front"
                  ? "F"
                  : "B",
            },
            position(n, row_spacing * orientation, 1.27, pad_size),
            overrides
          )
        )
      );

      parts.push(
        marker(
          position(0, row_spacing * orientation, 1.27, pad_size),
          p.param.side === "front" ? "B" : "F"
        ).join("\n")
      );

      if (p.param.names !== "off") {
        silk.join("\n");
      }

      parts.push(pads.join("\n"));
    }

    parts.push(")");

    return parts.join("\n");
  },
};
