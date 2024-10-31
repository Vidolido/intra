'use client';
import { useState } from 'react';

// components
import ArrowSvg from '@/../public/arrow.svg';
import ShowHideButton from '@/components/reusable/ShowHideButton';
import SingleSetting from './SingleSetting';

const Ordered = ({ setting }) => {
	const [visible, setVisible] = useState(false);

	return (
		<div className='border relative min-w-72'>
			<ShowHideButton
				heading={setting?.name.en}
				visible={visible}
				onClick={() => setVisible(!visible)}
			/>

			{!visible ? (
				''
			) : (
				<ul className='p-2'>
					{setting?.items?.map((item) => {
						return (
							<li
								key={item._id}
								className='flex justify-between gap-2 w-full mb-1'>
								<SingleSetting setting={item} />
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
};

export default Ordered;
