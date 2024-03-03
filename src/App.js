import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/'); // Replace with your URL
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const fetchedData = await response.json();
        setData(fetchedData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="App">
      <h1>User Data:</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <strong>ID:</strong> {item.id}<br />
            <strong>User Name:</strong> {item.user_name}<br />
            <strong>First Name:</strong> {item.first_name}<br />
            <strong>Last Name:</strong> {item.last_name}<br />
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
