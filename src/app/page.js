import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { ButtonLikes } from "../Components/ButtonLikes";
import RootLayout from "../layouts/RootLayout";

const firebaseConfig = {
  apiKey: "AIzaSyDyYLRF6Hv6EEPcfIyzv94tWjAkTIoUAQo",
  authDomain: "dailypaid.firebaseapp.com",
  projectId: "dailypaid",
  storageBucket: "dailypaid.appspot.com",
  messagingSenderId: "741154149574",
  appId: "1:741154149574:web:79fe83525797e3d0ccf3c7",
};

function Header({ title }) {
  return <h1>{title ? title : "Default title"}</h1>;
}

export default function HomePage() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  //   const [data, setData] = useState < any > [];
  //   useEffect(() => {
  //     const getCollection = async (db: any) => {
  //       const collection_ = collection(db, "paid_check");
  //       const response = await getDocs(collection_);
  //       return response.docs.map((doc) => doc.data());
  //     };
  //     getCollection(db)
  //       .then((res) => setData(res))
  //       .catch((err) => console.log("err", err));
  //   }, []);
  const names = ["Ada Lovelace", "Grace Hopper", "Margaret Hamilton"];
  return (
    <RootLayout>
      <Header title="Develop. Preview. Ship." />
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <ButtonLikes />
    </RootLayout>
  );
}
