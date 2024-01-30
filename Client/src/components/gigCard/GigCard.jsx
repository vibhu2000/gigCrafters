import React from 'react'
import "./GigCard.scss"
import {Link} from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';

const GigCard = ({item}) => {

    //to fetch users
    const { isLoading, error, data } = useQuery({
        queryKey: [item.userId],
        queryFn: () =>
          newRequest
            .get(
              `/users/${item.userId}`            //item is the mongodb particular gig
            )
            .then((res) => {
              return res.data;
            }),
      });
      // console.log(data.username)
  return (
    <Link to={`/gig/${item._id}`} className='link'>
    <div className='gigCard'>
        <img src={item.cover} alt=""/>
        <div className="info">
          { isLoading
            ? ("loading")
            : error
            ? ("Something went wrong!") 
            :(<div className="user">
                <img src={data.img || "https://icons.veryicon.com/png/o/miscellaneous/xdh-font-graphics-library/anonymous-user.png"} alt=""/>
                <span>{data.username}</span>
            </div>
            )}

            <p>{item.shortDesc}</p>
            <div className="star">
                <img src='./img/star.png' alt=""/>
                {/* finding average rating by this formula, if 0 then NaN will come and it will just show the normal star else round the values and display it*/}
                <span>
                  {!isNaN(item.totalStars / item.starNumber) &&
                      Math.round(item.totalStars / item.starNumber)}</span>   
            </div>
        </div>
        <hr/>
        <div className="details">
            <img src="./img/heart.png" alt=""/>
            <div className="price">
                <span>STARTING AT</span>
                <h2>${item.price}</h2>
            </div>
        </div>
    </div>
    </Link>
  )
}

export default GigCard