import React, { useState } from 'react';
import "./contact.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      if (nextRef) {
        nextRef.current.focus(); 
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const formData = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      subject: subjectRef.current.value,
      message: messageRef.current.value,
    };
    setLoading(true);
    try {
      const response = await fetch('http://portfolio-backend.com/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      // Check for a successful response
      if (response.ok) {
        toast.success('Message received successfully!', {
          position: 'top-center',
          autoClose: 3000, // The toast will automatically close after 3 seconds
        });
        // Reset form fields after successful submission
        firstNameRef.current.value = '';
        lastNameRef.current.value = '';
        emailRef.current.value = '';
        subjectRef.current.value = '';
        messageRef.current.value = '';
      } else {
        toast.error('Failed to send message. Please try again later.', {
          position: 'top-center',
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.log(error.message+"i'm heeeeeeeeeeeeeeeeeeeeeeeeeeeeeere");
      toast.error(error.message+"i'm heeeeeeeeeeeeeeeeeeeeeeeeeeeeeere", {
        position: 'top-center',
        autoClose: 3000,
      });
    } finally {
      // Set loading state to false after request is complete
      setLoading(false);
    }
  };

  const firstNameRef = React.useRef(null);
  const lastNameRef =React.useRef(null);
  const emailRef = React.useRef(null);
  const subjectRef = React.useRef(null);
  const messageRef = React.useRef(null);

  return (
    <section className="contact container section" id="contact">
      <h2 className="section_title">Get In Touch</h2>

      <div className="contact_container grid">
        <div className="contact_info">
          <div className="contact_title">Let's talk about everything</div>
          <p className="contact_details">Don't like forms? Send me an email.</p>
        </div>

        <form action="" className="contact_form" onSubmit={handleSubmit}>
          <div className="contact_form-group">
            <div className="contact_form-div">
              <input
                type="text"
                className="contact_form-input"
                placeholder="Insert your first name"
                ref={firstNameRef}
                onKeyDown={(e) => handleKeyDown(e, lastNameRef)}
              />
            </div>
            <div className="contact_form-div">
              <input
                type="text"
                className="contact_form-input"
                placeholder="Insert your last name"
                ref={lastNameRef}
                onKeyDown={(e) => handleKeyDown(e, emailRef)}
              />
            </div>
          </div>

          <div className="contact_form-div">
              <input
                type="email"
                className="contact_form-input"
                placeholder="Insert your email"
                ref={emailRef}
                onKeyDown={(e) => handleKeyDown(e, subjectRef)}
              />
            </div>

          <div className="contact_form-div">
            <input
              type="text"
              className="contact_form-input"
              placeholder="Insert your subject"
              ref={subjectRef}
              onKeyDown={(e) => handleKeyDown(e, messageRef)}
            />
          </div>

          <div className="contact_form-div contact_form-area">
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              className="contact_form-input"
              placeholder="Write your message"
              ref={messageRef}
              onKeyDown={(e) => handleKeyDown(e, null)}
            ></textarea>
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Contact;
