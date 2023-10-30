import React from 'react';
import { RiProductHuntLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import "./home.scss";

const Home = () => {
  return (
    <div className="home" style={{ background: 'rgb(221, 221, 221)', width: '100%', height: '100vh' }}>
      <form
            style={{
              textAlign: 'center',
              marginTop: '100px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
              padding: '20px',
              width: '700px',
              height: '200px'
           }}
          >
      <h1 className='cn'>Arrow Computers<hr></hr></h1>
      <nav className='homecontainer' style={{ display: 'flex', justifyContent: 'center' }}>
        <ul className='home-links'>
          <li className='homeli'>
          <br></br>
            <button className='home--btn'style={{
                  backgroundColor: '#0074D9'
                }}>
              <Link
                to="/register"
                style={{
                  backgroundColor: '#0074D9',
                  color: '#fff',
                  transition: 'color 0.3s',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = 'black';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'white';
                }}
              >
                register
              </Link>
            </button>
          </li>
          <li className='homeli'>
            <br></br>
            <button className='home--btn' style={{
                  backgroundColor: '#0074D9'
                }}>
              <Link
                to="/login"
                style={{
                  backgroundColor: '#0074D9',
                  color: '#fff',
                  transition: 'color 0.3s',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = 'black';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'white';
                }}
              >
                login
              </Link>
            </button>
            
          </li>
        </ul>
      </nav>
      </form>
    </div>
  );
}

export default Home;
