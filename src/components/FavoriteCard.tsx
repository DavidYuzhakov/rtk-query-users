import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { IUser } from "../models/models";
import { addFavorite, removeFavorite } from "../store/slices/favoriteSlices";

export function FavoriteCard({ id, name, username, email, phone }: IUser) {
  const favorites = useAppSelector(state => state.favorite.favorites)
  const isFavorite = favorites.some(fav => fav.id === id)
  const [isLike, setIsLike] = useState(isFavorite)
  const dispatch = useAppDispatch()

  function favoriteHandler () {
    setIsLike(prev => !prev)
    if (isFavorite) {
      if (confirm('Are you sure wanna unfavorite this user?')) {
        dispatch(removeFavorite(id))
      }
    } else {
      dispatch(addFavorite({ id, name, username, email, phone }))
    }
  }

  return (
    <div className="max-w-[250px] rounded-[10px] p-3 border hover:border-white hover:shadow-lg hover:-translate-y-2 transition-all">
      <h3 className="font-semibold text-xl mb-2 text-center">{name} #{id}</h3>
      <ul className="flex flex-col gap-1 mb-4">
        <li className="text-gray-500">@{username}</li>
        <li><span className="font-bold">Phone:</span> { phone }</li>
        <li><span className="font-bold">Email:</span> {email}</li>
      </ul>


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
  )
}