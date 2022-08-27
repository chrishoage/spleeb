module.exports = {
  nets: {
    P1: undefined,
    P2: undefined,
    P3: undefined,
    P4: undefined,
  },
  params: {
    class: "JST",
    side: "F",
  },
  body: (p) => {
    const silkscreen = (side, mirror = "") => `
    (fp_line (start 5.5 -1.2) (end 5.5 -1.81) (layer "${side}.SilkS") (width 0.12) (tstamp 05bc6ac8-7c4d-4462-b196-6a347cbb009f))
    (fp_line (start 3.1 1.8) (end 3.1 2.3) (layer "${side}.SilkS") (width 0.12) (tstamp 126ea133-4ea3-4af2-aec3-d9a403ff913c))
    (fp_line (start 0.5 -1.81) (end 0.5 -1.2) (layer "${side}.SilkS") (width 0.12) (tstamp 3b4e2835-f8c3-48c9-bd85-248d537bc9dc))
    (fp_line (start -2.36 -2.11) (end -2.36 -0.86) (layer "${side}.SilkS") (width 0.12) (tstamp 3d133b65-f0ab-4472-80dc-0027ff84da1a))
    (fp_line (start -1.45 2.3) (end 7.45 2.3) (layer "${side}.SilkS") (width 0.12) (tstamp 4a9a894b-32f8-46ca-a376-75840654fd21))
    (fp_line (start -0.3 -2.01) (end -0.6 -2.01) (layer "${side}.SilkS") (width 0.12) (tstamp 4b326410-6ce1-4cea-a67f-4d5cc8625db7))
    (fp_line (start 8.06 0.8) (end 7.45 0.8) (layer "${side}.SilkS") (width 0.12) (tstamp 5057ed3d-6861-4f1c-bfa3-79a0bb8c83a8))
    (fp_line (start 2.9 2.3) (end 2.9 1.8) (layer "${side}.SilkS") (width 0.12) (tstamp 53cd4135-6143-4b42-9579-facf76f8c01e))
    (fp_line (start 3 2.3) (end 3 1.8) (layer "${side}.SilkS") (width 0.12) (tstamp 58410270-29f3-4fb1-880f-5b123041858e))
    (fp_line (start 4.9 1.8) (end 5.1 1.8) (layer "${side}.SilkS") (width 0.12) (tstamp 593e102d-3b02-41e3-aa8f-00f247a85aaf))
    (fp_line (start -1.11 -2.11) (end -2.36 -2.11) (layer "${side}.SilkS") (width 0.12) (tstamp 61e10bfe-7a26-4227-84e7-a6277ac4cf4e))
    (fp_line (start -2.06 0.8) (end -1.45 0.8) (layer "${side}.SilkS") (width 0.12) (tstamp 6377bb76-767a-4d70-8d1b-3aeb0478666c))
    (fp_line (start 8.06 -1.81) (end -2.06 -1.81) (layer "${side}.SilkS") (width 0.12) (tstamp 642689f2-bf00-499c-a641-1f641952e629))
    (fp_line (start -2.06 -1.81) (end -2.06 2.91) (layer "${side}.SilkS") (width 0.12) (tstamp 646ddf02-fb2a-4626-9f2a-39af771fbc18))
    (fp_line (start -1.45 -1.2) (end -1.45 2.3) (layer "${side}.SilkS") (width 0.12) (tstamp 6db3cea4-8ade-43c0-ad6c-9440f4d7f26d))
    (fp_line (start 2.9 1.8) (end 3.1 1.8) (layer "${side}.SilkS") (width 0.12) (tstamp 7d961aa0-b7af-4bbb-b916-2d619b847b60))
    (fp_line (start 1.1 1.8) (end 1.1 2.3) (layer "${side}.SilkS") (width 0.12) (tstamp 818749f0-c91d-4955-8847-56be9d233cae))
    (fp_line (start -0.6 -2.01) (end -0.6 -1.81) (layer "${side}.SilkS") (width 0.12) (tstamp 9874a7d4-72cc-420f-abc6-4097f3380279))
    (fp_line (start -2.06 2.91) (end 8.06 2.91) (layer "${side}.SilkS") (width 0.12) (tstamp 9932394d-3637-4def-8d5c-0afc5d360ba0))
    (fp_line (start -2.06 -0.5) (end -1.45 -0.5) (layer "${side}.SilkS") (width 0.12) (tstamp a1af931c-4d20-46b3-b07e-2c2066d1fd8c))
    (fp_line (start -0.3 -1.91) (end -0.6 -1.91) (layer "${side}.SilkS") (width 0.12) (tstamp a8cc2087-ff02-4a5b-adba-925721c4e385))
    (fp_line (start 4.9 2.3) (end 4.9 1.8) (layer "${side}.SilkS") (width 0.12) (tstamp a8fe2964-7345-4596-aa54-f2cb8a305932))
    (fp_line (start 5.1 1.8) (end 5.1 2.3) (layer "${side}.SilkS") (width 0.12) (tstamp b152429d-36f4-4956-9cb1-3313409009da))
    (fp_line (start 1 2.3) (end 1 1.8) (layer "${side}.SilkS") (width 0.12) (tstamp b1cf956c-7a72-4100-af6c-ac11aa8bb59f))
    (fp_line (start 0.5 -1.2) (end -1.45 -1.2) (layer "${side}.SilkS") (width 0.12) (tstamp b4a724c2-44b5-4259-a048-3cb0f74c66b3))
    (fp_line (start 7.45 2.3) (end 7.45 -1.2) (layer "${side}.SilkS") (width 0.12) (tstamp b4edc8b2-1653-4a05-aed5-680832d7ac31))
    (fp_line (start 0.9 2.3) (end 0.9 1.8) (layer "${side}.SilkS") (width 0.12) (tstamp b739a6d8-7332-40d8-bd33-317e2902100d))
    (fp_line (start 7.45 -1.2) (end 5.5 -1.2) (layer "${side}.SilkS") (width 0.12) (tstamp bef560bd-e3f3-4418-949b-cdc3c660057e))
    (fp_line (start 8.06 2.91) (end 8.06 -1.81) (layer "${side}.SilkS") (width 0.12) (tstamp d921804f-90c8-451f-a187-3fad0b4efb34))
    (fp_line (start 5 2.3) (end 5 1.8) (layer "${side}.SilkS") (width 0.12) (tstamp e5ed2c37-30c9-4028-9bfd-9e5eb41c2c98))
    (fp_line (start 8.06 -0.5) (end 7.45 -0.5) (layer "${side}.SilkS") (width 0.12) (tstamp e8b267aa-46d0-44e3-b866-5e23b7b9d893))
    (fp_line (start 0.9 1.8) (end 1.1 1.8) (layer "${side}.SilkS") (width 0.12) (tstamp f459459b-ec07-4df7-98dc-229f04159886))
    (fp_line (start -0.3 -1.81) (end -0.3 -2.01) (layer "${side}.SilkS") (width 0.12) (tstamp f533c13d-35ac-4298-b34e-e752bd28ab85))
    (fp_text user "${p.net.P1.name}" (at -0 3.4 ${p.rot}) (layer "${side}.SilkS") (tstamp a4214d03-071c-4bd6-b5fa-32f45a71db92)
      (effects (font (size 0.5 0.5) (thickness 0.2)) (justify ${mirror}))
    )

    (fp_text user "${p.net.P2.name}" (at 2 3.4 ${p.rot}) (layer ${side}.SilkS) (tstamp a4214d03-071c-4bd6-b5fa-32f45a71db92)
      (effects (font (size 0.5 0.5) (thickness 0.2)) (justify ${mirror}))
    )

    (fp_text user "${p.net.P3.name}" (at 4 3.4 ${p.rot}) (layer ${side}.SilkS) (tstamp a4214d03-071c-4bd6-b5fa-32f45a71db92)
      (effects (font (size 0.5 0.5) (thickness 0.2)) (justify ${mirror}))
    )

    (fp_text user "${p.net.P4.name}" (at 6 3.4 ${p.rot}) (layer ${side}.SilkS) (tstamp a4214d03-071c-4bd6-b5fa-32f45a71db92)
      (effects (font (size 0.5 0.5) (thickness 0.2)) (justify ${mirror}))
    )

`;

    return `

  (module JST_PH_S2B-PH-K_02x2.00mm_Angled (layer F.Cu) (tedit 58D3FE32)

    (descr "JST PH series connector, B4B-PH-K (http://www.jst-mfg.com/product/pdf/eng/ePH.pdf), generated with kicad-footprint-generator")
    (tags "connector JST PH side entry")
    (attr through_hole)

      ${p.at /* parametric position */}

      ${"" /* footprint reference */}
      (fp_text reference "${p.ref}" (at 0 0) (layer F.SilkS) ${
      p.ref_hide
    } (effects (font (size 1.27 1.27) (thickness 0.15))))
      (fp_text value "" (at 0 0) (layer F.SilkS) hide (effects (font (size 1.27 1.27) (thickness 0.15))))

      ${
        p.param.side === "both"
          ? [silkscreen("F"), silkscreen("B", "mirror")].join("\n")
          : silkscreen(p.param.side)
      }

      (fp_line (start -2.45 -2.2) (end -2.45 3.3) (layer "F.CrtYd") (width 0.05) (tstamp 15a44b58-cebd-4c2c-8607-2389cd3efa07))
      (fp_line (start 8.45 -2.2) (end -2.45 -2.2) (layer "F.CrtYd") (width 0.05) (tstamp 42b2a3f2-4056-4ba6-b230-31c80ab77b94))
      (fp_line (start -2.45 3.3) (end 8.45 3.3) (layer "F.CrtYd") (width 0.05) (tstamp 4bf7644f-a9bd-407f-bd7f-e09e8e022aaa))
      (fp_line (start 8.45 3.3) (end 8.45 -2.2) (layer "F.CrtYd") (width 0.05) (tstamp e46c01e5-0c45-4f18-b7c6-272c79b3e20c))
      (fp_line (start 7.95 -1.7) (end -1.95 -1.7) (layer "F.Fab") (width 0.1) (tstamp 2aefd88b-2b01-4a22-b102-5b21402ce587))
      (fp_line (start -1.95 -1.7) (end -1.95 2.8) (layer "F.Fab") (width 0.1) (tstamp 2d7b88af-50ac-426e-8dfc-48ddaf63466d))
      (fp_line (start -1.11 -2.11) (end -2.36 -2.11) (layer "F.Fab") (width 0.1) (tstamp 6c4bb949-0854-4ee4-bb9c-7aa2283695dc))
      (fp_line (start 7.95 2.8) (end 7.95 -1.7) (layer "F.Fab") (width 0.1) (tstamp 6cb5ea26-a71c-4c6c-8d1c-913c5f812e45))
      (fp_line (start -2.36 -2.11) (end -2.36 -0.86) (layer "F.Fab") (width 0.1) (tstamp ab992a34-d100-4823-9f02-7543cd137c4e))
      (fp_line (start -1.95 2.8) (end 7.95 2.8) (layer "F.Fab") (width 0.1) (tstamp eda5218e-25bd-4c08-96b5-b5bc7af3dac1))
      (pad "1" thru_hole roundrect (at 0 0 ${
        p.rot
      }) (size 1.2 1.75) (drill 0.75) (layers *.Cu *.Mask) ${
      p.net.P1.str
    } (roundrect_rratio 0.208333) (tstamp b18d9740-6393-4c71-8d12-9c787ecb0afa))
      (pad "2" thru_hole oval (at 2 0 ${
        p.rot
      }) (size 1.2 1.75) (drill 0.75) (layers *.Cu *.Mask) ${
      p.net.P2.str
    } (tstamp 889d9794-9d31-470c-99ff-01354b41ba19))
      (pad "3" thru_hole oval (at 4 0 ${
        p.rot
      }) (size 1.2 1.75) (drill 0.75) (layers *.Cu *.Mask) ${
      p.net.P3.str
    } (tstamp f87f91d5-c926-4a4d-92fa-a2ad71cc3d8c))
      (pad "4" thru_hole oval (at 6 0 ${
        p.rot
      }) (size 1.2 1.75) (drill 0.75) (layers *.Cu *.Mask) ${
      p.net.P4.str
    } (tstamp 21c8f830-1d01-465d-9f88-de66ae48c531))

  )

  `;
  },
};