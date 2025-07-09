# Date created: 06/26/2025

import random
import PySimpleGUI as sg

sg.theme('Dark Brown 4')

# Displays Window
layout = [  [sg.Text("Choose your dice", font='_18')],
            [sg.Button('d4'), sg.Button('d6'), sg.Button('d8'), sg.Button('d10'), sg.Button('d12'), sg.Button('d20'), sg.Button('d100')],
            [sg.Output(key = 'output')] ]

# Create the Window
window = sg.Window('Dice Roller', layout)


# Event Loop to process "events" and get the "values" of the inputs
while True:
    event, values = window.read()

    # If user closes window, the loop stops
    if event == sg.WIN_CLOSED:
        break

    else:
        # Create dice and output the value
        if event in ['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100']:
            numSides = int(event[1:]) # Creates the number of sides based on the button the user clicks
            dice = random.randint(1, numSides)
            window['output'].update(f'Your roll: {dice}')
            

window.close()