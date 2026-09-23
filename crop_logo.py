from PIL import Image

def crop_to_square():
    logo_path = 'public/images/hydro-logo.webp'
    img = Image.open(logo_path)
    w, h = img.size
    print(f"Current dimensions: {w}x{h}")
    
    # Target 1:1 ratio square (512x512) centered around visual center (256, 384)
    square_size = min(w, h) # 512
    top = int((h - square_size) / 2) # (768 - 512) / 2 = 128
    bottom = top + square_size       # 128 + 512 = 640
    left = 0
    right = square_size
    
    cropped = img.crop((left, top, right, bottom))
    print(f"New dimensions: {cropped.size[0]}x{cropped.size[1]} (1:1 Ratio)")
    cropped.save(logo_path, 'WEBP', quality=95)
    print("Successfully cropped public/images/hydro-logo.webp to 1:1 square!")

if __name__ == '__main__':
    crop_to_square()
