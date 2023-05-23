import ClassName from "classnames/bind";
import axios from "axios";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

import styles from "./ProductCatalogue.module.scss";



const cx = ClassName.bind(styles);

function MenuProduct({ menu, setMenu }) {
    const listMenu = [
        "Sản Phẩm", "Sale Shock", "Hàng Mới Về", "Áo Croptop Ba Lỗ", "Áo Croptop Có Tay",
        "Váy Hot Trend", "Sét Đồ Hot Trend", "Quần Đùi - Short",
        "Quần Dài Hot Trend", "Áo Bra-Quần Lót Nữ", "Quần"
    ];



    // fetch({
    //     method: "GET",
    //     url: "https://down-vn.img.susercontent.com/file/vn-11134201-23030-8wv50s62ocove0_tn"
    // }).then(res => res.blob()).then(file => {
    //     console.log(file);
    //     let tempUrl = URL.createObjectURL(file);
    //     file.name = tempUrl
    //     console.log(file)
    //     const form = new FormData();
    //     form.append("files", file)
    //     console.log(form)


    // }).catch(() => {
    //     console.log("Failed to create")

    // });



    return (<div className={cx("menu-wrapper")}>
        {
            listMenu.map((item, index) => {
                return <div key={item + "menu"} className={cx("menu-item", index === menu ? "active" : "")}
                    onClick={() => setMenu(index)}>
                    <FontAwesomeIcon key={item + "menu-icon"} className={cx("icon")} icon={faCaretRight} style={{ color: "transparent" }} />
                    <span key={item + "text"}>{item}</span>
                </div>
            })
        }
    </div>
    );
}

export default MenuProduct;
