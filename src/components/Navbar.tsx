import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <div className='m-2'>
      <nav className='navbar' role='navigation' aria-label='main navigation'>
        <div className='navbar-brand'>
          <Link to='/' className='navbar-item'>
            <span className='logo ml-2'>
              <strong>
                AuthPerfReview
              </strong>
            </span>
          </Link>
        </div>
      </nav>
    </div>
  )
}