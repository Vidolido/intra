import mongoose from 'mongoose';

export const connect = async () => {
	const dbUser = process.env.MONGO_USER;
	const dbPass = process.env.MONGO_PASS;
	const dbURL = process.env.MONGO_URL;
	const dbName = process.env.MONGO_DB_NAME;

	// const connectionString = `mongodb+srv://${dbUser}:${dbPass}@${dbURL}/${dbName}?retryWrites=true&w=majority`;
	const connectionString = process.env.MONGO_URI;
	try {
		await mongoose.connect(connectionString);
		const connection = mongoose.connection;

		connection.on('connected', () => {
			console.log('Конекцијата со базата на податоци е успешна');
		});

		connection.on('error', (err) => {
			console.log(
				'Грешка во конекцијата до дата базата. Ве молиме проверете го серверот за дата базата.' +
					err
			);
		});
	} catch (error) {
		console.log('Грешка во конекцијата до дата базата.' + error.message);
		process.exit(1);
	}
};
