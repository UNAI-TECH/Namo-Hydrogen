import os, math
import cv2
import numpy as np
from PIL import Image

SPLIT_DIR = 'public/images/ezgif-5b1d0a8d354caa20-png-split'
TILT_DIR = 'public/images/frames_tilt'
TARGET_SIZE = (512, 768)

PAD_W, PAD_H = 2496, 3744
OFFSET_X, OFFSET_Y = 185, -21

# Calibrated scale to match logo (402 / 444 = 0.9054)
TARGET_SCALE = 402.0 / 444.0 # ~0.9054

def main():
    os.makedirs(TILT_DIR, exist_ok=True)
    all_files = sorted([f for f in os.listdir(SPLIT_DIR) if f.endswith('.png')])
    print('Generating 60 calibrated tilt frames centered at (256, 384)...')
    
    indices = [int(60 + i * (239 - 60) / 59) for i in range(60)]
    
    for out_idx, frame_idx in enumerate(indices):
        t = out_idx / 59.0
        # Smooth ease for scaling down from 1.0 to TARGET_SCALE as it reaches bottom view
        ease = 0.5 - 0.5 * math.cos(math.pi * t)
        scale = 1.0 - (1.0 - TARGET_SCALE) * ease
        
        fname = all_files[frame_idx]
        fpath = os.path.join(SPLIT_DIR, fname)
        im_rgba = Image.open(fpath)
        
        # Base canvas paste (unscaled)
        canvas = Image.new('RGBA', (PAD_W, PAD_H), (0, 0, 0, 0))
        canvas.paste(im_rgba, (OFFSET_X, OFFSET_Y))
        
        # Resize to standard 512x768
        base_512 = canvas.resize(TARGET_SIZE, Image.Resampling.LANCZOS)
        
        # The center in base_512 moves from frame 60 (cx=259, cy=373) to frame 239 (cx=259, cy=411.5)
        cur_im_cx = 259.0
        cur_im_cy = 373.0 + (411.5 - 373.0) * ease
        
        # Target center in output frame: smoothly transitions from (259, 373) at t=0 to exact center (256, 384) at t=1
        target_cx = 259.0 + (256.0 - 259.0) * ease
        target_cy = 373.0 + (384.0 - 373.0) * ease
        
        w_scaled = int(TARGET_SIZE[0] * scale)
        h_scaled = int(TARGET_SIZE[1] * scale)
        resized_droplet = base_512.resize((w_scaled, h_scaled), Image.Resampling.LANCZOS)
        
        paste_x = int(target_cx - cur_im_cx * scale)
        paste_y = int(target_cy - cur_im_cy * scale)
        
        final_im = Image.new('RGBA', TARGET_SIZE, (0, 0, 0, 0))
        final_im.paste(resized_droplet, (paste_x, paste_y))
        
        out_webp = os.path.join(TILT_DIR, f'frame_{out_idx:03d}.webp')
        final_im.save(out_webp, 'WEBP', quality=90)
        
    print(f'Successfully re-exported 60 calibrated tilt frames in {TILT_DIR}!')

    # Now calibrate and center hydro-logo.png to exact (256, 384)
    logo_path = 'public/images/hydro-logo.png'
    logo_im = Image.open(logo_path)
    l_arr = np.array(logo_im)
    r, g, b, a = l_arr[:, :, 0], l_arr[:, :, 1], l_arr[:, :, 2], l_arr[:, :, 3]
    gear_mask = (a > 50) & (b > 100) & (r < 100)
    gy, gx = np.where(gear_mask)
    gcx = (gx.min() + gx.max()) / 2.0
    gcy = (gy.min() + gy.max()) / 2.0
    print(f'Current logo gear center: ({gcx}, {gcy})')
    
    # Target center is (256.0, 384.0)
    shift_x = int(round(256.0 - gcx))
    shift_y = int(round(384.0 - gcy))
    print(f'Shifting logo by ({shift_x}, {shift_y}) to perfectly center it at (256, 384)...')
    
    centered_logo = Image.new('RGBA', TARGET_SIZE, (0, 0, 0, 0))
    centered_logo.paste(logo_im, (shift_x, shift_y))
    centered_logo.save(logo_path, 'PNG')
    print('Successfully centered public/images/hydro-logo.png at (256, 384)!')

if __name__ == '__main__':
    main()
