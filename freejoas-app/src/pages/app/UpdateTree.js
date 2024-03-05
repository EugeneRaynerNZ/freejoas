import React from 'react';
import Navigation from "../../Navigation";
import '../../App.css';

function UpdateTree() {

    // const [status, setStatus] = React.useState('');

    // const handleChange = (event) => {
    //     setStatus(event.target.value);
    // };

    return (

        <section className="updatetree w-full flex flex-col pt-8">
            <div className="flex-1 flex flex-col gap-8">
                <h1 className="text-center mb-4">Update the tree</h1>
                <form className="flex flex-col gap-2 px-8 mb-16">
                    <label className="flex flex-col gap-2">
                        <span>What's the status?</span>
                    </label>
                    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        {/* <option className="w-full" defaultValue={status}>Choose an option</option> */}
                        <option className="w-full">It's got heaps</option>
                        <option className="w-full">It's losing fruit</option>
                        <option className="w-full">Not much on there</option>
                        <option className="w-full">None at all</option>
                    </select>
                    <button className="cta--button">Update the status</button>
                </form>

                <form className="flex flex-col gap-8 px-8">
                    <span>THE TREE IS GONE!</span>
                    <button className="cta--button cta--button-delete">Request to Remove Tree</button>
                </form>
            </div>

            <Navigation />
        </section>

        

    );
}

export default UpdateTree;
