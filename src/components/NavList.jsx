import "../styles/NavList.css"
import PropTypes from "prop-types"

// A component that gets text and links and returns ul navlist
export default function NavList({ linksArr }) {
    return (
        <ul className="nav-list">
            {linksArr.map((linkObj) => {
                return (
                    <li key={linkObj.id}>
                        <a href={linkObj.url} rel="noreferrer" target="_blank">
                            {linkObj.text}
                        </a>
                    </li>
                )
            })}
        </ul>
    )
}
NavList.propTypes = {
    linksArr: PropTypes.array,
}
