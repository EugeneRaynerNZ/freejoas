import React, { useState } from 'react';
import '../../App.scss';
import Navigation from "../../components/Navigation";
import ImageUpload from "../../components/UploadImage";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from '../../components/LoadingAnimation';
import ApiService from '../../services/ApiService';
import { useUserLocation } from '../../contexts/UserLocationContext';
import logger from '../../utils/Logger';

function Upload() {

    const { userLocation } = useUserLocation();
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});
    const [base64Image, setBase64Image] = useState('');
    const navigate = useNavigate();
    const [admin, setAdmin] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleChange = e => {
        setInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
        setErrors(prevErrors => ({ ...prevErrors, [e.target.name]: '' }));
    };

    const validateInputs = () => {
        const { latitude, longitude, amount, title } = inputs;
        const errors = {};
    
        if (!latitude) {
            errors.latitude = 'Please enter your latitude.';
        }
        if (!longitude) {
            errors.longitude = 'Please enter your longitude.';
        }
        if (!amount) {
            errors.amount = 'Please enter the number of trees.';
        }
        if (!title) {
            errors.title = 'Please enter the location name.';
        }
        if (!base64Image) {
            errors.image = 'Please select an image.';
        }
    
        return errors;
    };
    
    const handleClick = async () => {
        const errors = validateInputs();
    
        if (Object.keys(errors).length === 0) {
            setLoading(true);
            const freejoa = {
                latitude: inputs.latitude,
                longitude: inputs.longitude,
                amount: inputs.amount,
                title: inputs.title,
                image: { data: base64Image }
            };
    
            try {
                // Send a POST request to the server
                const response = await ApiService.uploadFreejoa(freejoa);
                logger.debug("response: ", response);
                if (response.status === 201) {
                    setAdmin(false);
                }
                navigate('/play');
            } catch (error) {
                logger.error(error);
            } finally {
                setLoading(false);
            }
        } else {
            setErrors(errors);
        }
    };

    const handleImageChange = (base64Image) => {
        setBase64Image(base64Image);
    };

    const getCurrentLocation= ()=> {
        setInputs({
            latitude: userLocation.lat,
            longitude: userLocation.lng,
        })
    }

    return (
        <div className="upload flex flex-col w-full pt-8 main-container">
            <div className="flex-1 flex flex-col gap-2 mx-8 main-container--top">
                <div className="flex gap-8 flex-col max-w-xl my-0">
                    <div className="flex flex-col gap-8 w-full">
                        <p className="page-title">Upload</p>
                    </div>
                    {admin ?
                        <div className="w-full">
                            <form className="flex flex-col gap-6 mb-16">
                                <div className="flex flex-col gap-4">
                                    <label className="input--container">
                                        <span>Your Latitude</span>
                                        <input type="text" name="latitude" value={inputs.latitude || ''} onChange={handleChange} placeholder="-34.2512" />
                                        {errors.latitude && <span className="error-message">{errors.latitude}</span>}
                                    </label>
                                    <label className="input--container">
                                        <span>Your Longitude</span>
                                        <input type="text" name="longitude" value={inputs.longitude || ''} onChange={handleChange} placeholder="-32.5123" />
                                        {errors.longitude && <span className="error-message">{errors.longitude}</span>}
                                    </label>
                                    <div onClick={getCurrentLocation} className="get-my-location">Get my location</div>
                                </div>
                                <label className="input--container">
                                    <span>How many trees?</span>
                                    <input type="number" name="amount" maxLength="2" value={inputs.amount || ''} onChange={handleChange} placeholder="2" />
                                    {errors.amount && <span className="error-message">{errors.amount}</span>}
                                </label>
                                <label className="input--container">
                                    <span>Name the location</span>
                                    <input type="text" name="title" maxLength="24" value={inputs.title || ''} onChange={handleChange} placeholder="Snazzy Location Name" />
                                    {errors.title && <span className="error-message">{errors.title}</span>}
                                </label>
                                <ImageUpload onImageChange={handleImageChange} />
                                {errors.image && <span className="error-message">{errors.image}</span>}
                            </form>
                            {/*
                                here is the loading animation component 
                             */}
                            {loading && <LoadingAnimation />}
                            <button className="cta--button cta--button-primary" onClick={handleClick}>Upload Location</button>
                        </div>
                        :
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                            <div style={{ maxWidth: '20rem' }}>
                                <span style={{ display: 'block', textAlign: 'center', marginBottom: '1rem' }}>An admin will review your submission.</span>
                                <span style={{ display: 'block', textAlign: 'center' }}>Please give us up to 3 days.</span>
                            </div>
                        </div>

                    }
                </div>
            </div>

            <div className="main-container--bottom">
                <Navigation />
            </div>
        </div>
    );
}

export default Upload;
