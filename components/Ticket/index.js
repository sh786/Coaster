import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import QRCode from 'qrcode';
import SvgUri from 'react-native-svg-uri-reborn';


const generateQR = async text => {
	try {
		return await QRCode.toString(text, {type: 'svg'});
	} catch (err) {
		console.error(err)
		return null;
	}
}

const Ticket = ({purchasedTicket}) => {
	const [qrString, setQRString] = useState(null)

	useEffect(() => {
		generateQR(purchasedTicket.id)
			.then((d) => {
				setQRString(d);
			});
	}, []);

	return (qrString &&
		<SvgUri
			fill="#fff"
			width="200"
			height="200"
			svgXmlData={qrString}
		/>
	);
};

Ticket.propTypes = {
	purchasedTicket: PropTypes.object.isRequired,
};

export default Ticket;
