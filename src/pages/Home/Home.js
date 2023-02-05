import className from 'classnames/bind';
import styles from "./Home.module.scss";

// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";


import Slider from './Components/Slider';

const cx = className.bind(styles);

function Home() {



    return <div className={cx("wrapper")}>
        <Slider />
    </div>
}

export default Home;