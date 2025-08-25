import "../TitleCards/TitleCards.css"
import cards_data from "../../assets/cards/Cards_data"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"

const TitleCards = ({title,category}) => {
  const[apiData,setApiData]=useState([])
  const cardsRef=useRef()

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZmU2OGViMTQ1ZDdhZDU4MDM5OGQ4NWYxYzM2MTkzMCIsIm5iZiI6MTc1NjA5ODkxMC43MzcsInN1YiI6IjY4YWJmMTVlYjYzZDI2MWNlNDQ0OTAzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1-9i2lmAggyF2hqJzqppMqnD5u6vX3cDM-SQpTZxb_g'
    }
  };

  const handleWheel=(e)=>{
    e.preventDefault()
    cardsRef.current.scrollLeft+=e.deltaY
  }

  useEffect(()=>{

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener("wheel",handleWheel)
  },[])

  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index)=>{
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path}/>
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards