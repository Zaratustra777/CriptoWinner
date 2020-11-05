import React, {useState, useEffect} from 'react';

export default function ItemsList({ getItems, number }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    const newItems = getItems(42)
    setItems(newItems)
    console.log('render setItems')
  }, [getItems])


  return (
    <ul>
      { items.map(e => <li key={e}>{e}</li>) }
    </ul>
  )

}