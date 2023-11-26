import NavList from "./NavList"
import { v4 as uuidv4 } from "uuid"

function Footer() {
    const footerLinks = [
        {
            id: uuidv4(),
            text: "Github",
            url: "https://github.com/Knguyen-dev/Memory-Game",
        },
        {
            id: uuidv4(),
            text: "Giphy",
            url: "https://developers.giphy.com/",
        },
        {
            id: uuidv4(),
            text: "RAWG",
            url: "https://rawg.io/apidocs",
        },
    ]

    return (
        <footer className="app-footer">
            <div className="control-btns-container">
                <button>Sound</button>
                <button>Music</button>
                <button>Questions</button>
            </div>
            <nav className="footer-nav">
                <NavList linksArr={footerLinks} />
            </nav>
        </footer>
    )
}

export default Footer
