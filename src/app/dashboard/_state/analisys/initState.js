export const analisysState = {
	product: '',
	analisysType: '',
	templateName: '', // Ова ќе биде поле по кое ќе се бираат темплејтите, бидејќи може да има повеќе темплејти за еден тип на анализа
	header: {
		client: { type: 'text', value: '', name: 'Client' },
		destination: { type: 'text', value: '', name: 'Destination' },
		transportType: { type: 'text', value: '', name: 'Transport Type' },
		loadingDate: { type: 'date', value: '', name: 'Loading Date' },
		tankNo: { type: 'text', value: '', name: 'Tank No' },
		issuedDate: { type: 'date', value: '', name: 'Issued Date' },
	},
	templates: [],
	analisysResult: [],
	footer: {
		note: '',
		issuer: '',
		city: '',
		date: '',
	},
};
