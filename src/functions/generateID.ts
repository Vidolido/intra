import crypto from 'crypto';

export function generateID() {
	return crypto.randomBytes(8).toString('hex');
}
