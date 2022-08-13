#!/bin/bash

docker run -u "$(id -u):$(id -g)" -w /board -v "$(pwd):/board" --rm yaqwsx/kikit:v1.0.5 kikit fab jlcpcb --nametemplate 'spleeb-{}' spleeb/pcbs/spleeb.kicad_pcb spleeb
docker run -u "$(id -u):$(id -g)" -w /board -v "$(pwd):/board" --rm yaqwsx/kikit:v1.0.5 kikit fab jlcpcb --nametemplate 'plate-{}' spleeb/pcbs/plate.kicad_pcb spleeb
rm -r spleeb/gerber
