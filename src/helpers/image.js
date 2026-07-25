export function processProfilePicture(file) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      return reject(new Error('Please select a valid image file.'));
    }

    // Allow up to 25MB raw mobile camera uploads before downscaling
    if (file.size > 25 * 1024 * 1024) {
      return reject(new Error('Selected image file is too large (max 25MB).'));
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_DIMENSION = 320; // 320px resolution is perfect for profile avatars (~20-40KB)

        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_DIMENSION) {
            height = Math.round((height * MAX_DIMENSION) / width);
            width = MAX_DIMENSION;
          }
        } else {
          if (height > MAX_DIMENSION) {
            width = Math.round((width * MAX_DIMENSION) / height);
            height = MAX_DIMENSION;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Compress to JPEG at 0.80 quality
        const dataUrl = canvas.toDataURL('image/jpeg', 0.80);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Failed to process mobile image. Please try a different photo.'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('Failed to read file from phone gallery.'));
    reader.readAsDataURL(file);
  });
}
