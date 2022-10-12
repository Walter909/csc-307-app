import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  //Delete person
  async function makeDeleteCall(index) {
    try {
      const response = await axios.delete(
        "http://localhost:4000/users/" + characters[index]._id
      );
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  function removeOneCharacter(index) {
    makeDeleteCall(index);

    const updated = characters.filter((character, i) => {
      return i !== index;
    });

    setCharacters(updated);
  }

  //Communicating with api
  async function fetchAll() {
    try {
      const response = await axios.get("http://localhost:4000/users");
      return response.data.users_list;
    } catch (error) {
      //We're not handling errors. Just logging into the console.
      console.log(error);
      return false;
    }
  }

  async function makePostCall(person) {
    try {
      const response = await axios.post("http://localhost:4000/users", person);
      //console.log(response.data);
      setCharacters([...characters, response.data]);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  function updateList(person) {
    return makePostCall(person);
  }

  useEffect(() => {
    fetchAll().then((result) => {
      if (result) setCharacters(result);
    });
  }, []);

  return (
    <div>
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
