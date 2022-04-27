import React from 'react';
 
const Navigation = ({ onRouteChange, isSignedIn }) => {
			if (isSignedIn){
	return (


		<div className='navbar'>
			<nav>
				<a><p onClick={() => onRouteChange('signout')} className='link SignOut'>Sign Out</p></a>
			</nav>
		</div>
		)
		} else {
			return(
		<div className='navbar'>
			<nav>
				<a><p onClick={() => onRouteChange('signin')} className='link SignOut'>Sign In</p></a>
				<a><p onClick={() => onRouteChange('register')} className='link SignOut'>Register</p></a>
			</nav>
		</div>
		)
		}
	
}

export default Navigation;