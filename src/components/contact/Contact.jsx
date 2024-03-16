import React from "react"
import Back from "../common/back/Back"
import "./contact.css"
import emailjs from '@emailjs/browser';

const Contact = () => {
  const map = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.8945765648227!2d110.948781!3d-7.586452899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a191f9b8aef73%3A0x612413c8710b5afa!2sSSR%20Mentari%20Sehat%20Indonesia%20Karanganyar!5e0!3m2!1sen!2sid!4v1710312478212!5m2!1sen!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" '
  const sendEmail = (e) => {
    e.preventDefault();
  
    // Isi dengan Service ID, Template ID, dan Public Key Anda
    const serviceID = "service_68hqebd";
    const templateID = "template_jc0c3hp";
    const publicKey = "hs2SPoQfaDVpMbsGv";
  
    // Kirim email menggunakan EmailJS
    emailjs.send(serviceID, templateID, {
      user_name : e.target.user_name.value,
      from_email: e.target.user_email.value, // Gunakan alamat email dari formulir sebagai pengirim
      subject: e.target.subject.value,
      message: e.target.message.value,
    }, publicKey)
      .then((result) => {
        console.log('Email terkirim:', result.text);
        e.target.reset(); // Mengosongkan formulir setelah email terkirim
      })
      .catch((error) => {
        console.error('Gagal mengirim email:', error.text);
      });
  };  

  return (
    <>
      <Back title='Contact us' />
      <section className='contacts padding'>
        <div className='container shadow flexSB'>
          <div className='left row'>
            <iframe src={map} title="Google Maps"></iframe>
          </div>
          <div className='right row'>
            <h1>Contact us</h1>
            <div className='items'>
              <div className='box'>
                <h4>EMAIL</h4>
                <p>ssrmsi.kabkaranganyar@gmail.com</p>
              </div>
              <div className='box'>
                <h4>WhatsApp</h4>
                <p>+62 858-0000-0964</p>
              </div>
              <div className='box'>
                <h4>Alamat</h4>
                <p>Perum PPH 06/006 Desa Ngijo, Kec. Tasikmadu, Kab. Karanganyar</p>
              </div>
            </div>
            <form onSubmit={sendEmail}>
              <div className='flexSB'>
                <input type='text' name='user_name' placeholder='Name' required />
                <input type='email' name='user_email' placeholder='Email' required />
              </div>
              <input type='text' name='subject' placeholder='Subject' required />
              <textarea name='message' cols='30' rows='10' placeholder='Create a message here...' required></textarea>
              <button type='submit' className='primary-btn'>SEND MESSAGE</button>
            </form>

            <h3>Follow us here</h3>
            <span>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">FACEBOOK </a>
              <a href="https://www.instagram.com/_msi_karanganyar?igsh=MXN1MHM0enR6eTJydg==" target="_blank" rel="noopener noreferrer">INSTAGRAM </a>
              <a href="https://www.youtube.com/@msikab.karanganyar6795?si=9Qt2hFKiZiVqcgJD" target="_blank" rel="noopener noreferrer">YOUTUBE </a>
              <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer">TIKTOK </a>
            </span>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
