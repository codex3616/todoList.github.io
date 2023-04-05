import React, { useEffect, useState } from "react";
import DateMonth from "./DateMonth";
import Button from "@mui/material/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";

//   geting data back from local stroage

const getLocalData = () => {
  const fetchedItems = JSON.parse(localStorage.getItem("myTodo"));
  if (fetchedItems) {
    return fetchedItems;
  } else {
    return [];
  }
};
//    ############# DONE ############
const TodoList = () => {
  const [item, setItem] = useState(); // input data store
  const [arrItem, setArrItem] = useState(getLocalData()); /// stored input data in stored in array

  // ################################ STORE DATA IN LOCAL STORAGE ######################

  useEffect(() => {
    localStorage.setItem("myTodo", JSON.stringify(arrItem));
  }, [arrItem]);

  // ################################ ADD ITEM WHEN ADD BUTTON IS CLICKED ######################
  const AddItem = () => {
    if (!item) {
      alert("Can't add empty data...");
    } else {
      const updatedData = {
        id: new Date().getTime().toString(),
        name: item,
      };
      setArrItem([...arrItem, updatedData]); // setting stored data in array
      setItem("");
    }
  };

  // ################################ DELTE ITEM WHEN DELTE BUTTON IS CLICKED ######################
  const DeleteItem = (id) => {
    const newData = arrItem.filter((data) => {
      return id != data.id;
    });
    setArrItem(newData);
  };

  // ################################ REMOVE ALL ITEMS WHEN REMOVE BUTTON IS CLICKED ######################

  const RemoveAll = () => {
    setArrItem([]);
  };

  // ################################ CHNGE TEXT WHEN HOVER ######################
  const MouseHover = () => {
    const btn = document.querySelector(".removeBtn");
    btn.textContent = "Remove All";
  };
  const MouseLeave = () => {
    const btn = document.querySelector(".removeBtn");
    btn.textContent = "Check List";
  };

  return (
    <>
      <div className="head ">
        <DateMonth />
        <div className="bigBox">
          <div className="box text-center">
            <h1 className="text-capitalize logo mb-3">add your list here ✌️</h1>
            <div className="inputContainer">
              <input
                onChange={(e) => {
                  setItem(e.target.value);
                }}
                value={item}
                className="inputFeild"
                type="text"
                placeholder=" ✍️ Add Item.."
              />
              <Button className=" addBtn" onClick={AddItem}>
                <AddIcon />
              </Button>
            </div>

            {/* dynamic list added through map function */}

            <div className="items mt-5">
              {arrItem.map((data) => {
                return (
                  <li className="ownItem" key={data.id}>
                    {data.name}
                    <Button
                      className="myBtn"
                      onClick={() => DeleteItem(data.id)}
                    >
                      <DeleteForeverIcon />
                    </Button>
                  </li>
                );
              })}
            </div>

            {/* ############### DONE ########### */}

            <div className="removeAll mt-5 ">
              <Button
                className="removeBtn"
                onClick={RemoveAll}
                onMouseOver={MouseHover}
                onMouseLeave={MouseLeave}
              >
                Check List
              </Button>
            </div>
          </div>
        </div>

        {/* CREATING EMPTY FOOTER TO ADD MG-B WITH SAME BG COLOR  */}

        <footer className="footer"></footer>
      </div>
      ;
    </>
  );
};

export default TodoList;
