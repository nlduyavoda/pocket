import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import "./App.css";
import logo from "./logo.svg";

const firebaseConfig = {
  apiKey: "AIzaSyDyYLRF6Hv6EEPcfIyzv94tWjAkTIoUAQo",
  authDomain: "dailypaid.firebaseapp.com",
  projectId: "dailypaid",
  storageBucket: "dailypaid.appspot.com",
  messagingSenderId: "741154149574",
  appId: "1:741154149574:web:79fe83525797e3d0ccf3c7",
};

type Paid_item = {
  title: string;
  price: number;
  categoryId: string;
  date: Date;
};

function App() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const [data, setData] = useState<any>([]);
  console.log("data", data);
  useEffect(() => {
    const getCollection = async (db: any) => {
      const collection_ = collection(db, "paid_check");
      const response = await getDocs(collection_);
      return response.docs.map((doc) => doc.data());
    };
    getCollection(db)
      .then((res) => setData(res))
      .catch((err) => console.log("err", err));
  }, []);

  return (
    <div className="App">
      <div>
        {data &&
          data[0]?.paid_list.map((element: Paid_item, index: number) => {
            const date = new Date(element.date);
            return (
              <div key={index}>
                <ul>
                  <li>{element.title}</li>
                  <li>{element.price}</li>
                  <li>{element.categoryId}</li>
                  {/* <li type="date" id="date" name="date">
                    {new Date(element.date).toLocaleDateString()}
                  </li> */}
                </ul>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
