import React,{useState, ChangeEvent, FormEvent} from 'react';

function User() {

  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prev) => {
      return { ...prev, [name]: value }
    });
  };

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userDetails);
  };


  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" onChange={handleChange} />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" onChange={handleChange} />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default User;
