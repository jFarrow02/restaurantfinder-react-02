import './Footer.scss';

const Footer = (props: any) => {
    return (
        <footer className="Footer">
            <h2>{ props.title }</h2>
        </footer>
    );
};

export default Footer;