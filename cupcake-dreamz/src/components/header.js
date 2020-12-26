import Link from 'next/link';

const linkStyle = {
    marginRight: 15
}

const Header = () => (
    <div>
        <Link href="/" replace>
            <a style={linkStyle} title="go back home">go to Home Page</a>
        </Link>
        <Link href="/about">
            <a style={linkStyle} title="navigate to about page">go to About Page</a>
        </Link>
    </div>
);

export default Header;