import React, { useEffect, useState } from "react";
import { getDocs, collection, addDoc } from 'firebase/firestore';
import { firestore } from "../../config/config-keys";

function DB_Testing() {
  const [dataList, setDataList] = useState([]);
  const [preferredUsername, setPreferredUsername] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const listRef = collection(firestore, "hoots");
      try {
        const data = await getDocs(listRef)
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }))
        setDataList(filteredData)
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(firestore, "hoots"), {
        preferred_username: preferredUsername,
        message: message,
        date: new Date()
      });
      console.log("Document written with ID: ", docRef.id);
      // Clear form inputs
      setPreferredUsername("");
      setMessage("");
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  }; // <--- handleSubmit() function ends here

  return (
    <>
      <h1>FIREBASE TEST</h1>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={preferredUsername}
          onChange={(e) => setPreferredUsername(e.target.value)}
          placeholder="Preferred Username"
          required
        />
        <br />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
          required
        ></textarea>
        <br />
        <button type="submit">Submit</button>
      </form>

      {/* Data List */}
      {dataList.map((data) => (
        <div key={data.id}>
          <img src={data.profile_pic} alt="Profile Pic" style={{ width: '20%' }} />
          <p>Preferred Username: {data.preferred_username}</p>
          <p>Message: {data.message}</p>
          <img src={data.attachment} alt="Attachment" style={{ width: '20%' }} />
          <p>Date: {new Date(data.date.seconds * 1000).toLocaleDateString()}</p>
          <p>Time: {new Date(data.date.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          <br /><br />
        </div>
      ))}
    </>
  );
}

export default DB_Testing;
