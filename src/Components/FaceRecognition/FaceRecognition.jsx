import React from 'react';

const FaceRecognition = ({ imageUrl, box }) => {
	return(
		<div className='centered'>
			<div className='imagedetect'>
				<img id='inputimage' alt='' className='faceimage' src={imageUrl} width='500px' height='auto'/>
				{
					box.map((box, i) => {
						const { topRow, bottomRow, rightCol, leftCol } = box;
						return 	(<div key={i} id="face" className='boundingBox' style={{top: topRow, bottom: bottomRow, right: rightCol, left: leftCol }}></div>);
					})
				}
			</div>
		</div>
		)
}

export default FaceRecognition;