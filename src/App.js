import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: true },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Shirts", quantity: 12, packed: true },
// ];
export default function App() {
  const [items, setItems] = useState([])

  function handleAddItems(item){
    setItems((newItems) => [...items, item] )
  }

  function handleRemoveItem(id){
    setItems((newItems) => items.filter(item => item.id !== id))
  }
 return (
  <div className="app">
  <Logo />
  <Form onAddItems={handleAddItems} />
  <PakingList items={items} onDeleteItem={handleRemoveItem}/>
  <Stats />
</div>
  )
  
}

function Logo(){
  return <h1>🌴 Far Away 👜</h1>
} 

function Form({onAddItems}){
  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState(1)
 

  function handleChange(e){
    setDescription(e.target.value)
  }
  function handleQuantityChange(e){
    setQuantity(Number(e.target.value))
  }

  
  function handleSubmit(e){
    e.preventDefault();

    if(!description) return;

    const newItem = { description, quantity, packed:false, id:Date.now()}
    console.log(newItem)

    onAddItems(newItem); 
  }
  return (
    <form className="add-form" onSubmit={handleSubmit} >
      <h3>What do you need for your 😃 trip?</h3>
      <select value={quantity} onChange={handleQuantityChange}>
        {Array.from({length: 20},(_,i) => i + 1).map((num) =>(
          <option key={num} value={num}>
            {num}
          </option> )

        )}

      </select>
      <input type="tex" placeholder="How many?" value={description} onChange={handleChange}/>
      <button>Add</button>
    </form>

  )
}

function PakingList({items, onDeleteItem}){
  return(
    <div className="list">

      <ul>
           {items.map(item =>(
              <Item item={item} key={item.id} onDeleteItem={onDeleteItem} />
           ) )} 
             
       </ul>
    </div>  
  );
}

function Item({item, onDeleteItem}){
  return <li> 
    <span style={item.packed ? {textDecoration:"line-through"}:{}} >{item.quantity}{item.description}</span> 
    <button onClick={()=> onDeleteItem(item.id)}>❌</button>
  </li>; 
  
}
function Stats(){
  return (
    <footer className="stats"> 
      <em>

      👜 You have X items on your list, and you already packed X (X%)
      </em>

    </footer>
  )
}

