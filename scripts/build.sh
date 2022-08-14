#!/bin/bash

node scripts/cli.js src/spleeb.yaml --clean --output build --footprints src/footprints

./scripts/fill.py build/pcbs/spleeb.kicad_pcb

mkdir -p images
pcbdraw --style builtin:set-white-cu.json build/pcbs/spleeb.kicad_pcb images/left.png
pcbdraw --style builtin:set-white-cu.json -b build/pcbs/spleeb.kicad_pcb images/right.png

rsync -r build/ spleeb
