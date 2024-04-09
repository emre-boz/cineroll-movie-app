import { Link } from "react-router-dom";
import '../styles/error-page.css';
import { errorPage } from "../assets/images";



function Error(){
  return (
    <div className="error-page">
      <div>
        <img src={errorPage} alt='not found' className="error-page-image" />
        
        <div className="error-page-info">
            <h3>Page Not Found</h3>
            <p>We can't seem to find the page you're looking for.</p>
            <Link to='/' className="error-page-btn">Return to Home</Link>
        </div>
      </div>
    </div>
  )
}

export default Error;
