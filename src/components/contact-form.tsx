import React, { useState, useEffect } from 'react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');
  const [buttonText, setButtonText] = useState('Send Message');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setButtonText('Sending...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setButtonText('Successful');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setButtonText('Failed');
      }
    } catch (error) {
      setStatus('error');
      setButtonText('Failed');
    }
  };

  useEffect(() => {
    if (status === 'success' || status === 'error') {
      const timer = setTimeout(() => {
        setStatus('idle');
        setButtonText('Send Message');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <form onSubmit={handleSubmit} className='w-full max-w-md'>
      <div className='mb-4'>
        <label htmlFor='name' className='block text-accents-6 mb-2'>
          Name
        </label>
        <input
          type='text'
          id='name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          required
          className='w-full p-2 text-accents-8 focus:outline-none focus:border-blue-700'
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='email' className='block text-accents-6 mb-2'>
          Email
        </label>
        <input
          type='email'
          id='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          required
          className='w-full p-2 text-accents-8 focus:outline-none focus:border-blue-700'
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='message' className='block text-accents-6 mb-2'>
          Message
        </label>
        <textarea
          id='message'
          name='message'
          rows={4}
          value={formData.message}
          onChange={handleChange}
          required
          className='w-full p-2 text-accents-8 focus:outline-none focus:border-blue-700'
        ></textarea>
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className={`w-full p-2 rounded transition duration-300 border border-white/10
          ${status === 'sending' ? 'cursor-not-allowed' : 'hover:bg-white/5'}
          ${status === 'success' ? 'text-accents-6' : ''}
          ${status === 'error' ? 'text-red-500' : ''}
          ${status === 'idle' || status === 'sending' ? 'text-accents-6' : ''}`}
      >
        <div className="shimmer">
          <div className="mask">
            {buttonText}
          </div>
        </div>
      </button>
    </form>
  );
};

export default ContactForm;
