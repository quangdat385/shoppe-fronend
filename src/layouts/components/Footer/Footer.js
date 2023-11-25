import className from 'classnames/bind';
import QR from "~/assets/images/QR code.png";
import Apple from "~/assets/images/App Store.png";
import Google from "~/assets/images/Goole play.png";
import AppGallery from "~/assets/images/Appgalleri.png";


import styles from './Footer.module.scss';
import { Container, Row, Col } from 'react-bootstrap';
const cx = className.bind(styles)



function Footer() {
  return (
    <div className={cx('wrapper')}>
      <Container className={cx('footer-white')}></Container>
      <Container className={cx('about-shop')}>
        <Row >
          <Col md={4} sm={6} className={cx("config")} >
            <div className={cx("help-title")}>CHĂM SÓC KHÁCH HÀNG</div>
            <ul className={cx("help-list")}>
              <li className={cx("help-item")}>
                <a href="/" className={cx("help-link")}> Trung Tâm Trợ Giúp</a>
              </li>
              <li className={cx("help-item")}>
                <a href="/" className={cx("help-link")}> Shopee Blog </a>
              </li>
              <li className={cx("help-item")}>
                <a href="/" className={cx("help-link")}> Shopee Mail </a>
              </li>
              <li className={cx("help-item")}>
                <a href="/" className={cx("help-link")}> Hướng Dẫn Mua Hàng</a>
              </li>
              <li className={cx("help-item")}>
                <a href="/" className={cx("help-link")}> Thanh Toán </a>
              </li>
              <li className={cx("help-item")}>
                <a href="/" className={cx("help-link")}> Shop Xu </a>
              </li>
              <li className={cx("help-item")}>
                <a href="/" className={cx("help-link")}> Vận Chuyển </a>
              </li>
              <li className={cx("help-item")}>
                <a href="/" className={cx("help-link")}> Trả Hàng & Hoàn Tiền </a>
              </li>
              <li className={cx("help-item")}>
                <a href="/" className={cx("help-link")}> Chăm Sóc Khách Hàng </a>
              </li>
              <li className={cx("help-item")}>
                <a href="/" className={cx("help-link")}> Chính Sách Bảo Mật</a>
              </li>
            </ul>
          </Col>
          <Col md={4} sm={6} className={cx("config")} >
            <div className={cx("help-title")}>VỀ SHOPEE</div>
            <ul className={cx("help-list")}>
              <li className={cx("help-item")}>
                <a href="/" className={cx("help-link")}>Giới Thiệu Về Shopee Việt Nam</a>
              </li>
              <li className={cx("help-item")}>
                <a href="/" className={cx("help-link")}> Tuyển Dụng </a>
              </li>
              <li className={cx("help-item")}>
                <a href="/" className={cx("help-link")}> Điều Khoản Shopee </a>
              </li>
              <li className={cx("help-item")}>
                <a href="/" className={cx("help-link")}> Chính Sách Bảo Mật </a>
              </li>
              <li className={cx("help-item")}>
                <a href="/" className={cx("help-link")}> Chính Hãng </a>
              </li>
              <li className={cx("help-item")}>
                <a href="/" className={cx("help-link")}> Kênh Người Bán </a>
              </li>
              <li className={cx("help-item")}>
                <a href="/" className={cx("help-link")}> Flash Sales </a>
              </li>
              <li className={cx("help-item")}>
                <a href="/" className={cx("help-link")}> Chương Trình Tiếp Thị Liên Kết Shopee </a>
              </li>
              <li className={cx("help-item")}>
                <a href="/" className={cx("help-link")}> Liên Hệ Với Truyền Thông </a>
              </li>
            </ul>
          </Col>
          <Col md={4} sm={6} className={cx("config")}>
            <div className={cx("help-title")}>THANH TOÁN</div>
            <ul className={cx("payment")}>
              <li className={cx("payment-item")}>
                <div className={cx("item", "item-img1")}></div>
              </li>
              <li className={cx("payment-item")}>
                <div className={cx("item", "item-img2")}></div>
              </li>
              <li className={cx("payment-item")}>
                <div className={cx("item", "item-img3")}></div>
              </li>
              <li className={cx("payment-item")}>
                <div className={cx("item", "item-img4")}></div>
              </li>
              <li className={cx("payment-item")}>
                <div className={cx("item", "item-img5")}></div>
              </li>
              <li className={cx("payment-item")}>
                <div className={cx("item", "item-img6")}></div>
              </li>
              <li className={cx("payment-item")}>
                <div className={cx("item", "item-img7")}></div>
              </li>
            </ul>
            <div className={cx("transport")}>
              ĐƠN VỊ VẬN CHUYỂN
            </div>
            <ul className={cx("transport-list")}>
              <li className={cx("transport-item")}>
                <div className={cx("bg-item", "img-item1")}></div>
              </li>

              <li className={cx("transport-item")}>
                <div className={cx("bg-item", "img-item2")}></div>
              </li>
              <li className={cx("transport-item")}>
                <div className={cx("bg-item", "img-item3")}></div>
              </li>
              <li className={cx("transport-item")}>
                <div className={cx("bg-item", "img-item4")}></div>
              </li>
              <li className={cx("transport-item")}>
                <div className={cx("bg-item", "img-item5")}></div>
              </li>
              <li className={cx("transport-item")}>
                <div className={cx("bg-item", "img-item6")}></div>
              </li>
              <li className={cx("transport-item")}>
                <div className={cx("bg-item", "img-item7")}></div>
              </li>
              <li className={cx("transport-item")}>
                <div className={cx("bg-item", "img-item8")}></div>
              </li>
              <li className={cx("transport-item")}>
                <div className={cx("bg-item", "img-item9")}></div>
              </li>
              <li className={cx("transport-item")}>
                <div className={cx("bg-item", "img-item10")}></div>
              </li>
            </ul>
          </Col>
          <Col md={4} sm={6} className={cx("config")}>
            <div className={cx("help-title")}>THEO DÕI CHÚNG TÔI TRÊN</div>
            <ul className={cx("social-shop")}>
              <li className={cx("social-item")}>
                <a href="/" className={cx("social-link")}>
                  <div className={cx("social-icon", "social-icon-1")}>

                  </div>
                  Facebook
                </a>

              </li>
              <li className={cx("social-item")}>
                <a href="/" className={cx("social-link")}>
                  <div className={cx("social-icon", "social-icon-2")}>

                  </div>
                  Instagram
                </a>

              </li>
              <li className={cx("social-item")}>
                <a href="/" className={cx("social-link")}>
                  <div className={cx("social-icon", "social-icon-3")}>

                  </div>
                  LinkedIn
                </a>

              </li>
            </ul>

          </Col>
          <Col md={4} sm={6} className={cx("config")}>
            <div className={cx("help-title")}>TẢI ỨNG DỤNG SHOPEE NGAY THÔI</div>
            <a href="/" className={cx("shop-application")}>
              <img

                src={QR}
                alt=""
                className={cx("qr-img")} />
              <div className={cx("shop-app")}>
                <img src={Apple} alt="" className={cx("app-img")} />
                <img src={Google} alt="" className={cx("app-img")} />
                <img src={AppGallery} alt="" className={cx("app-img")} />
              </div>
            </a>
          </Col>

        </Row>

      </Container>
      <Container className={cx("license-country")}>
        <div className={cx("license")}>
          © 2022 Shopee. Tất cả các quyền được bảo lưu.
        </div>
        <div className={cx("country")}>
          <div className={cx("country-title")}>
            Quốc gia & Khu vực
          </div>
          <a href="/" className={cx("country-link")}>Singapore</a>
          <a href="/" className={cx("country-link")}>Indonesia</a>
          <a href="/" className={cx("country-link")}>Đài Loan</a>
          <a href="/" className={cx("country-link")}>Thái Lan</a>
          <a href="/" className={cx("country-link")}>Malaysia</a>
          <a href="/" className={cx("country-link")}>Việt Nam</a>
          <a href="/" className={cx("country-link")}>philippines</a>
          <a href="/" className={cx("country-link")}>Brazil</a>
          <a href="/" className={cx("country-link")}>México</a>
          <a href="/" className={cx("country-link")}>Colombia</a>
          <a href="/" className={cx("country-link")}>Chile</a>
          <a href="/" className={cx("country-link")}>Poland</a>
          <a href="/" className={cx("country-link")}>Spain</a>
          <a href="/" className={cx("country-link")}>Argentina</a>
        </div>
      </Container>
      <Container className={cx("policy-security")}>
        <div className={cx("security-item")}>
          <div className={cx("security-title")}>
            <a href="/" className={cx("security-link")}>CHÍNH SÁCH BẢO MẬT</a>
          </div>
          <div className={cx("security-title")}>
            <a href="/" className={cx("security-link")}>QUY CHẾ HOẠT ĐÔNG </a>
          </div>
          <div className={cx("security-title")}>
            <a href="/" className={cx("security-link")}>CHÍNH SÁCH VẬN CHUYỂN</a>
          </div>
          <div className={cx("security-title")}>
            <a href="/" className={cx("security-link")}>CHÍNH SÁCH TRẢ HÀNG VÀ HOÀN TIỀN</a>
          </div>
        </div>
        <Row >
          <div className={cx("security-register")}>
            <a href="/" className={cx("register-link")}>
              <div className={cx("register-img1")}></div>
            </a>
            <a href="/" className={cx("register-link")}>
              <div className={cx("register-img2")}></div>
            </a>

          </div>
        </Row>
        <Row>
          <div className={cx("shopee-company")}>
            Công Ty TNHH Shopee
          </div>
          <div className={cx("shopee-address")}>
            Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Thành phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn
          </div>
          <div className={cx("shopee-address")}>
            Chịu Trách Nhiệm Quản Lý Nội Dung:Nguyễn Đức Trí - Điện thoại liên hệ : 024 73081221(ext 4678)
          </div>
          <div className={cx("shopee-address")}>
            Mã số doanh nghiệp: 0106773786 do Sở Kế Hoạch & Đầu Tư TP Hà Nôi cấp lần đầu ngày 10/02/2015
          </div>
          <div className={cx("shopee-address")}>
            © 2015 - Bản quyền thuộc về Công ty TNHH Shopee
          </div>
        </Row>
      </Container>

    </div>
  );
}

export default Footer;