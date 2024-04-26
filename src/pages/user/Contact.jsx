import React from "react";
import emailjs from '@emailjs/browser';
import { useFormik } from "formik";
import * as yup from "yup";
import Back from "../../components/common/back/Back";
import ListContact from "../../components/item/ListContact";
import '../../css/contact.css';

const Contact = () => {
  const map = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.8945765648227!2d110.948781!3d-7.586452899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a191f9b8aef73%3A0x612413c8710b5afa!2sSSR%20Mentari%20Sehat%20Indonesia%20Karanganyar!5e0!3m2!1sen!2sid!4v1710312478212!5m2!1sen!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" '
  
  // Formik form validation schema using Yup
  const validationSchema = yup.object().shape({
    user_name: yup.string().required("Name is required"),
    user_email: yup.string().email("Invalid email").required("Email is required"),
    subject: yup.string().required("Subject is required"),
    message: yup.string().required("Message is required"),
  });

  // Formik form handling
  const formik = useFormik({
    initialValues: {
      user_name: "",
      user_email: "",
      subject: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      // Isi dengan Service ID, Template ID, dan Public Key Anda
      const serviceID = process.env.REACT_APP_SERVICE_ID;
      const templateID = process.env.REACT_APP_TEMPLATE_ID;
      const publicKey = process.env.REACT_APP_PUBLIC_KEY;

      // Kirim email menggunakan EmailJS
      emailjs.send(serviceID, templateID, {
        user_name: values.user_name,
        from_email: values.user_email, // Gunakan alamat email dari formulir sebagai pengirim
        subject: values.subject,
        message: values.message,
      }, publicKey)
        .then((result) => {
          console.log('Email terkirim:', result.text);
          resetForm(); // Mengosongkan formulir setelah email terkirim
        })
        .catch((error) => {
          console.error('Gagal mengirim email:', error.text);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  return (
    <>
      <Back title='Contact us' />
      <section className='contacts padding'>
        <div className='container shadow flexSB'>
          <div className='left row'>
            <iframe src={map} title="Google Maps"></iframe>
          </div>
          <div className='right row'>
            <h1 className="font-semibold">Contact us</h1>
            <div className='items'>
              <div className='box'>
                <h4 className="font-medium">EMAIL</h4>
                <p>msi.kabkaranganyar@gmail.com</p>
              </div>
              <div className='box'>
                <h4 className="font-medium">WhatsApp</h4>
                <ListContact></ListContact>
              </div>
              <div className='box'>
                <h4 className="font-medium">Alamat</h4>
                <p>Perum PPH 06/006 Desa Ngijo, Kec. Tasikmadu, Kab. Karanganyar</p>
              </div>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className='flexSB'>
                <input type='text' name='user_name' placeholder='Name' required {...formik.getFieldProps('user_name')} />
                <input type='email' name='user_email' placeholder='Email' required {...formik.getFieldProps('user_email')} />
              </div>
              {formik.touched.user_name && formik.errors.user_name ? (
                <div className="error">{formik.errors.user_name}</div>
              ) : null}
              {formik.touched.user_email && formik.errors.user_email ? (
                <div className="error">{formik.errors.user_email}</div>
              ) : null}
              <input type='text' name='subject' placeholder='Subject' required {...formik.getFieldProps('subject')} />
              {formik.touched.subject && formik.errors.subject ? (
                <div className="error">{formik.errors.subject}</div>
              ) : null}
              <textarea name='message' cols='30' rows='10' placeholder='Create a message here...' required {...formik.getFieldProps('message')} ></textarea>
              {formik.touched.message && formik.errors.message ? (
                <div className="error">{formik.errors.message}</div>
              ) : null}
              <button type='submit' className="bg-teal-500 p-5 text-white font-semibold hover:bg-teal-600">SEND MESSAGE</button>
            </form>

            <h3>Follow us here</h3>
            <span>
              <a href="https://www.instagram.com/_msi_karanganyar?igsh=MXN1MHM0enR6eTJydg==" target="_blank" rel="noopener noreferrer" className="hover:text-teal-700">INSTAGRAM </a>
              <a href="https://www.youtube.com/@msikab.karanganyar6795?si=9Qt2hFKiZiVqcgJD" target="_blank" rel="noopener noreferrer" className="hover:text-teal-700">YOUTUBE </a>
              <a href="https://www.tiktok.com/@msi.karanganyar?_t=8kf8aJTji1B&_r=1" target="_blank" rel="noopener noreferrer" className="hover:text-teal-700">TIKTOK </a>
            </span>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact;