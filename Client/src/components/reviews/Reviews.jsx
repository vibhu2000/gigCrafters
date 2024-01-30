import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import newRequest from "../../utils/newRequest";
import Review from "../review/Review";
import "./Reviews.scss";

const Reviews = ({ gigId }) => {

  const currentUSer = JSON.parse(localStorage.getItem('currentUser'));
  console.log(currentUSer)

  const queryClient = useQueryClient()
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      newRequest.get(`/reviews/${gigId}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post("/reviews", review);
    },
    onSuccess:()=>{                 //onSucess func to update review list on frontend
      queryClient.invalidateQueries(["reviews"])  
      alert('Added Successfully');
    },
    onError:()=>{
      if(!currentUSer.isSeller){
        alert('You have already created a review for this gig!');
      }
      else{
        alert("Sellers can't create a review!");
      }
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;     //from input(first field 0index) we can get the data
    const star = e.target[1].value;     //from option(second 1index) we will get the starNumber
    mutation.mutate({ gigId, desc, star });     //using the mutation mutate fn to send the data(des, star) and creating a new review in the backend(see line 20 )
    
  };

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {isLoading
        ? "loading" 
        : error
        ? "Something went wrong!"
        : data.map((abc) => <Review key={abc._id} def={abc} />)}
        {/*  above line-> data.map()just like loop will continue calling review component till all the reviews comes. Key is given to distinguish each review by giving a unique id from frontend else it will take default same key values for all reviews. def is passed as props on review.jsx */}

      <div className="add">
        <h3>Add a review</h3>
        <form action="" className="addForm" onSubmit={handleSubmit}>
          {/* we have 2things input and option */}
          <input type="text" placeholder="write your opinion" />
          <select name="" id="">
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;