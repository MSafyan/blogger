import './header.css';

const Header = () => {
    const PF = "http://localhost:5050/images/";

    return (
        <div className="header">
            <div className = "header-titles"> 
                <span className='header-title-sm'> Welcome to </span>
                <span className='header-title-lg'> Travel The World </span>
            </div>
            <img
                className = 'header-image'
                src = {PF + 'header-bg.jpg'}
                alt = '...'
            />
        </div>
    );
}

export default Header;
