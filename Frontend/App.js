import React from 'react';

import { AuthProvider } from './app/context/AuthContext';
import Navigation from './app/views/components/Navigation';

export default function App() {
	return (
		<AuthProvider>
			<Navigation />
		</AuthProvider>
	);
}
