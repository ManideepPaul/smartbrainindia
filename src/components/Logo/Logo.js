import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png'

const Logo = () => {
	return (
		<div className='ms4 mt0 pa3'>
			<Tilt className="Tilt bg-dark-red" options={{ max : 50 }} style={{ height: 150, width: 150 }} >
 				<div className="Tilt-inner center" style={{paddingTop: '10px'}}><img alt='logo' src={brain}/> </div>
			</Tilt>
		</div>
	);
}

export default Logo;