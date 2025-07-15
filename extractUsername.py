import tkinter as tk
import socket
import getpass

# Get user identifier (user and hostname)
user = getpass.getuser()
host = socket.gethostname()
watermark_text = f"{user}@{host}"


# Create a top-level transparent window
root = tk.Tk()
root.attributes('-topmost', True)
root.overrideredirect(True)  # removes window decorations
root.attributes('-alpha', 0.0)  # transparency
root.configure(background='black')

# Set position and size of the window
width, height = 300, 50
x, y = 50, 50  # place on top-left corner
root.geometry(f'{width}x{height}+{x}+{y}')

# Label with hidden message
label = tk.Label(root, text=f'{watermark_text}', fg='white', bg='black', font=('Arial', 12, 'bold'))
label.pack(expand=True, fill='both')

# Close safely on ESC to prevent freezing
def on_key(event):
    if event.keysym == 'Escape':
        root.destroy()

root.bind('<Escape>', on_key)

# Start the GUI loop
root.mainloop()