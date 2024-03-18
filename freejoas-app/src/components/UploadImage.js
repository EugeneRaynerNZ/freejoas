import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';

function UploadImage({ onImageChange }) {
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];

        if (file && file.type.startsWith('image/')) {
            try {
                const compressedFile = await compressImage(file);

                const reader = new FileReader();
                reader.onload = () => {
                    const base64String = reader.result;
                    setPreviewUrl(base64String);
                    onImageChange(base64String);
                };
                reader.readAsDataURL(compressedFile);
            } catch (error) {
                console.error('Error compressing image:', error);
                alert('Error compressing image.');
            }
        } else {
            setPreviewUrl(null);
            onImageChange(''); // Clear image if invalid
        }
    };

    const compressImage = async (imageFile) => {
        const options = {
            maxSizeMB: 0.5, // Maximum file size in MB
            maxWidthOrHeight: 1920, // Max width or height of the image
            useWebWorker: true // Use Web Worker for faster compression
        };

        try {
            const compressedFile = await imageCompression(imageFile, options);
            return compressedFile;
        } catch (error) {
            throw error;
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {previewUrl && (
                <div>
                    <h3>Image Preview:</h3>
                    <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                </div>
            )}
        </div>
    );
}

export default UploadImage;
