import React, { useState } from 'react';
import { FaAngleRight, FaAngleDown } from 'react-icons/fa';

const CodificationTab = () => {
  const [open, setOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);
  const [thirdOpen, setThirdOpen] = useState(false);
  const [fourthOpen, setFourthOpen] = useState(false);
  const [fifthOpen, setFifthOpen] = useState(false);
  const [sixthOpen, setSixthOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const toggleSubOpen = (e) => {
    e.stopPropagation(); // Prevent parent from closing when a sub-item is clicked
    setSubOpen(!subOpen);
  };

  const toggleThirdOpen = (e) => {
    e.stopPropagation(); // Prevent parent from closing when a sub-item is clicked
    setThirdOpen(!thirdOpen);
  };

    const toggleFourthOpen = (e) => {
    e.stopPropagation(); // Prevent parent from closing when a sub-item is clicked
    setFourthOpen(!fourthOpen);
    }

    const toggleFifthOpen = (e) => {
    e.stopPropagation(); // Prevent parent from closing when a sub-item is clicked
    setFifthOpen(!fifthOpen);
    }

    const toggleSixthOpen = (e) => {
    e.stopPropagation(); // Prevent parent from closing when a sub-item is clicked
    setSixthOpen(!sixthOpen);
    }


  return (
    <ul>
      <li>
        <a
          href="#"
          onClick={toggleOpen}
          className={`flex items-center px-4 hover:bg-secondary-100 focus:text-primary active:text-primary ${open ? 'text-primary' : ''}`}
        >
          {open ? (
            <FaAngleDown />
          ) : (
            <FaAngleRight />
          )}
          Segment 73000000 Kitchenware and Tableware
        </a>
        <ul className={`ml-6 ${open ? 'block' : 'hidden'}`}>
          <li className="px-2 hover:bg-secondary-100">Second-one</li>
          <li className="px-2 hover:bg-secondary-100">Second-two</li>
          <li>
            <a
              href="#"
              onClick={toggleSubOpen}
              className={`flex items-center px-2 hover:bg-secondary-100 focus:text-primary active:text-primary ${subOpen ? 'text-primary' : ''}`}
            >
              {subOpen ? (
                <FaAngleDown />
              ) : (
                <FaAngleRight />
              )}
              Family 73050000 Tableware
            </a>
            <ul className={`ml-6 ${subOpen ? 'block' : 'hidden'}`}>
              <li>
                <a
                  href="#"
                  onClick={toggleThirdOpen}
                  className={`flex items-center px-4 hover:bg-secondary-100 focus:text-primary active:text-primary ${thirdOpen ? 'text-primary' : ''}`}
                >
                  {thirdOpen ? (
                    <FaAngleDown />
                  ) : (
                    <FaAngleRight />
                  )}
                  Class 73050000 Tableware (Disposable)
                </a>
                <ul className={`ml-10 ${thirdOpen ? 'block' : 'hidden'}`}>
                  <li className="px-2 hover:bg-secondary-100">Fourth-one</li>
                  <li className="px-2 hover:bg-secondary-100">Fourth-two</li>
                  <li className="px-2 hover:bg-secondary-100">Fourth-three</li>
                </ul>
              </li>
              <li>
                <a
                  href="#"
                  onClick={toggleFourthOpen}
                  className={`flex items-center px-10 hover:bg-secondary-100 focus:text-primary active:text-primary ${thirdOpen ? 'text-primary' : ''}`}
                >
                  {fourthOpen ? (
                    <FaAngleDown />
                  ) : (
                    <FaAngleRight />
                  )}
                  Brick 10007262 Flatware (Disposable)
                </a>
                <ul className={`ml-16 ${fourthOpen ? 'block' : 'hidden'}`}>
                  <li className="px-2 hover:bg-secondary-100">Fourth-one</li>
                  <li className="px-2 hover:bg-secondary-100">Fourth-two</li>
                  <li className="px-2 hover:bg-secondary-100">Fourth-three</li>
                </ul>
              </li>
              <li>
                <a
                  href="#"
                  onClick={toggleFifthOpen}
                  className={`flex items-center px-14 hover:bg-secondary-100 focus:text-primary active:text-primary ${thirdOpen ? 'text-primary' : ''}`}
                >
                  {fifthOpen ? (
                    <FaAngleDown />
                  ) : (
                    <FaAngleRight />
                  )}
                      Attribute 10007262 Flatware Types of Disposable Flatware
                </a>
                <ul className={`ml-20 ${fifthOpen ? 'block' : 'hidden'}`}>
                  <li className="px-2 hover:bg-secondary-100">Fourth-one</li>
                  <li className="px-2 hover:bg-secondary-100">Fourth-two</li>
                  <li className="px-2 hover:bg-secondary-100">Fourth-three</li>
                </ul>
              </li>
              <li>
                <a
                  href="#"
                  onClick={toggleSixthOpen}
                  className={`flex items-center px-20 hover:bg-secondary-100 focus:text-primary active:text-primary ${thirdOpen ? 'text-primary' : ''}`}
                >
                  {sixthOpen ? (
                    <FaAngleDown />
                  ) : (
                    <FaAngleRight />
                  )}
                      Attribute value 30011729 SPOON (DISPOSABLE)
                </a>
                <ul className={`ml-24 ${sixthOpen ? 'block' : 'hidden'}`}>
                  <li className="px-2 hover:bg-secondary-100">Fourth-one</li>
                  <li className="px-2 hover:bg-secondary-100">Fourth-two</li>
                  <li className="px-2 hover:bg-secondary-100">Fourth-three</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  );
};

export default CodificationTab;
