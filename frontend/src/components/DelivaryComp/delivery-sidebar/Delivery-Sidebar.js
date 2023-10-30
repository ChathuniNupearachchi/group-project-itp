import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import SidebarItems from "./Delivery-SidebarItem";
import { NavLink } from "react-router-dom";
import "./Delivery-Sidebar.scss";
import { IoIosArrowForward } from "react-icons/io";

function SideBar() {
  const { stateTrack, setStateTrack } = useContext(AppContext);
  const [selected, setSelected] = useState(null);
  const [openNested, setOpenNested] = useState(null);

  const eventTransformer = (num) => {
    if (num === openNested) {
      // If the same item is clicked again, close it
      setOpenNested(null);
    } else {
      // Otherwise, open the clicked item
      setOpenNested(num);
    }
    setStateTrack(num);
    setSelected(0)
  };

  return (
    <div className="sidebar-container">
      {/* brandname modifications central petcare */}
      <div className="brandName">
        <span className="brandFront">Arrow</span>Company
      </div>
      {/* side menu items container */}
      <div className="side-bar-item-container">
        {SidebarItems.map((item, index) => {
          const { id, icon, text, link, nestedFunctions } = item;

          return (
            <div key={index}>
              <div className="mainFunctionAssets" key={id}>
                <span className="mainFunction">
                  <span className="functionPrompt">
                    <span className="mainFuncIcon">{icon}</span>
                    {link ? (
                      <NavLink
                        to={link}
                        className="mainFuncItemName"
                        activeClassName="active-link"
                      >
                        {text}
                      </NavLink>
                    ) : (
                      <span
                        className="mainFuncItemName"
                        onClick={() => {
                          eventTransformer(index);
                          console.log(index);
                        }}
                      >
                        {text}
                      </span>
                    )}
                    {nestedFunctions && (
                      <span
                        className={`scrollFuncIcon ${
                          index === stateTrack && "scroll-function-show"
                        }`}
                        onClick={() => eventTransformer(index)}
                      >
                        <IoIosArrowForward
                          className={
                            openNested === index ? "up-arrow" : "down-arrow"
                          }
                        />
                      </span>
                    )}
                  </span>

                  {nestedFunctions && (
                    <div
                      className={`nested-function-container${
                        openNested === index ? "cont-show" : ""
                      }`}
                    >
                      {nestedFunctions.map((nestedFunction, nestedIndex) => {
                        const {
                          link: nestedLink,
                          nestedItemicon,
                          nestedItemtext,
                        } = nestedFunction;

                        return (
                          <NavLink
                            key={nestedIndex}
                            to={nestedLink}
                            className={({ isActive }) =>
                              isActive
                                ? "active-nested-item"
                                : "side-bar-nested-item"
                            }
                          >
                            <span className="icon">{nestedItemicon}</span>
                            <span className="item-name">{nestedItemtext}</span>
                          </NavLink>
                        );
                      })}
                    </div>
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SideBar;
