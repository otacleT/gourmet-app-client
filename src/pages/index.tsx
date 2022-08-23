import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <section className="p-top">
      <div className="p-top-wrap">
        <p className="mainTxt">
          <span>学生の声を載せたサイト</span>
        </p>
        <p className="mainTxt">
          <span>作ってみませんか</span>
        </p>
        <div className="p-top-wrap-item u-itemPosition01">
          <div className="p-top-wrap-item-content">
            <div className="p-top-wrap-item-content-txt">
              <p>Good!</p>
            </div>
            <div className="p-top-wrap-item-content-circle"></div>
          </div>
        </div>
        <div className="p-top-wrap-item u-itemPosition02">
          <div className="p-top-wrap-item-content">
            <div className="p-top-wrap-item-content-txt">
              <p>Yummy!</p>
            </div>
            <div className="p-top-wrap-item-content-circle"></div>
          </div>
        </div>
        <div className="p-top-wrap-item u-itemPosition03">
          <div className="p-top-wrap-item-content">
            <div className="p-top-wrap-item-content-txt">
              <p>Nice!</p>
            </div>
            <div className="p-top-wrap-item-content-circle"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
