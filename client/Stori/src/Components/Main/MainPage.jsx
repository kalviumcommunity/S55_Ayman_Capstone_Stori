import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function MainPage() {

    const navigate = useNavigate();
    

    return (
        
            <div>   
            <div className="sidebox">
                <div id="sidebox1" className="sidebox">
                    <div id="your-pages">YOUR PAGES</div>
                    <hr /><br /><br />See all
                    <hr />
                    <div id="update">
                        This Week
                    </div><br /><br />See more
                    <hr />
                    <div id="recent-posts">
                        Recent Posts
                    </div><br /><br />See more
                    <hr />
                    <div id="profile">
                    </div><br /><br /><br />See all
                </div>
            </div>
        </div>
    )
}

export default MainPage;