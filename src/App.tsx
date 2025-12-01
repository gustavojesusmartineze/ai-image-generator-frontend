import React, { useState } from 'react';

// Use env var or default to localhost for dev
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

function App() {
  return (
    <div>
      <h1>Gustavo's AI Generator</h1>
    </div>
  );
}

export default App;
