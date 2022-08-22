import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import "./Modal6.css";
import ReactDom from "react-dom";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../../firebase";

const Modal6 = ({ openContinueEditModal, onClose }) => {
  //Fetching all the avatars from firebase
  const [avatars, setAvatars] = useState([]);
  const fetchAllAvatars = () => {
    let list = [];
    const listRef = ref(storage, "avatars");
    listAll(listRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {});
        res.items.forEach((itemRef) => {
          getDownloadURL(itemRef).then((downloadURL) => {
            list.push(downloadURL);
            setAvatars(list);
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [data, setData] = useState(JSON.parse(localStorage.getItem("staff")));
  //Selecting Avatar
  const handleClickAvatar = (avatar) => {
    setData((items) => {
      return {
        ...items,
        selectedAvatar: avatar,
      };
    });
  };

  useEffect(() => {
    fetchAllAvatars();
  }, []);

  //should be at the end
  if (!openContinueEditModal) {
    return null;
  }

  return ReactDom.createPortal(
    <>
      <div className="modal">
        <div className="modal-wrapper">
          <div className="inner-wrapper">
            <div className="heading-wrapper">
              <h3>Edit Staff Member</h3>
              <AiOutlineCloseCircle color="#0D4477" onClick={onClose} />
            </div>
            <div className="avatar-wrapper">
              <h3>Avatar</h3>
              <div className="avatars">
                {avatars.map((avatar, index) => (
                  <img
                    key={index}
                    src={avatar}
                    alt="avatar"
                    onClick={() => handleClickAvatar(avatar)}
                    style={{
                      border: `${
                        avatar === data?.selectedAvatar
                          ? `4px solid #475569`
                          : `none`
                      }`,
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="dots">
              <BsDot color="#489DDA" />
              <BsDot color="#489DDA" />
            </div>
            <div className="button">
              <button>Update Staff Member</button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal6;
