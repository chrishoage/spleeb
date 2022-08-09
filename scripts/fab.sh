#!/bin/bash

# DRC is failing here due to warnings in kicad of unconnnected nets, these are ground nets and don't need to be connected
docker run -u "$(id -u):$(id -g)" -w /board -v "$(pwd):/board" --rm yaqwsx/kikit:v1.0.5 kikit fab jlcpcb --no-drc spleeb/pcbs/spleeb.kicad_pcb spleeb
