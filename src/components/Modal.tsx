import { InputMask, type MaskEventDetail } from '@react-input/mask'
import { useAppDispatch } from '../hooks/redux'
import useInput from '../hooks/useInput'
import { closeModal } from '../store/slices/usersSlice'
import { useState } from 'react'
import { useCreateUserMutation } from '../store/services/users.api'
import { IUser } from '../models/models'
import { capitalize } from '../utils'

export default function Modal() {
  const name = useInput()
  const email = useInput()
  const username = useInput()

  const [disable, setDisable] = useState(false)
  const [phone, setPhone] = useState<MaskEventDetail | null>(null)
  const [createUser, {error, isLoading}] = useCreateUserMutation()

  const dispatch = useAppDispatch()
  
  async function submitHandler (e: React.FormEvent) {
    e.preventDefault()
    setDisable(true)
    
    const data = {
      name: capitalize(name.value),
      username: username.value,
      email: email.value,
      phone: phone?.value,
    }
    
    await createUser(data as IUser).unwrap()
    dispatch(closeModal())
  }

  return (
    <>
      <div onClick={() => dispatch(closeModal())} className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-black/80"></div>
      <div className='p-3 rounded bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <button className='absolute top-0 right-2 text-3xl text-right' onClick={() => dispatch(closeModal())}>&times;</button>
        {isLoading && <p className='text-center'>Loading...</p>}
        {error && <p className='text-center'>Something weng wrong.</p>}
        <form onSubmit={submitHandler} className="rounded p-5 bg-white z-10">
          <div className="mb-5 relative">
            <label className="mr-2" htmlFor="name">
              Name:
            </label>
            <input
              className={`w-full border py-2 pl-2 pr-5 outline-none rounded`}
              id="name"
              type="text"
              value={name.value}
              onChange={name.onChange}
              placeholder='Enter the name'
              required
            />
            {name.value.length > 0 && (
              <button 
                className="text-xl absolute bottom-2.5 right-2"
                onClick={name.clearInput}
              >
                &times;
              </button>
            )}
          </div>
          <div className="mb-5 relative">
            <label className="mr-2" htmlFor="username">
              Username:
            </label>
            <input
              className={`w-full border py-2 pl-2 pr-5 outline-none rounded`}
              id="username"
              type="text"
              value={username.value}
              onChange={username.onChange}
              placeholder='Enter the username'
              required
            />
            {username.value.length > 0 && (
              <button 
                className="text-xl absolute bottom-2.5 right-2"
                onClick={username.clearInput}
              >
                &times;
              </button>
            )}
          </div>
          <div className="mb-5 relative">
            <label className="mr-2" htmlFor="email">
              Email:
            </label>
            <input
              className={`w-full border py-2 pl-2 pr-5 outline-none rounded`}
              id="email"
              type="email"
              value={email.value}
              onChange={email.onChange}
              required
              placeholder='youremail@gmail.com'
            />
            {email.value.length > 0 && (
              <button 
                className="text-xl absolute bottom-2.5 right-2"
                onClick={email.clearInput}
              >
                &times;
              </button>
            )}
          </div>
          <div className="mb-5 relative">
            <label className="mr-2" htmlFor="phone">
              Phone:
            </label>
            <InputMask 
              defaultValue={phone?.value ?? ''}
              onMask={e => setPhone(e.detail)}
              className='w-full border py-2 pl-2 pr-5 outline-none rounded' 
              mask="+_ (___) ___-__-__" 
              replacement={{ _: /\d/ }} 
              placeholder='+7 (___) ___-__-__'
              id='phone'
              required
            />
          </div>

          <button 
            type='submit'
            disabled={disable}
            className={`py-2 px-4 rounded bg-blue-700 text-white ${disable && 'bg-gray-500'}`}
          >Create</button>
        </form>
      </div>
    </>
  )
}
