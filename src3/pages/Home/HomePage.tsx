import React from "react";
import styles from "./Home.module.css";
import Button from "../../../src2/compoenents/Button";
import printer from "../../assets/images/printer.png";
const HomePage = () => {
  return (
    <div style={{ height: "100%" }}>
      <div className={styles.navbar}>
        <div className={styles.logo}>3d-Printing</div>
        <div className={styles.itemsList}>
          <Button onClick={() => {}} color="#9400E0" text="About" />
          <Button onClick={() => {}} color="#9400E0" text="Services" />
          <Button onClick={() => {}} color="#9400E0" text="Products" />
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.bodycontent}>
          <h1 className={styles.heading}>Start Your 3D Printing Journey.</h1>
          <p>
            Embark on affordable 3D printing with us! Our service offers
            cost-effective solutions for hobbyists, small businesses, and
            entrepreneurs. Start bringing your ideas to life today!
          </p>
          <div>
            <Button
              text="Place Order!"
              onClick={() => {}}
              color="purple"
              styles={{ borderRadius: "20px", paddingInline: "40px" }}
            />
          </div>
        </div>
        <div>
          <img className={styles.img} src={printer} alt="" width="400px" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
