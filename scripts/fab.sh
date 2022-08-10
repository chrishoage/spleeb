#!/bin/bash

docker run -u "$(id -u):$(id -g)" -w /board -v "$(pwd):/board" --rm yaqwsx/kikit:v1.0.5 kikit fab jlcpcb spleeb/pcbs/spleeb.kicad_pcb spleeb
