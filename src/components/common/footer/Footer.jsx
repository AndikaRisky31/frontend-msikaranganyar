import React from "react"
import { blog } from "../../../dummydata"
import "./footer.css"

const Footer = () => {
  return (
    <>
      {/* <section className='newletter'>
        <div className='container flexSB'>
          <div className='left row'>
            <h1>Newsletter - Stay tune and get the latest update</h1>
            <span>Far far away, behind the word mountains</span>
          </div>
          <div className='right row'>
            <input type='text' placeholder='Enter email address' />
            <i className='fa fa-paper-plane'></i>
          </div>
        </div>
      </section> */}
      <footer>
        <div className='container padding'>
          <div className='box logo'>
            <h1>Mentari Sehat Indonesia</h1>
            <span>KAB. KARANGANYAR</span>
            <p>Bersama kami, Anda menjadi bagian dari perjuangan melawan penyakit mematikan ini untuk mewujudkan masyarakat yang lebih sehat dan sejahtera.</p>
            <a href="https://www.instagram.com/_msi_karanganyar?igsh=MXN1MHM0enR6eTJydg==" target="_blank" rel="noopener noreferrer">
              <i className='fab fa-instagram icon'></i>
            </a>
            <a href="https://www.tiktok.com/@msi.karanganyar?_t=8kf8aJTji1B&_r=1" target="_blank" rel="noopener noreferrer">
              <i className='fab fa-tiktok icon'></i>
            </a>
            <a href="https://www.youtube.com/@msikab.karanganyar6795?si=9Qt2hFKiZiVqcgJD" target="_blank" rel="noopener noreferrer">
              <i className='fab fa-youtube icon'></i>
            </a>
          </div>
          <div className='box link'>
            <h3>Explore</h3>
            <ul>
              <li>About Us</li>
              <li>Services</li>
              <li>Courses</li>
              <li>Blog</li>
              <li>Contact us</li>
            </ul>
          </div>
          <div className='box link'>
            <h3>Quick Links</h3>
            <ul>
              <li>Contact Us</li>
              <li>Pricing</li>
              <li>Terms & Conditions</li>
              <li>Privacy</li>
              <li>Feedbacks</li>
            </ul>
          </div>
          <div className='box'>
            <h3>Recent Post</h3>
            {blog.slice(0, 3).map((val) => (
              <div className='items flexSB'>
                <div className='img'>
                  <img src={val.cover} alt='' />
                </div>
                <div className='text'>
                  <span>
                    <i className='fa fa-calendar-alt'></i>
                    <label htmlFor=''>{val.date}</label>
                  </span>
                  <span>
                    <i className='fa fa-user'></i>
                    <label htmlFor=''>{val.type}</label>
                  </span>
                  <h4>{val.title.slice(0, 40)}...</h4>
                </div>
              </div>
            ))}
          </div>
          <div className='box last'>
            <h3>Have a Questions?</h3>
            <ul>
              <li>
                <i class="fa fa-map-marker"></i>
                 <span> Perum PPH 06/006 Desa Ngijo, Kec. Tasikmadu, Kab. Karanganyar JAWA TENGAH</span>
              </li>
              <li>
                <i className='fa fa-phone-alt'></i>
                <span class="contact-info">+62 858-0000-0964</span>
              </li>
              <li>
                <i className='fa fa-paper-plane'></i>
                <span class="contact-info">ssrmsi.kabkaranganyar@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
