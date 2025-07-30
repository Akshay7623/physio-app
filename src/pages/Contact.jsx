import { useEffect, useRef, useState } from 'react'
import { Input, Textarea, Button, Typography } from '@material-tailwind/react'
import toast, { Toaster } from 'react-hot-toast'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import Contact_us_img from '../assets/images/contact.jpg';
import AuthUser from '../Components/AuthUser';
import LogginHeader from '../Components/LogginHeader';
import { CONTACT_US } from '../URLS';

const Contact = () => {
  const [form, setForm] = useState({ fullName: '', email: '', mobile: '', message: '' })
  const [isUserLoggedIn, setUserLoggedIn] = useState();
  const [submitBtn, setSubmitBtn] = useState(true);
  const fullNameRef = useRef();
  const mobileRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();



  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validateEmail = (email) => {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
  }

  const removeError = () => {
    fullNameRef.current.classList.add('hidden');
    mobileRef.current.classList.add('hidden');
    emailRef.current.classList.add('hidden');
    messageRef.current.classList.add('hidden');
  }

  const createError = (ele, message) => {
    ele.classList.add('flex');
    ele.classList.remove('hidden');
    ele.innerHTML = message;
  }

  const submitContact = () => {

    if (!submitBtn) {
      return;
    }

    setSubmitBtn(false)

    if (form.fullName.toString().trim().length < 3) {
      return createError(fullNameRef.current, 'Please enter valid first name !');
    }

    if (form.mobile.toString().trim().length !== 10) {
      return createError(mobileRef.current, 'Please enter valid mobile !');
    }

    if (!validateEmail(form.email)) {
      return createError(emailRef.current, 'Please enter valid email address !');
    }

    if (form.message.toString().trim().length < 3) {
      return createError(messageRef.current, 'Please enter valid message !');
    }

    const contactPromise = new Promise((resolve, reject) => {
      fetch(CONTACT_US, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ full_name: form.fullName, mobile: form.mobile, email: form.email, message: form.message }),
      }).then((res) => res.json()).then((data) => {

        if (data.message === 'success') {
          resolve();
          setForm({ fullName: '', email: '', mobile: '', message: '' })
          setSubmitBtn(true)
        }

        if (data.message === 'INVALID_DATA') {
          reject();
          setSubmitBtn(true)
        }
      })
    })

    toast.promise(contactPromise, {
      loading: 'Submitting',
      success: 'See you soon ! Thanks',
      error: 'Failed to submit !'
    })
  }

  useEffect(() => {
    AuthUser().then((data) => {
      if (data.message === "AUTH_FAILED") {
        setUserLoggedIn(false);
      } else {
        setUserLoggedIn(true)
      }
    })
  }, []);

  return (
    <>

      {
        isUserLoggedIn ? <LogginHeader /> : <Header />
      }

      <Toaster />

      <img className='w-[70%] md:w-[50%] lg:w-[30%] mx-auto' src={Contact_us_img} alt='appointment' />
      <h2 className="text-center text-[20px] font-bold text-gray-800 lg:text-[30px] mb-4 mt-4 flex flex-row gap-2 justify-center">
        <div>Contact us</div>
        <div className='mt-1 zoom-in-out'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#212121" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
          </svg>
        </div>
      </h2>

      <div className='max-w-[900px] mx-auto'>

        <div className='px-4 md:px-8 lg:px-24 mt-4'>
          <Input label='Full Name' type='text' name='fullName' value={form.fullName} onChange={handleChange} onFocus={removeError} />
          <Typography
            ref={fullNameRef}
            variant="small"
            color="gray"
            className="mt-2  items-center gap-1  text-xs font-normal text-[red] hidden"
          >.</Typography>

        </div>

        <div className='px-4 md:px-8 lg:px-24 mt-4'>
          <Input label='Mobile' type='text' name='mobile' value={form.mobile} onChange={handleChange} onFocus={removeError} />
          <Typography
            ref={mobileRef}
            variant="small"
            color="gray"
            className="mt-2  items-center gap-1  text-xs font-normal text-[red] hidden"
          >.</Typography>

        </div>



        <div className='px-4 md:px-8 lg:px-24 mt-4'>
          <Input label='Email' type='email' name='email' value={form.email} onChange={handleChange} onFocus={removeError} />
          <Typography
            ref={emailRef}
            variant="small"
            color="gray"
            className="mt-2  items-center gap-1  text-xs font-normal text-[red] hidden"
          >.</Typography>

        </div>

        <div className='px-4 md:px-8 lg:px-24 mt-4'>
          <Textarea label='Message' name='message' value={form.message} onChange={handleChange} onFocus={removeError} />
          <Typography
            ref={messageRef}
            variant="small"
            color="gray"
            className="mt-2  items-center gap-1  text-xs font-normal text-[red] hidden"
          >.</Typography>

        </div>


        <div className='px-4 md:px-8 lg:px-24 mt-4'>
          <Button fullWidth onClick={submitContact}>Submit</Button>
        </div>

      </div>


      <Footer />
    </>
  )
}

export default Contact