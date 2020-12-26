import Header from './header';

const Layout = Page => {
    return () => (
        <div>
            <Header/>
            <Page />
        </div>
    )
}

export default Layout;