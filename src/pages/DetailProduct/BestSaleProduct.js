import className from "classnames/bind";

import { memo, } from "react"




import { forwardRef } from "react"



import styles from "./DetailProduct.module.scss";

const cx = className.bind(styles);


function BestSaleProduct({ product }, ref) {




    return (<div className={cx("product-item")} to={`/detail/@:${product?.id ? product?.id : product?._id}`}>
        <div className={cx("product-img-wrapper")}>
            <img ref={ref} className={cx("img")}
                src={`${process.env.API_IMG_URL}/${product?.img_product[0][0]}`} alt="" />


        </div>
        <div className={cx("product-content")}>
            <div className={cx("content-title")}>
                {product.title}
            </div>


            <div className={cx("product-price-ship")}>

                <div className={cx("product-price", "primary")}>


                    <p className={cx("new-price")}>{
                        product.sale_off > 0 ? `₫${product.price - product.price * product.sale_off}` : `₫${product.price}`
                    }</p>

                </div>


            </div>


        </div>

    </div>);

}

export default memo(forwardRef(BestSaleProduct));