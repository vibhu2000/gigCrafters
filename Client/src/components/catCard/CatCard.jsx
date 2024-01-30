import React from "react";
import { Link } from "react-router-dom";
import "./CatCard.scss";

const CatCard=({ item })=>{
  return (
    <Link to={`/gigs?cat=${item.cat}&id=${item.id}&title=${item.title}&desc=${item.desc}`}>
      <div className="catCard">
        <img src={item.img} alt="" />
        <span className="desc">{item.desc}</span>
        <span className="title">{item.title}</span>
      </div>
    </Link>
  );
}
export default CatCard;