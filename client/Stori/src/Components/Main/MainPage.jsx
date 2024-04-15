import { useNavigate, Link } from 'react-router-dom';


function MainPage() {

    const navigate = useNavigate();


    return (
        <div>
            <div className="sidebox">
                <div id="sidebox1" className="sidebox">
                    <div id="sideboxx1">YOUR PAGES</div>
                    <hr /><br /><br />See all
                    <hr />
                    <div id="sideboxx2">
                        This Week
                    </div><br /><br />See more
                    <hr />
                    <div id="sideboxx3">
                        Recent Posts
                    </div><br /><br />See more
                    <hr />
                    <div id="sideboxx4">
                        You haven't posted in this days
                    </div><br /><br /><br />See all
                </div>
            </div>
        </div>
    )
}

export default MainPage;