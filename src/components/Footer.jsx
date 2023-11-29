// import music from "../assets/Memories-Of-Spring.mp3";
// import success_sound from "../assets/Success-Sound.mp3";
// import ReactHowler from "react-howler";
import NavList from "./NavList";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
function Footer({ playMusic, playSound, toggleMusic, toggleSound }) {
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
	];

	return (
		<footer className="app-footer">
			<div className="footer-btns">
				<button onClick={toggleSound}>
					{playSound ? "Mute Sound" : "Enable Sound"}
				</button>
				<button onClick={toggleMusic}>
					{playMusic ? "Pause Music" : "Play Music"}
				</button>
			</div>
			<nav className="footer-nav">
				<NavList linksArr={footerLinks} />
			</nav>
		</footer>
	);
}
Footer.propTypes = {
	playMusic: PropTypes.bool,
	playSound: PropTypes.bool,
	toggleMusic: PropTypes.func,
	toggleSound: PropTypes.func,
};
export default Footer;
