import React, { useEffect, useState } from 'react';
import axios from '../axios';

function UploadImage() {

    const [selectedFile, setSelectedFile] = useState(null);
    const [base64Image, setBase64Image] = useState('');

    const [freejoaImages, setFreejoaImages] = useState([]);

    function getImages() {
        axios.get('/freejoa/images', {
            freejoaId: "65b8a03d5439c0e653ad5746"
        })
            .then(response => {
                console.log('Images:', response.data);
                setFreejoaImages(response.data);
            })
            .catch(error => {
                console.error('Get images error:', error.response.data);
            });
    }


    const handleFileChange = (event) => {

        const file = event.target.files[0]; // Get the selected file
        console.log('file size:', (file.size / 1024).toFixed(2) + 'kb');
        // Validate if the selected file is an image
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);

            // Convert the selected image to Base64
            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result; // Base64 string
                setBase64Image(base64String);   // Set Base64 string
            };
            //show the base64Image size in kb
            console.log('base64Image size:', (base64Image.length / 1024).toFixed(2) + 'kb');
            reader.readAsDataURL(file); // This will trigger the onload event above
        } else {
            alert('Please select an image file.');
            setSelectedFile(null);
        }
    };

    const handleUpload = (event) => {
        event.preventDefault();

        if (selectedFile) {
            //show the file details in console
            console.log('Selected file:', selectedFile);

            //send the file to the server
            axios.post('/freejoa/uploadimage', {
                freejoaId: "65b8a03d5439c0e653ad5746",
                image: {
                    data: base64Image,
                    contentType: selectedFile.type,
                    filename: selectedFile.name,
                }
            })
                .then(response => {
                    console.log('File uploaded:', response.data.message);
                })
                .catch(error => {
                    console.error('File upload error:', error.response.data);
                });

        } else {
            console.error('No file selected');
        }
    };

    useEffect(() => {
        getImages();
    }, []);


    return (
        <div>
            <form onSubmit={handleUpload} >
                <h1>Upload Image</h1>
                <input type="file" accept='image/*' onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>

            <div>
                <p>
                    image preview:
                </p>
                {/* {selectedFile && (
                    <div>
                        <h3>Selected Image File:</h3>
                        <img src={URL.createObjectURL(selectedFile)} alt="Selected" />
                    </div>
                )} */}


                {base64Image && (
                    <div>
                        <h3>Base64 Image:</h3>
                        {/* use img tag to show base64 string */}
                        <img src={base64Image} alt="Base64" />

                        {/* use p tag to show base64 string */}
                        <div style={{ maxWidth: "300px", wordWrap: "break-word" }}>
                            {/* <p>
                                {base64Image}
                            </p> */}
                        </div>
                    </div>
                )}

            </div>

            <div>
                <p>saved image for this freejoa</p>
                {freejoaImages.map((image, index) => (
                    <div key={index}>
                        <h3>Image {index + 1}</h3>
                        <img src={image.data} alt="Freejoa Image" />
                    </div>
                ))}
            </div>

        </div>
    );
}

export default UploadImage;