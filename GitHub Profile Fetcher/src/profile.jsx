import './profile.css'
import { useState } from 'react';

export default function profile() {
    let [userName, setUserName] = useState("");
    let [img, setImage] = useState("https://i.pinimg.com/474x/89/25/a6/8925a64f6b430a0b1bb061dfbfa66bf4.jpg?nii=t");
    let [link, setLink] = useState("");
    let [name, setName] = useState("Name");
    let [bio, setBio] = useState("I am a Backend Dev");
    let [extra, setExtra] = useState("Followers: 0 | Following: 0 | Repos: 0")
    let input = document.querySelector("input");


    let usernameFnc = (e) => {
        setUserName(e.target.value);
    }
  
    let fetchApi = async () => {
        try{
            let response = await fetch(`https://api.github.com/users/${userName}`);
            let jsonResponse = await response.json();
            setImage(jsonResponse.avatar_url);
            setName(jsonResponse.name);
            setLink(jsonResponse.html_url);
            setBio(jsonResponse.bio);
            setExtra(`Followers: ${jsonResponse.followers} | Following: ${jsonResponse.following} | Repos: ${jsonResponse.public_repos}`);
        }
        catch(err) {
            setImage("https://i.pinimg.com/474x/89/25/a6/8925a64f6b430a0b1bb061dfbfa66bf4.jpg?nii=t");
            setName("Name");
            setLink("");
            setBio("I am a Backend Dev");
            setExtra("Followers: 0 | Following: 0 | Repos: 0");
        }

        input.value = "";
    }

    return (
        <>
            <div className="upper">
                <h1>GitHub Profile Fetcher</h1>
                <input type="text" placeholder="Enter your Username" onChange={usernameFnc}></input>
                <button type="submit" onClick={fetchApi}>Search</button>
            </div>
            <div className="lower">
                <img src={img}></img>
                <h2>{name}</h2>
                <p className="bio">{bio}</p>
                <p className='extra'>{extra}</p>
                <a href={link} target="_blank" rel="noopener noreferrer">View GitHub Profile</a>
            </div>
        </>
    )
}