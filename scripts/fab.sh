#!/bin/bash

kikit fab jlcpcb --nametemplate 'spleeb-{}' spleeb/pcbs/spleeb.kicad_pcb spleeb
kikit fab jlcpcb --nametemplate 'plate-{}' spleeb/pcbs/plate.kicad_pcb spleeb
rm -r spleeb/gerber
