from PIL import Image

def convert():
    src_path = 'public/images/logo.png'
    dest_path = 'public/images/logo.webp'
    
    img = Image.open(src_path)
    print(f"Loaded logo.png: size={img.size}, mode={img.mode}")
    
    # Save as high-quality webp
    img.save(dest_path, 'WEBP', quality=95)
    print(f"Successfully converted to {dest_path}")

if __name__ == '__main__':
    convert()
