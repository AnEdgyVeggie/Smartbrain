import React from 'react';
import Tilt from 'react-tilt';
import logoImage from './Nogo.png'

const Logo = () => {
	return (
		<div className='Logo'>
			<Tilt className="Tilt" options={{ max : 25}} style={{ height : 150, width : 150}} >
			<div className="Tilt-inner"><img alt='' src={logoImage}/></div>
			</Tilt>
		</div>
		)
}

export default Logo;