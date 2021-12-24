import React from 'react';
import { Button } from 'primereact/button';
import { useHistory } from 'react-router-dom';

export const Error = () => {
	const history = useHistory();

	return (
		<div className="exception-body error">
			<div className="exception-panel">
				<div className="exception-content">
					<img src="assets/layout/images/pages/icon-error.svg" alt="roma" />
					<h1>Error Occured</h1>
					<p>Something went wrong.</p>
					<Button label="Go To Dashboard" icon="pi pi-arrow-left" onClick={() => { history.push('/') }} />
				</div>
			</div>
		</div>
	)

}