import React from 'react';

const FaceRecognition = ({ imageUrl, box }) => {
	return(
		<div className='centered'>
			<div className='imagedetect'>
				<img id='inputimage' alt='' className='faceimage' src={imageUrl} width='500px' height='auto'/>
				<div className='boundingBox' style={{top: box.topRow, bottom: box.bottomRow, right: box.rightCol, left: box.leftCol}}></div>
			</div>
		</div>
		)
}

export default FaceRecognition;