import imageCompression from 'browser-image-compression';

const MAX_FILE_SIZE_MB = 5;
const MAX_WIDTH_PX = 1200;
const MAX_HEIGHT_PX = 630;
const COMPRESSION_OPTIONS = {
  maxSizeMB: MAX_FILE_SIZE_MB,
  maxWidthOrHeight: Math.max(MAX_WIDTH_PX, MAX_HEIGHT_PX),
  useWebWorker: true,
  fileType: 'image/jpeg',
};

export function validateImage(file: File) {
  // Check file size
  const fileSizeMB = file.size / (1024 * 1024);
  if (fileSizeMB > MAX_FILE_SIZE_MB) {
    throw new Error(`File size must be less than ${MAX_FILE_SIZE_MB}MB`);
  }

  // Check file type
  const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    throw new Error('File must be JPEG, PNG, or WebP');
  }

  return true;
}

export async function compressImage(file: File): Promise<File> {
  try {
    // Create an image element to get dimensions
    const img = document.createElement('img');
    const imageUrl = URL.createObjectURL(file);
    
    return new Promise((resolve, reject) => {
      img.onload = async () => {
        try {
          URL.revokeObjectURL(imageUrl);
          
          // If image is already smaller than max dimensions, just compress for size
          if (img.width <= MAX_WIDTH_PX && img.height <= MAX_HEIGHT_PX) {
            const compressedFile = await imageCompression(file, COMPRESSION_OPTIONS);
            resolve(compressedFile);
            return;
          }

          // Calculate aspect ratio
          const aspectRatio = img.width / img.height;
          
          // Determine new dimensions maintaining aspect ratio
          let newWidth = MAX_WIDTH_PX;
          let newHeight = MAX_HEIGHT_PX;
          
          if (aspectRatio > MAX_WIDTH_PX / MAX_HEIGHT_PX) {
            newHeight = Math.round(MAX_WIDTH_PX / aspectRatio);
          } else {
            newWidth = Math.round(MAX_HEIGHT_PX * aspectRatio);
          }

          // Compress with custom dimensions
          const compressedFile = await imageCompression(file, {
            ...COMPRESSION_OPTIONS,
            maxWidthOrHeight: Math.max(newWidth, newHeight),
          });

          resolve(compressedFile);
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = () => {
        URL.revokeObjectURL(imageUrl);
        reject(new Error('Failed to load image'));
      };

      img.src = imageUrl;
    });
  } catch (error) {
    throw new Error('Failed to compress image: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
}

export const generateThumbnail = async (file: File): Promise<File> => {
  const options = {
    maxSizeMB: 0.05, // 50KB for thumbnails
    maxWidthOrHeight: 150,
    useWebWorker: true,
    fileType: 'image/jpeg',
    initialQuality: 0.6,
  };

  try {
    return await imageCompression(file, options);
  } catch (error) {
    console.error('Error generating thumbnail:', error);
    throw error;
  }
}; 