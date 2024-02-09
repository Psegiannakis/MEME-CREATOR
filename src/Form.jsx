import { useState } from "react";
import { useEffect } from "react";

export default function Form() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "https://i.imgflip.com/3si4.jpg",
  });

  const [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <main>
      <div className="form">
        <div className="form-div">
          <label className="form-label">Top text</label>
          <input type="text" placeholder="Top Text" className="form-input" name="topText" value={meme.topText} onChange={handleChange} />
        </div>
        <div>
          <label className="form-label">Bottom text</label>
          <input type="text" placeholder="Bottom Text" className="form-input" name="bottomText" value={meme.bottomText} onChange={handleChange} />
        </div>
        <button onClick={getMemeImage} className="form-button">
          🖼 Get a new meme image 🖼
        </button>
      </div>
      <div className="meme">
        <img className="meme-image" src={meme.randomImage} alt="shut up and take my money fry meme" />
        <h2 className="meme-text top">{meme.topText}</h2>
        <h2 className="meme-text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}
