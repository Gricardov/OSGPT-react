import Board from 'react-trello';
import './App.css';
import { useEffect, useState } from 'react';

const data = {
  lanes: [
    {
      id: 'lane1',
      title: 'Planned Tasks',
      label: '2/2',
      cards: [
        { id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins' },
        { id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: { sha: 'be312a1' } }
      ]
    },
    {
      id: 'lane2',
      title: 'Completed',
      label: '0/0',
      cards: []
    }
  ]
}

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
