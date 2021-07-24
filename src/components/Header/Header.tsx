import './Header.scss';
const Header = (props: any) => {

    return (
        <nav className="Header">
            <h2>{props.title}</h2>
        </nav>
    )
};

export default Header;