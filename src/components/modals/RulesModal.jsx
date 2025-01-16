import React, { useState } from "react";
import { rulesData } from "../../utility/staticData";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import "../modals/Modal.css";

function RulesModal({ handleRules, setOpenRules }) {
  const [openIndex, setOpenIndex] = useState(null);

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      setOpenRules(false);
    }
  };

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const renderContent = (el, index) => {
    switch (index) {
      case 0:
        return (
          <>
            <li className="rule-para">{el.content.p1}</li>
            <li className="rule-para">{el.content.p2}</li>
            <li className="rule-para">{el.content.p3}</li>
          </>
        );
      case 1:
        return (
          <>
            <h2 className="heading-rules">{el.content.heading}</h2>
            <div className="rule-para">{el.content.p1}</div>
            <div className="rule-para r-bottom">{el.content.p2}</div>
            <h2 className="heading-rules">{el.content.heading2}</h2>
            <li className="rule-para">{el.content.p3}</li>
            <li className="rule-para">{el.content.p4}</li>
            <li className="rule-para">{el.content.p5}</li>
            <li className="rule-para">{el.content.p6}</li>
            <li className="rule-para">{el.content.p7}</li>
            <li className="rule-para">{el.content.p8}</li>
            <li className="rule-para r-bottom">{el.content.p9}</li>
            <h2 className="heading-rules">{el.content.heading3}</h2>
            <div className="rule-para ">{el.content.p10}</div>
            <div className="rule-para ">{el.content.p11}</div>
            <div className="rule-para ">{el.content.p12}</div>
          </>
        );
      // case 2:
      //   return (
      //     <>
      //       <div className="rule-para r-bottom">{el.content.p1}</div>
      //       <div className="rule-para r-bottom">{el.content.p2}</div>
      //     </>
      //   );
      case 2:
        return (
          <>
            <div className="rule-para ">{el.content.heading}</div>
            <div className="rule-para r-bottom">{el.content.heading1}</div>
            
            <li className="rule-para">{el.content.p2}</li>
            <li className="rule-para">{el.content.p3}</li>
          </>
        );
      case 3:
        return (
          <>
            <div className="rule-para r-bottom">{el.content.heading}</div>
            <li className="rule-para">{el.content.p1}</li>
            <li className="rule-para r-bottom">{el.content.p2}</li>

            <div className="rule-para">{el.content.heading2}</div>
          </>
        );
      default:
        return (
          <>
            <div className="rule-para r-bottom">{el.content.p1}</div>
            <div className="rule-para">{el.content.p2}</div>
          </>
        );
    }
  };
  return (
    <div className="overlay" onClick={handleOutsideClick}>
      <div className="modal-new modal-new-rules">
        <div className="modal-head-1">
          <div className="limit-head">Rules</div>
          <div onClick={handleRules}>
            <IoCloseSharp className="close" />
          </div>
        </div>
        <p className="rules-para-1">
          Collect the coolest balls combination and take your
          winnings!⚽️🏀🎾⚾🏐
        </p>

        <div className="modal-body">
          {rulesData.map((el, i) => (
            <div key={i} className="accordian-card">
              <div
                className="accordian-block"
                key={i}
                onClick={() => toggleAccordion(i)}
              >
                <h2 className="block-name">{el.title}</h2>
                {openIndex === i ? (
                  <FaChevronUp style={{ cursor: "pointer", color: "white" }} />
                ) : (
                  <FaChevronDown
                    style={{ cursor: "pointer", color: "white" }}
                  />
                )}
              </div>
              <div
                className={`rules-content ${openIndex === i ? "open" : ""}`}
                style={{
                  maxHeight: openIndex === i ? "" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.9s ease-in-out",
                }}
              >
                <ul className="rules-points">{renderContent(el, i)}</ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RulesModal;
