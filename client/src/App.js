/*
API : Application Programming Interface
    We can' t directly get user from database  firstly we have to make using different languages like Node,Python & use it
    
    
    i)    Show Data   : GET Method
    ii)   Store data  : POST Method
    iii)  Update Data : PUT Method
    iiii) Delete Data : DELETE Method
    
     Make list using HTML Table

 use fetch() inside the useEffect()  
 inside fetch("URL") we provide the url of API 
 fetch always return promise so then is used resolve the promise
 we this convert into json it again returns the promise     


 
 install ReactBootstrap:
      Terminal  : npm install react-bootstrap bootstrap
 
 
 Copy this to index.js
      import 'bootstrap/dist/css/bootstrap.min.css';
 
    postman: 
              Get-Method   : http://localhost:3050/api/contact
              post-Method  : http://localhost:3050/api/contact
              put-Method   : http://localhost:3050/api/contact/id
              delete-Method: http://localhost:3050/api/contact/id

    mongoDB Atlas :   project -> contact  
                      connect-Your-Application(.env)  : MONGO_URL=mongodb+srv://amitkumar:<password>@cluster0.ofjmxcw.mongodb.net/<db_name>?retryWrites=true&w=majority
                      connect-mongoDB-compass         : mongodb+srv://amitkumar:<password>@cluster0.4ydjab8.mongodb.net/test

to Run :    client  :  cd client -> npm start  
            server  :  cd server -> node index.js                       


*/

import "./App.css";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import bg from './Asset/istockphoto-884374384-170667a.jpg'


function App() {
  let [input, setInput] = useState({
    email: "",
    mobile: "",
  });
  const [allInputs, setAllInputs] = useState([]);
  const [isEdit, setIisEdit] = useState(null);
  useEffect(() => {
    getUser();
  }, []);

  // // Show User / Get Method
  function getUser() {
    fetch("http://localhost:3051/api/contact").then((result) => {
      result.json().then((response) => {
        console.warn("Result: ", response);
        setAllInputs(response);
      });
    });
  }

  // Delete User / Delete Method
  function deleteUser(id) {
    fetch("http://localhost:3051/api/contact/${id}", {
      method: "DELETE",
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        getUser();
      });
    });
  }

  // //  select User
  function EditUser(id) {
    console.warn(id);
    allInputs.find((elem) => {
      if (elem._id === id) {
        setInput(elem);
      }
      setIisEdit(id);
    });
  }
  //  Update User / Put Method

  function updateUser() {
    let id = isEdit;
    fetch("http://localhost:3051/api/contact/${id}", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        getUser();
      });
    });
  }
  
// -----------------handelChange-----------
  function handelChange(event) {
    const { name, value } = event.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  // ---------------Post_Data -------------------
  function clickHandel(event) {
    event.preventDefault();
    if (!input.email || !input.mobile || !input.name) {
      alert("Enter tbe Data");
    } else {
      fetch("http://localhost:3051/api/contact", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      }).then((result) => {
        result.json().then((response) => {
          getUser();
        });
      });
    }
  }

  return (
    <div className="App" style={{height:"100vh" ,width:"100vw"}}  >
      <h2 style={{color:"white"}} >Contact List </h2>
      <div>
        <input
          style={{ margin: "6px", textAlign: "center", border: "2px solid black", borderRadius: "5px", height: "36px",}}
          type="text"
          onChange={handelChange}
          value={input.name}
          name="name"
          placeholder="Enter Name"
        />
        <input
          style={{ margin: "6px", textAlign: "center", border: "2px solid black", borderRadius: "5px", height: "36px",}}
          type="text"
          onChange={handelChange}
          value={input.email}
          name="email"
          placeholder="Enter Email"
        />
        <input
          style={{ margin: "6px", textAlign: "center", border: "2px solid black", borderRadius: "5px", height: "36px",}}
          type="text"
          onChange={handelChange}
          value={input.mobile}
          name="mobile"
          placeholder="Enter Contact"
        />
        <div m={2} pt={3}>
          <Button onClick={() => updateUser()}>Update Data</Button>
          <Button type="submit" onClick={clickHandel} style={{ margin: "6px" }}>
            Go
          </Button>
        </div>
      </div>
      <Table border="3" bordered  style={{backgroundColor:"transparent", color:"white",}}>
        <tbody>
          <tr>
            <td>Sno.</td>
            <td>Name</td>
            <td>Contact_Number</td>
            <td>Email</td>
            <td colSpan={2}>Operation</td>
          </tr>
          {allInputs.map((item, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{item.name}</td>
              <td>{item.mobile}</td>
              <td>{item.email}</td>
              <td>
                <Button onClick={() => deleteUser(item._id)}>Delete</Button>
              </td>
              <td>
                <Button onClick={() => EditUser(item._id)}>Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
