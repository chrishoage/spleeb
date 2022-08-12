module.exports = {
  params: {
    class: "MP",
    size: 2.22,
  },
  body: (p) => {
    const size = parseFloat(p.param.size, 10);
    return `
    (module Hole (layer F.Cu) (tedit 5F7666C1)
      ${p.at /* parametric position */}
      (fp_text reference "${p.ref}" (at 0 0.5) (layer F.SilkS) ${p.ref_hide}
        (effects (font (size 1 1) (thickness 0.15)))
      )

      (fp_circle (center 0 0) (end ${size} 0) (layer "Cmts.User") (width 0.15) (fill none) (tstamp 57596971-bf6b-460a-8efb-7b56e3190f0f))
      (fp_circle (center 0 0) (end ${
        size + 0.25
      } 0) (layer "F.CrtYd") (width 0.05) (fill none) (tstamp 1045a914-6900-4873-af0b-93437f83494d))
      (pad "" np_thru_hole circle (at 0 0) (size ${size} ${size}) (drill ${size}) (layers *.Cu *.Mask) (tstamp 75b224f0-3010-4e8c-bf32-f95a770c96d9))
    )
    `;
  },
};
