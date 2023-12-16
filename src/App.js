import './App.css';
import { useEffect, useState } from 'react';
function App() {
  const [users, setUsers] = useState([]);
  const [edit,setEdit]=useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [inputs,setInputs]=useState({})
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const json = await response.json();
      setUsers(json);
    }
    fetchUsers();
  }, [])

  function handleChange(e){
    let name=e.target.name;
    let value=e.target.value;
    setInputs((prev)=>{
      return{
        ...prev,
        [name]:value
      }
    })
  }
  function addData(){
    setUsers((prev)=>{
      const newId = prev.length > 0 ? prev[prev.length - 1].id + 1 : 1;
      const newUser = {
        id: newId,
        ...inputs,
      };
      setInputs({})
      return [...prev, newUser];
    });
  }
  function deleteData(id){
    const data=users.filter((val)=>val.id !== id);
    setUsers(data)
  }

  function editData(id){
    setEdit(true)
    const data=users.filter((val)=>val.id === id);
    setEditingUser(...data)
    setInputs(...data)
  }
  function updateData(){
    const updatedUsers = users.map((user) =>
      user.id === editingUser.id
        ? { ...user, name: inputs.name, email: inputs.email }
        : user
    );
    setUsers(updatedUsers);
    setInputs({})
  }
  return (
    <div className="container">
      <h2 className="text-center">CRUD APPLICATION</h2>
      <div className="row">
        <div className="col mt-5">
          <h2 className="text-center">User Form</h2>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
            <input type="text" className="form-control" name='name' id="exampleFormControlInput1" onChange={handleChange} value={inputs.name || ''}/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label" >Email</label>
            <input type="email" className="form-control" name='email' id="exampleFormControlInput1"  onChange={handleChange} value={inputs.email || ''}/>
          </div>
          <button type="button" className="btn btn-primary " onClick={addData}>Add</button>
          {
            edit && <button type="button" className="btn btn-primary mx-5" onClick={updateData}>Update</button>
          }
          
        </div>
        <div className="col mt-5">
          <h2 className="text-center">User Table</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                users && users.map((value)=>{
                  return(
                    <tr key={value.id}>
                      <th scope="row">{value.id}</th>
                      <td>{value.name}</td>
                      <td>{value.email}</td>
                      <td>
                      <button type="button" className="btn btn-primary" onClick={()=>deleteData(value.id)}>Delete</button>
                      </td>
                      <td>
                      <button type="button" className="btn btn-primary" onClick={()=>editData(value.id)}>Edit</button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default App;
