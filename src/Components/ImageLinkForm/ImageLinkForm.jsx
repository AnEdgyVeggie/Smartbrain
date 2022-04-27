import React from 'react';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) =>{
	return(
		<div className='ImageLink'>
			<p className='imageP'>{'Submit a picture that this engine can detect a face in'}</p>
			<div className='inputs'>
				<input type ='text' onChange={onInputChange} />
				<button onClick={onButtonSubmit}>Detect!</button>
			</div>
		</div>
		)
}

export default ImageLinkForm;