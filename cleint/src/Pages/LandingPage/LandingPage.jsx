import { FaCheck } from "react-icons/fa6";
import { FaCalendarCheck } from "react-icons/fa";
import { FaRegHourglass } from "react-icons/fa";
import { GoDeviceCameraVideo } from "react-icons/go";
import { IoTimeOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'
import footer from '../../images/footer.jpg'
import './LandingPage.css'
const LandingPage = () => {
    const navigate=useNavigate()

  const handleNavigate=()=>{
    navigate('/register-page')
  }
  return (
  <div className="wrapper">
      <div className="container">
      <h1 className="title">
        <span>Learn to use</span> <span>Ai Tools & chatGpt</span>
        <img className="chatgpt__image" src="https://th.bing.com/th/id/OIP.yZzZiwVjgqzlyJoHnU7puQHaHa?w=169&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="chtagptimage" />
      </h1>

      <div className="content">
        Create any kind of <span>Presentations under 10 secs</span>,do any kind
        of It work under 10 minutes , become <span>top 1% of excel users</span>{" "}
        who can use the functions and <span> save your job </span>
        and 90% of your time on daily basis
      </div>
      <div className="benefits__div">
        <p className="benefit__1">
          <FaCheck className="icon" />
          become a highly paid prompt engineer (AVERAGE SALARY 17 LPA){" "}
        </p>
        <p className="benefit__2">
          <FaCheck className="icon" />
          no prior technical or ai knowledge required{" "}
        </p>
        <p className="benefit__3">
          <FaCheck className="icon" />
          save upto 2 hours everyday{" "}
        </p>
        <p className="benefit__4">
          <FaCheck className="icon" />
          grow your salary upto 3x{" "}
        </p>
      </div>

      <div className="flex">
        <div>
          <div>
            <FaCalendarCheck className="grid__icons" />
            On April 21,2024{" "}
          </div>
          <div>
            <FaRegHourglass className="grid__icons" />
            3+ hours
          </div>
          <div>
            <GoDeviceCameraVideo className="grid__icons" /> Live Session
          </div>
          <div>
            <IoTimeOutline className="grid__icons" />
            11:00 am onwards
          </div>
        </div>
        <div>
          <img
            src={
              "https://th.bing.com/th/id/OIP.4dFkEUfZ6ahfbGGZQTaUlgHaDt?w=298&h=175&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            }
            alt="ai tools"
          />
        </div>
      </div>

      <div onClick={handleNavigate}  className="professional__btn">
        <p> {">>"} Become a super working professional now !</p>
        <p>
          {" "}
          (only <span>Rs.929</span> Rs. 9)
        </p>
      </div>

      <div className="bonuses">
        bonuses worth <span>Rs.10,500</span> if you register before midnight.
        <p>Featured in</p>
      </div>

      <div className="companies">
        <img src={footer} alt="footerImage" />
      
      </div>
    </div>
  </div>
  )
}

export default LandingPage
