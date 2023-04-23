import Board from 'react-trello';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const id = window.location.pathname.split('/').pop();

  const [loadingData, setLoadingData] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {

    const loadData = async () => {
      try {
        setLoadingData(true);
        const result = await (await fetch('https://enjambre.templeservices.xyz/api/board/' + id)).json();
        setData(result?.data ? { lanes: (result?.data || []) } : null);
        setLoadingData(false);
      } catch (error) {
        console.log('Error al obtener data del Trello', error);
        setLoadingData(false);
      }
    }

    if (id) {
      loadData()
    }
  }, [id]);

  if (loadingData) {
    return 'Cargando...';
  } else if (data) {
    return <Board data={data} />
  } else {
    return '...';
  }
}

export default App;
