#!/bin/bash

node scripts/cli.js src/spleeb.yaml --output build --footprints src/footprints

mkdir -p images
docker run -u "$(id -u):$(id -g)" -w /board -v "$(pwd):/board" --rm yaqwsx/kikit:v1.0.5 pcbdraw --style builtin:set-white-cu.json build/pcbs/spleeb.kicad_pcb images/left.png
docker run -u "$(id -u):$(id -g)" -w /board -v "$(pwd):/board" --rm yaqwsx/kikit:v1.0.5 pcbdraw --style builtin:set-white-cu.json -b build/pcbs/spleeb.kicad_pcb images/right.png

rsync -r build/ spleeb

./scripts/fill.py spleeb/pcbs/spleeb.kicad_pcb
