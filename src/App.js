import { useState } from "react";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import './App.css';

const storage = new ThirdwebStorage();

function App() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [link, setLink] = useState('')
  const [loading, setLoading] = useState(false)

  const uploadMetadata = async () => {
    setLoading(true)
    const metadata = {
      name: name,
      description: description,
      image: image
    }

    const uri = await storage.upload(metadata)
    const url = storage.resolveScheme(uri)

    setLink(url)
    setLoading(false)
  }

  return (
    <main>
      <h1>NFT metadata upload</h1>
      <input placeholder="name" onChange={e => setName(e.target.value)} />
      <textarea placeholder="description" onChange={e => setDescription(e.target.value)} />
      <input placeholder="image" onChange={e => setImage(e.target.value)} />

      {
        loading
          ? <p>uploading...</p>
          : <button onClick={uploadMetadata}>upload metadata 🚀</button>
      }

      <a target='blank' href={link} className="link">{link}</a>
    </main>
  )
}

export default App;
