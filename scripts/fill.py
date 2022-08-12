#!/bin/python

import pcbnew
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('kicad_pcb')
args = parser.parse_args()

file = args.kicad_pcb

board = pcbnew.LoadBoard(file)
filler_tool = pcbnew.ZONE_FILLER(board)
filler_tool.Fill(board.Zones())
pcbnew.SaveBoard(file, board)
