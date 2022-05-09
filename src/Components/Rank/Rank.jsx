import React from 'react';

const Rank = ({ name, entries }) => {
	return(
	<div className='Rank'>
		<div className='UserRankText'>
			{`${name}, your current entry count is:`}
		</div>
		<div className='RankText'>
			{`${entries}`}
		</div>
	</div>
	)
}

export default Rank;