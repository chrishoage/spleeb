#!/bin/python

import pcbnew
import argparse
import os

parser = argparse.ArgumentParser()
parser.add_argument('kicad_pcb')
args = parser.parse_args()

file = args.kicad_pcb

pcbnew.LoadPlugins(bundlepath=None, userpath=os.path.join(os.path.expanduser('~'), '.local/share/kicad/6.0/scripting'), thirdpartypath=None)
board = pcbnew.LoadBoard(file)
pcbnew.KICAD_PLUGINS["teardrops"]["ModuleName"].td.SetTeardrops(pcb=board)
filler_tool = pcbnew.ZONE_FILLER(board)
filler_tool.Fill(board.Zones())
pcbnew.SaveBoard(file, board)
