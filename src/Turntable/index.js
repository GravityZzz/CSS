import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class Lottery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rotating: "",
      pauseWheel: false,
      rotateStatus: false,
      activityId: 209,
      allPrizeWheelResult: [
        { id: "2091", class: "spin1" }, // 2现金券
        { id: "2091", class: "spin7" }, // 5现金券
        { id: "2093", class: "spin5" }, // 10现金券
        { id: "2094", class: "spin3" }, // 20现金券
        { id: "2095", class: "spin8" }, // 50现金券
        { id: "2096", class: "spin4" }, // 100现金券
        { id: "2097", class: "spin6" }, // 200现金券
        { id: "2098", class: "spin2" }, // 500现金券
      ],
      result: null,
      chances: null,
      instructionPopup: false,
      lostPopup: false,
      hasntStartedLostPopup: false,
      hasEndedLostPopup: false,
      hasntActivityStarted: false,
      hasActivityEnded: false,
      showBindPhone: false,
      isLogin: false,
      items: [],
      section1: [],
      section2: [],
      section3: [],
    };
  }

  componentWillMount() {
    this.getRemainingChances();
    this.getAllPrizeWheelResult();
  }

  getRemainingChances = () => {
    let _this = this;
    let { activityId } = this.state;
    Ajax.ajax({
      method: "GET",
      url: `/api/activity/activity/getUserDrawCount?activityId=${activityId}`,
      success(res) {
        if (res.status == 200) {
          _this.setState({ chances: res.data });
        }
      },
    });
  };

  getAllPrizeWheelResult = () => {
    const { activityId, allPrizeWheelResult } = this.state;
    let _this = this;
    Ajax.ajax({
      method: "GET",
      url: `/api/activity/activity/${activityId}/items`,
      success(res) {
        if (res.status == 200) {
          var rows = res.data.rows;
          rows = rows.map((item, index) => {
            return Object.assign(item, allPrizeWheelResult[index]);
          });
          console.log(rows);
          _this.setState({
            allPrizeWheelResult: rows,
          });
        }
      },
    });
  };

  spin = () => {
    if (this.state.hasntActivityStarted) {
      this.setState({ hasntStartedLostPopup: true });
      return;
    }
    if (this.state.hasActivityEnded) {
      this.setState({ hasEndedLostPopup: true });
      return;
    }
    if (this.state.rotateStatus) return;
    if (!this.state.rotating && this.state.chances !== 0) {
      let _this = this;
      let { activityId } = this.state;
      Ajax.ajax({
        method: "POST",
        url: `/api/activity/activity/${activityId}/userDrawAction`,
        success(res) {
          if (res.status == 200) {
            let result = _this.state.allPrizeWheelResult.find(
              (i) => i.id === res.data.activityItemId
            );
            console.log("--result--", result);
            if (!!result) {
              _this.setState({
                result,
                rotating: result.class || "",
                rotateStatus: true,
              });
              setTimeout(() => {
                _this.setState({
                  pauseWheel: true,
                  chances: res.data.leftCount,
                  rotateStatus: false,
                  instructionPopup: true,
                });
              }, 5900);
            }
          }
        },
      });
    }
    if (this.state.chances === 0) {
      this.setState({
        lostPopup: true,
      });
    }
  };

  closeInstructionPopup = () => {
    this.setState({
      instructionPopup: false,
      rotating: "",
      pauseWheel: false,
    });
  };

  closeLostPopup = () => {
    this.setState({
      lostPopup: false,
      rotating: "",
      pauseWheel: false,
    });
  };

  closeHasntStartedPopup = () => {
    this.setState({
      hasntStartedLostPopup: false,
      rotating: "",
      pauseWheel: false,
    });
  };

  closeHasEndedPopup = () => {
    this.setState({
      hasEndedLostPopup: false,
      rotating: "",
      pauseWheel: false,
    });
  };

  render() {
    let {
      rotating,
      pauseWheel,
      result,
      chances,
      instructionPopup,
      lostPopup,
      isLogin,
      startTime,
      endTime,
      hasntStartedLostPopup,
      hasEndedLostPopup,
      section1,
      section2,
      section3,
    } = this.state;

    let clazzName = !!rotating ? `${rotating} spin` : "";

    if (pauseWheel) {
      clazzName = `${clazzName} pause`;
    }

    return (
      <div className="header">
        <div className="page">
          <header className="section-text">
            <img src="../assets/imgs/nation_lucky_draw/nation_text.png" />
            <p
              className="startTime"
              style={{ opacity: !!startTime && !!endTime ? 1 : 0 }}
            >{`活动时间:${startTime}——${endTime}`}</p>
            <p className="text">先抽个奖 ，再往下划</p>
            <p className="frequency" style={{ opacity: isLogin ? 1 : 0 }}>
              您有{chances || 0}次抽奖机会
            </p>
          </header>

          <main className="section-wheel">
            <section className="prize-wheel-container">
              <div className="wheel-img">
                <div className="prize-wheel">
                  <img
                    className={clazzName}
                    src="../assets/imgs/nation_lucky_draw/wheel_rotating.png"
                  />
                  <img
                    className="wheel-circle"
                    src="../assets/imgs/nation_lucky_draw/wheel_circle.png"
                  />
                  <i className="pointer-event" onClick={() => this.spin()} />
                </div>
              </div>
            </section>

            {section1.length > 0 && (
              <section className="columnManage">
                {
                  <div className="goods">
                    <div className="goods-title">
                      <img src="../assets/imgs/nation_lucky_draw/blink_left.png" />
                      <p className="text">回家好心意</p>
                      <img src="../assets/imgs/nation_lucky_draw/blink_right.png" />
                    </div>

                    <div className="goods-describe">
                      <p className="text">
                        告诉大家一个秘密，其实十一和春节是一个level的假期，我们需要认真对待，十一回家的小伙伴们，给爸妈准备礼物了吗？看看下边这些精选吧
                      </p>
                    </div>
                  </div>
                }
              </section>
            )}

            {section2.length > 0 && (
              <section className="columnManage">
                {
                  <div className="goods">
                    <div className="goods-title">
                      <img src="../assets/imgs/nation_lucky_draw/blink_left.png" />
                      <p className="text">婚礼伴手礼</p>
                      <img src="../assets/imgs/nation_lucky_draw/blink_right.png" />
                    </div>

                    <div className="goods-describe">
                      <p className="text">
                        十一七天假，不是在参加婚礼，就是在参加婚礼的路上，除了准备红包，再给新郎新娘递上一个大礼盒，绝对让你有里有面儿，成为婚礼上除了新人之外最靓的仔
                      </p>
                    </div>
                    <Products
                      items={section2}
                      onClickItem={this.toGoodsDetail}
                    />
                  </div>
                }
              </section>
            )}

            {section3.length > 0 && (
              <section className="columnManage">
                {
                  <div className="goods">
                    <div className="goods-title">
                      <img src="../assets/imgs/nation_lucky_draw/blink_left.png" />
                      <p className="text">出行备好物</p>
                      <img src="../assets/imgs/nation_lucky_draw/blink_right.png" />
                    </div>

                    <div className="goods-describe">
                      <p className="text">
                        欢迎您乘坐中国礼记航空十一特别航班，飞机马上就要起飞，请您系好安全带，收起座椅靠背和小桌板，请确认您已备齐出行必备好物
                      </p>
                    </div>
                  </div>
                }
              </section>
            )}

            {(section1.length > 0 ||
              section2.length > 0 ||
              section3.length > 0) && (
              <p className="tips-text">
                没找到喜欢的吗？进入礼记小程序，万千好礼等你来~
              </p>
            )}
          </main>

          {
            // 中奖
            instructionPopup && (
              <div className="instruction-popup">
                <div className="instruction-popup-wrapper">
                  <div className="price">
                    <div className="left">
                      <span>¥</span>
                      {result ? result.price : 0}
                    </div>
                  </div>
                  <img
                    className="header"
                    src={"../assets/imgs/nation_lucky_draw/get_prize.png"}
                  />
                  <img
                    className="get-price-close"
                    onClick={() => {
                      this.closeInstructionPopup();
                    }}
                    src={"../assets/imgs/70th_luck_draw/close_btn.png"}
                  />
                  <button title="立即使用" />
                </div>
              </div>
            )
          }

          {
            // 没有抽奖次数
            lostPopup && (
              <div className="lostPopup-popup">
                <div className="lostPopup-popup-wrapper">
                  <img
                    className="footer"
                    src={"../assets/imgs/nation_lucky_draw/no_qualifies.png"}
                  />
                  <img
                    className="close"
                    onClick={() => {
                      this.closeLostPopup();
                    }}
                    src={"../assets/imgs/lucky_draw/close.png"}
                  />
                </div>
              </div>
            )
          }

          {hasntStartedLostPopup && (
            <div className="hasntStartedPopup-popup">
              <div className="hasntStartedPopup-popup-wrapper">
                <img
                  className="footer"
                  src={
                    "../assets/imgs/nation_lucky_draw/activity_hasnt_start.png"
                  }
                />
                <img
                  className="close"
                  onClick={() => {
                    this.closeHasntStartedPopup();
                  }}
                  src={"../assets/imgs/lucky_draw/close.png"}
                />
              </div>
            </div>
          )}

          {hasEndedLostPopup && (
            <div className="hasEndedPopup-popup">
              <div className="hasEndedPopup-popup-wrapper">
                <img
                  className="footer"
                  src={
                    "../assets/imgs/nation_lucky_draw/activity_has_ended.png"
                  }
                />
                <img
                  className="close"
                  onClick={() => {
                    this.closeHasEndedPopup();
                  }}
                  src={"../assets/imgs/lucky_draw/close.png"}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Lottery />, document.getElementById("root"));
