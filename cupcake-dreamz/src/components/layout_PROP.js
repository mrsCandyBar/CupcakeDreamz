import Header from './header';

const Layout = props => (
    <div>
        <Header />
        {props.content}
    </div>
);

export default Layout;