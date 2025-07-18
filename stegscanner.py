from flask import Flask, request, send_file
from flask_cors import CORS
from PIL import Image
import os

app = Flask(__name__)
CORS(app)  # allows apps to make requests

# Create folder for uploaded files
UPLOAD_FOLDER = 'uploaded_files'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Function to decode an LSB (Least Significant Bit) steganographic message from an image
def decode_lsb(image_path):
    img = Image.open(image_path)
    binary_data = ""
    for pixel in img.getdata():
        for channel in pixel[:3]:
            binary_data += bin(channel)[-1]
    all_bytes = [binary_data[i:i + 8] for i in range(0, len(binary_data), 8)]
    message = ""
    for byte in all_bytes:
        char = chr(int(byte, 2))
        if char == '\0':  # null char marks end of message
            break
        message += char
    return message

# Root route to serve the HTML frontend
@app.route('/')
def index():
    # Serve the HTML file from disk
    return send_file('imageUpload.html')

# Route to handle image upload and scan for hidden messages
@app.route('/scan', methods=['POST'])
def scan_image():
    # Check if the request contains an uploaded image
    if 'image' not in request.files:
        return "No image uploaded", 400

    # Get and save uploaded files in the folder created
    image_file = request.files['image']
    image_path = os.path.join(UPLOAD_FOLDER, image_file.filename)
    image_file.save(image_path)

    # Decode any LSB steganographic message from the image
    message = decode_lsb(image_path)

    # Save decoded message to a .txt file
    txt_path = image_path + "_decoded.txt"
    with open(txt_path, "w", encoding="utf-8") as f:
        f.write(message)

    return message or "No hidden message found"

if __name__ == '__main__':
    app.run(debug=True)