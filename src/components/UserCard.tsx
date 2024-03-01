import { useState } from "react";
import { IUser } from "../models/models";
import { capitalize } from "../utils";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { addFavorite, removeFavorite } from "../store/slices/favoriteSlices";

interface UserCardProps {
  user: IUser,
  remove: (id: string) => void,
  update: (user: IUser) => void
}

export default function UserCard ({ user, remove, update }: UserCardProps) {
  const favorites = useAppSelector(state => state.favorite.favorites)
  const isFavorite = favorites.some(fav => fav.id === user.id)
  const [isLike, setIsLike] = useState(isFavorite)
  const dispatch = useAppDispatch()

  function updateHandler () {
    const name = capitalize(prompt() || "")
    if (name.length) {
      update({ ...user, name })
    }
  }

  function deleteHandler (id: string) {
    if (confirm('Are you sure wanna delete this user?')) {
      remove(id)
    }
  }

  function favoriteHandler () {
    setIsLike(prev => !prev)
    if (isFavorite) {
      dispatch(removeFavorite(user.id))
    } else {
      dispatch(addFavorite(user))
    }
  }

  return (
    <div className="border p-5 w-[300px]">
      <h3 className="font-bold mb-2 text-center">{ user.name }</h3>
      <ul className="mb-3">
        <li>Id: { user.id }</li>
        <li>Username: { user.username }</li>
        <li>Email: { user.email }</li>
      </ul>
      <p className="font-bold text-right mb-5">{ user.phone }</p>
      <div className="flex items-center gap-2">
        <button 
          className="py-1 px-3 rounded bg-red-600 text-white hover:bg-red-500 transition-colors" 
          type="button"
          onClick={() => deleteHandler(user.id)}
        >Delete</button>
        <button 
          className="py-1 px-3 rounded bg-gray-500 text-white hover:bg-gray-400 transition-colors" type="button"
          onClick={updateHandler}
        >Update</button>
        <button type="button">
          <img 
            onClick={favoriteHandler}
            src={`/${isLike ? 'liked': 'unliked'}.svg`} 
            alt={`${isLike ? 'liked' : 'unliked'}`} 
            width={40}
            height={40}
          />
        </button>
      </div>
    </div>
  )
}