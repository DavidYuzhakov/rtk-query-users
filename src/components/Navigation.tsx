import { Link, useLocation } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { changeLimit, openModal } from "../store/slices/usersSlice"

export default function Navigation() {
  const dispatch = useAppDispatch()
  const limit = useAppSelector(state => state.users.limit)
  const location = useLocation()

  function changeInputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value)
    if (!isNaN(value)) {
      dispatch(changeLimit(value))
    }
  }

  function createHandler (e: React.MouseEvent) {
    e.stopPropagation()
    dispatch(openModal())
  }

  return (
    <nav className="w-full flex justify-between items-center bg-cyan-600 px-5 py-3 shadow-sm text-white">
      {location.pathname === '/favorites' && <div className="font-bold text-2xl">LoGo</div>}
      <ul className="flex items-center gap-4">
        <li>
          <Link to={'/'}>Home</Link>
        </li>
        <li>
          <Link to={'/favorites'}>Favorites</Link>
        </li>
      </ul>
      {location.pathname === '/' && <div>
        <label className="mr-5" htmlFor="limit">
          <span className="mr-5">Limit users</span>
          <input
            value={limit < 0 ? 0 : limit}
            onChange={changeInputHandler}
            className="border outline-none w-[150px] rounded p-1 bg-slate-400"
            type="number"
            id="limit"
          />
        </label>
        <button 
          onClick={createHandler}
          className="px-4 py-2 bg-green-600 rounded hover:bg-green-500 transition-colors" 
          type="button"
          >
          Create User
        </button>
      </div>}
    </nav>
  )
}
