import randomInt from "./utilities.mjs"

const appreciation = () => {
    const appreciation = [
    "Thank you for visiting!", 
    "I'm very glad that you visited my site, thanks!", 
    "By the way, I want to say thank you for the visiting!",
    "Take my appreciation for your visit to my site."
    ]

    return appreciation[randomInt(3)]
}

document.getElementById("appreciation").innerHTML = appreciation()

export default appreciation