import React, {useEffect, useState} from 'react';
import '../../index.css'
import './Home.module.css';
import axios from "axios";
import {Spinner} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
const api = axios.create({
    baseURL:'http://localhost:8000/setName'
})
function Home() {
    const [Sets, setSets] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchFlag, setSearchFlag] = useState(false);
    let navigate = useNavigate();

    function getSetsByName() {
        if (search.length == 0) {
            return;
        }
        setSearchFlag(false)
        api.get(search).then(res=> {
            setSets(res.data)
            setSearchFlag(true)
            setLoading(false)
        }).catch(e => {
            console.log(e)
        })
    }

    const handleClick = (setID) => (e) => {
        navigate("/view/" + setID, {replace: true})
    }

    function onTextBoxChange(e) {
        setSearchFlag(false)
        setSearch(e.target.value)
    }

    function log() {
        console.log(Sets)
    }
    return (
        <div>
            <div className="container">
                <div className={"input-group"} style={{paddingTop: 30, width: '25vw'}}>
                    <input
                        className={"form-control"}
                        type="text"
                        value={search}
                        onChange={onTextBoxChange}
                    />
                    <button className={"btn btn-primary"} onClick={getSetsByName}>Search</button>
                </div>
                {loading && <div>
                    <div>
                        <div className="Row">
                            Loading Website
                            <Spinner></Spinner>
                        </div>
                    </div>
                </div>}
                {!loading && Sets.length != 0 && <div className="container">
                    <p>Showing {Sets.length} Set(s)...</p>
                    {Sets.map((set, index) => <div>
                        <div className="row" style={{width: '25vw'}}>
                                <button key={set._id} onClick={handleClick(set._id)} className="btn btn-primary"> {set.name} </button>
                        </div>
                        <br/>
                    </div>)}
                </div>}
                {!loading && Sets.length == 0 && searchFlag && <div className={"container"}>
                    <p>Could Find No Sets With That Name</p>
                </div>}
            </div>


        </div>
    );
}

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
