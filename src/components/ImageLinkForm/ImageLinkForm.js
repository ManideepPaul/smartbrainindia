import React from 'react';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
	return (
		<div>
		<p className='f3 center'>{'This magic brain can detect face in your images.'}</p>
		<div className='center bg-yellow w-60 pa4'>
			<input className='f4 w-50' type='text' onChange={onInputChange}></input>
			<button className='grow f4 w-20' onClick={onButtonSubmit}>Detect</button>
		</div>
		</div>
	);
}

export default ImageLinkForm;